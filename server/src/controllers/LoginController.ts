import {Request, Response} from 'express';
import {LoginModel, Login} from "../models/Login";
import {AtendenteModel, Atendente} from "../models/Atendente";
import {TecnicoModel, Tecnico} from "../models/Tecnico";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class LoginController {
    constructor() {
        // Vincule os métodos que serão usados como handlers de rotas
        this.create = this.create.bind(this);
        this.loginEntrar = this.loginEntrar.bind(this);
        this.recSenha = this.recSenha.bind(this);
        this.validarToken = this.validarToken.bind(this);
        this.redefinirSenha = this.redefinirSenha.bind(this);
        this.senhaHash = this.senhaHash.bind(this);
    }

    async create(request: Request, response: Response) {
        const new_login = new LoginModel();
        new_login.email = request.body.email;
        new_login.senha = await this.senhaHash(request);
        
        if (!new_login.email || !new_login.senha) {
            return response.status(400).json({ success: false, message: "Email e senha são obrigatórios" });
        }

        try{
            const existe = await LoginModel.exists({email: new_login.email});

            if (existe){
                return response.status(409).json({
                    success: false,
                    message: "Usuário já cadastrado com esse e-mail."
                });
            }

            const buscaAtendente = await this.checkAtendente(request);
            const buscaTecnico = await this.checkTecnico(request);
        
            if (buscaAtendente){
                new_login.permission = 'atendente';
            }
            else if (buscaTecnico){
                new_login.permission = 'tecnico';
            }
            else{
                new_login.permission = 'proprietario';
            }
            await new_login.save();
            return response.status(200).json({success: true, message: "Usuário cadastrado com sucesso"});
        }catch(error){
            console.error(error);
            return response.status(500).json({success: false, message: "Erro interno do servidor"});
        }
    }

    async senhaHash(request: Request){
        const saltRounds = 10;
        const hash = bcrypt.hash(request.body.senha, saltRounds);
        return hash;
    }

    async checkAtendente(request: Request){
        let record = await AtendenteModel.exists({ email: request.body.email});
        return record ? true : false;
    }

    async checkTecnico(request: Request){
        let record = await TecnicoModel.exists({ email: request.body.email});
        return record ? true : false
    }


    async recSenha(request: Request, response: Response){
        const {email} = request.body;

        const user = await LoginModel.findOne({email});
        if (!user){
            return response.status(404).json({message: "E-mail não encontrado"});
        }
        
        //gera o token para recuperação do email
        const token = crypto.randomBytes(20).toString('hex');
        const expireTime = Date.now() + 300000; // Token válido por 5 minutos
        
        // Salva o token e o tempo de expiração no usuário
        try {
            user.resetPasswordToken = token;
            user.resetPasswordExpires = expireTime;
            await user.save();
        } catch (error) {
            console.error('Erro ao salvar o token de recuperação:', error)
            return response.status(500).json({message: 'Erro ao salvar o token de recuperação'});
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Recuperação de Senha',
            text: `Você está recebendo este e-mail porque solicitou a redefinição da senha da sua conta.\n\n
                Clique no link a seguir para redefinir sua senha:\n
                http://${request.headers.host}/reset/${token}\n\n
                Se você não solicitou essa ação, ignore este e-mail.\n`
        };

        try {
            await transporter.sendMail(mailOptions);
            return response.status(200).json({message: 'E-mail de recuperação enviado com sucesso'});
        } catch (error) {
            console.error('Erro ao enviar o e-mail:', error);
            return response.status(500).json({message: 'Erro ao enviar o e-mail'});
        }
    }

    async validarToken(request: Request, response: Response){
        const {token} = request.params;

        const user = await LoginModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: Date.now()}
        });

        if (!user){
            return response.status(400).json({message: 'Token inválido ou expirado'});
        }

        response.status(200).json({message: 'Token válido', email: user.email});
    }

    async redefinirSenha(request: Request, response: Response){
        const {token} = request.params;
        const {senha} = request.body;

        if (!senha) {
            return response.status(400).json({ message: 'Senha é obrigatória' });
        }

        const user = await LoginModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now()}
        });

        if (!user){
            return response.status(400).json({ message: 'Token inválido ou expirado'});
        }

        //Redefine a senha
        user.senha = await this.senhaHash(request);
        user.resetPasswordToken = '';
        user.resetPasswordExpires = 0;
        await user.save();

        response.status(200).json({ message: 'Senha redefinida com sucesso'})
    }
    async verifySenha(senha: string, hash: string){
        return await bcrypt.compare(senha, hash)
    }

    async loginEntrar(request: Request, response: Response){
        const { email, senha } = request.body;

        if (!email || !senha) {
            return response.status(400).json({ message: 'Email e senha são obrigatórios' });
        }
        try{
            const user = await LoginModel.findOne({ email })
            
            if (!user){
                return response.status(401).json({ success: false, message: 'Credenciais inválidas!' });
            }

            const isMatch = await this.verifySenha(senha, user.senha);

            if (isMatch){
                response.status(200).json({ success: true, message: 'Bem vindo!'});
            }
            else{
                response.status(200).json({ success: false, message: 'Erro ao fazer o login! Cadastre-se ou tente um email ou senha diferentes!'})
            }
        } catch (error){
            console.error('Erro no método LoginEntrar: ', error);
        }
    }
}

export {LoginController};
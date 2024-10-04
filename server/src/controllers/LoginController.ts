import {Request, Response} from 'express';
import {LoginModel, Login} from "../models/Login";
import {AtendenteModel, Atendente} from "../models/Atendente";
import {TecnicoModel, Tecnico} from "../models/Tecnico";

import crypto from 'crypto';

class LoginController {
    async create(request: Request, response: Response) {
        const new_login = new LoginModel();
        new_login.email = request.body.email;
        new_login.senha = await this.senhaHash(request);

        let buscaAtendente = await this.checkAtendente(request);
        let buscaTecnico = await this.checkTecnico(request);
        
        if (buscaAtendente){
            new_login.permission = 'atendente';
        }
        else if (buscaTecnico){
            new_login.permission = 'tecnico';
        }
        else{
            new_login.permission = 'proprietario';
        }

        const existe = await LoginModel.exists({ email: new_login.email })

        if (existe) {
            return response.json({success: false})
        }

        try {
            new_login.save().then();
            return response.status(200).json({success: true})
        } catch (error) {
            console.log(error);
            return response.status(400).json({success: false})
        }
    }

    async senhaHash(request: Request){
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.pbkdf2Sync(request.body.senha, salt, 1000, 64, 'sha512').toString('base64');
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

}

export {LoginController};
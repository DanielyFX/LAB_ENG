import {Request, Response} from 'express';
import {AtendenteModel, Atendente} from "../models/Atendente";
import crypto from 'crypto';

class AtendenteController {
    async create(request: Request, response: Response) {
        const new_atendente = new AtendenteModel();
        new_atendente.nome = request.body.nome;
        new_atendente.cpf = request.body.cpf;
        new_atendente.telefone = request.body.telefone;
        new_atendente.celular = request.body.celular;
        new_atendente.email = request.body.email;
        new_atendente.dataContrato = request.body.dataContrato;
        new_atendente.salt = crypto.randomBytes(16).toString('hex');
        new_atendente.hash = crypto.pbkdf2Sync(request.body.senha, new_atendente.salt, 1000, 64, 'sha512').toString('base64');

        const existe = await AtendenteModel.exists({ cpf: new_atendente.cpf })

        if (existe) {
            return response.json({success: false})
        }

        try {
            new_atendente.save().then();
            return response.status(200).json({success: true})
        } catch (error) {
            console.log(error);
            return response.status(400).json({success: false})
        }
    }

    async getAll(request: Request, response: Response) {
        let atendentes = await AtendenteModel.find({})
        return response.status(200).json(atendentes);
    }

    async edit(request: Request, response: Response) {
        const { alterados, dados_novos } = request.body;
        if (alterados.length == 0) return response.status(200).json({success: true, msg: "Nada alterado"});

        let atendente = await AtendenteModel.findById(dados_novos._id).exec();

        if (atendente === null) return response.status(404).json({success: false})
        try {
            for (let propriedade of alterados) {
                atendente.set(propriedade, dados_novos[propriedade]);
            }
            atendente.save().then();
        } catch (error) {
            return response.status(500).json({success: false})
        }
        return response.status(200).json({success: true})
    }

    async delete(request: Request, response: Response) {
        const { atendente_id } = request.body;
        try {
            let atendente = await AtendenteModel.findById(atendente_id).exec();

            if (atendente === null) 
                return response.status(404).json({success: false})
            
            atendente.set("ativo", false);

            atendente.save().then();
            return response.status(200).json({success: true});
            // AtendenteModel.findByIdAndDelete(atendente_id, { useFindAndModify: false }).exec()
            //     .finally(() => { return response.status(200).json({ success: true })});
        } catch (error) {
            console.error(error);
            return response.status(500).json({success: false});
        }
    }
}

export {AtendenteController};
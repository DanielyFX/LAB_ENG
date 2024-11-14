import {Request, Response} from 'express';
import {TecnicoModel, Tecnico} from "../models/Tecnico";
import crypto from 'crypto';
import {Document} from "mongoose";

class TecnicoController {
    async create(request: Request, response: Response) {

        const new_tecnico = new TecnicoModel();
        new_tecnico.cpf = request.body.cpf;
        new_tecnico.nome = request.body.nome;
        new_tecnico.dataContrato = request.body.dataContrato;
        new_tecnico.telefone = request.body.telefone;
        new_tecnico.celular = request.body.celular;
        new_tecnico.email = request.body.email;

        new_tecnico.salt = crypto.randomBytes(16).toString('base64');
        new_tecnico.hash = crypto.pbkdf2Sync(request.body.senha, new_tecnico.salt, 1000, 64, 'sha512').toString('base64');

        const existe = await TecnicoModel.exists(
            { cpf: new_tecnico.cpf, bd_status: {$ne: "INATIVO"} })

        if (existe){
            return response.status(409).json({
                success: false,
                message: "Técnico já cadastrado com esse cpf."
            });
        }

        try {
            new_tecnico.save().then();
            return response.status(200).json({success: true})
        } catch (error) {
            console.log(error);
            return response.status(400).json({success: false})
        }
    }

    async getAll(request: Request, response: Response) {
        let tecnicos = await TecnicoModel.find({})
        return response.status(200).json(tecnicos);
    }

    async edit(request: Request, response: Response) {
        const { alterados, dados_novos } = request.body;
        if (alterados.length == 0) return response.status(200).json({success: true, msg: "Nada alterado"});

        let tecnico = await TecnicoModel.findById(dados_novos._id).exec();

        if (tecnico === null) return response.status(404).json({success: false})
        try {
            for (let propriedade of alterados) {
                tecnico.set(propriedade, dados_novos[propriedade]);
            }
            tecnico.save().then();
        } catch (error) {
            return response.status(500).json({success: false})
        }
        return response.status(200).json({success: true})
    }

    async inative(request: Request, response: Response) {
        const { tecnico_id } = request.body;
        try {
            let tecnico = await TecnicoModel.findById(tecnico_id).exec();
            
            if (!tecnico) {
                return response.status(404).json({ success: false, message: "Técnico não encontrado" });
            }
            
            tecnico.set("bd_status", "INATIVO");

            await tecnico.save();

            return response.status(200).json({ success: true, message: "Técnico inativado com sucesso" });
        } catch (error) {
            console.error(error);
            return response.status(500).json({success: false});
        }
    }

    
}

export {TecnicoController};


/* RASCUNHO
async delete(request: Request, response: Response) {
        const { tecnico_id } = request.body;
        console.log(request.body);
        try {
            TecnicoModel.findByIdAndDelete(tecnico_id, { useFindAndModify: false }).exec()
                .finally(() => { return response.status(200).json({ success: true })});
        } catch (error) {
            console.error(error);
            return response.status(500).json({success: false});
        }
    }

*/
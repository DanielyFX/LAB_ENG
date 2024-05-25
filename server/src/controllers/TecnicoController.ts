import {Request, Response} from 'express';
import {TecnicoModel, Tecnico} from "../models/Tecnico";
import {Document} from "mongoose";

class TecnicoController {
    async createTecnico(request: Request, response: Response) {

        const new_tecnico = new TecnicoModel();
        new_tecnico.cpf = request.body.cpf;
        new_tecnico.nome = request.body.nome;
        new_tecnico.dataContrato = request.body.dataContrato;
        new_tecnico.telefone = request.body.telefone;
        new_tecnico.celular = request.body.celular;
        new_tecnico.email = request.body.email;

        const existe = await TecnicoModel.exists({ cpf: new_tecnico.cpf })

        if (existe) {
            return response.json({success: false})
        }

        try {
            new_tecnico.save().then();
            return response.status(200).json({success: true})
        } catch (error) {
            console.log(error);
            return response.status(400).json({success: false})
        }
    }

    async getAllTecnicos(request: Request, response: Response) {
        let tecnicos = await TecnicoModel.find({})
        return response.status(200).json(tecnicos);
    }

    async editTecnico(request: Request, response: Response) {
        const { alterados, dados_novos } = request.body;

        if (alterados.length == 0 ) {
            return response.status(200).json({success: true, msg: "Nada alterado"});
        }

        // console.log(dados_novos, alterados);
        let tecnico = await TecnicoModel.findById(dados_novos._id).exec();
        if (tecnico === null) return response.status(404).json({success: false})
        try {
            for (let propriedade of alterados) {
                tecnico.set(propriedade, dados_novos[propriedade]);
            }
            tecnico.save().then();
        } catch (error) {
            // console.log(error);
            return response.status(500).json({success: false})
        }
        return response.status(200).json({success: true})
    }

    async deleteTecnico(request: Request, response: Response) {
        const { tecnico_id } = request.body;
        console.log(request.body)
        try {
            TecnicoModel.findByIdAndDelete(tecnico_id, { useFindAndModify: false }).exec()
                .finally(() => { return response.status(200).json({ success: true })})
        } catch (error) {
            console.error(error);
            return response.status(500).json({success: false})
        }
    }
}

export {TecnicoController};
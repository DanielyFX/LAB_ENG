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

}

export {TecnicoController};
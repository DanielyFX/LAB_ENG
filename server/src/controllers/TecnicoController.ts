import {Request, Response} from 'express';
import {TecnicoModel} from "../models/Funcionario";

class TecnicoController {
    async createFuncionario(request: Request, response: Response) {

        // console.log(request.body);

        const new_funcionario = new TecnicoModel();
        new_funcionario.cpf = request.body.cpf;
        new_funcionario.nome = request.body.nome;
        new_funcionario.dataContrato = request.body.dataContrato;
        new_funcionario.telefone = request.body.telefone;
        new_funcionario.email = request.body.email;

        // console.log(new_funcionario);

        const existe = await TecnicoModel.exists({ cpf: new_funcionario.cpf })

        if (existe) {
            return response.json({success: false})
        }

        try {
            new_funcionario.save().then();
            return response.status(200).json({success: true})
        } catch (error) {
            console.log(error);
            return response.status(400).json({success: false})
        }

    }
}

export {TecnicoController};
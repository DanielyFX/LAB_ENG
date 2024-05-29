import {Request, Response} from 'express';
import {ServicoModel} from "../models/Servico";

class ServicoController {
    async create(request: Request, response: Response) {
        const new_servico = new ServicoModel();
        new_servico.nome = request.body.nome;
        new_servico.tipo = request.body.tipo;
        new_servico.descricao = request.body.descricao;
        new_servico.preco = request.body.preco;

        const existe = await ServicoModel.exists({ nome: new_servico.nome })

        if (existe) {
            return response.status(400).json({success: false})
        }

        try {
            new_servico.save().then();
            return response.status(200).json({success: true})
        } catch (error) {
            console.log(error);
            return response.status(400).json({success: false})
        }
    }

    async getAll(request: Request, response: Response) {
        let servicos = await ServicoModel.find({})
        return response.status(200).json(servicos);
    }

    async edit(request: Request, response: Response) {
        const { alterados, dados_novos } = request.body;
        if (alterados.length == 0) return response.status(200).json({success: true, msg: "Nada alterado"});

        let servico = await ServicoModel.findById(dados_novos._id).exec();

        if (servico === null) return response.status(404).json({success: false})
        try {
            for (let propriedade of alterados) {
                servico.set(propriedade, dados_novos[propriedade]);
            }
            servico.save().then();
        } catch (error) {
            return response.status(500).json({success: false})
        }
        return response.status(200).json({success: true})
    }

    async delete(request: Request, response: Response) {
        const { servico_id } = request.body;
        try {
            ServicoModel.findByIdAndDelete(servico_id, { useFindAndModify: false }).exec()
                .finally(() => { return response.status(200).json({ success: true })});
        } catch (error) {
            console.error(error);
            return response.status(500).json({success: false});
        }
    }
}

export {ServicoController};
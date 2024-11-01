import {Request, Response} from 'express';
import {ChamadoModel, Chamado} from "../models/Chamado";

class ChamadoController {
    async create(request: Request, response: Response) {
        const new_chamado = new ChamadoModel();
        new_chamado.cliente = request.body.cliente;
        new_chamado.atendente = request.body.atendente;
        new_chamado.prioridade = request.body.prioridade;
        new_chamado.status = request.body.status;
        new_chamado.descricao = request.body.descricao;
        new_chamado.previsao = request.body.previsao;
        //new_chamado.orcamento = request.body.orcamento;
        new_chamado.atendimento = request.body.atendimento;
        new_chamado.dataAbertura = request.body.dataAbertura;
        new_chamado.rua = request.body.dataAbertura;
        new_chamado.cidade = request.body.cidade;
        new_chamado.bairro = request.body.bairro;
        new_chamado.numero = request.body.numero;
        new_chamado.servicos = request.body.servicos;

        try {
            new_chamado.save().then();
            return response.status(200).json({success: true})
        } catch (error) {
            console.log(error);
            return response.status(400).json({success: false})
        }
    }

    async getAll(request: Request, response: Response) {
        let chamados = await ChamadoModel.find({})
            .populate('cliente').populate('atendente');
        return response.status(200).json(chamados);
    }

    async edit(request: Request, response: Response) {
        const { alterados, dados_novos } = request.body;
        if (alterados.length == 0) return response.status(200).json({success: true, msg: "Nada alterado"});

        let chamado = await ChamadoModel.findById(dados_novos._id).exec();

        if (chamado === null) return response.status(404).json({success: false})
        try {
            for (let propriedade of alterados) {
                chamado.set(propriedade, dados_novos[propriedade]);
            }
            chamado.save().then();
        } catch (error) {
            return response.status(500).json({success: false})
        }
        return response.status(200).json({success: true})
    }

    async delete(request: Request, response: Response) {
        const { chamado_id } = request.body;
        try {
            ChamadoModel.findByIdAndDelete(chamado_id, { useFindAndModify: false }).exec()
                .finally(() => { return response.status(200).json({ success: true })});
        } catch (error) {
            console.error(error);
            return response.status(500).json({success: false});
        }
    }
}

export {ChamadoController};
import {Request, Response} from 'express';
import {OrcamentoModel, Orcamento} from "../models/Orcamento";

class OrcamentoController {
    async create(request: Request, response: Response) {
        const new_orcamento = new OrcamentoModel();
        new_orcamento.chamado = request.body.chamado;
        new_orcamento.tecnico = request.body.tecnico;
        new_orcamento.tempoExecucao = request.body.tempoExecucao;
        new_orcamento.enderecoServico = request.body.enderecoServico;
        new_orcamento.observacao = request.body.observacao;
        new_orcamento.situacao = request.body.situacao;
        new_orcamento.descontoServico = request.body.descontoServico;
        new_orcamento.dataCriacao = request.body.dataCriacao;
        new_orcamento.precoTotal = request.body.precoTotal;
        new_orcamento.despesas = request.body.despesas;

        try {
            const existe = await OrcamentoModel.exists({
                chamado: new_orcamento.chamado});

            if (existe){
                return response.status(409).json({
                    success: false,
                    message: "Chamado selecionado já orçado."
                });
            }

            new_orcamento.save().then();
            return response.status(200).json({success: true})
        } catch (error) {
            console.log(error);
            return response.status(400).json({success: false})
        }
    }

    async getAll(request: Request, response: Response) {
        try {
            let orcamentos = await OrcamentoModel.find({})
                .populate('tecnico')
                .populate({
                    path: 'chamado',
                    populate: [
                        { path: 'cliente' },  // Popula o cliente dentro de chamado
                        { path: 'servicos' }  // Popula a lista de serviços dentro de chamado
                    ]
                });
    
            //console.log("Orçamentos:", orcamentos);
            if (orcamentos.length === 0) {
                console.warn("Nenhum orçamento encontrado.");
            }
            return response.status(200).json(orcamentos);
        } catch (error) {
            console.error("Erro ao buscar orçamentos:", error);
            return response.status(500).json({ success: false, message: "Erro ao buscar orçamentos" });
        }
    }

    async edit(request: Request, response: Response) {
        const { alterados, dados_novos } = request.body;
        if (alterados.length == 0) return response.status(200).json({success: true, msg: "Nada alterado"});

        let orcamento = await OrcamentoModel.findById(dados_novos._id).exec();

        if (orcamento === null) return response.status(404).json({success: false})
        try {
            for (let propriedade of alterados) {
                orcamento.set(propriedade, dados_novos[propriedade]);
            }
            orcamento.save().then();
        } catch (error) {
            return response.status(500).json({success: false})
        }
        return response.status(200).json({success: true})
    }

    async delete(request: Request, response: Response) {
        const { orcamento_id } = request.body;
        try {
            OrcamentoModel.findByIdAndDelete(orcamento_id, { useFindAndModify: false }).exec()
                .finally(() => { return response.status(200).json({ success: true })});
        } catch (error) {
            console.error(error);
            return response.status(500).json({success: false});
        }
    }
}

export {OrcamentoController};
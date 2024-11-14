import {Request, Response} from 'express';
import {ServicoModel} from "../models/Servico";
import { TecnicoModel } from '../models/Tecnico';

class ServicoController {
    async create(request: Request, response: Response) {
        const new_servico = new ServicoModel();
        new_servico.nome = request.body.nome;
        new_servico.tipo = request.body.tipo;
        new_servico.descricao = request.body.descricao;
        new_servico.preco = request.body.preco;

        try{
            const existe = await ServicoModel.exists({nome: new_servico.nome});

            if (existe){
                return response.status(409).json({
                    success: false,
                    message: "Serviço já cadastrado com esse nome."
                });
            }

            await new_servico.save();

            return response.status(201).json({
                success: true,
                message: "Serviço cadastrado com sucesso!"
            });

        }
        catch (error){
            return response.status(500).json({
                 success: false,
                 message: "Erro ao tentar cadastrar o serviço"
            });
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

    async inative(request: Request, response: Response) {
        const { servico_id } = request.body;
        try {
            let servico = await ServicoModel.findById(servico_id).exec();
            
            if (!servico) {
                return response.status(404).json({ success: false, message: "Serviço não encontrado" });
            }
            
            servico.set("bd_status", "INATIVO");

            await servico.save();

            return response.status(200).json({ success: true, message: "Serviço inativado com sucesso" });
        } catch (error) {
            console.error(error);
            return response.status(500).json({success: false});
        }
    }
}

export {ServicoController};

/* RASCUNHO
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

*/
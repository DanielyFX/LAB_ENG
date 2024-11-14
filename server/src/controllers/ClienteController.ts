import {Request, Response} from 'express';
import {ClienteModel, Cliente} from "../models/Cliente";

class ClienteController {
    async create(request: Request, response: Response) {
        const new_cliente = new ClienteModel();
        new_cliente.nome = request.body.nome;
        new_cliente.documento = request.body.documento;
        new_cliente.telefone = request.body.telefone;
        new_cliente.celular = request.body.celular;
        new_cliente.email = request.body.email;
        new_cliente.cep = request.body.cep;
        new_cliente.rua = request.body.rua;
        new_cliente.bairro = request.body.bairro;
        new_cliente.cidade = request.body.cidade;
        new_cliente.numero = request.body.numero;

        const existe = await ClienteModel.exists({ documento: new_cliente.documento })

        if (existe) {
            return response.json({success: false})
        }

        try {
            new_cliente.save().then();
            return response.status(200).json({success: true})
        } catch (error) {
            console.log(error);
            return response.status(400).json({success: false})
        }
    }

    async getAll(request: Request, response: Response) {
        let clientes = await ClienteModel.find({})
        return response.status(200).json(clientes);
    }

    async edit(request: Request, response: Response) {
        const { alterados, dados_novos } = request.body;
        if (alterados.length == 0) return response.status(200).json({success: true, msg: "Nada alterado"});

        let cliente = await ClienteModel.findById(dados_novos._id).exec();

        if (cliente === null) return response.status(404).json({success: false})
        try {
            for (let propriedade of alterados) {
                cliente.set(propriedade, dados_novos[propriedade]);
            }
            cliente.save().then();
        } catch (error) {
            return response.status(500).json({success: false})
        }
        return response.status(200).json({success: true})
    }

    async inative(request: Request, response: Response) {
        const { cliente_id } = request.body;
        try {
            let cliente = await ClienteModel.findById(cliente_id).exec();
            
            if (!cliente) {
                return response.status(404).json({ success: false, message: "Cliente não encontrado" });
            }
            
            cliente.set("bd_status", "INATIVO");

            await cliente.save();

            return response.status(200).json({ success: true, message: "Cliente inativado com sucesso" });
        } catch (error) {
            console.error(error);
            return response.status(500).json({success: false});
        }
    }
}

export {ClienteController};

/*RASCUNHO
async delete(request: Request, response: Response) {
        const { cliente_id } = request.body;
        try {
            ClienteModel.findByIdAndDelete(cliente_id, { useFindAndModify: false }).exec()
                .finally(() => { return response.status(200).json({ success: true })});
        } catch (error) {
            console.error(error);
            return response.status(500).json({success: false});
        }
    }


*/
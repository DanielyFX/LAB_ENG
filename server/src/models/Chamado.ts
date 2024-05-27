import {Schema, model, Types} from 'mongoose';

interface Chamado {
    cliente: Types.ObjectId;
    atendente: Types.ObjectId;
    prioridade: string;
    previsaoAtendimento: Date;
    orcamento: string;
    status: string;
    descricao: string;
    dataCriacao: Date;
}

const ChamadoSchema = new Schema({
    cliente: {
        type: Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    atendente: {
        type: Types.ObjectId,
        ref: 'Atendente',
        required: true
    },
    prioridade: {
        type: String,
        required: true,
        default: ''
    },
    previsaoAtendimento: {
        type: Date,
        required: true,
    },
    orcamento: {
        type: String,
        required: true,
        default: ''
    },
    status: {
        type: String,
        required: true,
        default: ''
    },
    descricao: {
        type: String,
        required: true,
        default: ''
    },
    dataCriacao: {
        type: Date,
        default: Date.now()
    }
});

const ChamadoModel = model<Chamado>('Chamado', ChamadoSchema);
export { ChamadoModel, Chamado };
import {Schema, model, Types} from 'mongoose';
import {AtendimentoEnum, StatusChamadoEnum, PrioridadeEnum} from "../utils/enums"
import {ServicoModel} from "../models/Servico"

interface Chamado{
    cliente: Types.ObjectId;
    atendente: Types.ObjectId;
    tecnico: Types.ObjectId;
    prioridade: PrioridadeEnum;
    status: StatusChamadoEnum;
    descricao: string;
    previsao: Date;
    atendimento: AtendimentoEnum;
    dataAbertura: Date;
    rua: string;
    cidade: string;
    bairro: string;
    numero: number;
    servicos: Types.ObjectId[];
}

const ChamadoSchema = new Schema({
    cliente: {
        type: Types.ObjectId,
        ref: 'Cliente',
        required: true,
    },
    atendente: {
        type: Types.ObjectId,
        ref: 'Atendente',
        required: true,
    },
    tecnico: {
        type: Types.ObjectId,
        ref: 'Tecnico',
        required: false,
    },
    prioridade: {
        type: String,
        required: true,
        default: '',
    },
    status: {
        type: String,
        required: true,
        default: '',
    },
    descricao: {
        type: String,
        required: false,
        default: '',
    },
    previsao: {
        type: Date,
        required: true,
    },
    atendimento: {
        type: String,
        required: true,
    },
    dataAbertura: {
        type: Date,
        required: true,
    },
    rua: {
        type: String,
        required: true,
        default: '',
    },
    cidade: {
        type: String,
        required: true,
        default: '',
    },
    bairro: {
        type: String,
        required: true,
        default: '',
    },
    numero: {
        type: Number,
        required: true,
    },

    servicos: [{
        type: Types.ObjectId,
        ref: 'Servico',
        required: false
    }]
});

const ChamadoModel = model<Chamado>('Chamado', ChamadoSchema);
export { ChamadoModel, Chamado };
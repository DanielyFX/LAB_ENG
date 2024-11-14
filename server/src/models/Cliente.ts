import { Schema, model } from 'mongoose';

interface Cliente {
    nome: string;
    documento: string;
    telefone: string;
    celular: string;
    cep: string;
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    email: string;
    hash: string;
    salt: string;
    dataCriacao: Date;
}

const ClienteSchema = new Schema({
    nome: {
        type: String,
        default: '',
        required: true,
    },
    dataCriacao: {
        type: Date,
        default: Date.now()
    },
    documento: {
        type: String,
        unique: true,
        default: '',
        required: true,
    },
    telefone: {
        type: String,
        default: '',
        required: true,
    },
    celular: {
        type: String,
        default: '',
        required: true,
    },
    email: {
        type: String,
        default: '',
        required: true,
    },
    cep: {
        type: String,
        default: '',
        required: true,
    },
    rua: {
        type: String,
        default: '',
        required: true,
    },
    bairro: {
        type: String,
        default: '',
        required: true,
    },
    cidade: {
        type: String,
        default: '',
        required: true,
    },
    numero: {
        type: Number,
        default: 0,
        required: true,
    },
    
    bd_status: {
        type: String,
        required: true,
        default: "ATIVO"
    }
});

const ClienteModel = model<Cliente>('Cliente', ClienteSchema);
export { ClienteModel, Cliente };
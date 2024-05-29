import { Schema, model, Document } from 'mongoose';

interface Servico {
    nome: string;
    tipo: string;
    descricao: string;
    preco: number;
    dataCriacao: Date;
}

const ServicoSchema = new Schema({
    nome: {
        type: String,
        default: '',
        required: true,
    },
    tipo: {
        type: String,
        default: '',
        required: true,
    },
    dataCriacao: {
        type: Date,
        default: Date.now()
    },
    descricao: {
        type: String,
        default: '',
        required: true,
    },
    preco: {
        type: Number,
        default: 0.00,
        required: true,
    }
});

const ServicoModel = model<Servico>('Servico', ServicoSchema);
export { ServicoModel, Servico };
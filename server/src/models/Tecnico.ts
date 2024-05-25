import { Schema, model, Document } from 'mongoose';

interface Tecnico {
    nome: string;
    dataCriacao: Date;
    dataContrato: Date;
    cpf: string;
    telefone: string;
    email: string;
}

const TecnicoSchema = new Schema({
    nome: {
        type: String,
        default: '',
        required: true,
    },
    dataCriacao: {
        type: Date,
        default: Date.now()
    },
    dataContrato: {
        type: Date
    },
    cpf: {
        type: String,
        default: '',
        required: true,
    },
    telefone: {
        type: String,
        default: '',
        required: true,
    },
    email: {
        type: String,
        default: '',
        required: true,
    }
});

const TecnicoModel = model<Tecnico>('Funcionario', TecnicoSchema);
export { TecnicoModel, Tecnico };
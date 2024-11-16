import { Schema, model, Document } from 'mongoose';
import crypto from 'crypto'

interface Tecnico {
    nome: string;
    dataCriacao: Date;
    dataContrato: Date;
    cpf: string;
    celular: string;
    telefone: string;
    email: string;
    hash: string;
    salt: string;
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

    hash: String,
    salt: String,

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
    bd_status: {
        type: String,
        default: "ATIVO",
        required: true
    }
});

TecnicoSchema.methods.validarSenha = function (senha: string) {
    const hash = crypto.pbkdf2Sync(senha, this.salt, 10000, 64, 'sha512').toString('base64');
    return this.hash === hash;
}

const TecnicoModel = model<Tecnico>('Tecnico', TecnicoSchema);
export { TecnicoModel, Tecnico };
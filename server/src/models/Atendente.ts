import mongoose, { Document, Schema } from 'mongoose';
import  * as crypto from 'crypto';

interface Atendente extends Document {
    nome: string;
    cpf: string;
    telefone: string;
    celular: string;
    email: string;
    hash: string;
    salt: string;
    ativo: boolean;
    dataContrato: Date;
    dataCriacao: Date;
}

const AtendenteSchema = new Schema({
    nome: {
        type: String,
        default: '',
        required: true,
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
    dataCriacao: {
        type: Date,
        default: Date.now()
    },
    bd_status: {
        type: String,
        required: true,
        default: "ATIVO"
    },
    hash: String,
    salt: String,
    dataContrato: Date,
    ativo: {
        type: Boolean,
        default: true
    }
});

AtendenteSchema.methods.validarSenha = function (senha: string) {
    const hash = crypto.pbkdf2Sync(senha, this.salt, 10000, 64, 'sha512').toString('base64');
    return this.hash === hash;
}

const AtendenteModel = mongoose.model<Atendente>('Atendente', AtendenteSchema);
export { AtendenteModel, Atendente };
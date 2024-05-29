import mongoose, {Document, Schema, Types} from 'mongoose';

interface Orcamento extends Document {
    tecnico: Types.ObjectId;
    chamado: Types.ObjectId;
    servico: Types.ObjectId;
    situacao: string;
    tempoExecucao: string;
    garantia: string;
    enderecoServico: string;
    observacao: string;
    dataCriacao: Date;
    descontoServico: string;
    precoTotal: number;
}

const OrcamentoSchema = new Schema({
    tecnico: {
        type: Types.ObjectId,
        ref: 'Tecnico',
        required: true
    },
    chamado: {
        type: Types.ObjectId,
        ref: 'Chamado',
        required: true
    },
    servico: {
        type: Types.ObjectId,
        ref: 'Servico',
        required: true
    },
    situacao: {
        type: String,
        required: true,
    },
    tempoExecucao: {
        type: String,
        required: true,
    },
    garantia: {
        type: String,
        required: true,
    },
    enderecoServico: {
        type: String,
        required: true,
    },
    observacao: {
        type: String,
        required: false,
    },
    descontoServico: {
        type: String,
        required: false,
    },
    precoTotal: {
        type: Number,
        required: true,
    },
    dataCriacao: {
        type: Date,
        default: Date.now()
    }
});

const OrcamentoModel = mongoose.model<Orcamento>('Orcamento', OrcamentoSchema);
export { OrcamentoModel, Orcamento };
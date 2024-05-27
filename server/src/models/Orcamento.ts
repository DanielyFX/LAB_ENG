import mongoose, {Document, Schema, Types} from 'mongoose';

interface Orcamento extends Document {
    tecnico: Types.ObjectId;
    chamado: Types.ObjectId;
    descricaoServico: string;
    tipoServico: string;
    tempoExecucao: string;
    garantia: string;
    dataSolicitacao: Date;
    dataCriacao: Date;
    enderecoServico: string;
    situacaoOrcamento: string;
    observacao: string;
    descontoServico: number;
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
    descricaoServico: {
        type: String,
        required: true,
    },
    tipoServico: {
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
    dataSolicitacao: {
        type: Date,
        required: true,
    },
    enderecoServico: {
        type: String,
        required: true,
    },
    situacaoOrcamento: {
        type: String,
        required: true,
    },
    observacao: {
        type: String,
        required: false,
    },
    descontoServico: {
        type: Number,
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
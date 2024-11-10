import mongoose, {Document, Schema, Types} from 'mongoose';

interface Orcamento extends Document {
    chamado: Types.ObjectId;
    tecnico: Types.ObjectId;
    tempoExecucao: String;
    enderecoServico: string;
    observacao: string;
    situacao: string;
    descontoServico: string;
    dataCriacao: Date;
    precoTotal: number;
    despesas: Array<Object>;
    
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
    tempoExecucao: {
        type: String,
        required: true
    },
    enderecoServico: {
        type: String,
        required: true,
    },
    observacao: {
        type: String,
        required: true,
    },
    situacao: {
        type: String,
        required: true,
    },
    descontoServico: {
        type: Number,
        required: false,
    },
    precoTotal: {
        type: Number,
        required: true,
    },
    depesas: {
        type: Array,
        required: false
    }
});

const OrcamentoModel = mongoose.model<Orcamento>('Orcamento', OrcamentoSchema);
export { OrcamentoModel, Orcamento };
import mongoose, { Schema, model, Types} from 'mongoose';

interface Despesa{
    tipo: string,
    valor: number
}

interface Orcamento{
    chamado: Types.ObjectId;
    tecnico: Types.ObjectId;
    tempoExecucao: string;
    enderecoServico: string;
    observacao: string;
    situacao: string;
    descontoServico: string;
    dataCriacao: Date;
    precoTotal: number;
    despesas: Despesa[];
    
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
    despesas: {
        type: [
            {
            tipo: {type: String, required: true},
            valor: {type: Number, required: true}
            }
        ],
        required: false
    }
});

const OrcamentoModel = model<Orcamento>('Orcamento', OrcamentoSchema);
export { OrcamentoModel, Orcamento };
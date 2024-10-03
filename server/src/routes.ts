import {Request, Response, Router} from 'express';
import mongoose from "mongoose";
const router: Router = Router();

import { TecnicoController } from "./controllers/TecnicoController";
import { ServicoController } from "./controllers/ServicoController";
import { AtendenteController } from "./controllers/AtendenteController";
import { ClienteController } from "./controllers/ClienteController";
import { OrcamentoController } from "./controllers/OrcamentoController";
import { ChamadoController } from "./controllers/ChamadoController";

// Função para conectar ao banco de dados
async function conectarBanco(uri: string, descricao: string) {
    try {
        await mongoose.connect(uri);
        console.log(`CONECTADO AO ${descricao}`);
    } catch (err) {
        console.error(`ERRO AO CONECTAR AO ${descricao}:`, err);
        throw err; // Lança o erro para capturar e tentar outra conexão
    }
}

// Função para tentar conectar com tempo de espera entre tentativas
async function tentarConectar() {
    const onlineURI = process.env.MONGOURI!;
    const localURI = process.env.MONGOURI_LOCAL!;

    // Tentativa de conectar ao banco online
    try {
        await conectarBanco(onlineURI, "BANCO ONLINE");
    } catch (err) {
        console.log("Tentando conectar ao banco local em 10 segundos...");
        setTimeout(async () => {
            try {
                await conectarBanco(localURI, "BANCO LOCAL");
            } catch (err) {
                console.error("FALHA AO CONECTAR AOS DOIS BANCOS.");
            }
        }, 10000); // 10 segundos de espera
    }
}

tentarConectar()

// TECNICOS
const tecnicoController = new TecnicoController();
router.post('/tecnicos/novo', tecnicoController.create)
router.get('/tecnicos/consultar', tecnicoController.getAll)
router.post('/tecnicos/editar', tecnicoController.edit)
router.delete('/tecnicos/deletar', tecnicoController.delete)

// SERVIÇOS
const servicoController = new ServicoController();
router.post('/servicos/novo', servicoController.create)
router.get('/servicos/consultar', servicoController.getAll)
router.post('/servicos/editar', servicoController.edit)
router.delete('/servicos/deletar', servicoController.delete)

// ORÇAMENTOS
const orcamentoController = new OrcamentoController();
router.post('/orcamentos/novo', orcamentoController.create)
router.get('/orcamentos/consultar', orcamentoController.getAll)
router.post('/orcamentos/editar', orcamentoController.edit)
router.delete('/orcamentos/deletar', orcamentoController.delete)

// CLIENTES
const clienteController = new ClienteController();
router.post('/clientes/novo', clienteController.create)
router.get('/clientes/consultar', clienteController.getAll)
router.post('/clientes/editar', clienteController.edit)
router.delete('/clientes/deletar', clienteController.delete)

// CHAMADOS
const chamadoController = new ChamadoController();
router.post('/chamados/novo', chamadoController.create)
router.get('/chamados/consultar', chamadoController.getAll)
router.post('/chamados/editar', chamadoController.edit)
router.delete('/chamados/deletar', chamadoController.delete)

// ATENDENTES
const atendenteController = new AtendenteController();
router.post('/atendentes/novo', atendenteController.create)
router.get('/atendentes/consultar', atendenteController.getAll)
router.post('/atendentes/editar', atendenteController.edit)
router.delete('/atendentes/deletar', atendenteController.delete)

// LOGIN e OUTRAS ROTAS

export { router };
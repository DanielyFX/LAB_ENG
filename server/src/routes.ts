import {Request, Response, Router} from 'express';
import mongoose from "mongoose";
const router: Router = Router();

import { TecnicoController } from "./controllers/TecnicoController";
import { ServicoController } from "./controllers/ServicoController";
import { AtendenteController } from "./controllers/AtendenteController";
import { ClienteController } from "./controllers/ClienteController";
import { OrcamentoController } from "./controllers/OrcamentoController";
import { ChamadoController } from "./controllers/ChamadoController";
import { LoginController } from "./controllers/LoginController";

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
router.post('/inicio/tecnicos/novo', tecnicoController.create)
router.get('/inicio/tecnicos/consultar', tecnicoController.getAll)
router.post('/inicio/tecnicos/editar', tecnicoController.edit)
router.delete('/inicio/tecnicos/deletar', tecnicoController.delete)

// SERVIÇOS
const servicoController = new ServicoController();
router.post('/inicio/servicos/novo', servicoController.create)
router.get('/inicio/servicos/consultar', servicoController.getAll)
router.post('/inicio/servicos/editar', servicoController.edit)
router.delete('/inicio/servicos/deletar', servicoController.delete)

// ORÇAMENTOS
const orcamentoController = new OrcamentoController();
router.post('/inicio/orcamentos/novo', orcamentoController.create)
router.get('/inicio/orcamentos/consultar', orcamentoController.getAll)
router.post('/inicio/orcamentos/editar', orcamentoController.edit)
router.delete('/inicio/orcamentos/deletar', orcamentoController.delete)

// CLIENTES
const clienteController = new ClienteController();
router.post('/inicio/clientes/novo', clienteController.create)
router.get('/inicio/clientes/consultar', clienteController.getAll)
router.post('/inicio/clientes/editar', clienteController.edit)
router.delete('/inicio/clientes/deletar', clienteController.delete)

// CHAMADOS
const chamadoController = new ChamadoController();
router.post('/inicio/chamados/novo', chamadoController.create)
router.get('/inicio/chamados/consultar', chamadoController.getAll)
router.post('/inicio/chamados/editar', chamadoController.edit)
router.delete('/inicio/chamados/deletar', chamadoController.delete)

// ATENDENTES
const atendenteController = new AtendenteController();
router.post('/inicio/atendentes/novo', atendenteController.create)
router.get('/inicio/atendentes/consultar', atendenteController.getAll)
router.post('/inicio/atendentes/editar', atendenteController.edit)
router.delete('/inicio/atendentes/deletar', atendenteController.delete)

// LOGIN e OUTRAS ROTAS
const loginController = new LoginController();
router.post('/login/novo', loginController.create)
router.post('/login/entrar', loginController.loginEntrar)
router.post('/login/recuperar', loginController.recSenha)

export { router };
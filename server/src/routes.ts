import {Request, Response, Router} from 'express';
const router: Router = Router();
import {TecnicoController} from './controllers/TecnicoController';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGOURI!).catch(err => {
    console.error(err);
    return Promise.reject(err);
}).then(onfulfilled => console.log("CONECTADO AO BANCO"), (erro) => {
    console.log("ERRO AO CONECTAR AO BANCO");
    console.error(erro);
})

// FUNCIONARIOS
const tecnicoController = new TecnicoController();
router.post('/tecnicos/novo', tecnicoController.createFuncionario)

router.get('/', (req: Request, res: Response) => {
    res.send('alo mundo');
})

export { router };
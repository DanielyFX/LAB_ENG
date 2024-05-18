import {Request, Response, Router} from 'express';
const router: Router = Router();
import {TecnicoController} from './controllers/TecnicoController';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGOURI!).catch(err => {
    console.error(err);
}).then(e => {
    console.log("CONECTADO AO BANCO");
})

// FUNCIONARIOS
const tecnicoController = new TecnicoController();
router.post('/tecnicos/novo', tecnicoController.createFuncionario)

router.get('/', (req: Request, res: Response) => {
    res.send('alo mundo');
})

export { router };
import express, { Express, Request, Response } from "express";
import * as dotenv from "dotenv";
import * as cors from 'cors';

dotenv.config();
import {router} from './routes';

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
// app.use(cors({origin: 'http://localhost:3000'}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use(router);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
})
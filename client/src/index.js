// BIBLIOTECAS E OUTROS
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
// PAGINAS
import Login from "./pages/login";
import RecuperaSenha from './pages/senha';

import Cadastrar_servico from "./pages/servicos/cadastrar_servico";
import Consultar_Servicos from "./pages/servicos/servicos";

import Cadastrar_tecnico from "./pages/tecnicos/cadastrar_tecnico";
import Consultar_Tecnicos from "./pages/tecnicos/tecnicos";

import Cadastrar_atendente from "./pages/atendentes/cadastrar_atendente";
import Consultar_Atendentes from "./pages/atendentes/atendentes";

import Cadastrar_cliente from "./pages/clientes/cadastrar_cliente";
import Consultar_Clientes from "./pages/clientes/clientes"

import Cadastrar_chamado from "./pages/chamados/cadastrar_chamado";
import Consultar_Chamados from "./pages/chamados/chamados";

import Orcamento_chamado from "./pages/orcamento/orcamento_chamado";
import Consultar_orcamento from "./pages/orcamento/orcamentos"
// COMPONENTES
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// ARQUIVO JSON PARA TESTE
import dados from './assets/dados.json';


//ROTAS NO NAVEGADOR
const router = createBrowserRouter([
    {
        path: "/",
        element: (<Login/>)
    },
    {
        path: "/recupera-senha",
        element: <RecuperaSenha/>
    },
    {
        path: "/inicio",
        element: (
            <div id="servicos-raiz">
                <Header titulo="Início"/>
                <div id="body-container">
                    <Sidebar/>
                </div>
            </div>
        )
    },
    {
        path: "/servicos/consultar",
        loader: async () => {
            return JSON.parse(JSON.stringify(dados));
        },
        element: (
            <div id="servicos-raiz">
                <Header titulo="Consultar Serviços"/>
                <div id="body-container">
                    <Sidebar/>
                    <Consultar_Servicos/>
                </div>
            </div>
        )
    },
    {
        path: "/servicos/cadastrar",
        element: (
            <div id="cadservico-raiz">
                <Header titulo="Cadastrar Serviço"/>
                <div id="body-container">
                    <Sidebar/>
                    <Cadastrar_servico/>
                </div>
            </div>
        )
    },
    {
        path: "/tecnicos/consultar",
        loader: async () => {
            return fetch('http://localhost:3001/tecnicos/consultar', {
                method: "GET"
            });
        },
        element: (
            <div id="tecnicos-raiz">
                <Header titulo="Consultar Técnicos"/>
                <div id="body-container">
                    <Sidebar/>
                    <Consultar_Tecnicos/>
                </div>
            </div>
        )
    },
    {
        path: "/tecnicos/cadastrar",
        element: (
            <div id="cadtecnico-raiz">
                <Header titulo="Cadastrar Técnico"/>
                <div id="body-container">
                    <Sidebar/>
                    <Cadastrar_tecnico/>
                </div>
            </div>
        )
    },
    {
        path: "/atendentes/consultar",
        loader: async () => {
            return JSON.parse(JSON.stringify(dados));
        },
        element: (
            <div id="atendentes-raiz">
                <Header titulo="Consultar Atendente"/>
                <div id="body-container">
                    <Sidebar/>
                    <Consultar_Atendentes/>
                </div>
            </div>
        )
    },
    {
        path: "/atendentes/cadastrar",
        element: (
            <div id="cadatendente-raiz">
                <Header titulo="Cadastrar Atendente"/>
                <div id="body-container">
                    <Sidebar/>
                    <Cadastrar_atendente/>
                </div>
            </div>
        )
    },
    {
        path: "/clientes/consultar",
        loader: async () => {
            return JSON.parse(JSON.stringify(dados));
        },
        element: (
            <div id="clientes-raiz">
                <Header titulo="Consultar Clientes"/>
                <div id="body-container">
                    <Sidebar/>
                    <Consultar_Clientes/>
                </div>
            </div>
        )
    },
    {
        path: "/clientes/cadastrar",
        element: (
            <div id="cadcliente-raiz">
                <Header titulo="Cadastrar Cliente"/>
                <div id="body-container">
                    <Sidebar/>
                    <Cadastrar_cliente/>
                </div>
            </div>
        )
    },
    {
        path: "/chamados/cadastrar",
        element: (
            <div id="cadchamado-raiz">
                <Header titulo="Cadastrar Chamado"/>
                <div id="body-container">
                    <Sidebar/>
                    <Cadastrar_chamado/>
                </div>
            </div>
        )
    },
    {
        path: "/chamados/consultar",
        loader: async () => {
            return JSON.parse(JSON.stringify(dados));
        },
        element: (
            <div id="chamados-raiz">
                <Header titulo="Consultar Chamados"/>
                <div id="body-container">
                    <Sidebar/>
                    <Consultar_Chamados/>
                </div>
            </div>
        )
    },
    {
        path: "/orcamento/cadastrar",
        element: (
            <div id="chamados-raiz">
                <Header titulo="Realizar Orçamento"/>
                <div id="body-container">
                    <Sidebar/>
                    <Orcamento_chamado/>
                </div>
            </div>
        )
    },
    {
        path: "/orcamento/consultar",
        loader: async () => {
            return JSON.parse(JSON.stringify(dados));
        },
        element: (
            <div id="chamados-raiz">
                <Header titulo="Consultar Orçamentos"/>
                <div id="body-container">
                    <Sidebar/>
                    <Consultar_orcamento/>
                </div>
            </div>
        )
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
            <RouterProvider router={router}/>
    </React.StrictMode>
);



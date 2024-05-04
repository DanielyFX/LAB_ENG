// BIBLIOTECAS E OUTROS
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
// PAGINAS
import Inicio from './pages/inicio';
import Login from "./pages/login";
import Servicos from "./pages/servicos/servicos";
import Cadastrar_servico from "./pages/servicos/cadastrar_servico";
import Tecnicos from "./pages/tecnicos/tecnicos";
import Cadastrar_tecnico from "./pages/tecnicos/cadastrar_tecnico";
import Atendentes from "./pages/atendentes/atendentes";
import Cadastrar_atendente from "./pages/atendentes/cadastrar_atendente";
import Clientes from "./pages/clientes/clientes";
import Cadastrar_cliente from "./pages/clientes/cadastrar_cliente";
import Chamados from "./pages/chamados/chamados";
import Cadastrar_chamado from "./pages/chamados/cadastrar_chamado";
// COMPONENTES
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const router = createBrowserRouter([
    {
        path: "/",
        element: (<Login/>)
    },
    {
        path: "/inicio",
        element: <Inicio/>
    },
    {
        path: "/servicos",
        element: (
            <div id="servicos-raiz">
                <Header titulo="Serviços"/>
                <div id="body-container">
                    <Servicos/>
                    <Sidebar/>
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
                    <Cadastrar_servico/>
                    <Sidebar/>
                </div>
            </div>
        )
    },
    {
        path: "/tecnicos/",
        element: (
            <div id="tecnicos-raiz">
                <Header titulo="Técnicos"/>
                <div id="body-container">
                    <Tecnicos/>
                    <Sidebar/>
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
                    <Cadastrar_tecnico/>
                    <Sidebar/>
                </div>
            </div>
        )
    },
    {
        path: "/atendentes/",
        element: (
            <div id="atendentes-raiz">
                <Header titulo="Atendentes"/>
                <div id="body-container">
                    <Atendentes/>
                    <Sidebar/>
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
                    <Cadastrar_atendente/>
                    <Sidebar/>
                </div>
            </div>
        )
    },
    {
        path: "/clientes/",
        element: (
            <div id="clientes-raiz">
                <Header titulo="Clientes"/>
                <div id="body-container">
                    <Clientes/>
                    <Sidebar/>
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
                    <Cadastrar_cliente/>
                    <Sidebar/>
                </div>
            </div>
        )
    },
    {
        path: "/chamados/",
        element: (
            <div id="chamados-raiz">
                <Header titulo="Chamado"/>
                <div id="body-container">
                    <Chamados/>
                    <Sidebar/>
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
                    <Cadastrar_chamado/>
                    <Sidebar/>
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



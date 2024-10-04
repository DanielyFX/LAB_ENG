// BIBLIOTECAS E OUTROS
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
// PAGINAS
import Inicio from "./pages/inicio";
import Servico_Realizado from "./pages/servico_realizado/relatorio_servicos_realizados";

import Cadastrar_servico from "./pages/servicos/cadastrar_servico";
import Consultar_Servicos from "./pages/servicos/servicos";

import Cadastrar_tecnico from "./pages/tecnicos/cadastrar_tecnico";
import Consultar_Tecnicos from "./pages/tecnicos/tecnicos";

import Cadastrar_atendente from "./pages/atendentes/cadastrar_atendente";
import Consultar_Atendentes from "./pages/atendentes/atendentes";

import Cadastrar_cliente from "./pages/clientes/cadastrar_cliente";
import Consultar_Clientes from "./pages/clientes/clientes";

import Cadastrar_chamado from "./pages/chamados/cadastrar_chamado";
import Consultar_Chamados from "./pages/chamados/chamados";

import Orcamento_chamado from "./pages/orcamento/orcamento_chamado";
import Consultar_orcamento from "./pages/orcamento/orcamentos";

import Login from "./pages/login";
import RecuperaSenha from "./pages/senha";

// COMPONENTES
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

//ROTAS NO NAVEGADOR
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/recupera-senha",
    element: <RecuperaSenha />,
  },
  {
    path: "/inicio",
    element: (
      <div id="servicos-raiz">
        <Header titulo="Início" />
        <div id="body-container">
          <Sidebar />
          <Inicio />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/servicos/consultar",
    loader: async () => {
      return fetch('http://localhost:3001/inicio/servicos/consultar', {
          method: "GET"
      })
    },
    element: (
      <div id="servicos-raiz">
        <Header titulo="Consultar Serviços" />
        <div id="body-container">
          <Sidebar />
          <Consultar_Servicos />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/servicos/cadastrar",
    element: (
      <div id="cadservico-raiz">
        <Header titulo="Cadastrar Serviço" />
        <div id="body-container">
          <Sidebar />
          <Cadastrar_servico />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/tecnicos/consultar",
    loader: async () => {
      return fetch('http://localhost:3001/inicio/tecnicos/consultar', {
                method: "GET"
            });
    },
    element: (
      <div id="tecnicos-raiz">
        <Header titulo="Consultar Técnicos" />
        <div id="body-container">
          <Sidebar />
          <Consultar_Tecnicos />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/tecnicos/cadastrar",
    element: (
      <div id="cadtecnico-raiz">
        <Header titulo="Cadastrar Técnico" />
        <div id="body-container">
          <Sidebar />
          <Cadastrar_tecnico />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/atendentes/consultar",
    loader: async () => {
        return fetch('http://localhost:3001/inicio/atendentes/consultar', {
            method: "GET"
        })
    },
    element: (
      <div id="atendentes-raiz">
        <Header titulo="Consultar Atendente" />
        <div id="body-container">
          <Sidebar />
          <Consultar_Atendentes />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/atendentes/cadastrar",
    element: (
      <div id="cadatendente-raiz">
        <Header titulo="Cadastrar Atendente" />
        <div id="body-container">
          <Sidebar />
          <Cadastrar_atendente />
        </div>
      </div>
    ),
  },
  {
    path: "Qinicio/clientes/consultar",
      loader: async () => {
          return fetch('http://localhost:3001/inicio/clientes/consultar', {
              method: "GET"
          });
      },
    element: (
      <div id="clientes-raiz">
        <Header titulo="Consultar Clientes" />
        <div id="body-container">
          <Sidebar />
          <Consultar_Clientes />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/clientes/cadastrar",
    element: (
      <div id="cadcliente-raiz">
        <Header titulo="Cadastrar Cliente" />
        <div id="body-container">
          <Sidebar />
          <Cadastrar_cliente />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/chamados/cadastrar",
    loader: async () => {
        const [clientes, atendentes] = await Promise.all([
            fetch('http://localhost:3001/inicio/clientes/consultar').then(res => res.json()),
            fetch('http://localhost:3001/inicio/atendentes/consultar').then(res => res.json())
        ])
        return { clientes, atendentes }
    },
    element: (
      <div id="cadchamado-raiz">
        <Header titulo="Cadastrar Chamado" />
        <div id="body-container">
          <Sidebar />
          <Cadastrar_chamado />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/chamados/consultar",
    loader: async () => {
        const [chamados, clientes, atendentes] = await Promise.all([
          fetch('http://localhost:3001/inicio/chamados/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/clientes/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/atendentes/consultar').then(res => res.json())
        ])
        return { chamados, clientes, atendentes }
    },
    element: (
      <div id="chamados-raiz">
        <Header titulo="Consultar Chamados" />
        <div id="body-container">
          <Sidebar />
          <Consultar_Chamados />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/orcamento/cadastrar",
    loader: async () => {
      const [tecnicos, chamados, servicos] = await Promise.all([
          fetch('http://localhost:3001/inicio/tecnicos/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/chamados/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/servicos/consultar').then(res => res.json())
      ])
      return { tecnicos, chamados, servicos }
    },
    element: (
      <div id="chamados-raiz">
        <Header titulo="Realizar Orçamento" />
        <div id="body-container">
          <Sidebar />
          <Orcamento_chamado />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/orcamento/consultar",
    loader: async () => {
      const [tecnicos, chamados, servicos, orcamentos] = await Promise.all([
          fetch('http://localhost:3001/inicio/tecnicos/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/chamados/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/servicos/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/orcamentos/consultar').then(res => res.json())
      ])
      return { tecnicos, chamados, servicos, orcamentos }
    },
    element: (
      <div id="chamados-raiz">
        <Header titulo="Consultar Orçamentos" />
        <div id="body-container">
          <Sidebar />
          <Consultar_orcamento />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio/servicos_realizados",
    loader: async () => {
      return fetch('http://localhost:3001/inicio/orcamentos/consultar')
    },
    element: (
      <div id="servicos-raiz">
        <Header titulo="Análise de Chamados/Orçamentos" />
        <div id="body-container">
          <Sidebar />
          <Servico_Realizado />
        </div>
      </div>
    ),
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
);

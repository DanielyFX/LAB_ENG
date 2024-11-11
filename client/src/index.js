// BIBLIOTECAS E OUTROS
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

//jwt decode
import jwt_decode from "jwt-decode";

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

import Login from "./pages/logins/Login";
import RecuperaSenha from "./pages/logins/recuperar_senha";
import CadastrarLogin from "./pages/logins/cadastrar_login";

// COMPONENTES
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

//ROTA PRIVADA

const PrivateRoute = ({ children }) => {
  // Recupera o token JWT do armazenamento local (localStorage)
  const token = localStorage.getItem("authToken");
  console.log("PrivateRoute - Token encontrado:", token);

  // Se o token não existir, redireciona para a página de login
  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    // Decodifica o token para verificar a validade
    const decodedToken = jwt_decode(token);

    // Verifica se o token está expirado
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      // Se expirou, remove o token e redireciona para o login
      localStorage.removeItem("authToken");
      return <Navigate to="/" />;
    }
  } catch (error) {
    // Se o token não for válido, redireciona para o login
    return <Navigate to="/" />;
  }

  // Se o token é válido, renderiza a rota privada
  return children;
};

export default PrivateRoute;


//ROTAS NO NAVEGADOR
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  
  },
  {
    path: "/login/entrar",
    element: (
      <div id="entrarlogin-main">
        <div id="body-container">
          <Login />
        </div>
      </div>
    ),
  },
  
  {
    path: "/recupera-senha",
    element: (
      <div id="recsenha-main">
        <div id="body-container">
          <RecuperaSenha />
        </div>
      </div>
    ),
  },
  {
    path:"/cadastrar",
    element: (
      <div id="cadlogin-main">
        <div id="body-container">
          <CadastrarLogin />
        </div>
      </div>
    ),
  },
  {
    path: "/inicio",
    element: (
      <PrivateRoute>
      <div id="servicos-raiz">
        <Header titulo="Início" />
        <div id="body-container">
          <Sidebar />
          <Inicio />
        </div>
      </div>
    </PrivateRoute>
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
      <PrivateRoute>
      <div id="servicos-raiz">
        <Header titulo="Consultar Serviços" />
        <div id="body-container">
          <Sidebar />
          <Consultar_Servicos />
        </div>
      </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/inicio/servicos/cadastrar",
    element: (
      <PrivateRoute>
      <div id="cadservico-raiz">
        <Header titulo="Cadastrar Serviço" />
        <div id="body-container">
          <Sidebar />
          <Cadastrar_servico />
        </div>
      </div>
      </PrivateRoute>
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
      <PrivateRoute>
      <div id="tecnicos-raiz">
        <Header titulo="Consultar Técnicos" />
        <div id="body-container">
          <Sidebar />
          <Consultar_Tecnicos />
        </div>
      </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/inicio/tecnicos/cadastrar",
    element: (
      <PrivateRoute>
      <div id="cadtecnico-raiz">
        <Header titulo="Cadastrar Técnico" />
        <div id="body-container">
          <Sidebar />
          <Cadastrar_tecnico />
        </div>
      </div>
      </PrivateRoute>
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
      <PrivateRoute>
      <div id="atendentes-raiz">
        <Header titulo="Consultar Atendente" />
        <div id="body-container">
          <Sidebar />
          <Consultar_Atendentes />
        </div>
      </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/inicio/atendentes/cadastrar",
    element: (
      <PrivateRoute>
      <div id="cadatendente-raiz">
        <Header titulo="Cadastrar Atendente" />
        <div id="body-container">
          <Sidebar />
          <Cadastrar_atendente />
        </div>
      </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/inicio/clientes/consultar",
      loader: async () => {
          return fetch('http://localhost:3001/inicio/clientes/consultar', {
              method: "GET"
          });
      },
    element: (
      <PrivateRoute>
      <div id="clientes-raiz">
        <Header titulo="Consultar Clientes" />
        <div id="body-container">
          <Sidebar />
          <Consultar_Clientes />
        </div>
      </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/inicio/clientes/cadastrar",
    element: (
      <PrivateRoute>
      <div id="cadcliente-raiz">
        <Header titulo="Cadastrar Cliente" />
        <div id="body-container">
          <Sidebar />
          <Cadastrar_cliente />
        </div>
      </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/inicio/chamados/cadastrar",
    loader: async () => {
        const [clientes, atendentes, servicos, tecnicos] = await Promise.all([
            fetch('http://localhost:3001/inicio/clientes/consultar').then(res => res.json()),
            fetch('http://localhost:3001/inicio/atendentes/consultar').then(res => res.json()),
            fetch('http://localhost:3001/inicio/servicos/consultar').then(res => res.json()),
            fetch('http://localhost:3001/inicio/tecnicos/consultar').then(res => res.json())
        ])
        return { clientes, atendentes, servicos, tecnicos }
    },
    element: (
      <PrivateRoute>
      <div id="cadchamado-raiz">
        <Header titulo="Cadastrar Chamado" />
        <div id="body-container">
          <Sidebar />
          <Cadastrar_chamado />
        </div>
      </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/inicio/chamados/consultar",
    loader: async () => {
        const [chamados, clientes, atendentes, servicos, tecnicos, orcamentos] = await Promise.all([
          fetch('http://localhost:3001/inicio/chamados/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/clientes/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/atendentes/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/servicos/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/tecnicos/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/orcamentos/consultar').then(res => res.json())    
        ])
        return { chamados, clientes, atendentes, servicos, tecnicos, orcamentos}
    },
    element: (
      <PrivateRoute>
      <div id="chamados-raiz">
        <Header titulo="Consultar Chamados" />
        <div id="body-container">
          <Sidebar />
          <Consultar_Chamados />
        </div>
      </div>
      </PrivateRoute>
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
      <PrivateRoute>
      <div id="chamados-raiz">
        <Header titulo="Realizar Orçamento" />
        <div id="body-container">
          <Sidebar />
          <Orcamento_chamado />
        </div>
      </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/inicio/orcamento/consultar",
    loader: async () => {
      const [orcamentos, tecnicos, chamados, servicos] = await Promise.all([
        fetch('http://localhost:3001/inicio/orcamentos/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/tecnicos/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/chamados/consultar').then(res => res.json()),
          fetch('http://localhost:3001/inicio/servicos/consultar').then(res => res.json()),
      ])
      return { orcamentos, tecnicos, chamados, servicos}
    },
    element: (
      <PrivateRoute>
      <div id="chamados-raiz">
        <Header titulo="Consultar Orçamentos" />
        <div id="body-container">
          <Sidebar />
          <Consultar_orcamento />
        </div>
      </div>
      </PrivateRoute>
    ),
  },
  {
    path: "/inicio/servicos_realizados",
    loader: async () => {
      return fetch('http://localhost:3001/inicio/orcamentos/consultar')
    },
    element: (
      <PrivateRoute>
      <div id="servicos-raiz">
        <Header titulo="Análise de Chamados/Orçamentos" />
        <div id="body-container">
          <Sidebar />
          <Servico_Realizado />
        </div>
      </div>
      </PrivateRoute>
    ),
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
);

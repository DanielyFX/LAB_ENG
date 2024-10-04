import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import '../css/menuLateral/menu.css';

export default function Sidebar() {
    const [expandedMenu, setExpandedMenu] = useState(null);

    const toggleSubMenu = (menuId) => {
        if (expandedMenu === menuId) {
            setExpandedMenu(null); 
        } else {
            setExpandedMenu(menuId); 
        }
    };

    return (
        <div id="sidebar-container" className="menu-lateral">
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ width: "100%" }}>
                    Serviços
                </Dropdown.Toggle>

                <Dropdown.Menu show={expandedMenu === "servicos"} style={{ width: "100%" }}>
                    <Dropdown.Item href="/inicio/servicos/cadastrar">Cadastrar Serviço</Dropdown.Item>
                    <Dropdown.Item href="/inicio/servicos/consultar">Consultar Serviço</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <hr className="sidebar-divider" /> 
            
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ width: "100%" }}>
                    Clientes
                </Dropdown.Toggle>

                <Dropdown.Menu show={expandedMenu === "clientes"} style={{ width: "100%" }}>
                <Dropdown.Item href="/inicio/clientes/cadastrar">Cadastrar Cliente</Dropdown.Item>
                    <Dropdown.Item href="/inicio/clientes/consultar">Consultar Cliente</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <hr className="sidebar-divider" /> 

            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ width: "100%" }}>
                    Técnicos
                </Dropdown.Toggle>

                <Dropdown.Menu show={expandedMenu === "tecnico"} style={{ width: "100%" }}>
                <Dropdown.Item href="/inicio/tecnicos/cadastrar">Cadastrar Técnico </Dropdown.Item>
                    <Dropdown.Item href="/inicio/tecnicos/consultar">Consultar Técnico</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <hr className="sidebar-divider" /> 

            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ width: "100%" }}>
                   Chamado
                </Dropdown.Toggle>

                <Dropdown.Menu show={expandedMenu === "chamado"} style={{ width: "100%" }}>
                    <Dropdown.Item href="/inicio/chamados/cadastrar">Cadastrar Chamado</Dropdown.Item>
                    <Dropdown.Item href="/inicio/chamados/consultar">Consultar Chamado</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <hr className="sidebar-divider" /> 

            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ width: "100%" }}>
                   Orçamento
                </Dropdown.Toggle>

                <Dropdown.Menu show={expandedMenu === "orcamento"} style={{ width: "100%" }}>
                    <Dropdown.Item href="/inicio/orcamento/cadastrar">Realizar Orçamento</Dropdown.Item>
                    <Dropdown.Item href="/inicio/orcamento/consultar">Consultar Orçamento</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>




            <hr className="sidebar-divider" /> 

            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ width: "100%" }}>
                   Atendente
                </Dropdown.Toggle>

                <Dropdown.Menu show={expandedMenu === "chamado"} style={{ width: "100%" }}>
                    <Dropdown.Item href="/inicio/atendentes/cadastrar">Cadastrar Atendente </Dropdown.Item>
                    <Dropdown.Item href="/inicio/atendentes/consultar">Consultar Atendente </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <hr className="sidebar-divider" /> 

            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ width: "100%" }}>
                   Relatório
                </Dropdown.Toggle>

                <Dropdown.Menu show={expandedMenu === "chamado"} style={{ width: "100%" }}>
                    <Dropdown.Item href="/inicio/servicos_realizados">Chamados/Orçamentos</Dropdown.Item> {/* uso de quebra de linha com a tag <br> */}
                </Dropdown.Menu>
            </Dropdown> 
        </div>
    );
}

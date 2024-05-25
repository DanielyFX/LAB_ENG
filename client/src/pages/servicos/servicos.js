import "../../css/servicos/cadservicos.css"
import { useLoaderData } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { ButtonGroup, Dropdown, InputGroup } from "react-bootstrap";
import ServicoModal from "../../components/ServicoModal";
import searchIcon from "../../css/Icons";

export default function Consultar_Clientes() {

    let { servicos } = useLoaderData();
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("nome");
    const [parametroOrd, setParametroOrd] = useState("nome");
    const [servico, setServico] = useState(0);
    const [show, setShow] = useState(false);

    const dropdown = (dropdown) => {
        let funcao, todos = true;
        if (dropdown === "ord") {
            todos = false
            funcao = setParametroOrd;
        } else funcao = setParametro;
        return (
            <Dropdown.Menu>
                {todos && <Dropdown.Item as="button" onClick={() => funcao("todos")}>Todos os Campos</Dropdown.Item>}
                <Dropdown.Item as="button" onClick={() => funcao("_id")}>id</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("nome")}>Nome</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("tipo")}>Tipo</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("dataCriacao")}>Data de Criação</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("descricao")}>Descrição</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("preco")}>Preço</Dropdown.Item>
            </Dropdown.Menu>
        )
    }

    const sort_string = (a, b) => {
        return a > b ? a === b ? 1 : 0 : -1;
    }

    return (
        <div className="body-main">
            <InputGroup className="mb-3">
                <InputGroup.Text style={{ opacity: 0.5 }} >{searchIcon}</InputGroup.Text>
                <Form.Control placeholder='Buscar...' onChange={e => setPesquisa(e.target.value)} />
                <Dropdown>
                    <Dropdown.Toggle variant="info">
                        Filtro de Pesquisa: {parametro}
                    </Dropdown.Toggle>
                    {dropdown("")}
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="info">
                        Filtro de Ordenação: {parametroOrd}
                    </Dropdown.Toggle>
                    {dropdown("ord")}
                </Dropdown>
            </InputGroup>
            <div id="chamados-main">
                {
                    servicos.filter((servico) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in servico) {
                                    if (servico[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true
                                }
                                break;
                            case "_id":
                                return servico.id.toLowerCase().includes(pesquisa.toLowerCase()) ? servico : false
                            case "nome":
                                return servico.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? servico : false
                            case "tipo":
                                return servico.tipo.toLowerCase().includes(pesquisa.toLowerCase()) ? servico : false
                            case "dataCriacao":
                                return servico.dataCriacao.toLowerCase().includes(pesquisa.toLowerCase()) ? servico : false
                            case "descricao":
                                return servico.descricao.toLowerCase().includes(pesquisa.toLowerCase()) ? servico : false
                            case "preco":
                                return servico.preco.toLowerCase().includes(pesquisa.toLowerCase()) ? servico : false
                            default:
                                return true;
                        }
                    }).sort((a, b) => {
                        switch (parametroOrd) {
                            case "nome":
                            case "descricao":
                            case "tipo":
                            case "_id":
                                return sort_string(a[parametroOrd], b[parametroOrd]);
                            case "preco":
                                return parseFloat(a["preco"]) - parseFloat(b["preco"]);
                            case "dataCriacao":
                                return new Date(a["dataCriacao"]) - new Date(b["dataCriacao"]);
                            default:
                                return true;
                        }
                    }).map((servico, key) => {
                        return (
                            <div className="tecnico">
                                <p key={`${servico.id}_nome`}>NOME: {servico.nome}</p>
                                <p key={`${servico.id}`}>ID: {servico.id}</p>
                                <p key={`${servico.id}_tipo`}>Tipo: {servico.tipo}</p>
                                <p key={`${servico.id}_descricao`}>Tipo: {servico.descricao}</p>
                                <p key={`${servico.id}_preco`}>Tipo: {servico.preco}</p>
                                <p key={`${servico.id}_dataCriacao`}>DATA CRIAÇÃO: {servico.dataCriacao}</p>
                                
                                <ButtonGroup>
                                    <Button onClick={() => {
                                        setServico(key)
                                        setShow(true)
                                    }}>Editar</Button>
                                    <Button variant="danger" onClick={() => {
                                    }}>Excluir</Button>
                                </ButtonGroup>
                                
                            </div>
                        );
                    })
                }
            </div>
            <ServicoModal show={show} servicos={servicos} servico_key={servico} onHide={() => setShow(false)} handleClose={() => setShow(false)} />
        </div>
    )
}

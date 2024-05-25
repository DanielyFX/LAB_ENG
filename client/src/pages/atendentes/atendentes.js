import "../../css/atendentes/atendentes.css"
import {useLoaderData} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {Dropdown, InputGroup, ButtonGroup} from "react-bootstrap";
import AtendenteModal from "../../components/AtendenteModal";
import searchIcon from "../../css/Icons";

export default function Consultar_Atendentes() {

    let { atendentes } = useLoaderData();
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("nome");
    const [parametroOrd, setParametroOrd] = useState("nome");
    const [atendente, setAtendente] = useState(0);
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
                <Dropdown.Item as="button" onClick={() => funcao("dataCriacao")}>Data de Criacao</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("cpf")}>CPF</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("telefone")}>Telefone</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("celular")}>Telefone</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("email")}>Email</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("dataContrato")}>Data de Contrato</Dropdown.Item>
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
                <Form.Control  placeholder='Buscar...' onChange={e => setPesquisa(e.target.value)}/>
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
                    atendentes.filter((atendente) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in atendente) {
                                    if (atendente[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true
                                }
                                break;
                            case "_id":
                                return atendente.id.toLowerCase().includes(pesquisa.toLowerCase()) ? atendente : false
                            case "nome":
                                return atendente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? atendente : false
                            case "dataCriacao":
                                return atendente.dataCriacao.toLowerCase().includes(pesquisa.toLowerCase()) ? atendente : false
                            case "cpf":
                                return atendente.cpf.toLowerCase().includes(pesquisa.toLowerCase()) ? atendente : false
                            case "celular":
                                return atendente.celular.toLowerCase().includes(pesquisa.toLowerCase()) ? atendente : false
                            case "telefone":
                                return atendente.telefone.toLowerCase().includes(pesquisa.toLowerCase()) ? atendente : false
                            case "email":
                                return atendente.email.toLowerCase().includes(pesquisa.toLowerCase()) ? atendente : false
                            case "dataContrato":
                                return atendente.dataContrato.toLowerCase().includes(pesquisa.toLowerCase()) ? atendente : false
                            default:
                                return true;
                        }
                    }).sort((a,b) => {
                        switch (parametroOrd) {
                            case "nome":
                            case "email":
                                return sort_string(a[parametroOrd], b[parametroOrd]);
                            case "cpf":
                            case "_id":
                                return parseInt(a["cpf"]) - parseInt(b["cpf"]);
                            case "dataCriacao":
                                return new Date(a["dataCriacao"]) - new Date(b["dataCriacao"]);
                            case "dataContrato":
                                return new Date(a["dataContrato"]) - new Date(b["dataContrato"]);
                            default:
                                return true;
                        }
                    }).map((atendente, key) => {
                        return (
                            <div className="tecnico">
                                <p key={`${atendente.id}_nome`}>NOME: {atendente.nome}</p>
                                <p key={`${atendente.id}`}>ID: {atendente.id}</p>
                                <p key={`${atendente.id}_dataCriacao`}>DATA CRIAÇÃO: {atendente.dataCriacao}</p>
                                <p key={`${atendente.id}_cpf`}>CPF: {atendente.cpf}</p>
                                <p key={`${atendente.id}_dataContrato`}>DATA CONTRATO: {atendente.dataContrato}</p>
                                <p key={`${atendente.id}_email`}>EMAIL: {atendente.email}</p>
                                <p key={`${atendente.id}_telefone`}>TELEFONE: {atendente.telefone}</p>
                                <p key={`${atendente.id}_celular`}>CELULAR: {atendente.celular}</p>
                                
                                <ButtonGroup>
                                    <Button onClick={() => {
                                        setAtendente(key)
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
            <AtendenteModal show={show} atendentes={atendentes} atendente_key={atendente} onHide={() => setShow(false)} handleClose={() => setShow(false)}/>
        </div>
    )
}
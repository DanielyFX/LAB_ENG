import "../../css/tecnicos/tecnicos.css"
import {useLoaderData} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {ButtonGroup, Dropdown, InputGroup} from "react-bootstrap";
import TecnicoModal from "../../components/TecnicoModal";
import searchIcon from "../../css/Icons";

export default function Consultar_Tecnicos() {

    let { tecnicos } = useLoaderData();
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("nome");
    const [parametroOrd, setParametroOrd] = useState("nome");
    const [tecnico, setTecnico] = useState(0);
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
                    tecnicos.filter((tecnico) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in tecnico) {
                                    if (tecnico[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true
                                }
                                break;
                            case "_id":
                                return tecnico.id.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "nome":
                                return tecnico.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "dataCriacao":
                                return tecnico.dataCriacao.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "cpf":
                                return tecnico.cpf.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "telefone":
                                return tecnico.telefone.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "email":
                                return tecnico.email.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "dataContrato":
                                return tecnico.dataContrato.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
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
                    }).map((tecnico, key) => {
                        return (
                            <div className="tecnico">
                                <p key={`${tecnico.id}_nome`}>NOME: {tecnico.nome}</p><hr/>
                                <p key={`${tecnico.id}`}>ID: {tecnico.id}</p><hr/>
                                <p key={`${tecnico.id}_dataCriacao`}>DATA CRIAÇÃO: {tecnico.dataCriacao}</p><hr/>
                                <p key={`${tecnico.id}_cpf`}>CPF: {tecnico.cpf}</p><hr/>
                                <p key={`${tecnico.id}_dataContrato`}>DATA CONTRATO: {tecnico.dataContrato}</p><hr/>
                                <p key={`${tecnico.id}_email`}>EMAIL: {tecnico.email}</p><hr/>
                                <p key={`${tecnico.id}_telefone`}>TELEFONE: {tecnico.telefone}</p><hr/>
                                
                                <ButtonGroup>
                                    <Button onClick={() => {
                                        setTecnico(key)
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
            <TecnicoModal show={show} tecnicos={tecnicos} tecnico_key={tecnico} onHide={() => setShow(false)} handleClose={() => setShow(false)}/>
        </div>
    )
}
import "../../css/tecnicos/tecnicos.css"
import {useLoaderData} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {ButtonGroup, Dropdown, InputGroup} from "react-bootstrap";
import TecnicoModal from "../../components/TecnicoModal";
import searchIcon from "../../css/Icons";

export default function Consultar_Tecnicos() {

    let tecnicos = useLoaderData();
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
                {todos && <Dropdown.Item as="button" onClick={() => funcao("telefone")}>Telefone</Dropdown.Item>}
                {todos && <Dropdown.Item as="button" onClick={() => funcao("celular")}>Celular</Dropdown.Item>}
                <Dropdown.Item as="button" onClick={() => funcao("email")}>Email</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("dataContrato")}>Data de Contrato</Dropdown.Item>
            </Dropdown.Menu>
        )
    }

    const sort_string = (a, b) => {
        return a > b ? a === b ? 1 : 0 : -1;
    }

    const handleExcluir = (tecnico_id) => {
        fetch('http://localhost:3001/tecnicos/deletar', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({tecnico_id: tecnico_id})
        })
            .then((resultado) => resultado.json())
            .then((response) => {
                if (response.success) window.location.reload();
                else alert("Erro ao deletar Técnico");
            })
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
                {tecnicos.length > 0 &&
                    tecnicos.filter((tecnico) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in tecnico) {
                                    if (tecnico[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true
                                }
                                break;
                            case "_id":
                                return tecnico._id.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "nome":
                                return tecnico.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "dataCriacao":
                                return tecnico.dataCriacao.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "cpf":
                                return tecnico.cpf.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "telefone":
                                return tecnico.telefone.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "celular":
                                return tecnico.celular.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "email":
                                return tecnico.email.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            case "dataContrato":
                                return tecnico.dataContrato.toLowerCase().includes(pesquisa.toLowerCase()) ? tecnico : false
                            default:
                                return true;
                        }
                    }).map((tecnico, key) => {
                        return (
                            <div className="tecnico">
                                <p key={`${tecnico._id}_nome`}>NOME: {tecnico.nome}</p><hr/>
                                <p key={`${tecnico._id}`}>ID: {tecnico._id}</p><hr/>
                                <p key={`${tecnico._id}_dataCriacao`}>DATA CRIAÇÃO: {tecnico.dataCriacao}</p><hr/>
                                <p key={`${tecnico._id}_cpf`}>CPF: {tecnico.cpf}</p><hr/>
                                <p key={`${tecnico._id}_dataContrato`}>DATA CONTRATO: {tecnico.dataContrato}</p><hr/>
                                <p key={`${tecnico._id}_email`}>EMAIL: {tecnico.email}</p><hr/>
                                <p key={`${tecnico._id}_telefone`}>TELEFONE: {tecnico.telefone}</p><hr/>
                                <p key={`${tecnico._id}_celular`}>CELULAR: {tecnico.celular}</p><hr/>

                                <ButtonGroup>
                                    <Button onClick={() => {
                                        setTecnico(key)
                                        setShow(true)
                                    }}>Editar</Button>
                                    <Button variant="danger" onClick={() => {
                                        handleExcluir(tecnico._id)
                                    }}>Excluir</Button>
                                </ButtonGroup>
                            </div>
                        );
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
                    })
                }
            </div>
            {tecnicos.length > 0 &&
                <TecnicoModal show={show} tecnicos={tecnicos} tecnico_key={tecnico} onHide={() => setShow(false)}
                           handleClose={() => {
                               setShow(false)
                               window.location.reload()
                           }}/>
            }
        </div>
    )
}
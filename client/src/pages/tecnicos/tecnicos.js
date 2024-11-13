import "../../css/tecnicos/tecnicos.css"
import {useLoaderData, useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {ButtonGroup, Dropdown, InputGroup} from "react-bootstrap";
import TecnicoModal from "../../components/TecnicoModal";
import searchIcon from "../../css/Icons";

function TecnicoBox(props) {

    const [show, setShow] = useState(false);
    const { tecnico_modal } = props
    //console.log(tecnico_modal)

    const handleInativar = (tecnico_id) => {
        fetch('http://localhost:3001/inicio/tecnicos/inativar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({tecnico_id})
        })
            .then((resultado) => resultado.json())
            .then((response) => {
                if (response.success) window.location.reload();
                else alert("Erro ao inativar Técnico");
            })
    };

    return (
        <div className="tecnico">
            <p key={`${tecnico_modal._id}`}>ID: {tecnico_modal._id}</p>
            <hr/>
            <p key={`${tecnico_modal._id}_nome`}>NOME: {tecnico_modal.nome}</p>
            <hr/>
            <p key={`${tecnico_modal._id}_cpf`}>CPF: {tecnico_modal.cpf}</p>
            <hr/>
            <p key={`${tecnico_modal._id}_telefone`}>TELEFONE: {tecnico_modal.telefone}</p>
            <hr/>
            <p key={`${tecnico_modal._id}_celular`}>CELULAR: {tecnico_modal.celular}</p>
            <hr/>
            <p key={`${tecnico_modal._id}_email`}>EMAIL: {tecnico_modal.email}</p>
            <hr/>
            <p key={`${tecnico_modal._id}_dataContrato`}>DATA CONTRATO: {tecnico_modal.dataContrato}</p>
            <hr/>

            <ButtonGroup>
                <Button onClick={() => {
                    setShow(true)
                }}>Editar</Button>
                {tecnico_modal.bd_status !== "INATIVO" && (
                    <Button variant="danger" onClick={() => handleInativar(tecnico_modal._id)}>Inativar</Button>
                )}
            </ButtonGroup>

            <TecnicoModal show={show} tecnico_box={tecnico_modal} onHide={() => setShow(false)} handleClose={() => {setShow(false);}}/>
        </div>
    );
}


export default function Consultar_Tecnicos() {

    const tecnicos = useLoaderData();
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("nome");
    const [parametroOrd, setParametroOrd] = useState("nome");

    const dropdown = (dropdown) => {
        let funcao, todos = true;
        if (dropdown === "ord") {
            todos = false
            funcao = setParametroOrd;
        } else funcao = setParametro;
        return (
            <Dropdown.Menu>
                {todos && <Dropdown.Item as="button" onClick={() => funcao("todos")}>Todos os Campos</Dropdown.Item>}
                <Dropdown.Item as="button" onClick={() => funcao("_id")}>ID</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("nome")}>Nome</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("dataCriacao")}>Data de Criação</Dropdown.Item>
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
                {tecnicos.length > 0 && tecnicos
                    .filter((tecnico) => tecnico.bd_status !== "INATIVO")
                    .filter((tecnico) => {
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
                    }).map((tecnico) => {
                        return (
                            <TecnicoBox tecnico_modal={tecnico}/>
                        );
                    })
                }
            </div>
        </div>
    )
}
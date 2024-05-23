import "../../css/clientes/clientes.css"
import {useLoaderData} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {ButtonGroup, Dropdown, InputGroup} from "react-bootstrap";
import ClienteModal from "../../components/ClienteModal";
import searchIcon from "../../css/Icons";

export default function Consultar_Clientes() {

    let { clientes } = useLoaderData();
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("nome");
    const [parametroOrd, setParametroOrd] = useState("nome");
    const [cliente, setCliente] = useState(0);
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
                <Dropdown.Item as="button" onClick={() => funcao("documento")}>Documento</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("telefone")}>Telefone</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("celular")}>Telefone</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("email")}>Email</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("cep")}>CEP</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("rua")}>rua</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("numero")}>numero</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("bairro")}>bairro</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("cidade")}>cidade</Dropdown.Item>
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
                <Form.Control placeholder='Buscar...' onChange={e => setPesquisa(e.target.value)}/>
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
                    clientes.filter((cliente) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in cliente) {
                                    if (cliente[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true
                                }
                                break;
                            case "_id":
                                return cliente.id.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "nome":
                                return cliente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "dataCriacao":
                                return cliente.dataCriacao.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "documento":
                                return cliente.documento.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "celular":
                                return cliente.celular.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "telefone":
                                return cliente.telefone.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "email":
                                return cliente.email.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "cep":
                                return cliente.cep.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "rua":
                                return cliente.rua.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "numero":
                                return cliente.numero.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "bairro":
                                return cliente.bairro.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            case "cidade":
                                return cliente.cidade.toLowerCase().includes(pesquisa.toLowerCase()) ? cliente : false
                            default:
                                return true;
                        }
                    }).sort((a,b) => {
                        switch (parametroOrd) {
                            case "nome":
                            case "email":
                            case "documento":
                            case "_id":
                            case "rua":
                            case "bairro":
                            case "cidade":
                                return sort_string(a[parametroOrd], b[parametroOrd]);
                            case "cep":
                            case "numero":
                            case "telefone":
                            case "celular":
                                return parseInt(a["cpf"]) - parseInt(b["cpf"]);
                            case "dataCriacao":
                                return new Date(a["dataCriacao"]) - new Date(b["dataCriacao"]);
                            default:
                                return true;
                        }
                    }).map((cliente, key) => {
                        return (
                            <div className="tecnico">
                                <p key={`${cliente.id}_nome`}>NOME: {cliente.nome}</p>
                                <p key={`${cliente.id}`}>ID: {cliente.id}</p>
                                <p key={`${cliente.id}_dataCriacao`}>DATA CRIAÇÃO: {cliente.dataCriacao}</p>
                                <p key={`${cliente.id}_documento`}>DOCUMENTO: {cliente.documento}</p>
                                <p key={`${cliente.id}_email`}>EMAIL: {cliente.email}</p>
                                <p key={`${cliente.id}_telefone`}>TELEFONE: {cliente.telefone}</p>
                                <p key={`${cliente.id}_celular`}>CELULAR: {cliente.celular}</p>
                                <p key={`${cliente.id}_cep`}>CEP: {cliente.cep}</p>
                                <p key={`${cliente.id}_rua`}>RUA: {cliente.rua}</p>
                                <p key={`${cliente.id}_bairro`}>BAIRRO: {cliente.bairro}</p>
                                <p key={`${cliente.id}_numero`}>NUMERO: {cliente.numero}</p>
                                <p key={`${cliente.id}_cidade`}>CIDADE: {cliente.cidade}</p>
                                
                                <ButtonGroup>
                                    <Button onClick={() => {
                                        setCliente(key)
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
            <ClienteModal show={show} clientes={clientes} cliente_key={cliente} onHide={() => setShow(false)} handleClose={() => setShow(false)}/>
        </div>
    )
}

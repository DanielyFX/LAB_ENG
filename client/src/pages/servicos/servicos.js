import "../../css/servicos/cadservicos.css"
import { useLoaderData } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { ButtonGroup, Dropdown, InputGroup } from "react-bootstrap";
import ServicoModal from "../../components/ServicoModal";
import searchIcon from "../../css/Icons";

const ServicoBox = (props) => {
    const [show, setShow] = useState(false);
    const {servico} = props;

    const handleExcluir = (servico_id) => {
        fetch('http://localhost:3001/inicio/servicos/deletar', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({servico_id})
        })
        .then((resultado) => resultado.json())
        .then((response) => {
            if (response.success) window.location.reload();
            else alert("Erro ao deletar Serviço");
        })
    }
    return (
        <div className="tecnico">
            <p key={`${servico._id}_nome`}>NOME: {servico.nome}</p>
            <hr/>
            <p key={`${servico._id}`}>ID: {servico._id}</p>
            <hr/>
            <p key={`${servico._id}_tipo`}>Tipo: {servico.tipo}</p>
            <hr/>
            <p key={`${servico._id}_descricao`}>Descrição: {servico.descricao}</p>
            <hr/>
            <p key={`${servico._id}_preco`}>Preço: {servico.preco}</p>
            <hr/>
            <p key={`${servico._id}_dataCriacao`}>DATA CRIAÇÃO: {servico.dataCriacao}</p>
            <hr/>

            <ButtonGroup>
                <Button onClick={() => {
                    setShow(true)
                }}>Editar</Button>
                <Button variant="danger" onClick={() => {
                    handleExcluir(servico._id)
                }}>Excluir</Button>
            </ButtonGroup>
            <ServicoModal show={show} servico={servico} onHide={() => setShow(false)} handleClose={() => setShow(false)} />
        </div>
    );

}

export default function Consultar_Clientes() {

    let servicos = useLoaderData();
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
                {servicos.length > 0 &&
                    servicos.filter((servico) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in servico) {
                                    if (servico[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true
                                }
                                break;
                            case "_id":
                                return servico._id.toLowerCase().includes(pesquisa.toLowerCase()) ? servico : false
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
                    }).map((servico) => {
                        return (
                            <ServicoBox servico={servico}/>
                        );
                    })
                }
            </div>
        </div>
    )
}

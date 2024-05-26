// import "../../css/orcamento/orcamentos.css"
import {useLoaderData} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {Dropdown, InputGroup, ButtonGroup} from "react-bootstrap";
import OrcamentoModal from "../../components/OrcamentoModal";
import searchIcon from "../../css/Icons";

export default function Consultar_Tecnicos() {

    let { orcamentos } = useLoaderData();
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("nome");
    const [parametroOrd, setParametroOrd] = useState("nome");
    const [orcamento, setOrcamento] = useState(0);
    const [show, setShow] = useState(false);

    const dropdown = (ord_ou_pesquisa) => {
        let funcao, todos = true;
        if (ord_ou_pesquisa === "ordenacao") {
            todos = false
            funcao = setParametroOrd;
        } else funcao = setParametro;
        return (
            <Dropdown.Menu>
                {todos && <Dropdown.Item as="button" onClick={() => funcao("todos")}>Todos os Campos</Dropdown.Item>}
                <Dropdown.Item as="button" onClick={() => funcao("_id")}>id</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("tecnico")}>Tecnico</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("dataCriacao")}>Data de pedido</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("tipo")}>tipo de serviço</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("execucao")}>tempo de execução</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("garantia")}>garantia</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("endereco")}>endereco</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("situacao")}>situação</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("observacao")}>observação</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("desconto")}>desconto</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("preco")}>preço</Dropdown.Item>
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
                    {dropdown("pesquisa")}
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="info">
                        Filtro de Ordenação: {parametroOrd}
                    </Dropdown.Toggle>
                    {dropdown("ordenacao")}
                </Dropdown>
            </InputGroup>
            <div id="chamados-main">
                {
                    orcamentos.filter((orcamento) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in orcamento) {
                                    if (orcamento[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true
                                }
                                break;
                            case "_id":
                                return orcamento.id.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "descricao":
                                return orcamento.descricao.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "dataCriacao":
                                return orcamento.dataCriacao.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "tipo":
                                return orcamento.tipo.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "execucao":
                                return orcamento.execucao.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "garantia":
                                return orcamento.garantia.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "endereco":
                                return orcamento.endereco.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "situacao":
                                return orcamento.situacao.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "observacao":
                                return orcamento.observacao.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "desconto":
                                return orcamento.desconto.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "preco":
                                return orcamento.preco.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            default:
                                return true;
                        }
                    }).sort((a,b) => {
                        switch (parametroOrd) {
                            case "tecnico":
                            case "descricao":
                            case "tipo":
                            case "garantia":
                            case "execucao":
                            case "endereco":
                            case "situacao":
                            case "observacao":
                            case "desconto":
                                return sort_string(a[parametroOrd], b[parametroOrd]);
                            case "preco":
                                return parseFloat(a["preco"]) - parseFloat(b["preco"]);
                            case "dataCriacao":
                                return new Date(a["dataCriacao"]) - new Date(b["dataCriacao"]);
                            default:
                                return true;
                        }
                    }).map((orcamento, key) => {
                        return (
                            <div className="tecnico">
                                <p key={`${orcamento.id}`}>ID: {orcamento.id}</p><hr/>
                                <p key={`${orcamento.id}_tecnico`}>NOME: {orcamento.tecnico}</p><hr/>
                                <p key={`${orcamento.id}_descricao`}>NOME: {orcamento.descricao}</p><hr/>
                                <p key={`${orcamento.id}_tipo`}>NOME: {orcamento.tipo}</p><hr/>
                                <p key={`${orcamento.id}_execucao`}>NOME: {orcamento.execucao}</p><hr/>
                                <p key={`${orcamento.id}_garantia`}>NOME: {orcamento.garantia}</p><hr/>
                                <p key={`${orcamento.id}_dataCriacao`}>NOME: {orcamento.dataCriacao}</p><hr/>
                                <p key={`${orcamento.id}_endereco`}>NOME: {orcamento.endereco}</p><hr/>
                                <p key={`${orcamento.id}_situacao`}>NOME: {orcamento.situacao}</p><hr/>
                                <p key={`${orcamento.id}_observacao`}>NOME: {orcamento.observacao}</p><hr/>
                                <p key={`${orcamento.id}_desconto`}>NOME: {orcamento.desconto}</p><hr/>
                                <p key={`${orcamento.id}_preco`}>NOME: {orcamento.preco}</p><hr/>
                                
                                <ButtonGroup>
                                    <Button onClick={() => {
                                        setOrcamento(key)
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
            <OrcamentoModal show={show} orcamentos={orcamentos} orcamento_key={orcamento} onHide={() => setShow(false)} handleClose={() => setShow(false)}/>
        </div>
    )
}
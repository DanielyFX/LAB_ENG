// import "../../css/orcamento/orcamentos.css"
import {useLoaderData} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {Dropdown, InputGroup, ButtonGroup} from "react-bootstrap";
import OrcamentoModal from "../../components/OrcamentoModal";
import searchIcon from "../../css/Icons";

function OrcamentoBox(props) {
    const [show, setShow] = useState(false)
    const {orcamento, tecnicos, chamados, servicos} = props

    const handleExcluir = (orcamento_id) => {
        fetch('http://localhost:3001/orcamentos/deletar', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({orcamento_id})
        })
            .then((resultado) => resultado.json())
            .then((response) => {
                if (response.success) window.location.reload();
                else alert("Erro ao deletar Orçamento");
            })
    }

    return (
        <div className="tecnico">
            <p key={`${orcamento._id}`}>ID: {orcamento._id}</p><hr/>
            <p key={`${orcamento._id}_chamado`}>CHAMADO: {orcamento.chamado.descricao}</p><hr/>
            <p key={`${orcamento._id}_tecnicoo`}>TECNICO: {orcamento.tecnico.nome}</p><hr/>
            <p key={`${orcamento._id}_servico`}>SERVICO: {orcamento.servico.nome}</p><hr/>
            <p key={`${orcamento._id}_tempoExecucao`}>TEMPO EXECUÇÃO: {orcamento.tempoExecucao}</p><hr/>
            <p key={`${orcamento._id}_garantia`}>GARANTIA: {orcamento.garantia}</p><hr/>
            <p key={`${orcamento._id}_enderecoServico`}>ENDEREÇO: {orcamento.enderecoServico}</p><hr/>
            <p key={`${orcamento._id}_observacao`}>OBSERVAÇÃO: {orcamento.observacao}</p><hr/>
            <p key={`${orcamento._id}_situacaoOrcamento`}>SITUAÇÃO: {orcamento.situacao}</p><hr/>
            <p key={`${orcamento._id}_descontoServico`}>DESCONTO: {orcamento.descontoServico}</p><hr/>
            <p key={`${orcamento._id}_precoTotal`}>PREÇO TOTAL: {orcamento.precoTotal}</p><hr/>

            <ButtonGroup>
                <Button onClick={() => {setShow(true)}}>Editar</Button>
                <Button variant="danger" onClick={() => {handleExcluir(orcamento._id)}}>Excluir</Button>
            </ButtonGroup>
            <OrcamentoModal show={show}
                            orcamento={orcamento}
                            tecnicos={tecnicos}
                            chamados={chamados} servicos={servicos}
                            onHide={() => setShow(false)}
                            handleClose={() => setShow(false)}
            />
        </div>
    )

}

export default function Consultar_orcamento() {

    let {orcamentos, tecnicos, chamados, servicos} = useLoaderData();
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("nome");
    const [parametroOrd, setParametroOrd] = useState("nome");

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
                <Dropdown.Item as="button" onClick={() => funcao("chamado")}>chamado</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("tecnico")}>técnico</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("servico")}>serviço</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("tempoExecucao")}>tempo de execução</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("garantia")}>garantia</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("enderecoServico")}>endereço</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("observacao")}>observação</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("situacao")}>situação</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("descontoServico")}>desconto</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("precoTotal")}>preço</Dropdown.Item>
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
                                return orcamento._id.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "chamado":
                                return orcamento.chamado.descricao.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "tecnico":
                                return orcamento.tecnico.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "servico":
                                return orcamento.servico.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "tempoExecucao":
                                return orcamento.tempoExecucao.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "garantia":
                                return orcamento.garantia.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "enderecoServico":
                                return orcamento.enderecoServico.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "observacao":
                                return orcamento.observacao.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "situacao":
                                return orcamento.situacao.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "descontoServico":
                                return orcamento.descontoServico.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            case "precoTotal":
                                return orcamento.precoTotal.toLowerCase().includes(pesquisa.toLowerCase()) ? orcamento : false
                            default:
                                return true;
                        }
                    }).sort((a,b) => {
                        switch (parametroOrd) {
                            case "chamado":
                                return sort_string(a[parametroOrd].descricao, b[parametroOrd].descricao);
                            case "tecnico":
                            case "servico":
                                return sort_string(a[parametroOrd].nome, b[parametroOrd].nome);
                            case "_id":
                            case "tempoExecucao":
                            case "garantia":
                            case "enderecoServico":
                            case "observacao":
                            // case "situacao":
                            case "descontoServico":
                                return sort_string(a[parametroOrd], b[parametroOrd]);
                            case "precoTotal":
                                return parseFloat(a["preco"]) - parseFloat(b["preco"]);
                            case "dataCriacao":
                                return new Date(a["dataCriacao"]) - new Date(b["dataCriacao"]);
                            default:
                                return true;
                        }
                    }).map((orcamento) => {
                        return (
                            <OrcamentoBox orcamento={orcamento} tecnicos={tecnicos}
                                          chamados={chamados} servicos={servicos}/>
                        );
                    })
                }
            </div>
        </div>
    )
}
import "../../css/chamados/chamados.css"
import {useLoaderData} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {ButtonGroup, Dropdown, InputGroup} from "react-bootstrap";
import ChamadoModal from "../../components/ChamadoModal";
import searchIcon from "../../css/Icons";

function ChamadoBox(props) {
    const [show, setShow] = useState(false);
    const {chamado, clientes, atendentes, tecnicos} = props
    console.log("Chamado único", chamado);

    const handleExcluir = (chamado_id) => {
        fetch('http://localhost:3001/inicio/chamados/deletar', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({chamado_id})
        })
            .then((resultado) => resultado.json())
            .then((response) => {
                if (response.success) window.location.reload();
                else alert("Erro ao deletar Chamado");
            })
    };

    return (
        <div className="chamado">
            <p key={`${chamado._id}`}>ID: {chamado._id}</p><hr/>
            <p key={`${chamado._id}_cliente`}>CLIENTE: {chamado.cliente.nome}</p><hr/>
            <p key={`${chamado._id}_cliente`}>CPF/CNPJ: {chamado.cliente.documento}</p><hr/>
            <p key={`${chamado._id}_descricao`}>DESCRIÇÃO: {chamado.descricao}</p><hr/>
            <p key={`${chamado._id}_urgencia`}>PRIORIDADE: {chamado.prioridade}</p><hr/>
            <p key={`${chamado._id}_status`}>STATUS CHAMADO: {chamado.status}</p><hr/>
            <p key={`${chamado._id}_previsaoAtendimento`}>DATA PREVISTA: {chamado.previsao}</p><hr/>
            <p key={`${chamado._id}_dataCriacao`}>DATA CRIAÇÃO: {chamado.dataAbertura}</p><hr/>
            <p key={`${chamado._id}_atendente`}>ATENDENTE: {chamado.atendente.nome}</p><hr/>
            <p key={`${chamado._id}_tecnico`}>
            {chamado.tecnico && chamado.tecnico.nome ? `TECNICO: ${chamado.tecnico.nome}` : "TECNICO: Não atribuído"}
            </p><hr/>
            <ButtonGroup>
                <Button onClick={() => {
                    setShow(true)
                }}>Editar</Button>
                <Button variant="danger" onClick={() => {
                    handleExcluir(chamado._id)
                }}>Excluir</Button>
            </ButtonGroup>
            <ChamadoModal show={show} chamado={chamado} clientes={clientes} atendentes={atendentes} tecnicos={tecnicos} onHide={() => setShow(false)} handleClose={() => setShow(false)} />
        </div>
    );
}

export default function Consultar_Chamados(props) {


    const {chamados, atendentes, clientes, tecnicos} = useLoaderData();
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("chamado");
    const [parametroOrd, setParametroOrd] = useState("chamado");
    

    // console.log("chamados", chamados)
    // console.log("clientes", clientes)
    // console.log("atendentes", atendentes)

    const dropdown = (dropdown) => {
        let funcao, todos = true;
        if (dropdown === "ord") {
            todos = false
            funcao = setParametroOrd;
        } else funcao = setParametro;
        return (
            <Dropdown.Menu>
                {todos && <Dropdown.Item as="button" onClick={() => funcao("todos")}>Todos os campos</Dropdown.Item>}
                {todos && <Dropdown.Item as="button" onClick={() => funcao("_id")}>ID</Dropdown.Item>}
                <Dropdown.Item as="button" onClick={() => funcao("descricao")}>Descrição</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("prioridade")}>Prioridade</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("status")}>Status</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("orcamento")}>Orçamento</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("previsao")}>Previsão</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("dataAbertura")}>Data Criação</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("atendente")}>Atendente</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("cliente")}>Cliente</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => funcao("tecnico")}>Tecnico</Dropdown.Item>
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
                {chamados.length > 0 &&
                    chamados.filter((chamado) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in chamado) {
                                    if (chamado[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true
                                }
                                break;
                            case "_id":
                                return chamado._id.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "descricao":
                                return chamado.descricao.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "prioridade":
                                return chamado.prioridade.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "orcamento":
                                return chamado.orcamento.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "previsaoAtendimento":
                                return chamado.previsaoAtendimento.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "atendente":
                                return chamado.atendente.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "tecnico":
                                return chamado.tecnico.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "status":
                                return chamado.status.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "cliente":
                                return chamado.cliente.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            default:
                                return true;
                        }
                    }).sort((a,b) => {
                        switch (parametroOrd) {
                            case "descricao":
                            case "prioridade":
                            case "orcamento":
                            case "status":
                            case "atendente":
                            case "tecnico":
                            case "cliente":
                                sort_string(a[parametroOrd], b[parametroOrd]);
                                break;
                            case "_id":
                                return parseInt(a["_id"]) - parseInt(b["_id"])
                            case "dataCriacao":
                                return new Date(a["dataCriacao"]) - new Date(b["dataCriacao"]);
                            case "previsaoAtendimento":
                                return new Date(a["previsaoAtendimento"]) - new Date(b["previsaoAtendimento"]);
                            default:
                                return true;
                        }
                    }).map((chamado) => {
                        //console.log(chamado)
                        return (
                            <ChamadoBox chamado={chamado} clientes={clientes} atendentes={atendentes} tecnicos={tecnicos}/>
                        );
                    })
                }
            </div>
        </div>
    )
}
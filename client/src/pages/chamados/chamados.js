import "../../css/chamados/chamados.css"
import {useLoaderData} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState} from "react";
import {ButtonGroup, Dropdown, InputGroup} from "react-bootstrap";
import ChamadoModal from "../../components/ChamadoModal";
import searchIcon from "../../css/Icons";
import enums from "../../utils/enums.json";
import Alert from 'react-bootstrap/Alert';
import { 
    CadastroNacionalPessoaJuridica as CNPJ,
    CadastroPessoaFisica as CPF
} from "../validacao";

function ChamadoBox(props) {
    const [show, setShow] = useState(false);
    const {chamado, clientes, servicos, orcamento} = props //chamado, clientes, atendentes, tecnicos, servicos, orcamento
    const {setMsgAlert, setShowAlert, setTypeAlert} = props;

    //console.log("Chamado único", chamado);
    //console.log("Orçamento", orcamento);
    console.groupCollapsed('Chamado Box');
    console.group('Dados');
    for(let property in props){
        console.group(`${property}`);
        console.dir(props[property]);
        console.groupEnd(`${property}`);
    }
    console.groupEnd('Dados');

    const handleInativar = (chamado_id) => {
        fetch('http://localhost:3001/inicio/chamados/inativar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({chamado_id})
        })
        .then((resultado) => resultado.json())
        .then((response) => {
            if (response.success){
                if(setShowAlert && setMsgAlert && setTypeAlert){
                    setShowAlert(true);
                    setMsgAlert(`Chamado inativado com sucesso`);
                    setTypeAlert("success");
                }
                // console.log(`Resposta: ${response.success}`);
                setTimeout(() => {
                    window.location.reload();  
                }, 500);
            }else if(setShowAlert && setMsgAlert && setTypeAlert){
                setShowAlert(true);
                setMsgAlert(`Não foi possível inativar o chamado`);
                setTypeAlert("info");
            }
        })
        .catch((err) => {
            if(setShowAlert && setMsgAlert && setTypeAlert){
                setShowAlert(true);
                setTypeAlert('danger');
                if(err instanceof TypeError && err.message === "Failed to fetch")
                    setMsgAlert(`Erro: Verifique sua conexão com a internet (${err.message}).`);
                else
                    setMsgAlert(`Erro: ${err.message}`);
            }else{
                console.error(err);
            }
        });
    };

    console.groupEnd('Chamado Box');
    return (
        <div className="chamado">
            <p key={`${chamado._id}`}>ID: {chamado._id}</p><hr/>
            <p key={`${chamado._id}_cliente`}>CLIENTE: {chamado.cliente.nome}</p><hr/>
            <p key={`${chamado._id}_atendente`}>ATENDENTE: {chamado.atendente.nome}</p><hr/>
            <p key={`${chamado._id}_prioridade`}> PRIORIADE: {chamado.prioridade} </p><hr/>
            <p key={`${chamado._id}_tecnico`}>
            {chamado.tecnico && chamado.tecnico.nome ? `TECNICO: ${chamado.tecnico.nome}` : "TECNICO: Não atribuído"}
            </p><hr/>
            <p key={`${chamado._id}_enderecoServico`}>ENDEREÇO: {chamado.rua}, {chamado.numero}, {chamado.bairro}, {chamado.cidade}</p><hr/>
            <p key={`${chamado._id}_orcamento`}>ORÇAMENTO: {orcamento ? `${orcamento.situacao}` : enums.SituacaoEnum.nao_realizado}</p><hr/>
            {orcamento?.situacao === "REPROVADO" && (
                <>
                    <p 
                        key={`${chamado._id}_orcamento`} 
                        style={{
                            border: "1px solid black",
                            padding: "10px",
                            borderRadius: "5px",
                            margin: "10px 0",
                            color: "red"
                        }}
                    >
                        <strong>OBSERVAÇÃO DA REPROVAÇÃO:</strong> <p>{orcamento.observacao}</p>
                    </p>
                    <hr />
                </>
            )}
            <p key={`${chamado._id}_documento`}>{CPF.isFormatValid(chamado.cliente.documento)?`CPF: ${CPF.getFormated(chamado.cliente.documento)}`:`CNPJ: ${CNPJ.getFormated(chamado.cliente.documento)}`}</p><hr/>
            <p key={`${chamado._id}_descricao`}>DESCRIÇÃO: {chamado.descricao}</p><hr/>
            <p key={`${chamado._id}_urgencia`}>PRIORIDADE: {chamado.prioridade}</p><hr/>
            <p key={`${chamado._id}_status`}>STATUS CHAMADO: {chamado.status}</p><hr/>
            <p key={`${chamado._id}_servicos`}><strong>SERVIÇOS:</strong></p>
            <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
                {chamado.servicos.map((servico, index) => (
                    <li key={index} style={{ margin: "5px 0" }}>
                        <span>{servico.nome}</span> - <span>R${servico.preco.toFixed(2)}</span> {/* Formata o valor com duas casas decimais */}
                    </li>
                ))}
            </ul>
            <p><strong>Total de Serviços:</strong> R${chamado.servicos.reduce((total, servico) => total + servico.preco, 0).toFixed(2)}</p><hr/>
            <p><strong>Total de Despesas:</strong> R${orcamento?.despesas.reduce((total, item) => total + item.valor, 0).toFixed(2) || 0}</p><hr/>
            <p><strong>Valor de Desconto:</strong> R${parseFloat(orcamento?.descontoServico).toFixed(2) || 0}</p><hr/>
            <p><strong>Total chamado:</strong> R${parseFloat(orcamento?.precoTotal).toFixed(2) || 0}</p><hr/>
            <p key={`${chamado._id}_previsaoAtendimento`}>
                DATA PREVISTA: {new Date(chamado.previsao).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })}
            </p><hr/>
            <p key={`${chamado._id}_dataCriacao`}>
                DATA CRIAÇÃO: {new Date(chamado.dataAbertura).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                })}
            </p><hr/>
            <ButtonGroup>
                <Button onClick={() => {
                    setShow(true)
                }}>Editar</Button>
                {chamado.bd_status !== "INATIVO" && (
                    <Button variant="danger" onClick={() => handleInativar(chamado._id)}>Inativar</Button>
                )}
            </ButtonGroup>
            <ChamadoModal 
                show={show}
                chamado={chamado}
                clientes={clientes}
                servicos={servicos}
                orcamento={orcamento}
                onHide={() => setShow(false)} 
                handleClose={() => setShow(false)} 
                setMsgAlert={setMsgAlert} 
                setShowAlert={setShowAlert} 
                setTypeAlert={setTypeAlert}
            />

            
        </div>
    );
}

export default function ConsultarChamados(props) {

    const {chamados, clientes, servicos, orcamentos} = useLoaderData(); // chamados, clientes, atendentes, servicos, tecnicos, orcamentos
    const [pesquisa, setPesquisa] = useState("");
    const [parametro, setParametro] = useState("chamado");
    const [parametroOrd, setParametroOrd] = useState("chamado");

    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert] = useState('');
    const [typeAlert] = useState('');
    
    console.groupCollapsed('Chamado Consultar');
    console.group('Dados');
    for(let property in props){
        console.group(`${property}`);
        console.dir(props[property]);
        console.groupEnd(`${property}`);
    }
    console.groupEnd('Dados');
    // console.log("chamados", chamados)
    // console.log("clientes", clientes)
    // console.log("atendentes", atendentes)
    //console.log("Orcamentos", orcamentos);

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
    };

    // Função auxiliar para encontrar o orçamento relacionado ao chamado
    const getOrcamentoRelacionado = (chamado) => {
        return orcamentos?.find(orcamento => orcamento.chamado._id === chamado._id) || null;
    };


    const sort_string = (a, b) => {
        return a > b ? a === b ? 1 : 0 : -1;
    };
    console.groupEnd('Chamado Consultar');

    return (
        <div className="body-main">
            <Alert 
                variant={typeAlert} 
                show={showAlert} 
                onClose={() => setShowAlert(false)} 
                dismissible
            >
                <strong><p>{msgAlert}</p></strong>
            </Alert>
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
                {chamados.length > 0 && chamados
                    .filter((chamado) => chamado.bd_status !== "INATIVO")
                    .filter((chamado) => {
                        switch (parametro) {
                            case "todos":
                                for (let parametro in chamado) {
                                    if (chamado[parametro].toLowerCase().includes(pesquisa.toLowerCase())) return true
                                }
                                return false;
                            case "_id":
                                return chamado._id.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "descricao":
                                return chamado.descricao.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "prioridade":
                                return chamado.prioridade.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "orcamento":
                                const orcamentoRelacionadoStatus = getOrcamentoRelacionado(chamado).status || enums.SituacaoEnum.nao_realizado;
                                return orcamentoRelacionadoStatus.toLowerCase().includes(pesquisa.toLowerCase());  
                            case "previsaoAtendimento":
                                return chamado.previsaoAtendimento.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "atendente":
                                return chamado.atendente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "tecnico":
                                return chamado.tecnico.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "status":
                                return chamado.status.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
                            case "cliente":
                                return chamado.cliente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ? chamado : false
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
                                return sort_string(a[parametroOrd], b[parametroOrd]); //Retorna o resultado
                            case "_id":
                                return parseInt(a["_id"]) - parseInt(b["_id"])
                            case "dataCriacao":
                                return new Date(a["dataCriacao"]) - new Date(b["dataCriacao"]);
                            case "previsaoAtendimento":
                                return new Date(a["previsaoAtendimento"]) - new Date(b["previsaoAtendimento"]);
                            default:
                                return 0;
                        }
                    }).map((chamado) => {
                        //console.log(chamado)
                        const orcamentoRelacionado = getOrcamentoRelacionado(chamado);
                        //console.log("Chamado", chamado);
                        //console.log("Orçamento relacionado", orcamentoRelacionado);
                        return (
                            <ChamadoBox 
                            chamado={chamado} 
                            clientes={clientes} 
                            //atendentes={atendentes} 
                            //tecnicos={tecnicos}
                            servicos={servicos} 
                            orcamento={orcamentoRelacionado}/>
                        );
                    })
                }
            </div>
        </div>
    )
}
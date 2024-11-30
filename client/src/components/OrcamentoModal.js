import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState, useEffect, useCallback} from "react";
import enums from "../utils/enums.json";
import Table from "react-bootstrap/Table";

export default function OrcamentoModal(props) {

    const {orcamento, tecnicos, chamados, onHide} = props;
    const sort_str = (a, b) =>  a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    const chamados_alfabetico = chamados.sort((a,b) => a["descricao"] > b["descricao"] ? a["descricao"] === b["descricao"] ? 1 : 0 : -1)
    const tecnicos_alfabetico = tecnicos.sort(sort_str)

    //const [mensagem, setMensagem] = useState("");
    //const [sucesso, setSucesso] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(''); 

    const [chamado, setChamado] = useState(orcamento.chamado._id);
    const [tecnico, setTecnico] = useState(orcamento.tecnico._id);
    const [tempoExecucao, setTempoExecucao] = useState(orcamento.tempoExecucao);
    const [atendimento, setAtendimento] = useState(orcamento.chamado.atendimento);
    const [enderecoServico, setEnderecoServico] = useState(orcamento.enderecoServico);
    const [observacao, setObservacao] = useState(orcamento.observacao);
    const [descontoServico, setDescontoServico] = useState(orcamento.descontoServico);
    const [situacaoOrcamento, setSituacaoOrcamento] = useState(orcamento.situacao);
    const [precoTotalServicos, setPrecoTotalServicos] = useState(0);
    const [precoTotal, setPrecoTotal] = useState(orcamento.precoTotal);
    const [errors, setErrors] = useState({});

    const [statusOrcamentoOriginal] = useState(orcamento.situacao);

    const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);

    const [tipoDespesa, setTipoDespesa] = useState('');
    const [valorDespesa, setValorDespesa] = useState('');
    const [despesasSelecionadas, setDespesasSelecionadas] = useState(orcamento.despesas);

    const isBlocked = situacaoOrcamento === "APROVADO" || situacaoOrcamento === "REPROVADO";

    useEffect(() => {
        setChamado(orcamento.chamado._id);
        setTecnico(orcamento.tecnico._id);
        setTempoExecucao(orcamento.tempoExecucao);
        setAtendimento(orcamento.chamado.atendimento);
        setEnderecoServico(orcamento.enderecoServico);
        setObservacao(orcamento.observacao);
        setDescontoServico(orcamento.descontoServico);
        setSituacaoOrcamento(orcamento.situacao);
        setPrecoTotalServicos(0);
        setErrors({});
        setConfirmacaoAberta(false);
        setTipoDespesa('');
        setValorDespesa('');
        setDespesasSelecionadas(orcamento.despesas);

        //setMensagem("");
        //setSucesso(false);
        setShowToast(false);
        setToastMessage('');
      }, [orcamento, props.show]);
    
    useEffect(() => {
        calcularTotal();
      }, [descontoServico, despesasSelecionadas, precoTotalServicos]);

    useEffect(() => {
        let totalServicos = orcamento.chamado.servicos
            .reduce((total, servico) => total + parseFloat(servico.preco || 0), 0);
        setPrecoTotalServicos(totalServicos.toFixed(2));
            console.log("Preco total servicos", precoTotalServicos);
    }, [orcamento, precoTotalServicos, props.show]);

    //useEffect(() => {
    //    calcularTotal();
    //  }, [orcamento, props.show]);

    const validateFields = () => {
        const newErrors = {};

        // Validação para evitar valores negativos
        console.log("Preço total", precoTotal);
        console.log("Preço total dos serviços", precoTotalServicos);
        if (parseFloat(descontoServico) < 0) newErrors.descontoServico = "Desconto não pode ser negativo.";
        if (parseFloat(precoTotal) <= 0 || parseFloat(precoTotal) <= parseFloat(precoTotalServicos)) newErrors.precoTotal = "Preço total não pode ser  0 ou negativo e nem menor ou igual do que o custo base dos serviços.";
        if (parseFloat(despesasSelecionadas) < 0) newErrors.despesas = "Despesas não podem ser negativas.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Função para atualizar a situação do orçamento
    const handleAprovarOrcamento = () => {
        if (statusOrcamentoOriginal === enums.SituacaoEnum.realizado) {
            setSituacaoOrcamento(enums.SituacaoEnum.aprovado);
            //setMensagem("Situação do orçamento alterado para 'Aprovado' com sucesso.");
            setToastMessage("Situação do orçamento alterado para 'Aprovado' com sucesso.");
            //setSucesso(true);
        } else if (statusOrcamentoOriginal === enums.SituacaoEnum.reprovado) {
            //setMensagem("O orçamento foi reprovado! Não é possível aprova-lo após reprovação. Por favor criar outro orçamento para avaliação.");
            setToastMessage("Orçamento reprovado não pode ser alterado para aprovado!");
            //setSucesso(false);
        } else {
            //setMensagem("Este orçamento não pode ser alterado para outra situação.");
            setToastMessage("Este orçamento não pode ser alterado para outra situação.");
            //setSucesso(false);
        }
        setShowToast(true);
    };

    const handleDescontoChange = (e) => {
        const valor = parseFloat(e.target.value);
        if (valor >= 0 || e.target.value === "") { // Permite apenas valores não-negativos ou vazios
            setDescontoServico(e.target.value);
        } else {
            alert("O valor do desconto não pode ser negativo!");
        }
    };

    const handleAdicionarDespesa = () => {
        if (tipoDespesa && valorDespesa && parseFloat(valorDespesa) > 0) {
            const novaDespesa = {
                tipo: enums.DespesaEnum[tipoDespesa], // Mapeia a chave do enum para o valor exibível
                valor: parseFloat(valorDespesa),
            };
            setDespesasSelecionadas([...despesasSelecionadas, novaDespesa]);
            setTipoDespesa('');
            setValorDespesa('');
        } else if (tipoDespesa && !valorDespesa) {
            alert("Insira um valor para a despesa");
        } else if(!tipoDespesa && valorDespesa){
            alert("Insira o tipo da despesa");
        }else if(tipoDespesa && valorDespesa <= 0){
            alert("Insira um valor de despesa maior do que zero");
        }
    };

    const handleRemoverDespesa = (index) => {
        const novasDespesas = [...despesasSelecionadas];
        novasDespesas.splice(index, 1);
        setDespesasSelecionadas(novasDespesas);
    };

    const handleReprovarOrcamento = () => {
        if (statusOrcamentoOriginal === enums.SituacaoEnum.realizado) {
            setSituacaoOrcamento(enums.SituacaoEnum.reprovado);
            //setMensagem("Situação do orçamento alterado para 'Reprovado' com sucesso.");
            setToastMessage("Situação do orçamento alterado para 'Reprovado' com sucesso.");
            //setSucesso(true);
        } else if (statusOrcamentoOriginal === enums.SituacaoEnum.aprovado) {
            //setMensagem("O orçamento foi aprovado! Não é possível reprova-lo após aprovação. Por favor criar outro orçamento para avaliação.");
            setToastMessage("Orçamento aprovado não pode ser alterado para reprovado!");
            //setSucesso(false);
        } else {
            //setMensagem("Este orçamento não pode ser alterado para outra situação.");
            setToastMessage("Este orçamento não pode ser alterado para outra situação.");
            //setSucesso(false);
        }
        setShowToast(true);
    };
    
    const handleCancelarOrcamento = () => {
        if (orcamento.situacao !== enums.SituacaoEnum.cancelado) {
            setSituacaoOrcamento(enums.SituacaoEnum.cancelado);
            //setMensagem("Status alterado para 'Cancelado' com sucesso.");
            setToastMessage("Orçamento cancelado com sucesso!");
            //setSucesso(true);
        } else {
            //setMensagem("Este orçamento já está cancelado.");
            setToastMessage("Este orçamento já está cancelado.");
            //setSucesso(false);
        }
        setShowToast(true);
    };

    const calcularTotal = useCallback(() => {
        // 1. Calcula o total dos serviços
        const totalAtualServicos = precoTotalServicos;

        // 2. Aplica o desconto, caso exista
        const desconto = parseFloat(descontoServico) >= 0 ? parseFloat(descontoServico) : 0;
        const totalComDesconto = totalAtualServicos - desconto;
    
        // 3. Calcula o total das despesas adicionais
        const totalDespesas = despesasSelecionadas.reduce((acc, despesa) => acc + despesa.valor, 0);
    
        // 4. Calcula o preço total final
        const precoFinal = totalComDesconto + totalDespesas;
    
        // Define o preço total com duas casas decimais
        setPrecoTotal(precoFinal.toFixed(2));
    }, [descontoServico, despesasSelecionadas, precoTotalServicos]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        setConfirmacaoAberta(true);
    }

    const handleConfirmarAlteracoes = () => {
        if (!validateFields()){
            return;
        }

        const dados_novos = {
            "_id": orcamento._id,
            "chamado": chamado,
            "tecnico": tecnico,
            "tempoExecucao": tempoExecucao,
            "enderecoServico": enderecoServico,
            "observacao": observacao,
            "descontoServico": descontoServico,
            "precoTotal": precoTotal,
            "despesas": despesasSelecionadas,
            "situacao": situacaoOrcamento,
        };
    
        let alterados = [];
        for(let propriedade in dados_novos) {
            if (propriedade === 'chamado') {
                if (dados_novos.chamado !== orcamento.chamado._id) alterados.push(propriedade)
            } else if (propriedade === 'tecnico') {
                if (dados_novos.tecnico !== orcamento.tecnico._id) alterados.push(propriedade)
            } else if (orcamento[propriedade] !== dados_novos[propriedade]) alterados.push(propriedade)
        }
        let body = {
            alterados: alterados,
            dados_novos: dados_novos
        }
        console.log(body)
        fetch('http://localhost:3001/inicio/orcamentos/editar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            mode: 'cors'
        })
        .then((resultado) => resultado.json())
        .then((response) => {console.log(response)})
        setTimeout(() => {
            onHide()
        }, 500);
        setTimeout(() => {
            window.location.reload();
        }, 100);
        setConfirmacaoAberta(false);
        window.location.reload();
    };

    const cancelarAlteracoes = () => {
        setConfirmacaoAberta(false); // Fecha o modal sem salvar as alterações
        window.location.reload();
    };


    return (
        <>
            <Modal {...props} >
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar orçamento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {isBlocked && (
                            <p style={{ color: 'red', textAlign: 'center' }}>
                                Este orçamento está {situacaoOrcamento.toLowerCase()} e não pode ser editado.
                            </p>
                        )}
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Técnico Responsavel</Form.Label>
                            <Col sm={10}>
                                <Form.Control required as="select" onChange={e=> setTecnico(e.target.value)} value={tecnico} disabled={isBlocked}>
                                    {tecnicos_alfabetico.length > 0 ?
                                        <><option selected disabled >Selecione...</option>
                                            {tecnicos_alfabetico.map((tecnico) => {
                                                return (<option value={tecnico._id}>{tecnico.nome}</option>)
                                            })}</> :
                                        <option selected disabled>Não há nenhum técnico cadastrado.</option>
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Chamado</Form.Label>
                            <Col sm={10}>
                                <Form.Control required as="select" onChange={e=> setChamado(e.target.value)} value={chamado} disabled>
                                    {chamados_alfabetico.length > 0 ?
                                        <><option selected disabled >Selecione...</option>
                                            {chamados_alfabetico.map((chamado) => {
                                                return (<option value={chamado._id}>{chamado.descricao}</option>)
                                            })}</> :
                                        <option selected disabled>Não há nenhum chamado cadastrado.</option>
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Tempo Execução</Form.Label>
                            <Col sm={10}><Form.Control required type="text"
                                                       onChange={e => setTempoExecucao(e.target.value)}
                                                       value={tempoExecucao}
                                                       disabled
                                                       />
                                                    </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Atendimento</Form.Label>
                            <Col sm={10}><Form.Control required type="text"
                                                       onChange={e => setAtendimento(e.target.value)}
                                                       value={atendimento}
                                                       disabled/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Situação</Form.Label>
                            <Col sm={10}><Form.Control required type="text"
                                                       onChange={e => setSituacaoOrcamento(e.target.value)}
                                                       value={situacaoOrcamento}
                                                       disabled/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Endereço</Form.Label>
                            <Col sm={10}><Form.Control required type="text"
                                                       onChange={e => setEnderecoServico(e.target.value)}
                                                       value={enderecoServico}
                                                       disabled={isBlocked}
                                                       /></Col>
                                                       
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Observação</Form.Label>
                            <Col sm={10}><Form.Control required  as="textarea" rows={3}
                                                       onChange={e => setObservacao(e.target.value)}
                                                       value={observacao}
                                                       disabled={isBlocked}
                                                       /></Col>
                                                       
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Tipo de Despesa</Form.Label>
                <Col sm={8}>
                    <Form.Control as="select" value={tipoDespesa} onChange={(e) => setTipoDespesa(e.target.value)} disabled={isBlocked}>
                        <option value="">Selecione um tipo de despesa...</option> 
                        {Object.keys(enums.DespesaEnum).map((key) => (
                            <option key={key} value={key}>{enums.DespesaEnum[key]}</option>
                        ))}
                    </Form.Control>
                </Col>
                <Col sm={2}>
                    <Button onClick={handleAdicionarDespesa}>Adicionar</Button>
                </Col>
            </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Valor</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="Valor da despesa"
                            value={valorDespesa}
                            onChange={(e) => setValorDespesa(e.target.value)}
                            disabled={isBlocked}
                        />
                    </Col>
                </Form.Group>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tipo de Despesa</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {despesasSelecionadas.map((item, index) => (
                        <tr key={index}>
                            <td>{item.tipo}</td>
                            <td>R$ {item.valor.toFixed(2)}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleRemoverDespesa(index)}>Remover</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Desconto</Form.Label>
                    <Col sm={10}><Form.Control  type="number" min="0" placeholder="Valor do desconto"
                                               value={descontoServico} onChange={handleDescontoChange} disabled={isBlocked}/></Col>
                </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Preço Total</Form.Label>
                            <Col sm={10}><Form.Control required  type="number"
                                                       onChange={e => setPrecoTotal(e.target.value)}
                                                       value={precoTotal}
                                                       disabled
                                                       isInvalid={!!errors.precoTotal}
                                                       />
                                                       <Form.Control.Feedback type="invalid">
                                                            {errors.precoTotal}
                                                       </Form.Control.Feedback>
                                                    </Col>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        {orcamento.situacao !== "CANCELADO" && (
                            <Button variant="secondary" onClick={handleCancelarOrcamento}>Cancelar</Button>
                        )}
                        <Button variant="primary" type='submit'>Salvar</Button>
                        {/* Botão para aprovar o orçamento */}
                        {orcamento.situacao === "REALIZADO" && (
                                <Button variant="info" onClick={handleAprovarOrcamento}>Aprovar</Button>)}
                        {orcamento.situacao === "REALIZADO" && (
                                <Button variant="danger" onClick={handleReprovarOrcamento}>Reprovar</Button>)}
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* Modal de confirmação */}
                <Modal show={confirmacaoAberta} onHide={cancelarAlteracoes}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Alterações</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tem certeza que deseja salvar as alterações?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelarAlteracoes}>Cancelar</Button>
                    <Button variant="primary" onClick={handleConfirmarAlteracoes}>Confirmar</Button>
                </Modal.Footer>
            </Modal>
            {/* Toast de feedback */}
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000} // O toast ficará visível por 3 segundos
                autohide
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)', // Centraliza o toast
                    zIndex: 1060,
                    color: 'blue'
                }}
            >
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </>
    );
}
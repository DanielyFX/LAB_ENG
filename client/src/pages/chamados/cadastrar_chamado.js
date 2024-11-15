import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'
import { ButtonGroup } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { Validar } from '../validacao';
import ToggleButton  from "react-bootstrap/ToggleButton";


export default function Cadastrar_chamado() {

    const {clientes, atendentes} = useLoaderData()
    // console.log(atendentes);
    // console.log(clientes);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const smallWindow = 576;
    
    useEffect(() => {
        const handleResizeWindow = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => window.removeEventListener("resize", handleResizeWindow);
    }, []);

    
    
    const atendentes_alfabetico = atendentes.sort((a, b) => {
        return a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    })

    const radiosPrioridade = [
        {name: 'Baixa', value: 'Baixa', variant: 'primary'},
        {name: 'Média', value: 'Média', variant: 'warning'},
        {name: 'Alta', value: 'Alta', variant: 'danger'}
    ]
    
    const radiosChamado = [
        {name: 'Aberto', value: 'Aberto', disabled: false, variant: 'primary'},
        {name: 'Em análise', value: 'Em análise', disabled: false, variant: 'warning'},
        {name: 'Em Progresso', value: 'Em Progresso', disabled: false, variant: 'warning'},
        {name: 'Concluído', value: 'Concluído', disabled: false, variant: 'success'},
        {name: 'Cancelado', value: 'Cancelado', disabled: false, variant: 'danger'}
   ]

    const radiosOrcamento = [
        {name: 'Pendente', value: 'Pendente', disabled: false, variant: 'primary'},
        {name: 'Realizado', value: 'Realizado', disabled: false, variant: 'warning'},
        {name: 'Aprovado', value: 'Aprovado', disabled: false, variant: 'success'},
        {name: 'Cancelado', value: 'Cancelado', disabled: false, variant: 'danger'}
    ]

    const [documento, setDocumento] = useState('');
    const [clienteCampo, setClienteCampo] = useState('');
    const [clienteObj, setClienteObj] = useState();
    const [atendente, setAtendente] = useState('Selecione...');

    const [descricao, setDescricao] = useState('');
    const [descricaoError, setDescricaoError] = useState('');
    const [previsaoAtendimento, setPrevisaoAtendimento] = useState('');
    const [previsaoAtendimentoError, setPrevisaoAtendimentoError] = useState('');

    const [statusPrioridade, setStatusPrioridade] = useState('Baixa');
    const [statusChamado, setStatusChamado] = useState('Aberto');
    const [statusOrcamento, setStatusOrcamento] = useState('Pendente');
    
    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');
    
    const [cpfChecked, setCPFChecked] = useState(false);
    const [documentoError, setDocumentoError] = useState('');
    
    function handleStatusOrcamentoOnChage(status){
        let callStatus = { 
            Open: 'Aberto',
            Analyzing: 'Em análise',
            InProgress:  'Em Progresso',
            Concluded: 'Concluído',
            Canceled:  'Cancelado'
        };

        let budgetStatus = {
            Pending: 'Pendente',
            Done: 'Realizado',
            Approved: 'Aprovado',
            Canceled: 'Cancelado'
        };

        switch(status){
            case budgetStatus.Pending:
                for(let option of radiosChamado){
                    if(option.value === callStatus.Concluded)
                        option.disabled = true;
                    else
                        option.disabled = false;
                }
                setStatusChamado(statusChamado);
                break;

            case budgetStatus.Done:
                for(let option of radiosChamado){
                    if(option.value === callStatus.InProgress || option.value === callStatus.Canceled)
                        option.disabled = false;
                    else
                        option.disabled = true;
                }
                setStatusChamado(callStatus.InProgress);
                break;

            case budgetStatus.Approved:
                for(let option of radiosChamado){
                    if(option.value === callStatus.Open || option.value === callStatus.Analyzing)
                        option.disabled = true;
                    else
                        option.disabled = false;
                }
                setStatusChamado(callStatus.InProgress);
                break;

            case budgetStatus.Canceled:
                for(let option of radiosChamado){
                    if(option.value === callStatus.Canceled)
                        option.disabled = false;
                    else
                        option.disabled = true;
                }
                setStatusChamado(callStatus.Canceled);
                break;
            }
    }

    function handleStatusChamadoOnChage(status){
        let callStatus = { 
            Open: 'Aberto',
            Analyzing: 'Em análise',
            InProgress:  'Em Progresso',
            Concluded: 'Concluído',
            Canceled:  'Cancelado'
        };

        let budgetStatus = {
            Pending: 'Pendente',
            Done: 'Realizado',
            Approved: 'Aprovado',
            Canceled: 'Cancelado'
        }
        
        switch(status){
            case callStatus.Open:
            case callStatus.Analyzing:
                for(let option of radiosOrcamento){
                    if(option.value === budgetStatus.Pending || option.value === budgetStatus.Canceled)
                        option.disabled = false;
                    else
                        option.disabled = true;
                }
                setStatusOrcamento(statusOrcamento);
                break;
            
            case callStatus.InProgress:
            case callStatus.Canceled:
                for(let option of radiosOrcamento){
                    option.disabled = false;
                }
                setStatusOrcamento(statusOrcamento);
                break;
                
            case callStatus.Concluded:
                for(let option of radiosOrcamento){
                    if(option.value === budgetStatus.Done)
                        option.disabled = false;
                    else
                        option.disabled = true;
                }
                setStatusOrcamento(budgetStatus.Approved);
                break;
        }
        setStatusChamado(status);
    }

    useEffect(() =>{
        handleStatusOrcamentoOnChage(statusOrcamento);
    }, [statusOrcamento])
    
    useEffect(() =>{
        handleStatusChamadoOnChage(statusChamado);
    }, [statusChamado])

    const handleSelectedDocument = () => {
        setCPFChecked(!cpfChecked);
        document.getElementById("document").value = "";
        document.getElementById("document").focus();
    }
    
    const handleDocumento = () => {
        let cliente_pesquisa = clientes.find(cliente => cliente.documento === documento)
        if (cliente_pesquisa === undefined) {
            setClienteCampo("Cliente não encontrado");
            setDocumentoError("Cliente não encontrado");
        }
        else {
            setClienteObj(cliente_pesquisa)
            setClienteCampo(cliente_pesquisa.nome)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dados = {
            "descricao": descricao,
            "prioridade": statusPrioridade,
            "orcamento": statusOrcamento,
            "previsaoAtendimento": previsaoAtendimento,
            "atendente": atendente,
            "status": statusChamado,
            "cliente": clienteObj._id
        }
        fetch('http://localhost:3001/inicio/chamados/novo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
            mode: 'cors'
        })
        .then((resultado) => resultado.json())
        .then((response) => {
            if(response.success) {
                setShowAlert(true);
                setMsgAlert("Chamado cadastrado com sucesso!");
                setTypeAlert("success");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setShowAlert(true);
                setMsgAlert("Erro ao cadastrar o chamado!");
                setTypeAlert("warning");
            }
        })
        .catch((err) =>{
            setShowAlert(true);
            setTypeAlert("danger");
            if(err instanceof TypeError && err.message === "Failed to fetch")
                setMsgAlert(`Erro: Verifique sua conexão com a internet (${err.message}).`);
            else
                setMsgAlert(`Erro: ${err.message}`);
        })
    }


    return (
        <div id="cadchamado-main">
            <Alert 
                variant={typeAlert} 
                show={showAlert} 
                onClose={() => setShowAlert(false)} 
                dismissible
            >
                <strong><p>{msgAlert}</p></strong>
            </Alert>
            <Form id="cadchamado-form" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="auto" md={2}  xxl={1} className="g-1">
                        Cliente
                        <ButtonGroup>
                            <ToggleButton
                                type="radio" 
                                size="sm" 
                                variant={cpfChecked?"primary":"secundary"} 
                                checked={cpfChecked} 
                                onClick={() => handleSelectedDocument()}
                            >
                                CPF
                            </ToggleButton>
                            <ToggleButton
                                type="radio"
                                size="sm" 
                                variant={!cpfChecked?"primary":"secundary"} 
                                checked={!cpfChecked}
                                onClick={() => handleSelectedDocument()}
                            >
                                CNPJ
                            </ToggleButton>
                        </ButtonGroup>
                    </Form.Label>  
                    {/*busca cpf do cliente, caso não encontre deve mostrar uma mensagem de não encontrado cliente */}
                    <Col sm="auto" md={4} >
                    <Form.Control 
                            required 
                            id="document" 
                            type="text" 
                            maxLength={cpfChecked ? Validar.CPF.maxLength : Validar.CNPJ.maxLength}
                            isInvalid={documentoError}
                            placeholder={cpfChecked ? "000.000.000-00" : "00.000.000/0000-00"} 
                            onChange={handleDocumento} 
                            onBlur={cpfChecked ? (e) => Validar.CPF.handleOnChange(e.target.value, setDocumento, setDocumentoError) : (e) => Validar.CNPJ.handleOnChange(e.target.value, setDocumento, setDocumentoError)} 
                            onKeyDown={cpfChecked?(e) => Validar.CPF.handleKeyDown(e) : (e) => Validar.CNPJ.handleKeyDown(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {documentoError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Cliente</Form.Label>  {/*Deve trazer o cliente pesquisado pelo cpf  */}
                    <Col sm={10} lg={8}>
                        <Form.Control 
                            required
                            type="text"
                            rows={3}
                            value={clienteCampo}
                            disabled
                        />
                        <Form.Control.Feedback type="invalid">
                            {documentoError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Descrição Chamado</Form.Label>
                    <Col sm={10} lg={8} >
                        <Form.Control
                            required
                            as="textarea"
                            rows={3}
                            isInvalid={descricaoError} 
                            onChange={(e) => Validar.NonEmptyField.handleOnChange(e.target.value, setDescricao, setDescricaoError)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {descricaoError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Prioridade</Form.Label>
                    <Col sm="auto" md={2}>
                        <ButtonGroup sm="auto" md={4}>
                            {radiosPrioridade.map((radio, index) => (
                                <ToggleButton
                                    key={index} 
                                    id={`radioPrioridade-${index}`} 
                                    type="radio" 
                                    name="radioPrioridade"
                                    variant={statusPrioridade === radio.value ? radio.variant : "secondary"}  
                                    value={radio.value} 
                                    checked={statusPrioridade === radio.value} 
                                    onChange={(e) => setStatusPrioridade(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Previsão de Atendimento</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            id="dataPrevisao" 
                            required
                            type="datetime-local" 
                            min={Validar.Data.TodayHTMLDatetimeLocalFormat} 
                            isInvalid={previsaoAtendimentoError} 
                            onChange={e=> Validar.DataPrevisaoAtendimento.handleOnChange(e.target.value, setPrevisaoAtendimento, setPrevisaoAtendimentoError)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {previsaoAtendimentoError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Atendente</Form.Label> {/*Deve trazer todos os atendentes cadastrados, em ordem alfabetica  */}
                    <Col sm={10} lg={8}>
                        <Form.Control 
                            required 
                            as="select" 
                            onChange={e=> setAtendente(e.target.value)} 
                            value={atendente}>
                            {
                                atendentes_alfabetico.length > 0 ?
                                <>
                                    <option disabled >Selecione...</option>
                                    {atendentes_alfabetico.map((atendente) => {
                                    return (<option key={atendente._id} value={atendente._id}>{atendente.nome}</option>)
                                    })}
                                </> :
                                <option disabled>Não há nenhum atendente cadastrado.</option>
                            }
                        </Form.Control>
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Status Orçamento</Form.Label>
                    <Col sm="auto">
                        <ButtonGroup vertical={windowWidth <= smallWindow}>
                            {radiosOrcamento.map((radio, index) => (
                                <ToggleButton
                                    key={index} 
                                    id={`radioOrcamento-${index}`} 
                                    type="radio" 
                                    name="radioOrcamento"
                                    disabled={radio.disabled} 
                                    variant={statusOrcamento === radio.value ? radio.variant : "secondary"}  
                                    value={radio.value} 
                                    checked={statusOrcamento === radio.value} 
                                    onChange={(e) => setStatusOrcamento(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Status Chamado</Form.Label>
                    <Col >
                        <ButtonGroup vertical={windowWidth <= smallWindow}>
                            {radiosChamado.map((radio, index) => (
                                <ToggleButton
                                    key={index} 
                                    id={`radioChamado-${index}`} 
                                    type="radio" 
                                    name="radioChamado" 
                                    disabled={radio.disabled}  
                                    variant={statusChamado === radio.value ? radio.variant : "secondary"}  
                                    value={radio.value} 
                                    checked={statusChamado === radio.value} 
                                    onChange={(e) => setStatusChamado(e.currentTarget.value)}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Col>
                </Form.Group>
                
                <ButtonGroup>
                    <Button variant="primary" type="submit">Cadastrar</Button>
                    <Button variant="secondary" href="/inicio">Cancelar</Button>
                </ButtonGroup>
                
            </Form>
        </div>
    )
}
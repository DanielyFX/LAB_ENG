import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'
import { ButtonGroup } from "react-bootstrap";
import {useState} from "react";
import {useLoaderData} from "react-router-dom";

export default function Cadastrar_chamado() {

    const {clientes, atendentes} = useLoaderData()
    console.log(atendentes)

    const atendentes_alfabetico = atendentes.sort((a, b) => {
        return a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    })

    const [documento, setDocumento] = useState('');
    const [clienteCampo, setClienteCampo] = useState('');
    const [clienteObj, setClienteObj] = useState();
    const [atendente, setAtendente] = useState('Selecione...');

    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('Selecione...');
    const [orcamento, setOrcamento] = useState('Selecione...');
    const [status, setStatus] = useState('Selecione...');
    const [previsaoAtendimento, setPrevisaoAtendimento] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const dados = {
            "descricao": descricao,
            "prioridade": prioridade,
            "orcamento": orcamento,
            "previsaoAtendimento": previsaoAtendimento,
            "atendente": atendente,
            "status": status,
            "cliente": clienteObj._id
        }
        fetch('http://localhost:3001/chamados/novo', {
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
                alert("Chamado cadastrado com sucesso!")
                window.location.reload()
            } else {
                alert("Erro ao cadastrar o chamado!")
            }
        })
    }

    const handleDocumento = () => {
        let cliente_pesquisa = clientes.find(cliente => cliente.documento === documento)
        if (cliente_pesquisa === undefined) setClienteCampo("Cliente não encontrado")
        else {
            setClienteObj(cliente_pesquisa)
            setClienteCampo(cliente_pesquisa.nome)
        }
    };

    return (
        <div id="cadchamado-main">
            <Form id="cadchamado-form" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CPF/CNPJ Cliente</Form.Label>  {/*busca cpf do cliente, caso não encontre deve mostrar uma mensagem de não encontrado cliente */}
                    <Col sm={10}><Form.Control required placeholder="Ex.: 000.000.000-00 ou 00.000.000/0000-00" maxLength={18} type="text" rows={3}
                                               onChange={e=> setDocumento(e.target.value)} onBlur={handleDocumento}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Cliente</Form.Label>  {/*Deve trazer o cliente pesquisado pelo cpf  */}
                    <Col sm={10}><Form.Control required type="text" rows={3} value={clienteCampo} disabled/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Descrição Chamado</Form.Label>
                    <Col sm={10}><Form.Control required  as="textarea" rows={3}
                                               onChange={e=> setDescricao(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Prioridade</Form.Label>
                    <Col sm={10} >
                        <Form.Control as="select" onChange={e=> setPrioridade(e.target.value)} value={prioridade}>
                            <option selected disabled >Selecione...</option>
                            <option value="baixa">Baixa</option>
                            <option value="média">Média</option>
                            <option value="alta">Alta</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Previsão de Atendimento</Form.Label>
                    <Col sm={10}><Form.Control required type="datetime-local" onChange={e=> setPrevisaoAtendimento(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Atendente</Form.Label> {/*Deve trazer todos os atendentes cadastrados, em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control required as="select" onChange={e=> setAtendente(e.target.value)} value={atendente}>
                            {atendentes_alfabetico.length > 0 ?
                                <><option selected disabled >Selecione...</option>
                                {atendentes_alfabetico.map((atendente) => {
                                    return (<option value={atendente._id}>{atendente.nome}</option>)
                                })}</> :
                                <option selected disabled>Não há nenhum atendente cadastrado.</option>
                            }
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Orçamento</Form.Label> 
                    <Col sm={10}>
                        <Form.Control as="select" onChange={e=> setOrcamento(e.target.value)} value={orcamento}>
                            <option selected disabled >Selecione...</option> 
                            <option value="nao_iniciado">Não iniciado</option>
                            <option value="realizado">Realizado</option>
                            <option value="aprovado">Aprovado</option>
                            <option value="cancelado">Cancelado</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Status Chamado</Form.Label> 
                    <Col sm={10}>
                        <Form.Control as="select" onChange={e=> setStatus(e.target.value)} value={status}>
                            <option selected disabled >Selecione...</option> 
                            <option value="nao_iniciado">Não iniciado</option>
                            <option value="analise">Em análise</option>
                            <option value="progresso">Em progresso</option>
                            <option value="concluido">Concluído</option>
                            <option value="cancelado">Cancelado</option>
                        </Form.Control>
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
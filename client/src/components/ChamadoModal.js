import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";

function ChamadoModal(props) {

    const {handleClose, chamado, clientes, atendentes, onHide} = props;
    const atendentes_alfabetico = atendentes.sort((a, b) => {
        return a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    })

    const [documento, setDocumento] = useState(chamado.cliente.documento);
    const [clienteCampo, setClienteCampo] = useState(chamado.cliente.nome);
    const [clienteObj, setClienteObj] = useState(chamado.cliente._id);
    const [atendente, setAtendente] = useState(chamado.atendente._id);

    const [descricao, setDescricao] = useState(chamado.descricao);
    const [prioridade, setPrioridade] = useState(chamado.prioridade);
    const [orcamento, setOrcamento] = useState(chamado.orcamento);
    const [status, setStatus] = useState(chamado.status);
    const [previsaoAtendimento, setPrevisaoAtendimento] = useState(chamado.previsaoAtendimento);

    const handleDocumento = () => {
        let cliente_pesquisa = clientes.find(cliente => cliente.documento === documento)
        if (cliente_pesquisa === undefined) setClienteCampo("Cliente não encontrado")
        else {
            setClienteObj(cliente_pesquisa._id)
            setClienteCampo(cliente_pesquisa.nome)
        }
    };

    let dados_novos = {
        "_id": chamado._id,
        "descricao": descricao,
        "prioridade": prioridade,
        "orcamento": orcamento,
        "previsaoAtendimento": previsaoAtendimento,
        "atendente": atendente,
        "status": status,
        "cliente": clienteObj
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let alterados = [];

        for(let propriedade in dados_novos) {
            if(propriedade === "atendente")
                if (chamado.atendente._id !== dados_novos.atendente) alterados.push(propriedade)
            else if (propriedade === "cliente")
                if (chamado.cliente._id !== dados_novos.cliente) alterados.push(propriedade)
            else if (chamado[propriedade] !== dados_novos[propriedade])
                alterados.push(propriedade)
        }
        let body = {
                alterados: alterados,
                dados_novos: dados_novos
        }
        fetch('http://localhost:3001/chamados/editar', {
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
    }

    return (
        <>
            {chamado &&
                <Modal {...props} >
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Chamado</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>CPF/CNPJ Cliente</Form.Label>  {/*busca cpf do cliente, caso não encontre deve mostrar uma mensagem de não encontrado cliente */}
                                <Col sm={10}><Form.Control required placeholder="Ex.: 000.000.000-00 ou 00.000.000/0000-00" maxLength={18} type="text" rows={3}
                                                           onChange={e=> setDocumento(e.target.value)}
                                                           onBlur={handleDocumento} defaultValue={documento}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Cliente</Form.Label>  {/*Deve trazer o cliente pesquisado pelo cpf  */}
                                <Col sm={10}><Form.Control required type="text" rows={3} value={clienteCampo} disabled/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Descrição Chamado</Form.Label>
                                <Col sm={10}><Form.Control required  as="textarea" rows={3}
                                                           onChange={e=> setDescricao(e.target.value)}
                                                           defaultValue={descricao}/></Col>
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
                                <Col sm={10}><Form.Control required type="date"
                                                           onChange={e=> setPrevisaoAtendimento(e.target.value)}
                                                           defaultValue={new Date(previsaoAtendimento).toISOString().substring(0,10)}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Atendente</Form.Label>
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
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                            <Button variant="primary" type='submit'>Salvar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            }
        </>
    );
}

export default ChamadoModal;
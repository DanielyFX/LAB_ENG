import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState, useEffect} from "react";
import enums from "../utils/enums.json";
import Alert from 'react-bootstrap/Alert';

function ChamadoModal(props) {

    const {handleClose, chamado, clientes, atendentes, onHide} = props;
    const atendentes_alfabetico = atendentes.sort((a, b) => {
        return a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    })

    const [documento, setDocumento] = useState(chamado.cliente.documento);
    const [clienteCampo, setClienteCampo] = useState(chamado.cliente.nome);
    const [clienteObj, setClienteObj] = useState(chamado.cliente._id);
    const [atendente, setAtendente] = useState(chamado.atendente._id);

    const [mensagem, setMensagem] = useState("");
    const [sucesso, setSucesso] = useState(false); 

    const [descricao, setDescricao] = useState(chamado.descricao);
    const [prioridade, setPrioridade] = useState(chamado.prioridade);
    const [statusChamado, setStatusChamado] = useState(chamado.status); 
    const [previsaoAtendimento, setPrevisaoAtendimento] = useState(chamado.previsao);

    const handleDocumento = () => {
        let cliente_pesquisa = clientes.find(cliente => cliente.documento === documento)
        if (cliente_pesquisa === undefined) setClienteCampo("Cliente não encontrado")
        else {
            setClienteObj(cliente_pesquisa._id)
            setClienteCampo(cliente_pesquisa.nome)
        }
    };

    const handleCancelarChamado = () => {
        if (chamado.status !== enums.StatusChamadoEnum.cancelado) {
            setStatusChamado(enums.StatusChamadoEnum.cancelado);
            setMensagem("Status alterado para 'Cancelado' com sucesso.");
            setSucesso(true);
        } else {
            setMensagem("Este chamado já está cancelado.");
            setSucesso(false);
        }
    };
   // Função para atualizar o status do chamado
   const handleAceitarChamado = () => {
        if (statusChamado === enums.StatusChamadoEnum.nao_iniciado) {
            setStatusChamado(enums.StatusChamadoEnum.em_analise);
            setMensagem("Status alterado para 'Em Análise' com sucesso.");
            setSucesso(true);
        } else if (statusChamado === enums.StatusChamadoEnum.em_analise) {
            setMensagem("O orçamento ainda não foi feito e aceito. Não é possível avançar.");
            setSucesso(false);
        } else {
            setMensagem("Este chamado não pode ser alterado para outro status.");
            setSucesso(false);
        }
    };
    
    useEffect(() => {
        // Define a data e hora atuais no formato necessário para `datetime-local`
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 16); // Retorna 'YYYY-MM-DDTHH:MM' no fuso horário local
        
        if (prioridade && prioridade !== 'Selecione...') {
            setPrevisaoAtendimento(calcularPrevisaoAtendimento(prioridade));
        } else {
            setPrevisaoAtendimento('');
        }
    }, [prioridade]); // Adiciona a prioridade como dependência

    const calcularPrevisaoAtendimento = (prioridade) => {
        const hoje = new Date(); // Data atual
        let diasParaAdicionar = 0;

        switch (prioridade){
            case "alta":
                diasParaAdicionar = 20;
                break;
            case "media":
                diasParaAdicionar = 12;
                break;
            case "baixa": 
                diasParaAdicionar = 7;
                break;
            default:
                return '';
        }
        hoje.setDate(hoje.getDate() + diasParaAdicionar);
        return hoje.toISOString().slice(0, 10); // Retorna a nova data no formato 'YYYY-MM-DD'
        
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        let dados_novos = {
            "_id": chamado._id,
            "descricao": descricao,
            "prioridade": prioridade,
            "previsao": previsaoAtendimento,
            "atendente": atendente,
            "status": statusChamado,
            "cliente": clienteObj
        }
        let alterados = [];

        for(let propriedade in dados_novos) {
            if(propriedade === "atendente") {
                if (chamado.atendente._id !== dados_novos.atendente) {
                    alterados.push(propriedade)
                }
            } else if (propriedade === "cliente") {
                if (chamado.cliente._id !== dados_novos.cliente) {
                    alterados.push(propriedade)
                }
            } else if (chamado[propriedade] !== dados_novos[propriedade]) {
                    alterados.push(propriedade)
            }
            console.log(propriedade)
        }
        let body = {
                alterados: alterados,
                dados_novos: dados_novos
        }
        console.log(body)
        fetch('http://localhost:3001/inicio/chamados/editar', {
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
                            {/* Caixa de aviso condicional */}
                            {mensagem && (
                                <Alert variant={sucesso ? "success" : "danger"} onClose={() => setMensagem("")} dismissible>
                                    {mensagem}
                                </Alert>
                            )}
                        <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>CPF/CNPJ Cliente</Form.Label>  {/*busca cpf do cliente, caso não encontre deve mostrar uma mensagem de não encontrado cliente */}
                                <Col sm={10}><Form.Control required placeholder="Ex.: 000.000.000-00 ou 00.000.000/0000-00" maxLength={18} type="text" rows={3} disabled
                                                           onChange={e=> setDocumento(e.target.value)}
                                                           onBlur={handleDocumento} defaultValue={documento} /></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Cliente</Form.Label>  {/*Deve trazer o cliente pesquisado pelo cpf  */}
                                <Col sm={10}><Form.Control required type="text" rows={3} value={clienteCampo} disabled/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Status Chamado</Form.Label> 
                                <Col sm={10}><Form.Control required type="text" rows={3} value={statusChamado} disabled/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Descrição Chamado</Form.Label>
                                <Col sm={10}><Form.Control required  as="textarea" rows={3}
                                                           onChange={e=> setDescricao(e.target.value)}
                                                           defaultValue={descricao}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Prioridade</Form.Label> 
                                <Col sm={10}>
                                <Form.Control required as="select" onChange={e => setPrioridade(e.target.value)} value={prioridade}>
                                <option value="">Selecione...</option>
                                {Object.entries(enums.PrioridadeEnum).map(([key, value]) => (
                                    <option key={key} value={key}>{value}</option>
                                ))}
                                </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Previsão de Atendimento</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="date"
                                    onChange={(e) => setPrevisaoAtendimento(e.target.value)} 
                                    value={previsaoAtendimento} // Permite que o usuário altere o valor
                                />
                            </Col>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancelarChamado}>Cancelar Chamado</Button>
                            <Button variant="primary" type='submit'>Salvar</Button>
                            {/* Botão para aceitar o chamado */}
                            <Button variant="info" onClick={handleAceitarChamado}>Aceitar Chamado</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            }
        </>
    );
}

export default ChamadoModal;
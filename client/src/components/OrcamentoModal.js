import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";

export default function OrcamentoModal(props) {

    const {handleClose, orcamento, tecnicos, chamados, servicos, onHide} = props;
    const sort_str = (a, b) =>  a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    const chamados_alfabetico = chamados.sort((a,b) => a["descricao"] > b["descricao"] ? a["descricao"] === b["descricao"] ? 1 : 0 : -1)
    const tecnicos_alfabetico = tecnicos.sort(sort_str)
    const servicos_alfabetico = servicos.sort(sort_str)

    const [chamado, setChamado] = useState(orcamento.chamado._id);
    const [tecnico, setTecnico] = useState(orcamento.tecnico._id);
    const [tempoExecucao, setTempoExecucao] = useState(orcamento.tempoExecucao);
    const [atendimento, setAtendimento] = useState(orcamento.chamado.atendimento);
    const [enderecoServico, setEnderecoServico] = useState(orcamento.enderecoServico);
    const [observacao, setObservacao] = useState(orcamento.observacao);
    const [descontoServico, setDescontoServico] = useState(orcamento.descontoServico);
    const [situacaoOrcamento, setSituacaoOrcamento] = useState(orcamento.situacao);
    const [precoTotal, setPrecoTotal] = useState(orcamento.precoTotal);
    const [despesas, setDespesas] = useState(orcamento.despesas);
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};

        // Validação para evitar valores negativos
        if (descontoServico < 0) newErrors.descontoServico = "Desconto não pode ser negativo.";
        if (precoTotal < 0) newErrors.precoTotal = "Preço total não pode ser negativo.";
        if (despesas < 0) newErrors.despesas = "Despesas não podem ser negativas.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        
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
            "despesas": despesas,
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
    }


    return (
        <>
            <Modal {...props} >
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar orçamento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Técnico Responsavel</Form.Label>
                            <Col sm={10}>
                                <Form.Control required as="select" onChange={e=> setTecnico(e.target.value)} value={tecnico}>
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
                                                       defaultValue={tempoExecucao}
                                                       disabled
                                                       />
                                                    </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Atendimento</Form.Label>
                            <Col sm={10}><Form.Control required type="text"
                                                       onChange={e => setAtendimento(e.target.value)}
                                                       defaultValue={atendimento}
                                                       disabled/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Endereço</Form.Label>
                            <Col sm={10}><Form.Control required type="text"
                                                       onChange={e => setEnderecoServico(e.target.value)}
                                                       defaultValue={enderecoServico}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Observação</Form.Label>
                            <Col sm={10}><Form.Control required  as="textarea" rows={3}
                                                       onChange={e => setObservacao(e.target.value)}
                                                       defaultValue={observacao}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Desconto</Form.Label>
                            <Col sm={10}><Form.Control required  type="text"
                                                       onChange={e => setDescontoServico(e.target.value)}
                                                       defaultValue={descontoServico}
                                                       isInvalid={!!errors.descontoServico}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.descontoServico}
                                                    </Form.Control.Feedback>
                                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Preço Total</Form.Label>
                            <Col sm={10}><Form.Control required  type="number"
                                                       onChange={e => setPrecoTotal(e.target.value)}
                                                       defaultValue={precoTotal}
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
                        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                        <Button variant="primary" type='submit'>Salvar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
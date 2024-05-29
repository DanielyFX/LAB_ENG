import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'
import { ButtonGroup } from "react-bootstrap";
import {useLoaderData} from "react-router-dom";
import {useState} from "react";

export default function Orcamento_chamado() {

    const { tecnicos, chamados, servicos } = useLoaderData();
    console.log("tecnicos", tecnicos)
    console.log("chamados", chamados)
    console.log("servicos", servicos)

    const sort_str = (a, b) =>  a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    const tecnicos_alfabetico = tecnicos.sort(sort_str)
    const servicos_alfabetico = servicos.sort(sort_str)
    const chamados_alfabetico = chamados.sort((a,b) => a["descricao"] > b["descricao"] ? a["descricao"] === b["descricao"] ? 1 : 0 : -1)

    const [chamado, setChamado] = useState('Selecione...');
    const [tecnico, setTecnico] = useState('Selecione...');
    const [tipoServico, setTipoServico] = useState('Selecione...');
    const [tempoExecucao, setTempoExecucao] = useState('');
    const [garantia, setGarantia] = useState('');
    const [enderecoServico, setEnderecoServico] = useState('');
    const [observacao, setObservacao] = useState('');
    const [descontoServico, setDescontoServico] = useState('');
    const [situacaoOrcamento, setSituacaoOrcamento] = useState('Selecione...');
    const [precoTotal, setPrecoTotal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const dados = {
            "chamado": chamado,
            "tecnico": tecnico,
            "servico": tipoServico,
            "tempoExecucao": tempoExecucao,
            "garantia": garantia,
            "enderecoServico": enderecoServico,
            "observacao": observacao,
            "situacao": situacaoOrcamento,
            "descontoServico": descontoServico,
            "precoTotal": precoTotal
        }
        fetch('http://localhost:3001/orcamentos/novo', {
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
                    alert("Orçamento cadastrado com sucesso!")
                    window.location.reload()
                } else {
                    alert("Erro ao cadastrar o orçamento!")
                }
            })
    }

    return (
        <div id="cadchamado-main">
            <Form id="cadchamado-form" onSubmit={handleSubmit}>
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
                        <Form.Control required as="select" onChange={e=> setChamado(e.target.value)} value={chamado}>
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
                    <Form.Label column sm={2}>Tipo de Serviço</Form.Label>
                    <Col sm={10}>
                        <Form.Control required as="select" onChange={e=> setTipoServico(e.target.value)} value={tipoServico}>
                            {servicos_alfabetico.length > 0 ?
                                <><option selected disabled >Selecione...</option>
                                    {servicos_alfabetico.map((servico) => {
                                        return (<option value={servico._id}>{servico.nome}</option>)
                                    })}</> :
                                <option selected disabled>Não há nenhum serviço cadastrado.</option>
                            }
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Tempo Execução</Form.Label>
                    <Col sm={10}><Form.Control required type="text"
                                               onChange={e => setTempoExecucao(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Garantia</Form.Label>
                    <Col sm={10}><Form.Control required type="text"
                                               onChange={e => setGarantia(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Endereço do Serviço</Form.Label>
                    <Col sm={10}><Form.Control required type="text"
                                               onChange={e => setEnderecoServico(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Descrição</Form.Label>
                    <Col sm={10}><Form.Control  as="textarea" rows={3}
                                               onChange={e => setObservacao(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Desconto</Form.Label>
                    <Col sm={10}><Form.Control required  type="text"
                                               onChange={e => setDescontoServico(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Preço Total</Form.Label>
                    <Col sm={10}><Form.Control required  type="number"
                                               onChange={e => setPrecoTotal(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Situação</Form.Label>
                    <Col sm={10}>
                    <Form.Control as="select" onChange={e => setSituacaoOrcamento(e.target.value)} value={situacaoOrcamento}>
                        <option selected disabled >Selecione...</option>
                        <option value="Realizado">Realizado</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Reprovado">Reprovado</option>
                        <option value="Cancelado">Cancelado</option>
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
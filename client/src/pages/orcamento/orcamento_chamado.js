import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'
import { ButtonGroup } from "react-bootstrap";
import {useLoaderData} from "react-router-dom";
import {useState, useEffect} from "react";
import Table from "react-bootstrap/Table";
import enums from "../../utils/enums.json"

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
    const [servicosChamado, setServicosChamado] = useState([]);
    const [tempoExecucao, setTempoExecucao] = useState('');
    const [atendimento, setAtendimento] = useState('');
    const [valorTotal, setValorTotal] = useState('');
    const [quantidadeServico] = useState('');
    const [despesaServico] = useState('');
    const [enderecoServico, setEnderecoServico] = useState('');
    const [observacao, setObservacao] = useState('');
    const [descontoServico, setDescontoServico] = useState('');
    const [situacaoOrcamento, setSituacaoOrcamento] = useState('Selecione...');
    const [precoTotal, setPrecoTotal] = useState('');

    const calcularTempoExecucao = () => {
        if (chamado && chamado.dataAbertura && chamado.previsao) {
            const dataAbertura = new Date(chamado.dataAbertura); // Certifique-se de que a data de abertura é do tipo Date
            const previsao = new Date(chamado.previsao); // Certifique-se de que a previsão também é do tipo Date

            const diffTime = previsao - dataAbertura; // Diferença em milissegundos

            // Converte a diferença para dias, horas e minutos
            const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Diferença em dias
            const diffHoras = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Diferença em horas
            const diffMinutos = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60)); // Diferença em minutos

            setTempoExecucao(`${diffDias}d ${diffHoras}h ${diffMinutos}m`); // Formato: 5h 30m
        }
    };

    useEffect(() => {
        calcularTempoExecucao();
    }, [chamado]);

    const handleChamadoChange = (e) => {
        const chamadoId = e.target.value;
    
        const chamadoSelecionado = chamados.find((chamado) => chamado._id === chamadoId);
        setChamado(chamadoSelecionado);
        if (chamadoSelecionado) {
            const listaIdServicos = chamadoSelecionado.servicos || [];
            // Mapeia os ObjectIds dos serviços para os objetos completos usando find
            const servicosCompleto = listaIdServicos.map((id) => servicos.find((servico) => servico._id === id));
            setServicosChamado(servicosCompleto);
        } else {
            setServicosChamado([]);
        }
    };

    const calcularTotal = () => {
        const totalServicos = servicosChamado.reduce((acc, servico) => acc + parseFloat(servico.preco || 0), 0);
        const desconto = parseFloat(descontoServico) || 0;
        const totalComDesconto = totalServicos - desconto;
        setPrecoTotal(totalComDesconto.toFixed(2));
      };

      useEffect(() => {
        calcularTotal();
      }, [servicosChamado, descontoServico]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dados = {
            "chamado": chamado,
            "tecnico": tecnico,
            "quantidadeServico": quantidadeServico,
            "tempoExecucao": tempoExecucao,
            "atendimento": atendimento,
            "valorTotal": valorTotal,
            "enderecoServico": enderecoServico,
            "observacao": observacao,
            "situacao": situacaoOrcamento,
            "descontoServico": descontoServico,
            "precoTotal": precoTotal,
            "depesa": despesaServico
        }
        console.log("Serviços do chamado selecionado:", servicosChamado);
        fetch('http://localhost:3001/inicio/orcamentos/novo', {
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
                        <Form.Control required as="select" onChange={handleChamadoChange} value={chamado}>
                            <option selected disabled>Selecione...</option>
                            {chamados.map(chamado => (
                                <option key={chamado._id} value={chamado._id}>{chamado.descricao}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Tempo Execução</Form.Label>
                    <Col sm={10}><Form.Control required type="text"
                                               onChange={e => setTempoExecucao(e.target.value)} value={tempoExecucao}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Atendimento</Form.Label>
                    <Col sm={10}><Form.Control required type="text"
                                                value={chamado.atendimento}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Endereço do Serviço</Form.Label>
                    <Col sm={10}><Form.Control required type="text"
                                               onChange={e => setEnderecoServico(e.target.value)} value={`${chamado.rua}, ${chamado.numero}, ${chamado.bairro}, ${chamado.cidade}`}/></Col>
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
                    <Col sm={10}><Form.Control required type="number" value={precoTotal} disabled /></Col>
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
                {/* Tabela de Serviços */}
                {/* Tabela para exibir serviços selecionados */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Serviço</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicosChamado.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nome}</td>
                                <td>R$ {item.preco}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <ButtonGroup>
                    <Button variant="primary" type="submit">Cadastrar</Button>
                    <Button variant="secondary" href="/inicio">Cancelar</Button>
                </ButtonGroup>
                
            </Form>
        </div>
    )
}
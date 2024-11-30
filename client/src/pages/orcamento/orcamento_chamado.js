import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'
import { ButtonGroup } from "react-bootstrap";
import {useLoaderData} from "react-router-dom";
import {useState, useEffect, useCallback} from "react";
import Table from "react-bootstrap/Table";
import enums from "../../utils/enums.json";

export default function OrcamentoChamado() {

    const { tecnicos, chamados, servicos } = useLoaderData();

    const sort_str = (a, b) =>  a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    const tecnicos_alfabetico = tecnicos.sort(sort_str)
    
    const [chamado, setChamado] = useState('');
    const [tecnico, setTecnico] = useState('');
    //const [erroTecnico, setErroTecnico] = useState(false);

    const [servicosChamado, setServicosChamado] = useState([]);
    const [tempoExecucao, setTempoExecucao] = useState('');
    //const [atendimento, setAtendimento] = useState('');
    const [enderecoServico, setEnderecoServico] = useState('');
    const [observacao, setObservacao] = useState('');
    const [descontoServico, setDescontoServico] = useState('');
    const [situacaoOrcamento] = useState(enums.SituacaoEnum.realizado); //setSituacaoOrcamento
    const [precoTotal, setPrecoTotal] = useState('');

    const [tipoDespesa, setTipoDespesa] = useState('');
    const [valorDespesa, setValorDespesa] = useState('');
    const [despesasSelecionadas, setDespesasSelecionadas] = useState([]);
    
    console.log("Despesas selecionadas", despesasSelecionadas)
    const calcularTempoExecucao = useCallback(() => {
        if (chamado && chamado.dataAbertura && chamado.previsao) {
            const dataAbertura = new Date(chamado.dataAbertura); // Certifique-se de que a data de abertura é do tipo Date
            const previsao = new Date(chamado.previsao); // Certifique-se de que a previsão também é do tipo Date

            const diffTime = previsao - dataAbertura; // Diferença em milissegundos
            
            const tempo = diffTime / 3;
            // Converte a diferença para dias, horas e minutos
            const diffDias = Math.floor(tempo / (1000 * 60 * 60 * 24)); // Diferença em dias
            const diffHoras = Math.floor((tempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Diferença em horas
            const diffMinutos = Math.floor((tempo % (1000 * 60 * 60)) / (1000 * 60)); // Diferença em minutos

            setTempoExecucao(`${diffDias}d ${diffHoras}h ${diffMinutos}m`); // Formato: 5h 30m
        }
    }, [chamado]);

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


    const handleChamadoChange = (e) => {
        const chamadoId = e.target.value;
        const chamadoSelecionado = chamados.find((chamado) => chamado._id === chamadoId && chamado.bd_status !== "INATIVO" && chamado.status !== "CANCELADO");
        setChamado(chamadoSelecionado);
    
        if (chamadoSelecionado) {
            setEnderecoServico(`${chamadoSelecionado.rua}, ${chamadoSelecionado.numero}, ${chamadoSelecionado.bairro}, ${chamadoSelecionado.cidade}`);
            const listaIdServicos = chamadoSelecionado.servicos || [];
    
            // Checar se `listaIdServicos` contém IDs ou objetos completos
            const servicosCompleto = listaIdServicos.map((item) => {
                // Se o item já é um objeto com propriedades, use-o diretamente
                if (typeof item === "object" && item._id) {
                    return item;
                }
                // Se o item for um ID, procure o objeto completo
                return servicos.find((servico) => servico._id === item && servico.bd_status !== "INATIVO");
            });
    
            setServicosChamado(servicosCompleto);
        } else {
            setServicosChamado([]);
            setEnderecoServico('');
        }
    };

    const handleRemoverDespesa = (index) => {
        const novasDespesas = [...despesasSelecionadas];
        novasDespesas.splice(index, 1);
        setDespesasSelecionadas(novasDespesas);
    };

    const calcularTotal = useCallback(() => {
        // 1. Calcula o total dos serviços
        const totalServicos = servicosChamado.reduce((acc, servico) => acc + parseFloat(servico.preco || 0), 0);

        // 2. Aplica o desconto, caso exista
        const desconto = parseFloat(descontoServico) >= 0 ? parseFloat(descontoServico) : 0;
        const totalComDesconto = totalServicos - desconto;
    
        // 3. Calcula o total das despesas adicionais
        const totalDespesas = despesasSelecionadas.reduce((acc, despesa) => acc + despesa.valor, 0);
    
        // 4. Calcula o preço total final
        const precoFinal = totalComDesconto + totalDespesas;
    
        // Define o preço total com duas casas decimais
        setPrecoTotal(precoFinal.toFixed(2));
    }, [servicosChamado, descontoServico, despesasSelecionadas]);


    useEffect(() => {
        calcularTotal();
      }, [servicosChamado, descontoServico, despesasSelecionadas]);
    
    useEffect(() => {
        calcularTempoExecucao();
    }, [chamado]);

    useEffect(()=>{
        if (chamado.tecnico){
            setTecnico(chamado.tecnico._id);
        }
      }, [chamado]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (tecnico === 'Selecione...') {
            alert("Por favor, selecione um técnico responsável.");
            return;
        }
        
        // Verifica se o chamado foi selecionado
        if (chamado === 'Selecione...') {
            alert("Por favor, selecione um chamado.");
            return;
        }
    
        // Verifica se o tempo de execução foi preenchido
        if (!tempoExecucao) {
            alert("Por favor, insira o tempo de execução.");
            return;
        }
    
        // Verifica se o endereço de serviço foi preenchido
        if (!enderecoServico) {
            alert("Por favor, insira o endereço do serviço.");
            return;
        }
    
        // Verifica se o valor do desconto é válido
        if (descontoServico && parseFloat(descontoServico) > precoTotal) {
            alert("O valor do desconto não pode ser maior do que o preco total do serviço.");
            return;
        }

        const dados = {
            "chamado": chamado,
            "tecnico": tecnico,
            "tempoExecucao": tempoExecucao,
            "enderecoServico": enderecoServico,
            "observacao": observacao,
            "situacao": situacaoOrcamento,
            "descontoServico": descontoServico,
            "precoTotal": precoTotal,
            "despesas": despesasSelecionadas
        }
        console.log("Endereço do serviço", enderecoServico);
        console.log("Despesas", despesasSelecionadas);

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
                    alert(response.message)
                }
            })
    }

    return (
        <div id="cadchamado-main">
            <Form id="cadchamado-form" onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Técnico Responsável</Form.Label>
                <Col sm={10}>
                    {chamado.tecnico ? (
                        // Exibe o nome do técnico e desabilita a seleção
                        <Form.Control
                            required 
                            type="text" 
                            value={chamado.tecnico.nome} 
                            disabled
                        />
                    ) : (
                        // Se não houver técnico, exibe a lista de técnicos
                        <Form.Control
                            required
                            as="select"
                            onChange={e => setTecnico(e.target.value)}
                            value={chamado.tecnico ? chamado.tecnico._id : (tecnico|| "")} // Use 'tecnicoSelecionado' ou vazio como fallback
                        >
                            <option value="">Selecione...</option>
                            {tecnicos_alfabetico.length > 0 ? (
                                tecnicos_alfabetico
                                    .filter((tecnico) => tecnico.bd_status !== "INATIVO")
                                    .map((tecnico) => (
                                    <option key={tecnico._id} value={tecnico._id}>
                                        {tecnico.nome}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Não há nenhum técnico cadastrado.</option>
                            )}
                        </Form.Control>
                    )}
                </Col>
            </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Chamado</Form.Label>
                    <Col sm={10}>
                    <Form.Control required as="select" onChange={handleChamadoChange} value={chamado?._id || ""}>
                        <option value="" disabled>Selecione...</option>
                        {chamados
                            .filter((chamado) => chamado.bd_status !== "INATIVO" && chamado.status !== "CANCELADO" )
                            .map(chamado => (
                            <option key={chamado._id} value={chamado._id}>{chamado.descricao}</option>
                        ))}
                    </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Tempo Execução</Form.Label>
                    <Col sm={10}><Form.Control required type="text"
                                               onChange={e => setTempoExecucao(e.target.value)} value={tempoExecucao} disabled/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Atendimento</Form.Label>
                    <Col sm={10}><Form.Control required type="text"
                                                value={chamado.atendimento} disabled/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Endereço do Serviço</Form.Label>
                    <Col sm={10}><Form.Control required type="text"
                                               onChange={e => setEnderecoServico(e.target.value)} value={enderecoServico}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Observação</Form.Label>
                    <Col sm={10}><Form.Control  as="textarea" rows={3}
                                               onChange={e => setObservacao(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Tipo de Despesa</Form.Label>
                <Col sm={8}>
                    <Form.Control as="select" value={tipoDespesa} onChange={(e) => setTipoDespesa(e.target.value)}>
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
                                               value={descontoServico} onChange={handleDescontoChange}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Preço Total</Form.Label>
                    <Col sm={10}><Form.Control required type="number" value={precoTotal} disabled /></Col>
                </Form.Group>
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
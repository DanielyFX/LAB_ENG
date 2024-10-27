import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'
import { ButtonGroup } from "react-bootstrap";
import {useState, useEffect} from "react";
import {useLoaderData} from "react-router-dom";
import { Table } from 'react-bootstrap';
import enums  from "../../utils/enums";

function limpa_formulário_cep() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
}

window.meu_callback = function(conteudo) {
    if (!("erro" in conteudo)) {
        let rua_input = document.getElementById('rua');
        let bairro_input = document.getElementById('bairro');
        let cidade_input = document.getElementById('cidade');
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        let e_rua = new Event('input', {bubbles: true});
        let e_bairro = new Event('input', {bubbles: true});
        let e_cidade = new Event('input', {bubbles: true});
        setter.call(rua_input, conteudo.logradouro);
        setter.call(bairro_input, conteudo.bairro);
        setter.call(cidade_input, conteudo.localidade);
        rua_input.dispatchEvent(e_rua);
        bairro_input.dispatchEvent(e_bairro);
        cidade_input.dispatchEvent(e_cidade);
        document.getElementById('rua').value = conteudo.logradouro;
        document.getElementById('bairro').value = conteudo.bairro;
        document.getElementById('cidade').value = conteudo.localidade;
    } else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');
    if (cep !== "") {
        var validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            document.getElementById('rua').value = "";
            document.getElementById('bairro').value = "";
            document.getElementById('cidade').value = "";

            var script = document.createElement('script');
            script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;
            document.body.appendChild(script);
        } else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        limpa_formulário_cep();
    }
}

export default function Cadastrar_chamado() {

    const {clientes, atendentes, servicos} = useLoaderData()
    console.log(servicos)

    const atendentes_alfabetico = atendentes.sort((a, b) => {
        return a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    })
    
    const [documento, setDocumento] = useState('');
    const [clienteCampo, setClienteCampo] = useState('');
    const [clienteContato, setClienteContato] = useState('');
    const [clienteObj, setClienteObj] = useState();
    const [atendente, setAtendente] = useState('Selecione...');

    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');

    const [dataAbertura, setDataAbertura] = useState('');
    const [horaAbertura, setHoraAbertura] = useState('');
    const[dataPrevisao, setDataPrevisao] = useState('');

    const [servico, setServico] = useState('');
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [totalServicos, setTotalServicos] = useState(0);


    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('Selecione...');
    const [atendimento, setAtendimento] = useState('Selecione...');
    const [statusChamado, setStatusChamado] = useState('nao_iniciado');
    const [previsaoAtendimento, setPrevisaoAtendimento] = useState('');

    const prioridadePrazo = {
        BAIXO: 7,
        MEDIO: 12,
        ALTO: 20
    };

    useEffect(() => {
        // Define a data e hora atuais no formato necessário para `datetime-local`
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 16); // Retorna 'YYYY-MM-DDTHH:MM' no fuso horário local
        setDataAbertura(formattedDate);
        setHoraAbertura(formattedDate);
        
        if (prioridade !== 'Selecione...') {
            setPrevisaoAtendimento(calcularPrevisaoAtendimento(prioridade));
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
        }

        if (diasParaAdicionar) {
            hoje.setDate(hoje.getDate() + diasParaAdicionar);
            return hoje.toISOString().slice(0, 10); // Retorna a nova data no formato 'YYYY-MM-DD'
        }
        return ''; // Retorna string vazia se prioridade não for válida
    };

    const handleAdicionarServico = () => {
        if (!servico) {
            alert("Por favor, selecione um serviço."); // Mensagem de alerta se nenhum serviço for selecionado
            return;
        }
        
        const servicoSelecionado = servicos.find(s => s.nome === servico);
        if (servicoSelecionado) {
            const novoServico = { servico: servicoSelecionado.nome, valor: servicoSelecionado.preco };
            const novosServicos = [...servicosSelecionados, novoServico];
            setServicosSelecionados(novosServicos);
            setTotalServicos(novosServicos.reduce((acc, item) => acc + item.valor, 0));
            setServico(''); // Limpa o campo selecionado
        }
    };

    const handleRemoverServico = (index) => {
        const novosServicos = servicosSelecionados.filter((_, i) => i !== index);
        setServicosSelecionados(novosServicos);
        setTotalServicos(novosServicos.reduce((acc, item) => acc + item.valor, 0));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dados = {
            "descricao": descricao,
            "prioridade": prioridade,
            "atendimento": atendimento,
            "previsaoAtendimento": previsaoAtendimento,
            "atendente": atendente,
            "status": statusChamado,
            "cliente": clienteObj._id,
            "data_abertura": dataAbertura,
            "hora_abertura": horaAbertura,
            "rua": rua,
            "cidade": cidade,
            "bairro": bairro,
            "numero": numero,
            "previsao": previsaoAtendimento,
            "servicos": servicosSelecionados
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
                alert("Chamado cadastrado com sucesso!")
                window.location.reload()
            } else {
                alert("Erro ao cadastrar o chamado!")
            }
        })
    }

    const handleDocumentoCliente = () => {
        let cliente_pesquisa = clientes.find(cliente => cliente.documento === documento)
        if (cliente_pesquisa === undefined) setClienteCampo("Cliente não encontrado")
        else {
            setClienteObj(cliente_pesquisa)
            setClienteCampo(cliente_pesquisa.nome)

            //primeiro verifica se tem celular cadastrado se não tiver busca telefone fixo
            try{
                setClienteContato(cliente_pesquisa.celular)
            }
            catch{
                setClienteContato(cliente_pesquisa.telefone)
            }
        }
    };

    
    const handleCepChange = (event) => {
        const { value } = event.target;
        setCep(value);
    };

    const handleCepDesfoque = (event) => {
        pesquisacep(event.target.value); 
    };

    return (
        <div id="cadchamado-main">
            <Form id="cadchamado-form" onSubmit={handleSubmit}>
                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CPF/CNPJ</Form.Label>  {/*busca cpf do cliente, caso não encontre deve mostrar uma mensagem de não encontrado cliente */}
                    <Col sm={10}><Form.Control required placeholder="Ex.: 000.000.000-00 ou 00.000.000/0000-00" maxLength={18} type="text" rows={3}
                                               onChange={e=> setDocumento(e.target.value)} onBlur={handleDocumentoCliente}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Nome Cliente</Form.Label>  {/*Deve trazer o cliente pesquisado pelo cpf  */}
                    <Col sm={10}><Form.Control required type="text" rows={3} value={clienteCampo} disabled/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CEP</Form.Label>
                    <Col sm={10}><Form.Control required placeholder="Ex.: 00000-000" maxLength={9} value={cep} onChange={handleCepChange} onBlur={handleCepDesfoque}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Rua</Form.Label>
                    <Col sm={10}><Form.Control type="text" id="rua" onChange={(e) => setRua(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Número</Form.Label>
                    <Col sm={10}><Form.Control type="text" onChange={(e) => setNumero(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Bairro</Form.Label>
                    <Col sm={10}><Form.Control type="text" id="bairro" onChange={(e) => setBairro(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Cidade</Form.Label>
                    <Col sm={10}><Form.Control type="text" id="cidade" onChange={(e) => setCidade(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Numero telefone</Form.Label>  {/*Deve o numero do cliente pesquisado pelo cpf  */}
                    <Col sm={10}><Form.Control required type="text" rows={3} value={clienteContato} disabled/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Descrição Chamado</Form.Label>
                    <Col sm={10}><Form.Control required  as="textarea" rows={3}
                                               onChange={e=> setDescricao(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Data de Abertura</Form.Label>
                <Col sm={10}>
                    <Form.Control required type="datetime-local" value={dataAbertura} onChange={(e) => setDataAbertura(e.target.value)} />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Prioridade</Form.Label> 
                    <Col sm={10}>
                    <Form.Control as="select" onChange={e => setPrioridade(e.target.value)} value={prioridade}>
                    <option selected disabled>Selecione...</option>
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
                        value={previsaoAtendimento}
                        onChange={(e) => setPrevisaoAtendimento(e.target.value)} // Permite que o usuário altere o valor
                    />
                </Col>
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
                <Form.Label column sm={2}>Atendimento</Form.Label> 
                    <Col sm={10}>
                    <Form.Control as="select" onChange={e => setAtendimento(e.target.value)} value={atendimento}>
                    <option selected disabled>Selecione...</option>
                    {Object.entries(enums.AtendimentoEnum).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                    </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Atendente</Form.Label> {/*Deve trazer todos os atendentes cadastrados, em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control required as="select" onChange={e=> setServico(e.target.value)} value={servico}>
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
                <Form.Label column sm={2}>Status Chamado</Form.Label> 
                <Col sm={10}>
                    <Form.Control
                        type="text"
                        value={enums.StatusChamadoEnum[statusChamado]} // Exibe o valor do enum
                        readOnly
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Serviço</Form.Label>
                    <Col sm={8}>
                        <Form.Control as="select" value={servico} onChange={(e) => setServico(e.target.value)} required>
                            <option value="">Selecione um serviço...</option>
                            {servicos.map((s) => (
                                <option key={s.id} value={s.nome}>{s.nome}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col sm={2}>
                        <Button onClick={handleAdicionarServico}>Adicionar</Button>
                    </Col>
                </Form.Group>

                {/* Tabela para exibir serviços selecionados */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Serviço</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicosSelecionados.map((item, index) => (
                            <tr key={index}>
                                <td>{item.servico}</td>
                                <td>R$ {item.valor.toFixed(2)}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemoverServico(index)}>Remover</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Total dos serviços */}
                <Row>
                    <Col sm={10} className="text-end">
                        <strong>Total: R$ {totalServicos.toFixed(2)}</strong>
                    </Col>
                </Row>

                
            <ButtonGroup>
                <Button variant="primary" type="submit">Cadastrar</Button>
                <Button variant="secondary" href="/inicio">Cancelar</Button>
            </ButtonGroup>
                
            </Form>
        </div>
    )
}
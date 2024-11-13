import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState, useEffect} from "react";
import enums from "../utils/enums.json";
import Alert from 'react-bootstrap/Alert';
import { Table } from 'react-bootstrap';

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


function ChamadoModal(props) {
    const {handleClose, chamado, clientes, atendentes, tecnicos, servicos, onHide} = props;
    //console.log("Servicos no modal do chamado", servicos);
    const atendentes_alfabetico = atendentes.sort((a, b) => {
        return a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    });

    const [documento, setDocumento] = useState(chamado.cliente.documento);
    const [clienteCampo, setClienteCampo] = useState(chamado.cliente.nome);
    const [clienteObj, setClienteObj] = useState(chamado.cliente._id);
    const [atendente, setAtendente] = useState(chamado.atendente._id);
    const [tecnico, setTecnico] = useState(chamado.tecnico._id);

    const [mensagem, setMensagem] = useState("");
    const [sucesso, setSucesso] = useState(false); 

    const [descricao, setDescricao] = useState(chamado.descricao);
    const [prioridade, setPrioridade] = useState(chamado.prioridade);
    const [statusChamado, setStatusChamado] = useState(chamado.status); 
    const [statusChamadoOriginal, setStatusChamadoOriginal] = useState(chamado.status);
    const [previsaoAtendimento, setPrevisaoAtendimento] = useState(chamado.previsao);

    const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);

    const [servico, setServico] = useState('');
    const [servicosSelecionados, setServicosSelecionados] = useState([...chamado.servicos]);
    const [totalServicos, setTotalServicos] = useState(0);

    const [atendimento, setAtendimento] = useState(chamado.atendimento);

    const [cep, setCep] = useState(chamado.cep);
    const [rua, setRua] = useState(chamado.rua);
    const [cidade, setCidade] = useState(chamado.cidade);
    const [bairro, setBairro] = useState(chamado.bairro);
    const [numero, setNumero] = useState(chamado.numero);

    console.log("Servicos no chamado", servicosSelecionados);
    useEffect(() => {
        setDocumento(chamado.cliente.documento || '');
        setClienteCampo(chamado.cliente.nome || '');
        setClienteObj(chamado.cliente._id || '');
        setAtendente(chamado.atendente._id || '');
        setTecnico(chamado.tecnico._id || '');
        setDescricao(chamado.descricao || '');
        setPrioridade(chamado.prioridade || '');
        setStatusChamado(chamado.status || '');
        setPrevisaoAtendimento(chamado.previsao || '');
        setAtendimento(chamado.atendimento || '');
        setCep(chamado.cep || '');
        setRua(chamado.rua || '');
        setCidade(chamado.cidade || '');
        setBairro(chamado.bairro || '');
        setNumero(chamado.numero || '');
        setCep(chamado.cep || '');

        setServicosSelecionados([...chamado.servicos]);
        const totalInicial = chamado.servicos.reduce((acc, item) => acc + item.preco, 0);
        setTotalServicos(totalInicial);

    }, [chamado]);

    useEffect(() => {
        const totalAtualizado = servicosSelecionados.reduce((acc, item) => acc + item.preco, 0);
        setTotalServicos(totalAtualizado);

    }, [servicosSelecionados]);

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

    console.log("Servicos selecionados pt2", servicosSelecionados);

    const handleAdicionarServico = () => {
        //console.log("Servicos no meu chamado", chamado.servicos);
        console.log("Servicos selecionados no handleAdicionar servicos", servicosSelecionados);
        if (!servico) {
            alert("Por favor, selecione um serviço."); // Mensagem de alerta se nenhum serviço for selecionado
            return;
        }
        
        const servicoSelecionado = servicos.find(s => s.nome === servico);
        if (servicoSelecionado) {
            const novoServico = { _id: servicoSelecionado._id, nome: servicoSelecionado.nome, preco: servicoSelecionado.preco };
            const novosServicos = [...servicosSelecionados, novoServico];
            console.log("Novos serviços", novosServicos);
            setServicosSelecionados(novosServicos);
            console.log("Servicos Selecionados novos+antigos", servicosSelecionados);
            setTotalServicos(novosServicos.reduce((acc, item) => acc + item.preco, 0));
            setServico(''); // Limpa o campo selecionado
        }
    };

    const handleCepChange = (e) => {
        const { value } = e.target;
        setCep(value);
    };
    
    const handleCepDesfoque = (e) => {
        pesquisacep(e.target.value); 
    };

    // Função de comparação profunda
    const deepCompare = (obj1, obj2) => {
        if (obj1 === obj2) return true;
        
        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
            return false;
        }
        
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            if (obj1.length !== obj2.length) return false;
            for (let i = 0; i < obj1.length; i++) {
                if (!deepCompare(obj1[i], obj2[i])) return false;
            }
        } else {
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);
            
            if (keys1.length !== keys2.length) return false;
            
            for (let key of keys1) {
                if (!keys2.includes(key) || !deepCompare(obj1[key], obj2[key])) return false;
            }
        }
        
        return true;
    };

    const handleRemoverServico = (index) => {
        const novosServicos = servicosSelecionados.filter((_, i) => i !== index);
        setServicosSelecionados(novosServicos);
        setTotalServicos(novosServicos.reduce((acc, item) => acc + item.preco, 0));
    };

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
        if (statusChamadoOriginal === enums.StatusChamadoEnum.nao_iniciado) {
            setStatusChamado(enums.StatusChamadoEnum.em_analise);
            setMensagem("Status alterado para 'Em Análise' com sucesso.");
            setSucesso(true);
        } else if (statusChamadoOriginal === enums.StatusChamadoEnum.em_analise) {
            setMensagem("O orçamento ainda não foi feito e aceito. Não é possível avançar.");
            setSucesso(false);
        } else {
            setMensagem("Este chamado não pode ser alterado para outro status.");
            setSucesso(false);
        }
    };


    const calcularPrevisaoAtendimento = (prioridade) => {
        const hoje = new Date(); // Data atual
        let diasParaAdicionar = 0;

        switch (prioridade){
            case "alta":
                diasParaAdicionar = 7;
                break;
            case "media":
                diasParaAdicionar = 12;
                break;
            case "baixa": 
                diasParaAdicionar = 20;
                break;
            default:
                return '';
        }
        hoje.setDate(hoje.getDate() + diasParaAdicionar);
        return hoje.toISOString().slice(0, 10); // Retorna a nova data no formato 'YYYY-MM-DD'
        
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setConfirmacaoAberta(true);
    };

    const handleConfirmarAlteracoes = () => {
        console.log("Função chamada");
        // Lógica para enviar os dados ao servidor
        let dados_novos = {
            "_id": chamado._id,
            "descricao": descricao,
            "prioridade": prioridade,
            "previsao": previsaoAtendimento,
            "atendente": atendente,
            "status": statusChamado,
            "cliente": clienteObj,
            "tecnico": tecnico,
            "atendimento": atendimento,
            "rua": rua,
            "cidade": cidade,
            "bairro": bairro,
            "numero": numero,
            "servicos": servicosSelecionados.map(s => s._id),
        };

        console.log("Dados servicos", dados_novos.servicos)
        
        let alterados = [];
        for (let propriedade in dados_novos) {
            if (propriedade === "atendente") {
                if (chamado.atendente._id !== dados_novos.atendente) {
                    alterados.push(propriedade);
                }
            } else if (propriedade === "cliente") {
                if (chamado.cliente._id !== dados_novos.cliente) {
                    alterados.push(propriedade);
                }
            } else if (propriedade === "tecnico") {
                if (chamado.tecnico._id !== dados_novos.tecnico) {
                    alterados.push(propriedade);
                }
            } else if (propriedade === "servicos") {
            // Comparação profunda para a lista de serviços
            if (!deepCompare(propriedade, dados_novos.servicos)) {
                alterados.push(propriedade);
            }
            } else if (chamado[propriedade] !== dados_novos[propriedade]) {
                alterados.push(propriedade);
            }
        }
        let body = {
            alterados: alterados,
            dados_novos: dados_novos
        };

        fetch('http://localhost:3001/inicio/chamados/editar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then((resultado) => resultado.json())
            .then((response) => { console.log(response); });
        setTimeout(() => {
            onHide();
        }, 500);
        setTimeout(() => {
            window.location.reload();
        }, 100);
        setConfirmacaoAberta(false); // Fecha o modal de confirmação
    };

    const cancelarAlteracoes = () => {
        setConfirmacaoAberta(false); // Fecha o modal sem salvar as alterações
    };

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
                                                           onBlur={handleDocumento} value={documento} /></Col>
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
                                                           value={descricao}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>CEP</Form.Label>
                                <Col sm={10}><Form.Control placeholder="Ex.: 00000-000" maxLength={9} value={cep} onChange={handleCepChange} onBlur={handleCepDesfoque}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Rua</Form.Label>
                                <Col sm={10}><Form.Control required type="text" id="rua" onChange={(e) => setRua(e.target.value)} value={rua}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Número</Form.Label>
                                <Col sm={10}><Form.Control required type="text" onChange={(e) => setNumero(e.target.value)} value={numero}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Bairro</Form.Label>
                                <Col sm={10}><Form.Control required type="text" id="bairro" onChange={(e) => setBairro(e.target.value)} value={bairro}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Cidade</Form.Label>
                                <Col sm={10}><Form.Control required type="text" id="cidade" onChange={(e) => setCidade(e.target.value)} value={cidade}/></Col>
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
                            <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Serviço</Form.Label>
                            <Col sm={8}>
                                <Form.Control as="select" value={servico} onChange={(e) => setServico(e.target.value)}>
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
                                        <td>{item.nome}</td>
                                        <td>R$ {item.preco.toFixed(2)}</td>
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
    </>
    );
}

export default ChamadoModal;
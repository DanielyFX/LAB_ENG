import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'
import { ButtonGroup } from "react-bootstrap";
import {useState, useEffect} from "react";
import {useLoaderData} from "react-router-dom";
import { Table } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import enums from '../../utils/enums.json';
import ToggleButton  from "react-bootstrap/ToggleButton";
import { Validar } from "../validacao";
import InputCPF from "../../components/Input-CPF";
import InputCNPJ from "../../components/Input-CNPJ";
import InputCEP from "../../components/Input-CEP";
import InputNomePessoa from "../../components/Input-NomePessoa";
import InputTelefoneFixo from "../../components/Input-TelFixo";

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

export default function CadastrarChamado() {

    const {clientes, atendentes, servicos, tecnicos} = useLoaderData()
    console.log(servicos)

    const atendentes_alfabetico = atendentes.sort((a, b) => {
        return a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    })

    const tecnicos_alfabetico = tecnicos.sort((a, b) => {
        return a["nome"] > b["nome"] ? a["nome"] === b["nome"] ? 1 : 0 : -1;
    })
    
    const [documentoCliente, setDocumentoCliente] = useState('');
    const [clienteCampo, setClienteCampo] = useState('');
    const [clienteContato, setClienteContato] = useState('');
    const [clienteObj, setClienteObj] = useState();
    const [tecnico, setTecnico] = useState();
    const [atendente, setAtendente] = useState('Selecione...');

    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');

    const [cpfChecked, setCPFChecked] = useState(false);
    const [cepError, setCepError] = useState('');

    const [dataAbertura, setDataAbertura] = useState('');

    const [servico, setServico] = useState('');
    const [servicosSelecionados, setServicosSelecionados] = useState([]);
    const [totalServicos, setTotalServicos] = useState(0);

    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');

    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('Selecione...');
    const [atendimento, setAtendimento] = useState('Selecione...');
    const [statusChamado] = useState(enums.StatusChamadoEnum.nao_iniciado);
    const [previsaoAtendimento, setPrevisaoAtendimento] = useState('');


    useEffect(() => {
        // Define a data e hora atuais no formato necessário para `datetime-local`
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 16); // Retorna 'YYYY-MM-DDTHH:MM' no fuso horário local
        setDataAbertura(formattedDate);
        
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

    const handleAdicionarServico = () => {
        if (!servico) {
            alert("Por favor, selecione um serviço."); // Mensagem de alerta se nenhum serviço for selecionado
            return;
        }
        
        const servicoSelecionado = servicos.find(s => 
            s.nome === servico && s.bd_status !== "INATIVO");
        if (servicoSelecionado) {
            const novoServico = { id: servicoSelecionado._id, servico: servicoSelecionado.nome, valor: servicoSelecionado.preco };
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

    const handleDocumentoCliente = () => {
        let cliente_pesquisa = clientes.find(cliente => 
            cliente.documento === documentoCliente && cliente.bd_status !== "INATIVO"
        );
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

    
    // const handleCepChange = (e) => {
    //     const { value } = e.target;
    //     setCep(value);
    // };

    const handleCepDesfoque = (e) => {
        pesquisacep(e.target.value); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const dados = {
            "cliente": clienteObj?._id,
            "atendente": atendente,
            "tecnico": tecnico,
            "prioridade": prioridade,
            "status": statusChamado,
            "descricao": descricao,
            "previsao": previsaoAtendimento,
            "atendimento": atendimento,
            "dataAbertura": dataAbertura,
            "cep": cep,
            "rua": rua,
            "cidade": cidade,
            "bairro": bairro,
            "numero": numero,
            "servicos": servicosSelecionados.map(s => s.id),
        }


        for(let property in dados){
            if(property === "tecnico")
                continue;
            if(dados[property] !== undefined && dados[property] !== null){
                switch(property){
                    case "prioridade":
                    case "atendimento":
                    case "atendente":
                        console.log(`validando 1 :${property} valor 1:${document.getElementById(property).value}`)
                        if(document.getElementById(property).value === "Selecione...")
                            break;
                        else continue;

                    case "cep":
                    case "numero":
                    case "rua":
                    case "bairro":
                    case "descricao":
                    case "cidade":
                    case "previsao":
                    case "dataAbertura":
                        console.log(`validando 2: ${property} valor 2: ${dados[property]} ${dados[property] === ''}`)
                        if(Validar.isNotEmptyStr(dados[property]))
                            continue;
                        else break;

                    default:
                        console.log(`validando 3 :${property}`)
                        continue;
                }
            }
            
            setShowAlert(true);
            setTypeAlert("info");
            setMsgAlert(`Por favor, preencha o campo ${property}`);
            return;
            
        }
        setShowAlert(false);

        //return;

        // por ser opcional o tecnico é inserido apenas se for declarado
        // Adicione o técnico somente se tiver sido selecionado
        if (tecnico) {
            dados.tecnico = tecnico;
        }

        console.log('Servicos', dados.servicos);
        console.log('Rua', dados.rua);
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
            setShowAlert(true);
            if(response.success) {
                setMsgAlert("Chamado cadastrado com sucesso!");
                setTypeAlert("success");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setMsgAlert("Naõ foi possível realizar o cadastro!");
                setTypeAlert("info");
                // alert("Erro ao cadastrar o chamado!")
            }
        })
        .catch((err) => {
            setShowAlert(true);
            setTypeAlert("danger");
            if(err instanceof TypeError && err.message === "Failed to fetch")
                setMsgAlert(`Verifique sua conexão com a internet (${err.message}).`);
            else
                setMsgAlert(err.message);
        });
    };


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
                    <Form.Label column sm="auto" md={2}>
                        <ButtonGroup>
                            <ToggleButton
                                type="radio" 
                                size="sm" 
                                variant={cpfChecked?"primary":"secundary"} 
                                checked={cpfChecked} 
                                onClick={() => setCPFChecked(true)}
                            >
                                CPF
                            </ToggleButton>
                            <ToggleButton
                                type="radio"
                                size="sm" 
                                variant={!cpfChecked?"primary":"secundary"} 
                                checked={!cpfChecked}
                                onClick={() => setCPFChecked(false)}
                            >
                                CNPJ
                            </ToggleButton>
                        </ButtonGroup>    
                    </Form.Label>
                    <Col sm={8}>
                        {cpfChecked? 
                            <InputCPF id={"cpf"} required valueSetter={setDocumentoCliente} onBlur={handleDocumentoCliente}/> 
                            : 
                            <InputCNPJ id={"cnpj"} required valueSetter={setDocumentoCliente} onBlur={handleDocumentoCliente}/>
                        }
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Nome Cliente</Form.Label>  {/*Deve trazer o cliente pesquisado pelo cpf  */}
                    <Col sm={10}>
                        <InputNomePessoa pf={cpfChecked} value={clienteCampo} disabled/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CEP</Form.Label>
                    <Col sm={10}>
                        <InputCEP 
                            required 
                            msgError={cepError} 
                            msgErrorSetter={setCepError} 
                            valueSetter={setCep} 
                            onBlur={handleCepDesfoque}
                        />
                        {/* <Form.Control required placeholder="Ex.: 00000-000" maxLength={9} value={cep} onChange={handleCepChange} onBlur={handleCepDesfoque}/> */}
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Rua</Form.Label>
                    <Col sm={10}><Form.Control required type="text" id="rua" onChange={(e) => setRua(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Número</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="number"
                            min={1}
                            step={1}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Bairro</Form.Label>
                    <Col sm={10}><Form.Control required type="text" id="bairro" onChange={(e) => setBairro(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Cidade</Form.Label>
                    <Col sm={10}><Form.Control required type="text" id="cidade" onChange={(e) => setCidade(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Numero telefone</Form.Label>  {/*Deve o numero do cliente pesquisado pelo cpf  */}
                    <Col sm={10}>
                        <InputTelefoneFixo disabled defaultValue={clienteContato}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Descrição Chamado</Form.Label>
                    <Col sm={10}><Form.Control  as="textarea" rows={3}
                                               onChange={e=> setDescricao(e.target.value)}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Data de Abertura</Form.Label>
                <Col sm={10}>
                    <Form.Control 
                        required
                        type="datetime-local"
                        value={dataAbertura}
                        max={Validar.Data.TodayHTMLDatetimeLocalFormat} 
                        onChange={(e) => setDataAbertura(e.target.value)} 
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Prioridade</Form.Label> 
                    <Col sm={10}>
                    <Form.Control id="prioridade" required as="select" defaultValue={'default'} onChange={e => setPrioridade(e.target.value)} value={prioridade}>
                    <option key='default' disabled >Selecione...</option>
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
                        min={Validar.Data.TodayHTMLDateFormat} 
                        value={previsaoAtendimento} // Permite que o usuário altere o valor
                    />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Atendimento</Form.Label> 
                    <Col sm={10}>
                    <Form.Control id="atendimento" required as="select" onChange={e => setAtendimento(e.target.value)} value={atendimento}>
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
                        <Form.Control id="atendente" required as="select" onChange={(e)=> setAtendente(e.target.value)} value={atendente._id}>
                            {atendentes_alfabetico.length > 0 ?
                                <><option selected disabled >Selecione...</option>
                                {atendentes_alfabetico
                                    .filter((atendente) => atendente.bd_status !== "INATIVO")
                                    .map((atendente) => {
                                    return (<option value={atendente._id}>{atendente.nome}</option>)
                                })}</> :
                                <option selected disabled>Não há nenhum atendente cadastrado.</option>
                            }
                        </Form.Control>
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Tecnico</Form.Label> {/*Deve trazer todos os técnicos cadastrados, em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control required as="select" onChange={(e)=> setTecnico(e.target.value)}>
                            {tecnicos_alfabetico.length > 0 ?
                                <><option selected disabled >Selecione...</option>
                                {tecnicos_alfabetico
                                    .filter((tecnico) => tecnico.bd_status !== "INATIVO")
                                    .map((tecnico) => {
                                    return (<option key={`key-${tecnico._id}`} value={tecnico._id}>{tecnico.nome}</option>)
                                })}</> :
                                <option selected disabled>Não há nenhum técnico cadastrado.</option>
                            }
                        </Form.Control>
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Serviço</Form.Label>
                    <Col sm={8}>
                        <Form.Control id="servico" as="select" value={servico} onChange={(e) => setServico(e.target.value)}>
                            <option value="">Selecione um serviço...</option>
                            {servicos
                                .filter((s) => s.bd_status !== "INATIVO")
                                .map((s) => (
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
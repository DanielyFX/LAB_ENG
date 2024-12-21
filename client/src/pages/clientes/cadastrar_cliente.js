import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from 'react-bootstrap/Alert';
import '../../css/clientes/cadclientes.css';
import { ButtonGroup } from "react-bootstrap";
import ToggleButton  from "react-bootstrap/ToggleButton";
import CEP from "../../utils/cep";
import Str from "../../utils/str";
import Validar from "../../utils/validar";
import InputCPF from "../../components/Input-CPF";
import InputCNPJ from "../../components/Input-CNPJ";
import InputCEP from "../../components/Input-CEP";
import InputTelefoneFixo from "../../components/Input-TelFixo";
import InputTelefoneCelular from "../../components/Input-TelCel";
import InputEmail from "../../components/Input-Email";
import InputNomePessoa from "../../components/Input-NomePessoa";
import InputTextRelativeToCEP from "../../components/Input-TextRelativeToCEP";
import InputEndereco from '../../components/Input-Endereco';
import InputDadosCliente from "../../components/Input-DadosCliente";

export default function CadastrarCliente() {

    const [nome, setNome] = useState('');
    const [documento, setDocumento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');

    const [cpfChecked, setCPFChecked] = useState(false);
    const [cepError, setCepError] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');

    useEffect(()=>{
        setDocumento('');
        if(cpfChecked)
            document.getElementById('cpf').focus();
        else
            document.getElementById('cnpj').focus();
    }, [cpfChecked]);

    useEffect(()=>{
        try{
            if(!Validar.CEP(cep)) return;
            const updateCEP = async () => {
                try{
                    const data = await  CEP.getDataFrom(cep);
                    if(data instanceof Object){
                        if("bairro" in data) setBairro(data.bairro ?? '');
                        if("estado" in data) setCidade(data.estado ?? '');
                        if("logradouro" in data) setRua(data.logradouro ?? '');
                    }
                    setCepError('');
                }catch(erro){
                    setCepError(erro?.message);
                }
            }
            updateCEP();
        }catch(erro){
            setCepError(erro?.message);
        }
    }, [cep]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const dados = {
            "nome": nome,
            "documento": documento,
            "telefone": telefone,
            "celular": celular,
            "rua": rua,
            "cidade": cidade,
            "bairro": bairro,
            "numero": numero,
            "email": email,
            "cep": cep,
        }

        for(let property in dados){
            if(Str.isNotEmpty(dados[property]))
                continue;
            else
                return;
        }

        console.log(dados)

        fetch('http://localhost:3001/inicio/clientes/novo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
            mode: 'cors'
        })
        .then((resultado) => resultado.json())
        .then((response) => {
            console.log(response)
            if(response.success) {
                setShowAlert(true);
                setMsgAlert(`Cliente ${dados.nome} Cadastrado com sucesso!`);
                setTypeAlert("success");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setShowAlert(true);
                setTypeAlert("warning");
                setMsgAlert(`Erro ao cadastrar o cliente! ${cpfChecked?"CPF":"CNPJ"} já cadastrado!`);
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
        <div id="cadcliente-main">
            <Alert 
                variant={typeAlert} 
                show={showAlert} 
                onClose={() => setShowAlert(false)} 
                dismissible
            >
                <strong><p>{msgAlert}</p></strong>
            </Alert>
            <Form id="cadcliente-form" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Nome Completo</Form.Label>
                    <Col sm={10}>
                        <InputNomePessoa required pf={cpfChecked} valueSetter={setNome}/>
                    </Col>
                </Form.Group>
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
                            <InputCPF id={"cpf"} required valueSetter={setDocumento}/> 
                            : 
                            <InputCNPJ id={"cnpj"} required valueSetter={setDocumento}/>
                        }
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Telefone</Form.Label>
                    <Col sm={10}>
                        <InputTelefoneFixo required valueSetter={setTelefone} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Celular</Form.Label>
                    <Col sm={10}>
                        <InputTelefoneCelular required valueSetter={setCelular} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CEP</Form.Label>
                    <Col sm={10}>
                        <InputCEP 
                            required 
                            valueSetter={setCep} 
                            msgError={cepError} 
                            msgErrorSetter={setCepError} 
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Rua</Form.Label>
                    <Col sm={10}>
                        <InputTextRelativeToCEP required msgCepError={cepError} value={rua} valueSetter={setRua}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Número</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            id="cepNumber" 
                            type="number"
                            min="1" 
                            step="1"   
                            onChange={(e) => setNumero(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Bairro</Form.Label>
                    <Col sm={10}>
                        <InputTextRelativeToCEP required msgCepError={cepError} value={bairro} valueSetter={setBairro}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Cidade</Form.Label>
                    <Col sm={10}>
                        <InputTextRelativeToCEP required msgCepError={cepError} value={cidade} valueSetter={setCidade}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>E-mail</Form.Label>
                    <Col sm={10}>
                        <InputEmail required={true} valueSetter={setEmail} />
                    </Col>
                </Form.Group>
                <InputDadosCliente
                    docSetter={setDocumento} 
                    nameSetter={setNome} 
                    telSetter={setTelefone} 
                    celSetter={setCelular} 
                    emailSetter={setEmail}
                />
                <InputEndereco
                    cepSetter={setCep} 
                    citySetter={setCidade} 
                    neighborhoodSetter={setBairro} 
                    streetSetter={setRua}
                    numberSetter={setNumero}
                />

                {/*<Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Data de Cadastro</Form.Label>
                    <Col sm={10}><Form.Control required type="datetime-local" /></Col>
                </Form.Group>*/}

                <ButtonGroup>
                    <Button variant="primary" type="submit">Cadastrar</Button>
                    <Button variant="secondary" href="/inicio">Cancelar</Button>
                </ButtonGroup>

            </Form>
        </div>
    );
}


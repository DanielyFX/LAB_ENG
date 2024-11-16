import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from 'react-bootstrap/Alert';
import '../../css/clientes/cadclientes.css';
import { ButtonGroup } from "react-bootstrap";
import ToggleButton  from "react-bootstrap/ToggleButton";
import { Validar } from "../validacao";

export default function Cadastrar_cliente() {

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
    const [nomeError, setNomeError] = useState('');
    const [documentoError, setDocumentoError] = useState('');
    const [telefoneError, setTelefoneError] = useState('');
    const [celularError, setCelularError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cepError, setCepError] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');

    const handleSelectedDocument = () => {
        setCPFChecked(!cpfChecked);
        document.getElementById("document").value = "";
        document.getElementById("document").focus();
    }

    async function handleCepChange(event){
        try{
            Validar.CEP.handleOnChange(event.target.value, setCep, setCepError);
            
            if(Validar.CEP.hasNextKey(event.target.value)) return;
            
            const digits = Validar.CEP.getOnlyDigits(event.target.value)
            const dados = await Validar.CEP.getDataFrom(digits);

            setBairro(dados.bairro || "");
            setCidade(dados.estado || "");
            setRua(dados.logradouro || "");
        
        }catch(err){
            setShowAlert(true);
            setMsgAlert(err.message);
            setTypeAlert("danger");
        }
    };

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
                        <Form.Control 
                            required 
                            type="text" 
                            onChange={(e) => Validar.NomePessoa.handleOnChange(e.target.value, setNome, setNomeError)}
                            onKeyDown={(e) => Validar.NomePessoa.handleKeyDown(e)}
                            isInvalid={nomeError}
                        />
                        <Form.Control.Feedback>
                            {nomeError}
                        </Form.Control.Feedback>
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
                                onClick={() => handleSelectedDocument()}
                            >
                                CPF
                            </ToggleButton>
                            <ToggleButton
                                type="radio"
                                size="sm" 
                                variant={!cpfChecked?"primary":"secundary"} 
                                checked={!cpfChecked}
                                onClick={() => handleSelectedDocument()}
                            >
                                CNPJ
                            </ToggleButton>
                        </ButtonGroup>    
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control 
                            required 
                            id="document" 
                            type="text" 
                            maxLength={cpfChecked ? Validar.CPF.maxLength : Validar.CNPJ.maxLength}
                            isInvalid={documentoError}
                            placeholder={cpfChecked ? "000.000.000-00" : "00.000.000/0000-00"} 
                            onChange={cpfChecked ? (e) => Validar.CPF.handleOnChange(e.target.value, setDocumento, setDocumentoError) : (e) => Validar.CNPJ.handleOnChange(e.target.value, setDocumento, setDocumentoError)}
                            onKeyDown={cpfChecked?(e) => Validar.CPF.handleKeyDown(e) : (e) => Validar.CNPJ.handleKeyDown(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {documentoError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Telefone</Form.Label>
                    <Col sm={10}>
                    <Form.Control 
                        required 
                        id="telefone" 
                        placeholder="(00) 0000-0000" 
                        type="text" 
                        maxLength={Validar.TelFixo.maxLength} 
                        isInvalid={telefoneError}
                        onChange={(e) => Validar.TelFixo.handleOnChange(e.target.value, setTelefone, setTelefoneError)}
                        onKeyDown={(e) => Validar.TelFixo.handleKeyDown(e)}
                    />
                    <Form.Control.Feedback type="invalid">
                            {telefoneError}
                    </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Celular</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required 
                            id="celular" 
                            placeholder="(00) 00000-0000"
                            type="text"
                            maxLength={Validar.TelCel.maxLength}
                            isInvalid={celularError}
                            onChange={(e) => Validar.TelCel.handleOnChange(e.target.value, setCelular, setCelularError)}
                            onKeyDown={(e) => Validar.TelCel.handleKeyDown(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {celularError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CEP</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            id="cep" 
                            required 
                            placeholder="00000-000" 
                            maxLength={Validar.CEP.maxLength} 
                            isInvalid={cepError} 
                            onKeyDown={(e) => Validar.CEP.handleKeyDown(e)} 
                            onChange={handleCepChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            {cepError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Rua</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            id="rua" 
                            readOnly={!(cepError && cepError !== "Obrigatório!" && cepError !== "Incompleto!")}
                            value={rua} 
                            className={(cepError && cepError !== "Obrigatório!" && cepError !== "Incompleto!")?"":"bg-secondary-subtle"} 
                            type="text"
                            onChange={(e) => setRua(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Número</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
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
                        <Form.Control 
                            id="bairro" 
                            readOnly={!(cepError && cepError !== "Obrigatório!" && cepError !== "Incompleto!")}
                            value={bairro} 
                            type="text" 
                            className={(cepError && cepError !== "Obrigatório!" && cepError !== "Incompleto!")?"":"bg-secondary-subtle"} 
                            onChange={(e) => setBairro(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Cidade</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            id="cidade" 
                            readOnly={!(cepError && cepError !== "Obrigatório!" && cepError !== "Incompleto!")}
                            value={cidade} 
                            className={(cepError && cepError !== "Obrigatório!" && cepError !== "Incompleto!")?"":"bg-secondary-subtle"}
                            type="text" 
                            onChange={(e) => setCidade(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>E-mail</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            required  
                            placeholder="exemplo@email.com" 
                            type="email"
                            isInvalid={emailError}
                            onChange={(e) => Validar.Email.handleOnChange(e.target.value, setEmail, setEmailError)}
                            onKeyDown={(e) => Validar.Email.handleKeyDown(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {emailError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

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


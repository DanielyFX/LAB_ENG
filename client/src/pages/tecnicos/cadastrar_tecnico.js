import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/tecnicos/cadtecnicos.css'
import { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Validar } from '../validacao';
import Alert from 'react-bootstrap/Alert';

export default function Cadastrar_tecnico() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [dataContrato, setDataContrato] = useState('');
    const [senha, setSenha] = useState('');

    const [nomeError, setNomeError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [telefoneError, setTelefoneError] = useState('');
    const [celularError, setCelularError] = useState('');
    const [dataContratoError, setDataContratoError] = useState('');
    const [senhaError, setSenhaError] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const tudoValido = 
            !nomeError
            && !emailError
            && !cpfError
            && !telefoneError
            && !celularError
            && !dataContratoError
            && !senhaError;

        if(tudoValido === false) return;

        const dados = {
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
            "celular": celular,
            "dataContrato": dataContrato,
            "email": email,
            "senha": senha
        }
        fetch('http://localhost:3001/inicio/tecnicos/novo', {
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
                setShowAlert(true);
                setMsgAlert(`Técnico ${dados.nome}: Cadastrado com Sucesso!`);
                setTypeAlert("success");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setShowAlert(true);
                setMsgAlert(`Erro ao cadastrar! CPF ${Validar.CPF.getFormated(dados.cpf)} já cadastrado.`);
                setTypeAlert("info");
            }
        })
        .catch((err) => {
            setShowAlert(true);
            setTypeAlert("danger");
            if(err instanceof TypeError && err.message === "Failed to fetch")
                setMsgAlert(`Erro: Verifique sua conexão com a internet (${err.message}).`);
            else
                setMsgAlert(`Erro: ${err.message}`);
        })
    }

    return (
        <div id="cadtecnico-main">
            <Alert 
                variant={typeAlert} 
                show={showAlert} 
                onClose={() => setShowAlert(false)} 
                dismissible
            >
                <strong><p>{msgAlert}</p></strong>
            </Alert>
            <Form id="cadtecnico-form" onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Nome Completo</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            required 
                            onChange={(e) => Validar.NomePessoa.handleOnChange(e.target.value, setNome, setNomeError)} 
                            onKeyDown={(e) => Validar.NomePessoa.handleKeyDown(e)}
                            isInvalid={nomeError}
                            type="text"/>
                        <Form.Control.Feedback type="invalid">
                            {nomeError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CPF</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            id="cpf" 
                            required 
                            placeholder="000.000.000-00" 
                            maxLength={14} 
                            onChange={(e) => Validar.CPF.handleOnChange(e.target.value, setCpf, setCpfError)} 
                            onKeyDown={(e)=> Validar.CPF.handleKeyDown(e)}
                            isInvalid={cpfError}
                            type="text"
                        />
                        <Form.Control.Feedback type="invalid">
                            {cpfError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Telefone</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            id="telFixo" 
                            required 
                            placeholder="(00) 0000-0000" 
                            maxLength={14} 
                            onChange={(e) => Validar.TelFixo.handleOnChange(e.target.value, setTelefone, setTelefoneError)} 
                            onKeyDown={(e) => Validar.TelFixo.handleKeyDown(e)}
                            isInvalid={telefoneError}
                            type="text"/>
                        <Form.Control.Feedback type="invalid">
                            {telefoneError}
                        </Form.Control.Feedback>
                        </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Celular</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            id="telCel"
                            required 
                            placeholder="(00) 00000-0000" 
                            maxLength={15} 
                            onChange={(e) => Validar.TelCel.handleOnChange(e.target.value, setCelular, setCelularError)} 
                            onKeyDown={(e) => Validar.TelCel.handleKeyDown(e)}
                            isInvalid={celularError}
                            type="text"/>
                        <Form.Control.Feedback type="invalid">
                            {celularError}
                        </Form.Control.Feedback>
                        </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                        <Form.Control  
                            required  
                            placeholder="exemplo@email.com" 
                            onChange={(e) => Validar.Email.handleOnChange(e.target.value, setEmail, setEmailError)}
                            onKeyDown={(e) => Validar.Email.handleKeyDown(e)}
                            isInvalid={emailError}
                            type="email"
                        />
                        <Form.Control.Feedback type="invalid">
                            {emailError}
                        </Form.Control.Feedback>
                        </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Senha</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            required 
                            maxLength={8} 
                            onChange={(e) => Validar.Senha.handleOnChange(e.target.value, setSenha, setSenhaError)}
                            isInvalid={senhaError}
                            type="password" 
                        />
                        <Form.Control.Feedback type="invalid">
                            {senhaError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Data de contrato</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            required 
                            onChange={(e) => Validar.DataContrato.handleOnChange(e.target.value, setDataContrato, setDataContratoError)}
                            isInvalid={dataContratoError}
                            max={Validar.DataContrato.TodayHTMLDatetimeLocalFormat} 
                            type="datetime-local"
                        />
                        <Form.Control.Feedback type="invalid">
                            {dataContratoError}
                        </Form.Control.Feedback>
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
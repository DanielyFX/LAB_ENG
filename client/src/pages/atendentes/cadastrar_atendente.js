import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/atendentes/cadatendentes.css'
import { ButtonGroup } from 'react-bootstrap';
import {useState} from "react";
import {Validar} from '../validacao'

export default function Cadastrar_atendente() {

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
        
        if(tudoValido === false){
            console.error("Formulário inválido:");
            console.error(
                `nome: ${nomeError}
                emailError: ${emailError}
                cpfError: ${cpfError}
                telefoneError: ${telefoneError}
                celularError: ${celularError}
                dataContratoError: ${dataContratoError}
                senhaError: ${senhaError}` 
            );
            return;
        }

        const dados = {
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
            "celular": celular,
            "dataContrato": dataContrato,
            "email": email,
            "senha": senha
        }
        fetch('http://localhost:3001/inicio/atendentes/novo', {
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
                    alert("Atendente Cadastrado com Sucesso!")
                    window.location.reload()
                } else {
                    alert("Erro ao cadastrar o atendente!")
                }
            })
    }

    return (
        <div id="cadatendente-main">
            <Form id="cadatendente-form" onSubmit={handleSubmit}>
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
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/atendentes/cadatendentes.css'
import { ButtonGroup } from 'react-bootstrap';
import {useState} from "react";
import {
    CadastroPessoaFisica as CPF,
    TelefoneFixo as TelFixo,
    TelefoneCelular as TelCel,
    Validar
} from '../validacao'

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

    //#region HandlingThings
    const handleKeyDownCpf= (e) => {
        if(Validar.isCaracterDeControle(e.key)) return;

        if(!CPF.isValidKey(e.key)){
            e.preventDefault();
        }else if(!CPF.hasNextKey(e.target.value)){
            e.preventDefault();
        }else{
            e.target.value += CPF.getNextFormatKey(e.target.value);
        }
    }

    const handleKeyDownTelFixo = (e) => {
        if(Validar.isCaracterDeControle(e.key)) return;

        if(!TelFixo.isValidKey(e.key)){
            e.preventDefault();
        }else if(!TelFixo.hasNextKey(e.target.value)){
            e.preventDefault();
        }else{
            e.target.value += TelFixo.getNextFormatKey(e.target.value);
        }
    }

    const handleKeyDownTelCel = (e) => {
        if(Validar.isCaracterDeControle(e.key)) return;

        if(!TelCel.isValidKey(e.key)){
            e.preventDefault();
        }else if(!TelCel.hasNextKey(e.target.value)){
            e.preventDefault();
        }else{
            e.target.value += TelCel.getNextFormatKey(e.target.value);
        }
    }

    const handleKeyDownNome = (e) => {
        if(Validar.isCaracterDeControle(e.key)) return;

        if(!Validar.isNomeKey(e.key)){
            e.preventDefault();
        }
    }

    const handleKeyDownEmail = (e) => {
        if(Validar.isCaracterDeControle(e.key)) return;

        if(!Validar.isEmailKey(e.key)){
            e.preventDefault();
        }
    }

    //#endregion

    //#region Validating
    const validarNome = (nome) => {
        if(Validar.isNome(nome)){
            setNomeError('');
            setNome(nome);
        }else if(Validar.isNotEmptyStr(nome)){
            setNomeError('Inválido');
        }else{
            setNomeError('Obrigatório');
        }
    }

    const validarCPF = (cpf) => {
        if(cpf === ""){
            setCpfError("Obrigatório!");
        }
        else if(CPF.hasNextKey(cpf)){
            setCpfError("Incompleto!");
        //}else if(!CPF.isNumericValid(cpf)){
          //  setCpfError("Inválido!");
        }else{
            setCpfError("");
            setCpf(CPF.getOnlyDigits(cpf));
        }
    }

    const validarEmail = (email) => {
        if(!Validar.isNotEmptyStr(email)){
            setEmailError("Obrigatório!")
        }else if(!Validar.isEmail(email)){
            setEmailError("Inválido.")
        }else{
            setEmail(email);
            setEmailError("");
        }
    }

    const validarTel = (telefone) => {
        if(TelFixo.isFormatValid(telefone)){
            setTelefone(telefone);
            setTelefoneError("");
        }else if(!Validar.isNotEmptyStr(telefone)){
            setTelefoneError("Obrigatório!");
        }else{
            setTelefoneError("Incompleto!");
        }
    }

    const validarCel = (celular) => {
        if(TelCel.isFormatValid(celular)){
            setCelular(celular);
            setCelularError("");
        }else if(!Validar.isNotEmptyStr(celular)){
            setCelularError("Obrigatório!");
        }else{
            setCelularError("Incompleto!");
        }
    }

    const validarSenha = (senha) => {
        if(Validar.isSenha(senha)){
            setSenhaError("");
            setSenha(senha);
        }else if(!Validar.isNotEmptyStr(senha)){
            setSenhaError("Obrigatório!");
        }else{
            setSenhaError("Incompleto!");
        }
    }

    const validarDataContrato = (data) => {
        if(Validar.isNotEmptyStr(data)){
            setDataContrato(data);
        }else{
            setDataContratoError("Obrigatório");
        }
    }
    //#endregion
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
        console.log("cpf inserido", dados.cpf);
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
                    alert(response.message)
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
                            onChange={(e) => validarNome(e.target.value)} 
                            onKeyDown={(e) => handleKeyDownNome(e)}
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
                            onChange={(e) => validarCPF(e.target.value)} 
                            onKeyDown={(e)=> handleKeyDownCpf(e)}
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
                            onChange={(e) => validarTel(e.target.value)} 
                            onKeyDown={(e) => handleKeyDownTelFixo(e)}
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
                            onChange={(e) => validarCel(e.target.value)} 
                            onKeyDown={(e) => handleKeyDownTelCel(e)}
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
                            onChange={(e) => validarEmail(e.target.value)}
                            onKeyDown={(e) => handleKeyDownEmail(e)}
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
                            onChange={(e) => validarSenha(e.target.value)}
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
                            onChange={(e) => validarDataContrato(e.target.value)}
                            isInvalid={dataContratoError}
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
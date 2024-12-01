import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from 'react-bootstrap/Alert';
import '../../css/atendentes/cadatendentes.css';
import { ButtonGroup } from 'react-bootstrap';
import { useState } from "react";
import { Validar } from '../validacao';
import InputCPF from "../../components/Input-CPF";
import InputTelefoneFixo from "../../components/Input-TelFixo";
import InputTelefoneCelular from "../../components/Input-TelCel";
import InputEmail from "../../components/Input-Email";
import InputNomePessoa from "../../components/Input-NomePessoa";
import InputPassword from "../../components/Input-Password";
import InputDataContrato from "../../components/Input-DataContrato";

export default function CadastrarAtendente() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [dataContrato, setDataContrato] = useState('');
    const [senha, setSenha] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const tudoValido = 
            nome
            && email
            && cpf
            && telefone
            && celular
            && dataContrato
            && senha;
        
        if(!tudoValido){
            console.error("Formulário inválido:");
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
                setShowAlert(true);
                setMsgAlert(`Atendente ${dados.nome}: Cadastrado com Sucesso!`);
                setTypeAlert("success");
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            } else {
                setShowAlert(true);
                setMsgAlert(`CPF ${Validar.CPF.getFormated(dados.cpf)} já cadastrado!`);
                setTypeAlert("info");
            }
        })
        .catch((error) => {
            setShowAlert(true);
            setTypeAlert("danger");
            if(error instanceof TypeError && error.message === "Failed to fetch")
                setMsgAlert(`Erro: Verifique sua conexão com a internet (${error.message}).`);
            else
                setMsgAlert(`Erro: ${error.message}`);
        });
    }

    return (
        <div id="cadatendente-main">
            <Alert 
                variant={typeAlert} 
                show={showAlert} 
                onClose={() => setShowAlert(false)} 
                dismissible
            >
                <strong><p>{msgAlert}</p></strong>
            </Alert>
            <Form id="cadatendente-form" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Nome Completo</Form.Label>
                    <Col sm={10}>
                        <InputNomePessoa required pf valueSetter={setNome}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CPF</Form.Label>
                    <Col sm={10}>
                        <InputCPF required valueSetter={setCpf} />
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
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                        <InputEmail required={true} valueSetter={setEmail} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Senha</Form.Label>
                    <Col sm={10}>
                        <InputPassword required valueSetter={setSenha}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Data de contrato</Form.Label>
                    <Col sm={10}>
                        <InputDataContrato required valueSetter={setDataContrato}/>
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
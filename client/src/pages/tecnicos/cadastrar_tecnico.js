import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/tecnicos/cadtecnicos.css'
import { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Str from "../../utils/str";
import CPF from "../../utils/cpf";
import Alert from 'react-bootstrap/Alert';
import InputCPF from "../../components/Input-CPF";
import InputPassword from "../../components/Input-Password";
import InputDataContrato from "../../components/Input-DataContrato";
import InputTelefoneFixo from "../../components/Input-TelFixo";
import InputTelefoneCelular from "../../components/Input-TelCel";
import InputEmail from "../../components/Input-Email";
import InputNomePessoa from "../../components/Input-NomePessoa";

export default function CadastrarTecnico() {

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

        const dados = {
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
            "celular": celular,
            "dataContrato": dataContrato,
            "email": email,
            "senha": senha
        }

        for(let property in dados){
            if(Str.isNotEmpty(dados[property]))
                continue;
            else
                return;
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
                setMsgAlert(`Erro ao cadastrar! CPF ${CPF.getFormated(dados.cpf)} já cadastrado.`);
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
                        <InputNomePessoa pf required valueSetter={setNome}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CPF</Form.Label>
                    <Col sm={10}>
                        <InputCPF required valueSetter={setCpf}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Telefone</Form.Label>
                    <Col sm={10}>
                       <InputTelefoneFixo required valueSetter={setTelefone}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Celular</Form.Label>
                    <Col sm={10}>
                        <InputTelefoneCelular required valueSetter={setCelular}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                        <InputEmail required valueSetter={setEmail}/>
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
                        <InputDataContrato required valueSetter={setDataContrato} />
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
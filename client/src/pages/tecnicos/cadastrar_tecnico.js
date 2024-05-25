import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/tecnicos/cadtecnicos.css'
import {useState} from "react";
import { ButtonGroup } from "react-bootstrap";

export default function Cadastrar_tecnico() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [dataContrato, setDataContrato] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const dados = {
            "nome": nome,
            "cpf": cpf,
            "telefone": telefone,
            "celular": celular,
            "dataContrato": dataContrato,
            "email": email
        }
        fetch('http://localhost:3001/tecnicos/novo', {
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
                    alert("Técnico Cadastrado com Sucesso!")
                    window.location.reload()
                } else {
                    alert("Erro ao cadastrar o técnico!")
                }
            })
    }

    return (
        <div id="cadtecnico-main">
            <Form id="cadtecnico-form" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Nome Completo</Form.Label>
                    <Col sm={10}><Form.Control required onChange={(e) => setNome(e.target.value)} type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CPF</Form.Label>
                    <Col sm={10}><Form.Control required placeholder="Ex.: 000.000.000-00" maxLength={14} onChange={(e) => setCpf(e.target.value)} type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Telefone</Form.Label>
                    <Col sm={10}><Form.Control required placeholder="Ex.: (00) 0000-0000" maxLength={14} onChange={(e) => setTelefone(e.target.value)} type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Celular</Form.Label>
                    <Col sm={10}><Form.Control required placeholder="Ex.: (00) 00000-0000" maxLength={15} onChange={(e) => setCelular(e.target.value)} type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}><Form.Control  required  placeholder="Ex.: exemplo@email.com" onChange={(e) => setEmail(e.target.value)} type="email"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Senha</Form.Label>
                    <Col sm={10}><Form.Control required maxLength={8} onChange={(e) => setEmail(e.target.value)} type="password" /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Data de contrato</Form.Label>
                    <Col sm={10}><Form.Control required onChange={(e) => setDataContrato(e.target.value)} type="datetime-local"/></Col>
                </Form.Group>

                <ButtonGroup>
                    <Button variant="primary" type="submit">Cadastrar</Button>
                    <Button variant="secondary" href="/inicio">Cancelar</Button>
                </ButtonGroup>

            </Form>
        </div>
    )
}
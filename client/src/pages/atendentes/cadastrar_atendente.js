import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/atendentes/cadatendentes.css'

export default function Cadastrar_atendente() {
    return (
        <div id="cadatendente-main">
            <Form id="cadatendente-form" method="GET" action="/atendentes/cadastrar">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>codigo</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>data de contrato</Form.Label>
                    <Col sm={10}><Form.Control type="datetime-local"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>nome</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>cpf</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>rg</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>telefone</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>celular</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>endereço</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>email</Form.Label>
                    <Col sm={10}><Form.Control type="email"/></Col>
                </Form.Group>
                <Button variant="primary" type="submit">Cadastrar</Button>
            </Form>
        </div>
    )
}
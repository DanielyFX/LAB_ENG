import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/servicos/cadservicos.css'

export default function Cadastrar_servico() {
    return (
        <div id="cadservico-main">
            <Form id="cadservico-form" method="GET" action="/servicos/cadastrar">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Nome do Serviço</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Tipo</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Descrição</Form.Label>
                    <Col sm={10}><Form.Control as="textarea" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Preço Unitário</Form.Label>
                    <Col sm={10}><Form.Control type="number"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Data de cadastro</Form.Label>
                    <Col sm={10}><Form.Control type="datetime-local"/></Col>
                </Form.Group>
                <Button variant="primary" type="submit">Cadastrar</Button>
            </Form>
        </div>
    )
}
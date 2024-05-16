import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'

export default function Cadastrar_chamado() {
    return (
        <div id="cadchamado-main">
            <Form id="cadchamado-form" method="GET" action="/chamados/cadastrar">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Cliente</Form.Label>  {/*Deve trazer todos os cliente cadastrados , em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control as="select">
                            <option>Selecione...</option>
                            <option value="">Cliente1</option>
                            <option value="">Cliente2</option>
                            <option value="">Cliente3</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Descrição Chamado</Form.Label>
                    <Col sm={10}><Form.Control as="textarea" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Prioridade</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="select">
                            <option>Selecione...</option>
                            <option value="baixa">Baixa</option>
                            <option value="média">Média</option>
                            <option value="alta">Alta</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Previsão de Atendimento</Form.Label>
                    <Col sm={10}><Form.Control type="datetime-local"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Data de Abertura</Form.Label>
                    <Col sm={10}><Form.Control type="datetime-local"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Atendente</Form.Label> {/*Deve trazer todos os atendentes cadastrados , em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control as="select">
                            <option>Selecione...</option> 
                            <option value="">Atendente1</option>
                            <option value="">Atendente2</option>
                            <option value="">Atendente3</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">Cadastrar</Button>
            </Form>
        </div>
    )
}
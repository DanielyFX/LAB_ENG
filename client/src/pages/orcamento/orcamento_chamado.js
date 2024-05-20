import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'

export default function Orcamento_chamado() {
    return (
        <div id="cadchamado-main">
            <Form id="cadchamado-form" method="GET" action="/chamados/cadastrar">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Técnico Responsavel</Form.Label>  {/*Deve trazer todos os tecnicos cadastrados , em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control as="select">
                            <option>Selecione...</option>
                            <option value="">Tecnico1</option>
                            <option value="">Tecnico2</option>
                            <option value="">Tecnico3</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Descrição Serviço</Form.Label>
                    <Col sm={10}><Form.Control as="textarea" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Tipo de Serviço</Form.Label>  {/*Deve trazer todos os serviços cadastrados , em ordem alfabetica  */}
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
                    <Form.Label column sm={2}>Tempo Execução</Form.Label>
                    <Col sm={10}><Form.Control type="text" /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Garantia</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Data de Solicitação</Form.Label>
                    <Col sm={10}><Form.Control type="datetime-local"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Endereço Serviço</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Situação do Orçamento</Form.Label> {/*Deve trazer todos os atendentes cadastrados , em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control as="select">
                            <option>Selecione...</option> 
                            <option value="">Aprovado</option>
                            <option value="">Reprovado</option>
                            <option value="">Cancelado</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Observação</Form.Label>
                    <Col sm={10}><Form.Control type="textarea" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Desconto Serviço</Form.Label>
                    <Col sm={10}><Form.Control type="text" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Preço Total</Form.Label>
                    <Col sm={10}><Form.Control type="text" rows={3}/></Col>
                </Form.Group>

                <Button variant="primary" type="submit">Cadastrar</Button>
            </Form>
        </div>
    )
}
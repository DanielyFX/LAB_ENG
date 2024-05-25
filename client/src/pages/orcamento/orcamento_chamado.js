import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'
import { ButtonGroup } from "react-bootstrap";

export default function Orcamento_chamado() {
    return (
        <div id="cadchamado-main">
            <Form id="cadchamado-form" method="GET" action="/chamados/cadastrar">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Técnico Responsavel</Form.Label>  {/*Deve trazer todos os tecnicos cadastrados , em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control as="select">
                            <option selected disabled >Selecione...</option>
                            <option value="">Tecnico1</option>
                            <option value="">Tecnico2</option>
                            <option value="">Tecnico3</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>ID Chamado</Form.Label>  {/*Deve trazer todos os tecnicos cadastrados , em ordem alfabetica  */}
                    <Col sm={10}><Form.Control required type="text" /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Descrição Serviço</Form.Label>
                    <Col sm={10}><Form.Control required as="textarea" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Tipo de Serviço</Form.Label>  {/*Deve trazer todos os serviços cadastrados , em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control as="select">
                            <option selected disabled>Selecione...</option>
                            <option value="baixa">Configuração</option>
                            <option value="média">Instalação</option>
                            <option value="alta">Manutenção</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Tempo Execução</Form.Label>
                    <Col sm={10}><Form.Control required type="text" /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Garantia</Form.Label>
                    <Col sm={10}><Form.Control required  type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Data de Solicitação</Form.Label>
                    <Col sm={10}><Form.Control required  type="datetime-local"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Endereço Serviço</Form.Label>
                    <Col sm={10}><Form.Control required type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2} >Situação do Orçamento</Form.Label> {/*Deve trazer todos os atendentes cadastrados , em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control as="select">
                            <option selected disabled >Selecione...</option> 
                            <option value="">Aprovado</option>
                            <option value="">Reprovado</option>
                            <option value="">Cancelado</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Observação</Form.Label>
                    <Col sm={10}><Form.Control  type="textarea" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Desconto Serviço</Form.Label>
                    <Col sm={10}><Form.Control type="text" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Preço Total</Form.Label>
                    <Col sm={10}><Form.Control required type="text" rows={3}/></Col>
                </Form.Group>

                <ButtonGroup>
                    <Button variant="primary" type="submit">Cadastrar</Button>
                    <Button variant="secondary" href="/inicio">Cancelar</Button>
                </ButtonGroup>
                
            </Form>
        </div>
    )
}
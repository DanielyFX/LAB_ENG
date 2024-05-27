import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/chamados/cadchamados.css'
import { ButtonGroup } from "react-bootstrap";

export default function Cadastrar_chamado() {
    return (
        <div id="cadchamado-main">
            <Form id="cadchamado-form" method="GET" action="/chamados/cadastrar">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CPF/CNPJ Cliente</Form.Label>  {/*busca cpf do cliente , caso não encontre deve mostrar uma mensagem de não encontrado cliente */}
                    <Col sm={10}><Form.Control required placeholder="Ex.: 000.000.000-00" maxLength={14} type="text" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Cliente</Form.Label>  {/*Deve trazer o cliente pesquisado pelo cpf  */}
                    <Col sm={10}><Form.Control required type="text" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Descrição Chamado</Form.Label>
                    <Col sm={10}><Form.Control required  as="textarea" rows={3}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Prioridade</Form.Label>
                    <Col sm={10} >
                        <Form.Control as="select">
                            <option selected disabled >Selecione...</option>
                            <option value="baixa">Baixa</option>
                            <option value="média">Média</option>
                            <option value="alta">Alta</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Previsão de Atendimento</Form.Label>
                    <Col sm={10}><Form.Control required type="datetime-local"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Data de Abertura</Form.Label>
                    <Col sm={10}><Form.Control required type="datetime-local"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Atendente</Form.Label> {/*Deve trazer todos os atendentes cadastrados , em ordem alfabetica  */}
                    <Col sm={10}>
                        <Form.Control required as="select">
                            <option selected disabled >Selecione...</option> 
                            <option value="">Atendente1</option>
                            <option value="">Atendente2</option>
                            <option value="">Atendente3</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Orçamento</Form.Label> 
                    <Col sm={10}>
                        <Form.Control as="select">
                            <option selected disabled >Selecione...</option> 
                            <option value="">Não iniciado</option>
                            <option value="">Realizado</option>
                            <option value="">Aprovado</option>
                            <option value="">Cancelado</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Status Chamado</Form.Label> 
                    <Col sm={10}>
                        <Form.Control as="select">
                            <option selected disabled >Selecione...</option> 
                            <option value="">Não iniciado</option>
                            <option value="">Em análise</option>
                            <option value="">Concluído</option>
                            <option value="">Cancelado</option>
                        </Form.Control>
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
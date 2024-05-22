import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function OrcamentoModal(props) {

    const {handleClose, orcamentos, orcamento_key} = props;
    let dados = orcamentos[orcamento_key];

    return (
        <>
            <Modal {...props} >
                <Form method="GET" action="/orcamento">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar orçamento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>codigo</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.id}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Descrição</Form.Label>
                            <Col sm={10}><Form.Control as="textarea" rows={3} defaultValue={dados.descricao}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>tempo de execução</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.execucao}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>garantia</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.garantia}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>data solicitacao</Form.Label>
                            <Col sm={10}><Form.Control type="date" defaultValue={new Date(dados.dataCriacao).toISOString().substring(0,10)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>endereço serviço</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.endereco}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>situação do orçamento</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.situacao}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>observação</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.observacao}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>desconto</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.desconto}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>preço total</Form.Label>
                            <Col sm={10}><Form.Control type="number" defaultValue={parseFloat(dados.preco)}/></Col>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleClose} type='submit'>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
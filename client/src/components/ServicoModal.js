import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ServicoModal(props) {

    const {handleClose, servicos, servico_key} = props;
    let dados = servicos[servico_key];

    return (
        <>
            <Modal {...props} >
                <Form method="GET" action="/servicos">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar técnico</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>codigo</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.id}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>nome</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.nome}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Tipo</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.tipo}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Descrição</Form.Label>
                            <Col sm={10}><Form.Control as="textarea" rows={3} defaultValue={dados.descricao}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Preço Unitário</Form.Label>
                            <Col sm={10}><Form.Control type="number" defaultValue={parseFloat(dados.preco)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>data criação</Form.Label>
                            <Col sm={10}><Form.Control type="date" defaultValue={new Date(dados.dataCriacao).toISOString().substring(0,10)}/></Col>
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

export default ServicoModal;
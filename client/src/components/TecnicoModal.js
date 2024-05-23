import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TecnicoModal(props) {

    const {handleClose, tecnicos, tecnico_key} = props;
    let dados = tecnicos[tecnico_key];

    return (
        <>
            <Modal {...props} >
                <Form method="GET" action="/tecnicos">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Técnico</Modal.Title>
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
                            <Form.Label column sm={2}>telefone</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.telefone}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>cpf</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.cpf}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>data criação</Form.Label>
                            <Col sm={10}><Form.Control type="date" defaultValue={new Date(dados.dataCriacao).toISOString().substring(0,10)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>data contrato</Form.Label>
                            <Col sm={10}><Form.Control type="date" defaultValue={new Date(dados.dataContrato).toISOString().substring(0,10)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>email</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.email}/></Col>
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

export default TecnicoModal;
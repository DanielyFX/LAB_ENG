import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ClienteModal(props) {

    const {handleClose, clientes, cliente_key} = props;
    let dados = clientes[cliente_key];

    return (
        <>
            <Modal {...props} >
                <Form method="GET" action="/clientes">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Código</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.id}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>CPF/CNPJ</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.documento}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Telefone</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.telefone}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Celular</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.celular}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>CEP</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.cep}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Rua</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.rua}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Número</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.numero}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Bairro</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.bairro}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Cidade</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.cidade}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10}><Form.Control type="email" defaultValue={dados.email}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Data Cadastro</Form.Label>
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
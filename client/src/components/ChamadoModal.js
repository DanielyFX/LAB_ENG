import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ChamadoModal(props) {

        const {handleClose, chamados, chamado_key} = props;
        let dados = chamados[chamado_key];

        return (
        <>
           <Modal {...props} >
               <Form id="cadchamado-form" method="GET" action="/chamados">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar chamado</Modal.Title>
                    </Modal.Header>
                   <Modal.Body>
                           <Form.Group as={Row} className="mb-3">
                               <Form.Label column sm={2}>codigo</Form.Label>
                               <Col sm={10}><Form.Control type="text" defaultValue={dados._id}/></Col>
                           </Form.Group>
                           <Form.Group as={Row} className="mb-3">
                               <Form.Label column sm={2}>chamado</Form.Label>
                               <Col sm={10}><Form.Control type="text" defaultValue={dados.chamado}/></Col>
                           </Form.Group>
                           <Form.Group as={Row} className="mb-3">
                               <Form.Label column sm={2}>urgencia</Form.Label>
                               <Col sm={10}><Form.Control type="text" defaultValue={dados.urgencia}/></Col>
                           </Form.Group>
                           <Form.Group as={Row} className="mb-3">
                               <Form.Label column sm={2}>orçamento</Form.Label>
                               <Col sm={10}><Form.Control type="text" defaultValue={dados.orcamento}/></Col>
                           </Form.Group>
                           <Form.Group as={Row} className="mb-3">
                               <Form.Label column sm={2}>previsão de atendimento</Form.Label>
                               <Col sm={10}><Form.Control type="date" defaultValue={new Date("03/04/2024").toISOString().substring(0,10)}/></Col>
                           </Form.Group>
                           <Form.Group as={Row} className="mb-3">
                               <Form.Label column sm={2}>código atendente</Form.Label>
                               <Col sm={10}><Form.Control type="text" defaultValue={dados.atendente_id}/></Col>
                           </Form.Group>
                           <Form.Group as={Row} className="mb-3">
                               <Form.Label column sm={2}>código cliente</Form.Label>
                               <Col sm={10}><Form.Control type="text" defaultValue={dados.cliente_id}/></Col>
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

export default ChamadoModal;
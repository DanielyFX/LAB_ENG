import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function TecnicoModal(props) {

    const {handleClose, tecnico_box, onHide} = props;
    let dados = tecnico_box

    let dados_novos = {
        "_id": dados._id,
        "nome": dados.nome,
        "telefone": dados.telefone,
        "celular": dados.celular,
        "dataContrato": dados.dataContrato,
        "email": dados.email
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        //console.log(dados_novos);
        let alterados = [];
        for(let propriedade in dados_novos) {
            if (dados[propriedade] !== dados_novos[propriedade]) {
                alterados.push(propriedade);
            }
        }
        let body = {
            alterados: alterados,
            dados_novos: dados_novos
        }
        fetch('http://localhost:3001/inicio/tecnicos/editar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then((resultado) => resultado.json())
            .then((response) => {/*console.log(response)*/})
        //console.log("esperando 1 segundo")
        setTimeout(() => {
            onHide()
        }, 500);
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    return (
        <>
            {tecnico_box &&
                <Modal {...props} >
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Técnico</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>ID</Form.Label>
                                <Col sm={10}><Form.Control type="text" defaultValue={dados._id} readOnly={true}
                                                           disabled={true}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Nome</Form.Label>
                                <Col sm={10}><Form.Control type="text" defaultValue={dados.nome}
                                                           onChange={(e) => dados_novos.nome = e.target.value} disabled/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>CPF</Form.Label>
                                <Col sm={10}><Form.Control type="text" defaultValue={dados.cpf} readOnly={true}
                                                           disabled={true}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Telefone</Form.Label>
                                <Col sm={10}><Form.Control type="text" defaultValue={dados.telefone}
                                                           onChange={(e) => dados_novos.telefone = e.target.value}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Celular</Form.Label>
                                <Col sm={10}><Form.Control type="text" defaultValue={dados.celular}
                                                           onChange={(e) => dados_novos.celular = e.target.value}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Email</Form.Label>
                                <Col sm={10}><Form.Control type="text" defaultValue={dados.email}
                                                           onChange={(e) => dados_novos.email = e.target.value}/></Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Data contrato</Form.Label>
                                <Col sm={10}><Form.Control type="date"
                                                           defaultValue={new Date(dados.dataContrato).toISOString().substring(0, 10)}
                                                           onChange={(e) => dados_novos.dataContrato = e.target.value} disabled/></Col>
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type='submit'>
                                Salvar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            }
        </>
    );
}
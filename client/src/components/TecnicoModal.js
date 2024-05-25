import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";

function TecnicoModal(props) {

    const {handleClose, tecnicos, tecnico_key} = props;
    const dados = tecnicos[tecnico_key];

    console.log(tecnicos, tecnico_key)

    const [nome, setNome] = useState(dados.nome);
    const [email, setEmail] = useState(dados.email);
    const [telefone, setTelefone] = useState(dados.telefone);
    const [celular, setCelular] = useState(dados.celular);
    const [dataContrato, setDataContrato] = useState(dados.dataContrato);

    let dados_novos = {
        "_id": dados._id,
        "nome": nome,
        "telefone": telefone,
        "celular": celular,
        "dataContrato": dataContrato,
        "email": email
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
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
        fetch('http://localhost:3001/tecnicos/editar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then((resultado) => resultado.json())
            .then((response) => { console.log(response) })
        handleClose()
    }

    return (
        <>
            <Modal {...props} >
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Técnico</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>codigo</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados._id} readOnly={true} disabled={true}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>nome</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.nome} onChange={(e) => setNome(e.target.value)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>telefone</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.telefone} onChange={(e) => setTelefone(e.target.value)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>celular</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.celular} onChange={(e) => setCelular(e.target.value)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>cpf</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.cpf} readOnly={true} disabled={true}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>data criação</Form.Label>
                            <Col sm={10}><Form.Control type="date" defaultValue={new Date(dados.dataCriacao).toISOString().substring(0,10)} disabled={true} readOnly={true}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>data contrato</Form.Label>
                            <Col sm={10}><Form.Control type="date" defaultValue={new Date(dados.dataContrato).toISOString().substring(0,10)} onChange={(e) => setDataContrato(e.target.value)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>email</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={dados.email} onChange={(e) => setEmail(e.target.value)}/></Col>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type='submit'>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default TecnicoModal;
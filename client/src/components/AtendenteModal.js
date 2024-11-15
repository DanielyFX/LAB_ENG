import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButton  from "react-bootstrap/ToggleButton";
import { ButtonGroup } from "react-bootstrap";
import { useState } from 'react';


export default function AtendenteModal(props) {

    const {handleClose, atendente, onHide} = props;
    const [ativo, setAtivo] = useState(atendente.ativo);
    
    let dados_novos = {
        "_id": atendente._id,
        "nome": atendente.nome,
        "telefone": atendente.telefone,
        "celular": atendente.celular,
        "dataContrato": atendente.dataContrato,
        "email": atendente.email,
        "ativo": ativo
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        //console.log(dados_novos);
        let alterados = [];
        for(let propriedade in dados_novos) {
            if (atendente[propriedade] !== dados_novos[propriedade]) {
                alterados.push(propriedade);
            }
        }
        let body = {
            alterados: alterados,
            dados_novos: dados_novos
        }
        fetch('http://localhost:3001/inicio/atendentes/editar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then((resultado) => resultado.json())
            .then((response) => {/*console.log(response)*/})
        setTimeout(() => {
            onHide()
        }, 500);
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    return (
        <>
            <Modal {...props} >
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Atendente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>ID</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={atendente._id} readOnly={true}
                                                       disabled={true}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Nome</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={atendente.nome}
                                                       onChange={(e) => dados_novos.nome = e.target.value} disabled={true}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>CPF</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={atendente.cpf} readOnly={true}
                                                       disabled={true}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Telefone</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={atendente.telefone}
                                                       onChange={(e) => dados_novos.telefone = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Celular</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={atendente.celular}
                                                       onChange={(e) => dados_novos.celular = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={atendente.email}
                                                       onChange={(e) => dados_novos.email = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Data criação</Form.Label>
                            <Col sm={10}><Form.Control type="date"
                                                       defaultValue={new Date(atendente.dataCriacao).toISOString().substring(0, 10)}
                                                       disabled={true} readOnly={true}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Data contrato</Form.Label>
                            <Col sm={10}><Form.Control type="date"
                                                       defaultValue={new Date(atendente.dataContrato).toISOString().substring(0, 10)}
                                                       onChange={(e) => dados_novos.dataContrato = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb=3">
                            <ButtonGroup>
                                <ToggleButton
                                    key="ativo" 
                                    type='radio' 
                                    variant={ativo?"primary":"secondary"}
                                    checked={ativo}   
                                    onClick={() => setAtivo(true)}
                                >
                                    ATIVO
                                </ToggleButton>
                                <ToggleButton
                                    key="inativo" 
                                    type='radio' 
                                    variant={(!ativo)?"primary":"secondary"}
                                    checked={!ativo}   
                                    onClick={() => setAtivo(false)}
                                >
                                    INATIVO
                                </ToggleButton>
                            </ButtonGroup>
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
        </>
    );
}
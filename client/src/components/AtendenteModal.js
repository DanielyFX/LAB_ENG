import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButton  from "react-bootstrap/ToggleButton";
import { ButtonGroup } from "react-bootstrap";
import { useState } from 'react';
import InputCPF from "./Input-CPF";
import InputTelefoneFixo from "./Input-TelFixo";
import InputTelefoneCelular from "./Input-TelCel";
import InputEmail from "./Input-Email";
import InputNomePessoa from "./Input-NomePessoa";
import InputDataContrato from "./Input-DataContrato";

export default function AtendenteModal(props) {

    const {handleClose, atendente, onHide} = props;
    const [ativo, setAtivo] = useState(atendente.ativo);
    const {setMsgAlert, setShowAlert, setTypeAlert} = props;

    const [telefone, setTelefone] = useState(atendente.telefone);
    const [celular, setCelular] = useState(atendente.celular);
    const [email, setEmail] = useState(atendente.email);
    const [dataContrato, setDataContrato] = useState((new Date(atendente.dataContrato).toISOString().substring(0, 10)));
    
    let dados_novos = {
        "_id": atendente._id,
        "nome": atendente.nome,
        "telefone": telefone,
        "celular": celular,
        "dataContrato": dataContrato,
        "email": email,
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
        .then((response) => {
            if(response.success){
                handleClose();
                setShowAlert(true);
                setMsgAlert(`Alterações ${atendente.nome} realizadas com sucesso`);
                setTypeAlert("success");
                console.log(`Resposta: ${response.success}`);
                setTimeout(() => {
                    window.location.reload();
                }, 2000); 
            }else{
                setShowAlert(true);
                setMsgAlert(`Não foi possível alterar o(a) atendente`);
                setTypeAlert("info");
            }
        })
        .catch((err) =>{
            setShowAlert(true);
            setTypeAlert('danger');
            if(err instanceof TypeError && err.message === "Failed to fetch")
                setMsgAlert(`Erro: Verifique sua conexão com a internet (${err.message}).`);
            else
                setMsgAlert(`Erro: ${err.message}`);
        })
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
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    defaultValue={atendente._id}
                                    readOnly={true}
                                    disabled={true}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Nome</Form.Label>
                            <Col sm={10}>
                                <InputNomePessoa pf defaultValue={atendente.nome} disabled/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>CPF</Form.Label>
                            <Col sm={10}>
                                <InputCPF defaultValue={atendente.cpf} readOnly disabled/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Telefone</Form.Label>
                            <Col sm={10}>
                                <InputTelefoneFixo defaultValue={telefone} valueSetter={setTelefone} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Celular</Form.Label>
                            <Col sm={10}>
                                <InputTelefoneCelular defaultValue={celular} valueSetter={setCelular} required/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10}>
                                <InputEmail defaultValue={atendente.email} valueSetter={setEmail}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Data criação</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="date"
                                    defaultValue={new Date(atendente.dataCriacao).toISOString().substring(0, 10)}
                                    disabled 
                                    readOnly
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Data contrato</Form.Label>
                            <Col sm={10}>
                                <InputDataContrato defaultValue={dataContrato} valueSetter={setDataContrato} />
                            </Col>
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
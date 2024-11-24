import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputCPF from "./Input-CPF";
import InputTelefoneFixo from "./Input-TelFixo";
import InputTelefoneCelular from "./Input-TelCel";
import InputEmail from "./Input-Email";
import InputNomePessoa from "./Input-NomePessoa";
import { useState } from 'react';

export default function TecnicoModal(props) {

    const {handleClose, tecnico_box, onHide} = props;
    const {setShowAlert, setMsgAlert, setTypeAlert} = props;

    
    let dados = tecnico_box
    
    const [telefone, setTelefone] = useState(dados.telefone ?? '');
    const [celular, setCelular] = useState(dados.celular ?? '');
    const [email, setEmail] = useState(dados.email ?? '');

    let dados_novos = {
        "_id": dados._id,
        "nome": dados.nome,
        "telefone": telefone,
        "celular": celular,
        "dataContrato": dados.dataContrato,
        "email": email
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
        .then((response) => {
            if(response.success){
                handleClose();
                if(setShowAlert && setMsgAlert && setTypeAlert){
                    setShowAlert(true);
                    setMsgAlert(`Alterações realizadas com sucesso`);
                    setTypeAlert("success");
                }
            }else{
                if(setShowAlert && setMsgAlert && setTypeAlert){
                    setShowAlert(true);
                    setMsgAlert(`Não foi possível fazer a atualização do técnico`);
                    setTypeAlert("info");
                }
            }
        })
        .catch((err)=>{
            if(setShowAlert && setMsgAlert && setTypeAlert){
                setShowAlert(true);
                setTypeAlert('danger');
                if(err instanceof TypeError && err.message === "Failed to fetch")
                    setMsgAlert(`Erro: Verifique sua conexão com a internet (${err.message}).`);
                else
                    setMsgAlert(`Erro: ${err.message}`);
            }else{
                console.error(err);
            }
        });

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
                                <Col sm={10}>
                                    <Form.Control 
                                        type="text" 
                                        defaultValue={dados._id} 
                                        readOnly
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Nome</Form.Label>
                                <Col sm={10}>
                                    <InputNomePessoa pf disabled defaultValue={dados.nome}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>CPF</Form.Label>
                                <Col sm={10}>
                                    <InputCPF disabled defaultValue={dados.cpf}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Telefone</Form.Label>
                                <Col sm={10}>
                                    <InputTelefoneFixo required defaultValue={dados.telefone} valueSetter={setTelefone}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Celular</Form.Label>
                                <Col sm={10}>
                                    <InputTelefoneCelular required defaultValue={dados.celular} valueSetter={setCelular}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Email</Form.Label>
                                <Col sm={10}>
                                    <InputEmail required defaultValue={dados.email} valueSetter={setEmail}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={2}>Data contrato</Form.Label>
                                <Col sm={10}>
                                    <Form.Control 
                                        type="date"
                                        defaultValue={new Date(dados.dataContrato).toISOString().substring(0, 10)}
                                        onChange={(e) => dados_novos.dataContrato = e.target.value} 
                                        disabled
                                    />
                                </Col>
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
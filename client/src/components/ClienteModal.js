import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from 'react';
import {
    CadastroPessoaFisica as CPF,
    CadastroNacionalPessoaJuridica as CNPJ,
    TelefoneCelular as TelCel,
    TelefoneFixo as TelFixo,
    CEP,
    Validar
} from '../pages/validacao';

function ClienteModal(props) {

    const {handleClose, cliente, onHide} = props;
    const {setShowAlert, setMsgAlert, setTypeAlert} = props;

    const [telefoneError, setTelefoneError] = useState('');
    const [celularError, setCelularError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cepError, setCepError] = useState('');
    
    const [telefone, setTelefone] = useState(cliente.telefone);
    const [celular, setCelular] = useState(cliente.celular);
    const [email, setEmail] = useState(cliente.email);
    const [cep, setCep] = useState(cliente.cep);
    const [rua, setRua] = useState(cliente.rua ?? '');
    const [cidade, setCidade] = useState(cliente.cidade ?? '');
    const [bairro, setBairro] = useState(cliente.bairro ?? '');


    useEffect(()=>{
        CEP.getDataFrom(cep).then((data) => {
            setBairro(data.bairro);
            setCidade(data.estado);
            setRua(data.logradouro);
        }).catch((err) =>{
            setCepError(err);
        })
    }, [cep])
    
    
    let dados_novos = {
        "nome": cliente.nome,
        "documento": cliente.documento,
        "telefone": telefone,
        "celular": celular,
        "email": email,
        "cep": cep,
        "bairro": bairro,
        "cidade": cidade,
        "numero": cliente.numero,
        "rua": rua,
        "_id": cliente._id,
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(dados_novos)
        let alterados = [];
        for(let propriedade in dados_novos) {
            if (cliente[propriedade] !== dados_novos[propriedade]) {
                alterados.push(propriedade);
            }
        }
        let body = {
            alterados: alterados,
            dados_novos: dados_novos
        }
        fetch('http://localhost:3001/inicio/clientes/editar', {
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
                    setMsgAlert(`Não foi possível fazer a atualização do cliente`);
                    setTypeAlert("info");
                }
            }
        })
        .catch((err) =>{
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
                        <Modal.Title>Editar Cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>ID</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={cliente._id}
                                                       disabled={true} readOnly={true}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Nome</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={cliente.nome}
                                                       onChange={(e) => dados_novos.nome = e.target.value} disabled/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>CPF/CNPJ</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={Validar.CPF.isFormatValid(cliente.documento)?CPF.getFormated(cliente.documento):CNPJ.getFormated(cliente.documento)}
                                                       disabled={true} readOnly={true}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="email" 
                                    isInvalid={emailError} 
                                    defaultValue={cliente.email}
                                    onChange={(e) => Validar.Email.handleOnChange(e.target.value, setEmail, setEmailError)}
                                    onKeyDown={(e) => Validar.Email.handleKeyDown(e)}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {emailError}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Telefone</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="text" 
                                    isInvalid={telefoneError}
                                    defaultValue={TelFixo.getFormated(cliente.telefone)}
                                    onChange={(e) => Validar.TelFixo.handleOnChange(e.target.value, setTelefone, setTelefoneError)}
                                    onKeyDown={(e) => Validar.TelFixo.handleKeyDown(e)}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {telefoneError}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Celular</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="text" 
                                    isInvalid={celularError}
                                    defaultValue={TelCel.getFormated(cliente.celular)}
                                    onChange={(e) => Validar.TelCel.handleOnChange(e.target.value, setCelular, setCelularError)}
                                    onKeyDown={(e) => Validar.TelCel.handleKeyDown(e)}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {celularError}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>CEP</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text" 
                                    isInvalid={cepError}
                                    defaultValue={CEP.getFormated(cliente.cep)} 
                                    onChange={(e) => Validar.CEP.handleOnChange(e.target.value, setCep, setCepError)}
                                    onKeyDown={(e) => Validar.CEP.handleKeyDown(e)}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {cepError}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Rua</Form.Label>
                            <Col sm={10}><Form.Control type="text" value={rua}
                                                       onChange={(e) => setRua(e.target.value)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Número</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    required
                                    min={1} 
                                    step={1} 
                                    type="number" 
                                    defaultValue={cliente.numero}
                                    onChange={(e) => dados_novos.numero = e.target.value}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Bairro</Form.Label>
                            <Col sm={10}><Form.Control type="text"  value={bairro}
                                                       onChange={(e) => setBairro(e.target.value)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Cidade</Form.Label>
                            <Col sm={10}><Form.Control type="text"  value={cidade}
                                                       onChange={(e) => setCidade(e.target.value)}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Data Cadastro</Form.Label>
                            <Col sm={10}><Form.Control type="date" defaultValue={new Date(cliente.dataCriacao).toISOString().substring(0,10)}
                                                       disabled={true} readOnly={true}/></Col>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type='submit'>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default ClienteModal;

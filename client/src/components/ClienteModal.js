import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from 'react';
import InputCPF from "./Input-CPF";
import InputCNPJ from './Input-CNPJ';
import InputCEP from './Input-CEP';
import InputTextRelativeToCEP from './Input-TextRelativeToCEP';
import InputTelefoneFixo from "./Input-TelFixo";
import InputTelefoneCelular from "./Input-TelCel";
import InputEmail from "./Input-Email";
import InputNomePessoa from "./Input-NomePessoa";
import Validar from '../utils/validar';
import CPF from '../utils/cpf';
import CEP from '../utils/cep';

function ClienteModal(props) {

    const {handleClose, cliente, onHide} = props;
    const {setShowAlert, setMsgAlert, setTypeAlert} = props;

    const [cepError, setCepError] = useState('');
    
    const [telefone, setTelefone] = useState(cliente.telefone);
    const [celular, setCelular] = useState(cliente.celular);
    const [email, setEmail] = useState(cliente.email);
    const [cep, setCep] = useState(cliente.cep);
    const [rua, setRua] = useState(cliente.rua ?? '');
    const [cidade, setCidade] = useState(cliente.cidade ?? '');
    const [bairro, setBairro] = useState(cliente.bairro ?? '');

    useEffect(()=>{
        try{
            if(!Validar.CEP(cep)) return;
            const updateCEP = async () => {
                try{
                    const data = await  CEP.getDataFrom(cep);
                    if(data instanceof Object){
                        if("bairro" in data) setBairro(data.bairro);
                        if("estado" in data) setCidade(data.estado);
                        if("logradouro" in data) setRua(data.logradouro);
                    }
                    setCepError('');
                }catch(erro){
                    setCepError(erro?.message);
                }
            }
            updateCEP();
        }catch(erro){
            setCepError(erro?.message);
        }
    }, [cep]);
    
    
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
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    defaultValue={cliente._id}
                                    disabled 
                                    readOnly
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Nome</Form.Label>
                            <Col sm={10}>
                                <InputNomePessoa pf disabled readOnly defaultValue={cliente.nome}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>CPF/CNPJ</Form.Label>
                            <Col sm={10}>
                                {CPF.isFormatValid(cliente.documento)?
                                    <InputCPF readOnly disabled defaultValue={cliente.documento}/>
                                    :
                                    <InputCNPJ readOnly disabled defaultValue={cliente.documento}/>
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10}>
                                <InputEmail required defaultValue={cliente.email} valueSetter={setEmail}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Telefone</Form.Label>
                            <Col sm={10}>
                                <InputTelefoneFixo required defaultValue={cliente.telefone} valueSetter={setTelefone}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Celular</Form.Label>
                            <Col sm={10}>
                                <InputTelefoneCelular required defaultValue={cliente.celular} valueSetter={setCelular}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>CEP</Form.Label>
                            <Col sm={10}>
                                <InputCEP 
                                    required 
                                    defaultValue={cliente.cep} 
                                    valueSetter={setCep} 
                                    msgError={cepError} 
                                    msgErrorSetter={setCepError}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Rua</Form.Label>
                            <Col sm={10}>
                                <InputTextRelativeToCEP required msgCepError={cepError} value={rua} valueSetter={setRua}/> 
                            </Col>
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
                            <Col sm={10}>
                            <InputTextRelativeToCEP required msgCepError={cepError} value={bairro} valueSetter={setBairro}/> 
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Cidade</Form.Label>
                            <Col sm={10}>
                            <InputTextRelativeToCEP required msgCepError={cepError} value={cidade} valueSetter={setCidade}/> 
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Data Cadastro</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="date" 
                                    defaultValue={new Date(cliente.dataCriacao).toISOString().substring(0,10)}
                                    disabled={true} 
                                    readOnly={true}
                                />
                            </Col>
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

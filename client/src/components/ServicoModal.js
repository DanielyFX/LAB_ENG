import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NomeServico from '../utils/nome-servico';
import { useState } from 'react';

function ServicoModal(props) {

    const {handleClose, servico, onHide} = props;
    const {setMsgAlert, setShowAlert, setTypeAlert} = props;

    const [nome, setNome] = useState(servico.nome);
    const [nomeError, setNomeError] = useState('');

    let dados_novos = {
        "nome": nome,
        "tipo": servico.tipo,
        "descricao": servico.descricao,
        "preco": servico.preco,
        "_id": servico._id
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        //console.log(dados_novos);
        let alterados = [];
        for(let propriedade in dados_novos) {
            if (servico[propriedade] !== dados_novos[propriedade]) {
                alterados.push(propriedade);
            }
        }
        let body = {
            alterados: alterados,
            dados_novos: dados_novos
        }
        fetch('http://localhost:3001/inicio/servicos/editar', {
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
                setMsgAlert(`Alterações em ${servico.nome} realizadas com sucesso`);
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
        .catch((err) => {
            setShowAlert(true);
            setTypeAlert('danger');
            if(err instanceof TypeError && err.message === "Failed to fetch")
                setMsgAlert(`Erro: Verifique sua conexão com a internet (${err.message}).`);
            else
                setMsgAlert(`Erro: ${err.message}`);
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
                        <Modal.Title>Editar Serviço</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>ID</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    defaultValue={servico._id}
                                    disabled
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Nome</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="text" 
                                    required 
                                    isInvalid={nomeError} 
                                    defaultValue={servico.nome}
                                    onKeyDown={(e) => NomeServico.handleKeyDown(e)} 
                                    onChange={(e) => NomeServico.handleOnChange(e.target.value, setNome, setNomeError)}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {nomeError}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Tipo</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    required
                                    type="text" 
                                    defaultValue={servico.tipo}
                                    onChange={(e) => dados_novos.tipo = e.target.value}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Descrição</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    required 
                                    as="textarea" 
                                    rows={3} 
                                    defaultValue={servico.descricao}
                                    onChange={(e) => dados_novos.descricao = e.target.value}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Preço</Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    required
                                    type="number" 
                                    min="0" 
                                    step="0.01" 
                                    defaultValue={parseFloat(servico.preco)}
                                    onChange={(e) => dados_novos.preco = parseFloat(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Data criação</Form.Label>
                            <Col sm={10}><Form.Control type="date" defaultValue={new Date(servico.dataCriacao).toISOString().substring(0,10)} disabled /></Col>
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

export default ServicoModal;
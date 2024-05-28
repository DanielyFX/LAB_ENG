import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ClienteModal(props) {

    const {handleClose, cliente, onHide} = props;
    let dados_novos = {
        "nome": cliente.nome,
        "documento": cliente.documento,
        "telefone": cliente.telefone,
        "celular": cliente.celular,
        "cep": cliente.cep,
        "rua": cliente.rua,
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
        fetch('http://localhost:3001/clientes/editar', {
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
                            <Col sm={10}><Form.Control type="text" defaultValue={cliente.documento}
                                                       disabled={true} readOnly={true}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Email</Form.Label>
                            <Col sm={10}><Form.Control type="email" defaultValue={cliente.email}
                                                       onChange={(e) => dados_novos.email = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Telefone</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={cliente.telefone}
                                                       onChange={(e) => dados_novos.telefone = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Celular</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={cliente.celular}
                                                       onChange={(e) => dados_novos.celular = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>CEP</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={cliente.cep}
                                                       onChange={(e) => dados_novos.cep = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Rua</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={cliente.rua}
                                                       onChange={(e) => dados_novos.rua = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Número</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={cliente.numero}
                                                       onChange={(e) => dados_novos.numero = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Bairro</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={cliente.bairro}
                                                       onChange={(e) => dados_novos.bairro = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Cidade</Form.Label>
                            <Col sm={10}><Form.Control type="text" defaultValue={cliente.cidade}
                                                       onChange={(e) => dados_novos.cidade = e.target.value}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Data Cadastro</Form.Label>
                            <Col sm={10}><Form.Control type="date" defaultValue={new Date(cliente.dataCriacao).toISOString().substring(0,10)}
                                                       disabled={true} readOnly={true}/></Col>
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
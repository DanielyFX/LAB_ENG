import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/servicos/cadservicos.css'
import { ButtonGroup } from "react-bootstrap";
import {useState} from "react";
import Alert from 'react-bootstrap/Alert';
import { Validar } from "../validacao";

export default function Cadastrar_servico() {

    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');

    const [nomeError, setNomeError] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const dados = {
            "nome": nome,
            "tipo": tipo,
            "descricao": descricao,
            "preco": preco
        }
        fetch('http://localhost:3001/inicio/servicos/novo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
            mode: 'cors'
        })

        .then((resultado) => {
              if (!resultado.ok){
                    if (resultado.status == 409){
                        throw new Error("Serviço já cadastrado com esse nome.");
                    }
                    throw new Error("Erro interno do servidor! Tente novamente mais tarde.")
               }
              return resultado.json();
        })

        .then((response) => {
            if(response.success) {
                setShowAlert(true);
                setMsgAlert(`Serviço ${dados.nome}: Cadastrado com Sucesso!`);
                setTypeAlert("success");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setShowAlert(true);
                setMsgAlert(`Erro ${response.message || "Erro desconhecido ao cadastrar o serviço."}`);
                setTypeAlert("danger");
            }
        })

        .catch((error) => {
            setShowAlert(true);
            setTypeAlert("danger");
             if (error.message.includes('400')){
                setMsgAlert("Erro: Dados inválidos fornecidos. Verifique os campos e tente novamente.")
             }
             else if(error.message.includes('500')){
                setMsgAlert("Erro: Falha no servidor. Tente novamente mais tarde.");
             }
             else{
                setMsgAlert(`Erro: ${error.message}`);
             }
        });
    }

    return (
        <div id="cadservico-main">
            <Alert 
                variant={typeAlert} 
                show={showAlert} 
                onClose={() => setShowAlert(false)} 
                dismissible
            >
                <strong><p>{msgAlert}</p></strong>
            </Alert>
            <Form id="cadservico-form" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Nome do Serviço</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            required 
                            type="text"
                            isInvalid={nomeError}
                            onKeyDown={(e) => Validar.NomeServiço.handleKeyDown(e)}
                            onChange={(e) => Validar.NomeServiço.handleOnChange(e.target.value, setNome, setNomeError)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {nomeError}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Tipo Serviço</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            required 
                            type="text" 
                            onChange={(e) => setTipo(e.target.value)}
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
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Preço Unitário</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            required 
                            type="number" 
                            min={0}
                            step={0.01} 
                            onChange={(e) => setPreco(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <ButtonGroup>
                    <Button variant="primary" type="submit">Cadastrar</Button>
                    <Button variant="secondary" href="/inicio">Cancelar</Button>
                </ButtonGroup>

            </Form>
        </div>
    )
}

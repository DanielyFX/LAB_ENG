import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import '../../css/clientes/cadclientes.css';
import { ButtonGroup } from "react-bootstrap";

function limpa_formulário_cep() {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
}

window.meu_callback = function(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('rua').value = conteudo.logradouro;
        document.getElementById('bairro').value = conteudo.bairro;
        document.getElementById('cidade').value = conteudo.localidade;
    } else {
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');
    if (cep !== "") {
        var validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            document.getElementById('rua').value = "";
            document.getElementById('bairro').value = "";
            document.getElementById('cidade').value = "";

            var script = document.createElement('script');
            script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;
            document.body.appendChild(script);
        } else {
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        limpa_formulário_cep();
    }
}

export default function Cadastrar_cliente() {
    const [cep, setCep] = useState('');

    const handleCepChange = (event) => {
        const { value } = event.target;
        setCep(value);
    };

    const handleCepDesfoque = (event) => {
        pesquisacep(event.target.value); 
    };

    return (
        <div id="cadcliente-main">
            <Form id="cadcliente-form" method="GET" action="/clientes/cadastrar">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Nome Completo</Form.Label>
                    <Col sm={10}><Form.Control type="text" /></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CPF/CNPJ</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Telefone</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Celular</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>CEP</Form.Label>
                    <Col sm={10}><Form.Control type="text" value={cep} onChange={handleCepChange} onBlur={handleCepDesfoque}/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Rua</Form.Label>
                    <Col sm={10}><Form.Control type="text" id="rua"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Número</Form.Label>
                    <Col sm={10}><Form.Control type="text"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Bairro</Form.Label>
                    <Col sm={10}><Form.Control type="text" id="bairro"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Cidade</Form.Label>
                    <Col sm={10}><Form.Control type="text" id="cidade"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>E-mail</Form.Label>
                    <Col sm={10}><Form.Control type="email"/></Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Dados de Cadastro</Form.Label>
                    <Col sm={10}><Form.Control type="datetime-local" /></Col>
                </Form.Group>

                <ButtonGroup>
                    <Button variant="primary" type="submit">Cadastrar</Button>
                    <Button variant="secondary" href="/inicio">Cancelar</Button>
                </ButtonGroup>

            </Form>
        </div>
    );
}


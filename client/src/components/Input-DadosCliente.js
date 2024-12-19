import {  Col, Row, Form, InputGroup } from 'react-bootstrap';
import  InputCPF  from './Input-CPF';
import { useState } from 'react';
import InputNomePessoa from './Input-NomePessoa';
import InputTelefoneFixo from './Input-TelFixo';
import InputTelefoneCelular from './Input-TelCel';
import InputEmail from './Input-Email';
import ToggleCpfCnpj from './ToggleCpfCnpj';

export default function InputDadosCliente(props){
    const [cpfChecked, setCpfChecked] = useState(false)
    const [nome, setNome] = useState('')
    const [documento, setDocumento] = useState('')
    

    return (
    <Form.Group {...props} className='border border-light-subtle p-2 rounded-1 mb-2 bg-light'>
        <Form.FloatingLabel className='display-4 border-bottom border-primary-subtle mb-3'>Dados</Form.FloatingLabel>
        <Row>
            <Col lg={5} xl={4}>
                <Form.Label>Documento</Form.Label>
                <InputGroup sm='auto'>
                    <ToggleCpfCnpj value={cpfChecked} valueSetter={setCpfChecked}/>
                    <InputCPF valueSetter={setDocumento} feedbackStyle={{paddingLeft: '110px'}}/>
                </InputGroup>
            </Col>
            <Col>
                <Form.Label>Nome Completo</Form.Label>
                <InputNomePessoa valueSetter={setNome}/>
            </Col>
        </Row>
        <Form.FloatingLabel className='display-6 border-bottom border-secondary-subtle my-3'>Contatos</Form.FloatingLabel>
        <Row>
            <Col >
                <Form.Label>Telefone Fixo</Form.Label>
                <InputTelefoneFixo/>
            </Col>
            <Col>
                <Form.Label>Telefone Celular</Form.Label>
                <InputTelefoneCelular/>
            </Col>
            <Col sm={12} lg={6} xl={7} xxl={8}>
                <Form.Label>Email</Form.Label>
                <InputEmail/>
            </Col>
        </Row>
    </Form.Group>
    );
}

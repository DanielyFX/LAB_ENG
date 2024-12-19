import Form from 'react-bootstrap/Form';
import CEP from "../utils/cep";
import InputCEP from './Input-CEP';
import InputTextRelativeToCEP from './Input-TextRelativeToCEP';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';


export default function InputEndereco(props){
    const [cep, setCep] = useState('');

    return <Form.Group {...props} className='border border-light-subtle p-2 rounded-1 mb-2 bg-light'>
        <Form.FloatingLabel className='display-4 border-bottom border-primary-subtle mb-3'>Endereço</Form.FloatingLabel>
        <Form.Label>CEP</Form.Label>
        <InputCEP
            value={cep}
            valueSetter={setCep}
        />
        <Row>
            <Col md={6}>
                <Form.Label>Cidade</Form.Label>
                <InputTextRelativeToCEP/>
            </Col>
            <Col md={6}>
                <Form.Label>Bairro</Form.Label>
                <InputTextRelativeToCEP/>
            </Col>
        </Row>
        <Row>
            <Col md={8}>
                <Form.Label>Rua</Form.Label>
                <InputTextRelativeToCEP/>
            </Col>
            <Col md={4}>
                <Form.Label>Número</Form.Label>
                <InputTextRelativeToCEP/>
            </Col>
        </Row>
        
    </Form.Group>;
}


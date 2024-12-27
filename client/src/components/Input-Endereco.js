import Form from 'react-bootstrap/Form';
import InputCEP from './Input-CEP';
import InputTextRelativeToCEP from './Input-TextRelativeToCEP';
import { Col, Row } from 'react-bootstrap';


export default function InputEndereco({
    cepSetter, cep, cepErrorSetter, 
    citySetter, city, 
    neighborhoodSetter, neighborhood, 
    streetSetter, street, 
    numberSetter, number, ...props
}){

    return <Form.Group {...props} className='border border-light-subtle p-2 rounded-1 mb-2 bg-light'>
        <Form.FloatingLabel className='display-4 border-bottom border-primary-subtle mb-3'>Endereço</Form.FloatingLabel>
        <Form.Label>CEP</Form.Label>
        <InputCEP
            required
            value={cep}
            valueSetter={cepSetter}
            msgErrorSetter={cepErrorSetter}
        />
        <Row>
            <Col md={6}>
                <Form.Label>Cidade</Form.Label>
                <InputTextRelativeToCEP required value={city} valueSetter={citySetter}/>
            </Col>
            <Col md={6}>
                <Form.Label>Bairro</Form.Label>
                <InputTextRelativeToCEP required value={neighborhood} valueSetter={neighborhoodSetter}/>
            </Col>
        </Row>
        <Row>
            <Col md={8}>
                <Form.Label>Rua</Form.Label>
                <InputTextRelativeToCEP required value={street} valueSetter={streetSetter}/>
            </Col>
            <Col md={4}>
                <Form.Label>Número</Form.Label>
                <InputTextRelativeToCEP required value={number} type='number' valueSetter={numberSetter}/>
            </Col>
        </Row>
        
    </Form.Group>;
}


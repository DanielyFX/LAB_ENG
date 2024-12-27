import Form from 'react-bootstrap/Form';
import InputCEP from './Input-CEP';
import InputTextRelativeToCEP from './Input-TextRelativeToCEP';
import CEP from '../utils/cep';
import { Col, Row } from 'react-bootstrap';

export function searchCEP(){
    const CEPS = new Map();
    return async (cep) => {
        if(CEPS.has(cep)){
            return CEPS.get(cep);
        }else{
            console.log(`BuscandoCEP ${cep}`);
            const data = await CEP.getDataFrom(CEP.getOnlyDigits(cep)); 
            CEPS.set(cep, data);
            return data;
        }
    } 
}

export default function InputEndereco({
    cepSetter, cep, cepErrorSetter, cepError, 
    citySetter, city, 
    neighborhoodSetter, neighborhood, 
    streetSetter, street, 
    numberSetter, number, ...props
}){

    return <Form.Group {...props} className='border border-light-subtle p-2 rounded-1 mb-2 bg-light'>
        <Form.FloatingLabel className='display-4 border-bottom border-primary-subtle mb-3'>Endereço</Form.FloatingLabel>
        <Form.Label>CEP</Form.Label>
        <InputCEP
            {...props}
            value={cep}
            valueSetter={cepSetter}
            msgError={cepError}
            msgErrorSetter={cepErrorSetter}
        />
        <Row>
            <Col md={6}>
                <Form.Label>Cidade</Form.Label>
                <InputTextRelativeToCEP {...props} value={city} valueSetter={citySetter} msgCepError={cepError}/>
            </Col>
            <Col md={6}>
                <Form.Label>Bairro</Form.Label>
                <InputTextRelativeToCEP {...props} value={neighborhood} valueSetter={neighborhoodSetter} msgCepError={cepError}/>
            </Col>
        </Row>
        <Row>
            <Col md={8}>
                <Form.Label>Rua</Form.Label>
                <InputTextRelativeToCEP {...props} value={street} valueSetter={streetSetter} msgCepError={cepError}/>
            </Col>
            <Col md={4}>
                <Form.Label>Número</Form.Label>
                <InputTextRelativeToCEP {...props} value={number} type='number' valueSetter={numberSetter}/>
            </Col>
        </Row>
        
    </Form.Group>;
}


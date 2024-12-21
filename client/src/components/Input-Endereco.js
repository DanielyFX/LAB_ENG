import Form from 'react-bootstrap/Form';
import CEP from "../utils/cep";
import InputCEP from './Input-CEP';
import InputTextRelativeToCEP from './Input-TextRelativeToCEP';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';


export default function InputEndereco({
    cepSetter, cepValue, 
    citySetter, cityValue, 
    neighborhoodSetter, neighborhoodValue, 
    streetSetter, streetValue, numberSetter, ...props
}){

    useEffect(() => {
        const updateData = async function(){
            try{
                const data = await CEP.getDataFrom(cepValue);
                if(data){
                    citySetter(data.estado ?? '');
                    neighborhoodSetter(data.bairro ?? '');
                    streetSetter(data.logradouro ?? '');
                }
            }catch(error){
                console.error(error);
            }
        }
        if(CEP.isFormatValid(cepValue))
            updateData();
    }, [cepValue])

    return <Form.Group {...props} className='border border-light-subtle p-2 rounded-1 mb-2 bg-light'>
        <Form.FloatingLabel className='display-4 border-bottom border-primary-subtle mb-3'>Endereço</Form.FloatingLabel>
        <Form.Label>CEP</Form.Label>
        <InputCEP
            valueSetter={cepSetter}
        />
        <Row>
            <Col md={6}>
                <Form.Label>Cidade</Form.Label>
                <InputTextRelativeToCEP valueSetter={citySetter}/>
            </Col>
            <Col md={6}>
                <Form.Label>Bairro</Form.Label>
                <InputTextRelativeToCEP valueSetter={neighborhoodSetter}/>
            </Col>
        </Row>
        <Row>
            <Col md={8}>
                <Form.Label>Rua</Form.Label>
                <InputTextRelativeToCEP valueSetter={streetSetter}/>
            </Col>
            <Col md={4}>
                <Form.Label>Número</Form.Label>
                <InputTextRelativeToCEP type='number' valueSetter={numberSetter}/>
            </Col>
        </Row>
        
    </Form.Group>;
}


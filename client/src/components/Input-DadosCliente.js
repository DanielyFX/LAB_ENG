import {  Col, Row, Form, InputGroup } from 'react-bootstrap';
import InputCPF from './Input-CPF';
import InputCNPJ from './Input-CNPJ';
import InputNomePessoa from './Input-NomePessoa';
import InputTelefoneFixo from './Input-TelFixo';
import InputTelefoneCelular from './Input-TelCel';
import InputEmail from './Input-Email';
import ToggleCpfCnpj from './ToggleCpfCnpj';

export default function InputDadosCliente({
    doc, docSetter,
    name, nameSetter,
    email, emailSetter, 
    tel, telSetter,
    cel, celSetter, 
    cpfChecked, cpfCheckedSetter,
    ...props
}){
    
    return (
    <Form.Group {...props} className='border border-light-subtle p-2 rounded-1 mb-2 bg-light'>
        <Form.FloatingLabel className='display-4 border-bottom border-primary-subtle mb-3'>Dados</Form.FloatingLabel>
        <Row>
            <Col lg={5} xl={4}>
                <Form.Label>Documento</Form.Label>
                <InputGroup sm='auto'>
                    <ToggleCpfCnpj value={cpfChecked} valueSetter={cpfCheckedSetter}/>
                    {cpfChecked ? 
                        <InputCPF id='cpf' required value={doc}  valueSetter={docSetter} feedbackStyle={{paddingLeft: '110px'}}/>
                        :
                        <InputCNPJ id='cnpj' required value={doc} valueSetter={docSetter} feedbackStyle={{paddingLeft: '110px'}}/>
                    }
                </InputGroup>
            </Col>
            <Col>
                <Form.Label>Nome Completo</Form.Label>
                <InputNomePessoa required value={name} valueSetter={nameSetter}/>
            </Col>
        </Row>
        <Form.FloatingLabel className='display-6 border-bottom border-secondary-subtle my-3'>Contatos</Form.FloatingLabel>
        <Row>
            <Col >
                <Form.Label>Telefone Fixo</Form.Label>
                <InputTelefoneFixo required value={tel} valueSetter={telSetter}/>
            </Col>
            <Col>
                <Form.Label>Telefone Celular</Form.Label>
                <InputTelefoneCelular required value={cel} valueSetter={celSetter}/>
            </Col>
            <Col sm={12} lg={6} xl={7} xxl={8}>
                <Form.Label>Email</Form.Label>
                <InputEmail required value={email} valueSetter={emailSetter}/>
            </Col>
        </Row>
    </Form.Group>
    );
}

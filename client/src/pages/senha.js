import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../css/senha.css'
import { ButtonGroup } from 'react-bootstrap'

export default function RecuperaSenha() {
    return (
        <div id="senha-raiz">
            <div id="senha-container">
            <h1>Recuperar Senha</h1>
            <p>Com o email informado abaixo,será enviado a senha no mesmo!</p>
                <Form id="senha-form">
                    <Form.Group className="mb-3">
                        <Form.Label>Informe seu Email cadastrado:</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <ButtonGroup>
                        <Button variant="secondary" type="submit" size='sm' href='/'>Voltar</Button>
                        <Button variant="primary" type="submit" size='sm'>Enviar</Button>
                    </ButtonGroup>   
                </Form>
            </div>
        </div>
    )
}
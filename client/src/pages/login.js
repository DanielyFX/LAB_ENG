import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../css/login.css'
import { ButtonGroup } from 'react-bootstrap'

export default function Login() {
    return (
        <div id="login-raiz">
            <div id="login-container">
            <h1>Sistema Controle de Chamados</h1>
                <Form id="login-form">
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <ButtonGroup>
                        <Button variant="secondary" type="submit" size='lg' href="/recupera-senha">Esqueci Senha</Button>
                        <Button variant="primary" type="submit" size='lg'>Entrar</Button>
                    </ButtonGroup>   
                </Form>
            </div>
        </div>
    )
}
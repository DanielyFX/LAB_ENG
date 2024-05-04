import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../css/login.css'
export default function Login() {
    return (
        <div id="login-raiz">
            <div id="login-container">
            <h1>Sistema de Controle de Chamados</h1>
                <Form id="login-form">
                    <Form.Group className="mb-3">
                        <Form.Label>Nome de usuário</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Entrar</Button>
                </Form>
            </div>
        </div>
    )
}
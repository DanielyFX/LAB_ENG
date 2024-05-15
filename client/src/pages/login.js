import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/login.css';
import { ButtonGroup } from 'react-bootstrap';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setEmailError('');
        setSenhaError('');

  
        
        const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
        if (!emailRegex.test(email)) {
            setEmailError('Por favor, insira um e-mail válido.');
            return;
        }

        
        if (!senha.trim()) {
            setSenhaError('Por favor, insira sua senha.');
            return;
        }

        console.log('Email:', email);
        console.log('Senha:', senha);


    };

    return (
        <div id="login-raiz">
            <div id="login-container">
                <h1>Sistema Controle de Chamados</h1>
                <Form id="login-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            isInvalid={!!emailError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {emailError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={senha} 
                            onChange={(e) => setSenha(e.target.value)} 
                            isInvalid={!!senhaError}
                        />
                        <Form.Control.Feedback type="invalid">
                            {senhaError}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <ButtonGroup>
                        <Button 
                            variant="secondary" 
                            type="button" 
                            size='lg' 
                            href="/recupera-senha"
                        >
                            Esqueci Senha
                        </Button>
                        <Button variant="primary" type="submit" size='lg'>Entrar</Button>
                    </ButtonGroup>   
                </Form>
            </div>
        </div>
    );
}

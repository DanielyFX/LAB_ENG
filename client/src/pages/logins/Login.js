import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/login.css";
import { ButtonGroup } from "react-bootstrap";
import { Image } from "react-bootstrap";
import logo_empresa from "../../assets/image/logo_empresa.jpeg";
import { useNavigate, Link } from 'react-router-dom'; 



export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState(""); 
  const [senhaError, setSenhaError] = useState("");

  const navigate = useNavigate()


  const handleSubmit =  (e) => {
    e.preventDefault();
    const dados = {
      "email": email,
      "senha": senha
    };

    setEmailError("");
    setSenhaError("");

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; 
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }

    if (!senha.trim()) {
      setSenhaError("Por favor, insira sua senha.");
      return;
    }

  fetch('http://localhost:3001/login/entrar', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
      mode: 'cors'
  })
   
  .then((response) => response.json())
  .then((data) => {
      if(data.success) {
          alert("Bem vindo!")
          navigate("/inicio")
      } else {
          alert(`Erro ${data.message || "Erro desconhecido ao cadastrar o serviço."}`);
      }
  })

  .catch((error) => {
       if (error.message.includes('400')){
           alert("Erro: Dados inválidos fornecidos. Verifique os campos e tente novamente.")
       }
       else if(error.message.includes('500')){
           alert("Erro: Falha no servidor. Tente novamente mais tarde.");
       }
       else{
           alert(`Erro: ${error.message}`);
       }
    });
  };
  return (
    <div id="login-main">
      <div id="login-container">
        <h1>Sistema Controle de Chamados</h1>
        <br></br>
        <div>
          <Image src={logo_empresa} alt="rush_informatica" fluid />
        </div>
        <br></br>
        <Form id="login-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>EMAIL:</Form.Label>
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
            <Form.Label>SENHA:</Form.Label>
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
              variant="primary"
              type="submit"
              size="lg"
            >
              Entrar
            </Button>
            <Link to="/cadastrar">
                <Button variant="secondary" size="lg">
                  Cadastrar
                </Button>
            </Link>
          </ButtonGroup>
          <div className="text-center">
            <Link to="/recupera-senha" className="forgot-password-link">
               Esqueci a Senha
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

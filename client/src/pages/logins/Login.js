import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/login.css";
import {Alert, AlertHeading, ButtonGroup } from "react-bootstrap";
import { Image } from "react-bootstrap";
import logo_empresa from "../../assets/image/logo_empresa.jpeg";
import { useNavigate, Link } from 'react-router-dom'; 


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState(""); 
  const [senhaError, setSenhaError] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');
  const [headerAlert, setHeaderAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState('');


  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);

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
        setTypeAlert("success");
        setHeaderAlert("Bem vindo!");
        setShowAlert(true);
        localStorage.setItem("authToken", data.token);
        console.log("Token armazenado:", data.token);
          // alert("Bem vindo!");
        setTimeout(() => {
          navigate("/inicio");
        }, 1500); 
      } else {
        setTypeAlert("warning");
        setHeaderAlert("Ops! Não foi possível realizar o login");
        setMsgAlert(data.message);
        setShowAlert(true);
        // alert(`Erro ${data.message || "Erro desconhecido ao cadastrar o serviço."}`);
      }
  })
  .catch((error) => {
    setShowAlert(true);
    setTypeAlert("danger");
    if (error.message.includes('400')){
    setHeaderAlert("Dados inválidos");
    setMsgAlert("Dados inválidos fornecidos. Verifique os campos e tente novamente.");
    // alert("Erro: Dados inválidos fornecidos. Verifique os campos e tente novamente.")
    }
    else if(error.message.includes('500')){
    setHeaderAlert("Ops! Não foi possível realizar o login");
    setMsgAlert("Falha no servidor. Tente novamente mais tarde.");
    // alert("Erro: Falha no servidor. Tente novamente mais tarde.");
    }
    else{
    setHeaderAlert("Ops! Não foi possível realizar o login");
    setMsgAlert(error.message);
    // alert(`Erro: ${error.message}`);
    }
    });
  };

  return(
    <div id="login-main" class="container">
      <Alert 
          variant={typeAlert} 
          show={showAlert} 
          onClose={() => setShowAlert(false)} 
          dismissible
      >
        <AlertHeading
          style={msgAlert? {} : {textAlign: 'center'}} 
        >{headerAlert}</AlertHeading>
        
        {msgAlert ? <><br/><strong><p>{msgAlert}</p></strong></> : <></>}
      </Alert>
      <div id="login-inicio" class="row">
        <div id="Entrar" class="col-12 text-center">
          <h1>Sistema de Controle de Chamados</h1>
          <br></br>
          <div>
          <Image src={logo_empresa} alt="rush_informatica" fluid />
          <div id="entrar-login" class="col-12 col-lg-6 text-center mx-auto">
              <br></br>
              <Form id="login-form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>EMAIL:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!emailError}
                  className="input-field"
                  placeholder="Insira o seu e-mail"
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
                  className="input-field"
                  placeholder="Insira a sua senha"
                />
                <Form.Control.Feedback type="invalid">
                  {senhaError}
                </Form.Control.Feedback>
              </Form.Group>
              <ButtonGroup className="button-group">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="custom-button"
                >
                  Entrar
                </Button>
                <Button 
                  variant="secondary" 
                  href="/cadastrar"
                  size="lg"
                  className="custom-button"
                >
                  Cadastrar
                </Button>
              </ButtonGroup>
              <div className="text-center">
                <Link to="/recupera-senha" className="forgot-password-link">
                  Esqueci a Senha
                </Link>
              </div>
            </Form>
          </div>
          </div>
        </div>
      </div>
    </div>

  );
}



/*
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

*/
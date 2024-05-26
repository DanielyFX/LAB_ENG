import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/senha.css";
import { ButtonGroup } from "react-bootstrap";
import { Image } from "react-bootstrap";
import logo_empresa from "../assets/image/logo_empresa.jpeg";

export default function RecuperaSenha() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }

    console.log("Email:", email);
  };

  return (
    <div id="login-raiz">
      <div id="login-container">
        <h1>Sistema Controle de Chamados</h1>
        <br></br>
        <div>
          <Image src={logo_empresa} alt="rush_informatica" fluid />
        </div>
        <br></br>
        <h3>Recuperar Senha</h3>
        <p>Com o email informado abaixo,será enviado a senha cadastrada!</p>
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

          <ButtonGroup>
            <Button variant="secondary" type="submit" size="lg" href="/">
              Voltar
            </Button>
            <Button variant="primary" type="submit" size="lg">
              Enviar
            </Button>
          </ButtonGroup>
        </Form>
      </div>
    </div>
  );
}

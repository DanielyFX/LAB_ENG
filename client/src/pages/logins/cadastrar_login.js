import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ButtonGroup } from "react-bootstrap";


export default function CadastrarLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [emailError, setEmailError] = useState(""); 
  const [senhaError, setSenhaError] = useState("");
  const [confirmarSenhaError, setConfirmarSenhaError] = useState(""); 


  const handleSubmit =  (e) => {
    e.preventDefault();
    const dados = {
      "email": email,
      "senha": senha,
    }

    setEmailError("");
    setSenhaError("");
    setConfirmarSenhaError("");


    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; 
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }
    if (!senha.trim()) {
      setSenhaError("Por favor, insira sua senha.");
      return;
    }

    if (senha !== confirmarSenha) { // Verifica se as senhas são iguais
      setConfirmarSenhaError("As senhas não coincidem.");
      return;
    }

    try {
      fetch('http://localhost:3001/login/novo', {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
        mode: 'cors'
      })
      .then((resultado) => {
        if (!resultado.ok) {
          if (resultado.status === 409) {
            window.location.reload()
            throw new Error("Usuário já cadastrado com esse email.");
          }
          throw new Error("Erro interno do servidor!");
        }
        return resultado.json();
      })
      .then((response) => {
        if (response.success) {
          alert("Usuário cadastrado com sucesso!");
          window.location.reload();
        } else {
          alert(`Erro ${response.message || "Erro desconhecido ao cadastrar o usuário."}`);
        }
      })
      .catch((error) => {
        if (error.message.includes('400')) {
          alert("Erro: Dados inválidos fornecidos. Verifique os campos e tente novamente.");
        } else if (error.message.includes('500')) {
          alert("Erro: Falha no servidor. Tente novamente mais tarde.");
        } else {
          alert(`Erro: ${error.message}`);
        }
      });
    } catch {
      alert("Erro interno do servidor!");
    }
  };

  return (
    <div id="cadlogin-main" className="login-background">
      <div id="login-container" className="login-box">
        <h1 className="login-title">Sistema Controle de Chamados</h1>
        <Form id="cadlogin-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>EMAIL:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!emailError}
              className="input-field"
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
            />
            <Form.Control.Feedback type="invalid">
              {senhaError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>CONFIRME A SENHA:</Form.Label>
            <Form.Control
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              isInvalid={!!confirmarSenhaError}
              className="input-field"
            />
            <Form.Control.Feedback type="invalid">
              {confirmarSenhaError}
            </Form.Control.Feedback>
          </Form.Group>
          <ButtonGroup className="button-group">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              className="custom-button"
            >
              Cadastrar
            </Button>
            <Button 
              variant="secondary" 
              href="/"
              className="custom-button"
            >
              Cancelar
            </Button>
          </ButtonGroup>
        </Form>
      </div>
    </div>
  );
};


import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../css/rec_login.css";
import { ButtonGroup } from "react-bootstrap";
import { Image } from "react-bootstrap";
import logo_empresa from "../../assets/image/logo_empresa.jpeg";

export default function RecuperaSenha() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");

    const dados = {
      "email": email,
    };

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; 
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }

    try {
      fetch('http://localhost:3001/login/recuperar', {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
        mode: 'cors'
      })
      .then((resultado) => {
        if (!resultado.ok) {
          if (resultado.status === 404) {
            throw new Error("O email inserido não está cadastrado!");
          }
          throw new Error("Erro interno do servidor!");
        }
        return resultado.json();
      })
      .then((response) => {
        if (response.success) {
          alert("Aguarde alguns segundos, o e-mail será enviado");
          window.location.reload();
        } else {
          alert(`Erro ${response.message || ": Usuário não cadastrado"}`);
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
    <div id="cad-login" class=" container">
      <div id="cad-user" class="row">
        <div id="recuperar-senha" class="col-12 text-center">
            <h1>Recuperar Senha</h1>
            <Image src={logo_empresa} alt="rush_informatica" fluid />
            <div id="cad-login" class="col-12 col-lg-6 text-center mx-auto">
             <Form id="cadlogin-form" onSubmit={handleSubmit}>
             <Form.Group className="mb-3">
             <Form.Label>EMAIL:</Form.Label>
             <Form.Control
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               isInvalid={!!emailError}
               className="input-field"
               placeholder="Digite o seu e-mail"
             />
             <Form.Control.Feedback type="invalid">
               {emailError}
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
              size="lg"
              className="custom-button"
            >
              Voltar
            </Button>
          </ButtonGroup>
        </Form>
         </div>
        </div>
      </div>
    </div>
  );
};
  /*
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
            <Button variant="secondary" type="button" size="lg" href="/">
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
*/
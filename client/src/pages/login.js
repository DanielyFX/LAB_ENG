import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../css/login.css";
import { ButtonGroup } from "react-bootstrap";
import { Image } from "react-bootstrap";
import logo_empresa from "../assets/image/logo_empresa.jpeg";
import { useNavigate, Link } from 'react-router-dom'; 
import axios from "axios";


export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(""); 
  const [senhaError, setSenhaError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setSenhaError("");

    

    try{
      const response = await axios.post("http://localhost:3000/login/novo", {
        email,
        senha,
      });
    
    if (response.data.success){
      navigate("/inicio");
    }
        else{
          setErrorMessage("Usuário não encontrado. Deseja se cadastrar?");
        }  
    } catch(error){
      console.error("Erro ao fazer login", error);
      setErrorMessage("Erro ao realizar login. Tente novamente.");
    }

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    if (!emailRegex.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }
    if (!senha.trim()) {
      setSenhaError("Por favor, insira sua senha.");
      return;
    }

    navigate("/inicio");
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

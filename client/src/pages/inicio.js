import React from "react";
import Container from "react-bootstrap/Container";
import { Image } from "react-bootstrap";
import logo_empresa from "../assets/image/logo_empresa.jpeg";

export default function Inicio() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Image src={logo_empresa} alt="rush_informatica" fluid />
    </Container>
  );
}

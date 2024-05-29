import React, { useState } from 'react';
import { Table, InputGroup, Form, Dropdown } from 'react-bootstrap';
import searchIcon from '../../css/Icons';
import '../../css/atendentes/atendentes.css';
import {useLoaderData} from "react-router-dom";

export default function Servico_Realizado() {

  const orcamentos = useLoaderData()
  console.log(orcamentos)

  let servicos = orcamentos.map((orcamento) => {
    let {chamado, tecnico, servico} = orcamento
    let {cliente} = chamado
    return {
      id_chamado: chamado._id,
      id_orcamento: orcamento._id,
      tecnico: tecnico.nome,
      cliente: cliente.nome,
      cpf_cnpj: cliente.documento,
      servico: servico.nome,
      tipo_servico: servico.tipo,
      status_chamado: chamado.status,
      status_orcamento: orcamento.situacao,
      valor_total: orcamento.precoTotal,
    }
  })

  const [pesquisa, setPesquisa] = useState('');
  const [parametro, setParametro] = useState('cliente');
  const [parametroOrd, setParametroOrd] = useState('cliente');

  const handleSearch = (servicos) => {
    return servicos.filter(servico => 
      servico[parametro].toLowerCase().includes(pesquisa.toLowerCase())
    );
  };

  const handleSort = (servicos) => {
    return servicos.sort((a, b) => {
      if (a[parametroOrd] < b[parametroOrd]) return -1;
      if (a[parametroOrd] > b[parametroOrd]) return 1;
      return 0;
    });
  };

  const filteredServicos = handleSearch(servicos);
  const sortedServicos = handleSort(filteredServicos);

  const dropdown = (type) => (
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => type === '' ? setParametro('cliente') : setParametroOrd('cliente')}>Cliente</Dropdown.Item>
      <Dropdown.Item onClick={() => type === '' ? setParametro('id_chamado') : setParametroOrd('id_chamado')}>ID Chamado</Dropdown.Item>
      <Dropdown.Item onClick={() => type === '' ? setParametro('id_orcamento') : setParametroOrd('id_orcamento')}>ID Orçamento</Dropdown.Item>
      <Dropdown.Item onClick={() => type === '' ? setParametro('tecnico') : setParametroOrd('tecnico')}>Técnico</Dropdown.Item>
      <Dropdown.Item onClick={() => type === '' ? setParametro('cpf_cnpj') : setParametroOrd('cpf_cnpj')}>CPF/CNPJ</Dropdown.Item>
      <Dropdown.Item onClick={() => type === '' ? setParametro('servico') : setParametroOrd('servico')}>Serviço</Dropdown.Item>
      <Dropdown.Item onClick={() => type === '' ? setParametro('tipo_servico') : setParametroOrd('tipo_servico')}>Tipo de Serviço</Dropdown.Item>
      <Dropdown.Item onClick={() => type === '' ? setParametro('status_chamado') : setParametroOrd('status_chamado')}>Status do Chamado</Dropdown.Item>
      <Dropdown.Item onClick={() => type === '' ? setParametro('status_orcamento') : setParametroOrd('status_orcamento')}>Status do Orçamento</Dropdown.Item>
      <Dropdown.Item onClick={() => type === '' ? setParametro('valor_total') : setParametroOrd('valor_total')}>Valor Total</Dropdown.Item>
    </Dropdown.Menu>
  );

  return (
    <div className="body-main">
      <InputGroup className="mb-3">
        <InputGroup.Text style={{ opacity: 0.5 }} >{searchIcon}</InputGroup.Text>
        <Form.Control placeholder='Buscar...' onChange={e => setPesquisa(e.target.value)} />
        <Dropdown>
          <Dropdown.Toggle variant="info">
            Filtro de Pesquisa: {parametro}
          </Dropdown.Toggle>
          {dropdown('')}
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="info">
            Filtro de Ordenação: {parametroOrd}
          </Dropdown.Toggle>
          {dropdown('ord')}
        </Dropdown>
      </InputGroup>
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Chamado</th>
              <th>ID Orçamento</th>
              <th>Técnico</th>
              <th>Cliente</th>
              <th>CPF/CNPJ</th>
              <th>Serviço</th>
              <th>Tipo de Serviço</th>
              <th>Status do Chamado</th>
              <th>Status do Orçamento</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedServicos.map((servico, index) => (
              <tr key={index}>
                <td>{servico.id_chamado}</td>
                <td>{servico.id_orcamento}</td>
                <td>{servico.tecnico}</td>
                <td>{servico.cliente}</td>
                <td>{servico.cpf_cnpj}</td>
                <td>{servico.servico}</td>
                <td>{servico.tipo_servico}</td>
                <td>{servico.status_chamado}</td>
                <td>{servico.status_orcamento}</td>
                <td>{servico.valor_total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
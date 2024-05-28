import React, { useState } from 'react';
import { Table, InputGroup, Form, Dropdown } from 'react-bootstrap';
import AtendenteModal from '../../components/AtendenteModal';
import searchIcon from '../../css/Icons';
import '../../css/atendentes/atendentes.css';

export default function Servico_Realizado() {
  // Dados de EXEMPLO para renderização
  const servicos = [
    {
      id_chamado: '12478347eotuiutor2344',
      id_orcamento: 'A001',
      tecnico: 'Carlos Oliveira',
      cliente: 'João Silva',
      cpf_cnpj: '123.456.789-00',
      servico: 'Manutenção de Computador',
      tipo_servico: 'Manutenção',
      status_chamado: 'Concluído',
      status_orcamento: 'Aprovado',
      valor_total: 'R$ 250,00'
    },
    {
      id_chamado: '67890',
      id_orcamento: 'B002',
      tecnico: 'Ana Costa',
      cliente: 'Maria Souza',
      cpf_cnpj: '987.654.321-00',
      servico: 'Instalação de Software',
      tipo_servico: 'Instalação',
      status_chamado: 'Em Andamento',
      status_orcamento: 'Pendente',
      valor_total: 'R$ 150,00'
    },
    // Adicione mais dados conforme necessário
  ];

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
import React, { useEffect, useState } from 'react';
import { Table, Button, Layout, Popconfirm } from 'antd';
import HeaderComponent from '../../components/Header/HeaderComponent';
import { useNavigate } from 'react-router-dom';

const ListRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    setRequests(storedRequests);
  }, []);

  const handleApproveRequest = (id) => {
    if (!window.confirm(`Deseja aprovar a solicitação ${id}?`)) return;

    const approvedRequest = requests.find((request) => request.id === id);
    const updatedRequests = requests.filter((request) => request.id !== id);

    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    storedSales.push({ ...approvedRequest, status: 'Aprovado' });
    localStorage.setItem('sales', JSON.stringify(storedSales));
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
    setRequests(updatedRequests);
  };

  const handleRejectRequest = (id) => {
    if (!window.confirm(`Deseja recusar a solicitação ${id}?`)) return;

    const rejectedRequest = requests.find((request) => request.id === id);
    const updatedRequests = requests.filter((request) => request.id !== id);

    const storedReprovados = JSON.parse(localStorage.getItem('reprovados')) || [];
    storedReprovados.push({ ...rejectedRequest, status: 'Reprovado' });
    
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
    localStorage.setItem('reprovados', JSON.stringify(storedReprovados));
    setRequests(updatedRequests);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Produtos',
      dataIndex: 'products',
      key: 'products',
      render: (products) => products.map(p => `SKU: ${p.sku}, Qtd: ${p.quantity}`).join(', '),
    },
    {
      title: 'Região',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Prazo de Entrega',
      dataIndex: 'deliveryTime',
      key: 'deliveryTime',
    },
    {
      title: 'Desconto',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <>
          <Popconfirm title="Aprovar solicitação?" onConfirm={() => handleApproveRequest(record.id)}>
            <Button type="primary" style={{ marginRight: 8 }}>Aprovar</Button>
          </Popconfirm>
          <Popconfirm title="Recusar solicitação?" onConfirm={() => handleRejectRequest(record.id)}>
            <Button type="danger">Recusar</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <HeaderComponent />
      <div style={{ padding: '50px' }}>
        <h1>Solicitações de Venda</h1>
        <Button type="secondary" onClick={() => navigate('/listagem-gerente')} style={{ marginBottom: '20px', marginLeft: '10px' }}>
          Ver Listagem do Gerente
        </Button>
        <Table columns={columns} dataSource={requests} rowKey="id" />
      </div>
    </Layout>
  );
};

export default ListRequestsPage;

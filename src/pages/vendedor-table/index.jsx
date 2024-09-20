import { Layout, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/Header/HeaderComponent';

const SalesTable = () => {
  const [salesData, setSalesData] = useState([]);

  // Carregar as vendas do localStorage ao carregar o componente
  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    const inProcessSales = storedSales.filter(
      sale => sale.status === 'Aprovado' || sale.status === 'Em Processamento'
    );
    setSalesData(inProcessSales);
  }, []);

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'products',
      key: 'sku',
      render: (products) =>
        Array.isArray(products)
          ? products.map(p => `SKU: ${p.sku}, Qtd: ${p.quantity}`).join(', ')
          : 'Sem produtos',
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
      title: 'Valor Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => status || 'Em Processamento', // Exibe "Em Processamento" se não houver status
    },
  ];

  return (
    <Layout>
      <HeaderComponent /> {/* Cabeçalho */}
      <div style={{ padding: '50px', background: '#fff' }}>
        <h1>Vendas Realizadas</h1>
        <Table columns={columns} dataSource={salesData} rowKey="id" />
      </div>
    </Layout>
  );
};

export default SalesTable;

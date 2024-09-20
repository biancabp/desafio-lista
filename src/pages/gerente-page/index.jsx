import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { Layout, Row, Col, Button as AntButton } from 'antd';
import HeaderComponent from '../../components/Header/HeaderComponent'; // Importar o novo cabeçalho
import CreateSaleModal from '../../components/Modal/CreateSaleModal';
import useAuth from '../../hooks/useAuth'; // Importar useAuth

const { Content, Footer } = Layout;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate(); // Definir a função navigate

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddSale = (saleData) => {
    let storedSales = JSON.parse(localStorage.getItem('sales')) || [];

    // Para cada produto adicionado, garantimos que SKU e quantidade estão presentes
    saleData.products.forEach(product => {
      storedSales.push({
        sku: product.sku,
        quantity: product.quantity,
        price: product.preco_descontado,
        region: saleData.region,
        deliveryTime: saleData.deliveryTime,
        total: saleData.total - saleData.discount
      });
    });

    localStorage.setItem('sales', JSON.stringify(storedSales));
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <HeaderComponent /> {/* Adicionar o cabeçalho */}
      <Content style={{ padding: '50px', background: '#fff', minHeight: 'calc(100vh - 134px)' }}>
        <Row gutter={[16, 16]}>
          <Col span={24} style={{ textAlign: '', background: '#fff', padding: '5px' }}>
            <h2 style={{ fontSize: '20px', color: 'gray', fontWeight: '400' }}>GERENTEEE</h2>
            <h1 style={{ fontSize: '48px', color: 'black' }}>
             <span style={{ color: '#FFB800' }}>.</span>
            </h1>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={12} style={{ background: '#fff', padding: '20px' }}>
            <img src="../../../img/img.svg" alt="Placeholder" style={{ width: '85%' }} />
          </Col>
          <Col span={10} style={{ background: '#fff', padding: '20px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '600' }}>O que vamos fazer?</h2>
            <p style={{ fontSize: '18px' }}>Já fabricamos mais de 4 milhões de bonés personalizados com a marca de mais de 40 mil empresas de todo o Brasil</p>
            <AntButton type="primary" style={{ marginRight: '10px' }} onClick={showModal}>
              Criar Vendas
            </AntButton>
            <AntButton onClick={() => navigate('/vendas')}>Ver Vendas</AntButton> {/* Navegar para a página de vendas */}
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f0f2f5', padding: '10px' }}>
        SeuBoné ©2024
      </Footer>

      {/* Modal para criar vendas */}
      <CreateSaleModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onAddSale={handleAddSale} // Passar handleAddSale para o modal
      />
    </Layout>
  );
};

export default Home;

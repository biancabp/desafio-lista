import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Button as AntButton } from 'antd';
import HeaderComponent from '../../components/Header/HeaderComponent'; 
import CreateSaleModal from '../../components/Modal/CreateSaleModal';


const { Content, Footer } = Layout;

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate(); 

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddSale = (saleData) => {
    const requestId = Date.now(); // ID único para a solicitação
    const requestData = { id: requestId, ...saleData, status: 'Pendente' }; // Adicione um status inicial
  
    // Armazenar a solicitação no localStorage
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    storedRequests.push(requestData);
    localStorage.setItem('requests', JSON.stringify(storedRequests));
  
    setIsModalVisible(false);
  };
  
  

  return (
    <Layout>
      <HeaderComponent /> {/* Adicionar o cabeçalho */}
      <Content style={{ padding: '50px', background: '#fff', minHeight: 'calc(100vh - 134px)' }}>
        <Row gutter={[16, 16]}>
          <Col span={24} style={{ textAlign: '', background: '#fff', padding: '5px' }}>
            <h2 style={{ fontSize: '20px', color: 'gray', fontWeight: '400' }}>BEM-VINDO, VENDEDOR!</h2>
            <h1 style={{ fontSize: '48px', color: 'black' }}>
              nossos bonés<span style={{ color: '#FFB800' }}>.</span>
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
            <AntButton onClick={() => navigate('/vendas')}>Ver Vendas</AntButton> {}
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center', background: '#f0f2f5', padding: '10px' }}>
        SeuBoné ©2024
      </Footer>

      {}
      <CreateSaleModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onAddSale={handleAddSale} 
      />
    </Layout>
  );
};

export default Home;

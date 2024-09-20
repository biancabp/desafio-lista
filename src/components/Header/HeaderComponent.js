import { Button as AntButton, Layout } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../../styles/global.css';

const { Header } = Layout;

const HeaderComponent = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0988A8', padding: '0 50px' }}>
      <div className="logo" style={{ color: '#fff', fontSize: '24px', fontWeight: '700' }}>SeuBoné.</div>
      <div>
        <AntButton
          type="primary"
          onClick={() => navigate('/home')}
          style={{ marginRight: '10px' }}
        >
          Voltar
        </AntButton>
        <AntButton
          onClick={() => {
            signout();
            navigate("/");
          }}
        >
          Sair
        </AntButton>
      </div>
    </Header>
  );
};

export default HeaderComponent;

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../../styles/global.css'; 

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password } = values;

    if (!email || !password) {
      return;
    }

    const res = signin(email, password);

    if (res) {
      console.log(res);
      return;
    }

    // Obtenha o role do usuário após o login
    const role = localStorage.getItem("role");

    // Redirecione o usuário com base no role
    if (role === 'gerente') {
      navigate("/gerente-pedidos"); // Redireciona para a nova página de pedidos
    } else if (role === 'vendedor') {
      navigate("/home");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <h1>SeuBoné</h1>
        <p>A maior empresa de bonés personalizados do Brasil</p>
      </div>

      <div className="signin-right">
        <div className='text-right'>
          <h2>Olá, de novo!</h2>
          <p>Seja bem-vindo de volta</p>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish} // Adicionado o onFinish para lidar com o envio do formulário
        >
          <Form.Item
            name="email"
            className="custom-form-item"
            rules={[{ required: true, message: 'Digite seu E-mail!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="E-mail"
              className="custom-input"
              style={{ padding: '12px', borderRadius: '15px', borderColor: '#dddddd8f'}}
            />
          </Form.Item>

          <Form.Item
            name="password"
            className="custom-form-item"
            rules={[{ required: true, message: 'Digite sua Senha!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Senha"
              className="custom-input"
              style={{ padding: '12px', borderRadius: '15px', borderColor: '#dddddd8f'}}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Entrar
            </Button>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <span>Não tem uma conta?</span>
              <Link to="/cadastro"> Registre-se</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;

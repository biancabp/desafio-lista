import { Button, Form, Input, Select } from 'antd';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import './style.css';

const { Option } = Select;

const Signup = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const onFinish = (values) => {
    const { email, emailConf, password, role } = values;

    if (!email || !emailConf || !password || !role) {
      setError('Preencha todos os campos');
      return;
    } else if (email !== emailConf) {
      setError('Os e-mails não são iguais');
      return;
    }

    const res = signup(email, password, role);

    if (res) {
      setError(res);
      return;
    }

    alert('Usuário cadastrado com sucesso!');
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h1>SeuBoné</h1>
        <p>A maior empresa de bonés personalizados do Brasil</p>
      </div>

      <div className="signup-right">
        <h2>Olá!</h2>
        <p>Se cadastre para entrar</p>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            className="custom-form-item"
            rules={[{ required: true, message: 'Digite seu E-mail!' }]}
          >
            <Input
              type="email"
              placeholder="Digite seu E-mail"
              className="custom-input"
              style={{ padding: '12px', borderRadius: '15px', borderColor: '#dddddd8f' }}
            />
          </Form.Item>

          <Form.Item
            name="emailConf"
            className="custom-form-item"
            rules={[{ required: true, message: 'Confirme seu E-mail!' }]}
          >
            <Input
              type="email"
              placeholder="Confirme seu E-mail"
              className="custom-input"
              style={{ padding: '12px', borderRadius: '15px', borderColor: '#dddddd8f' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            className="custom-form-item"
            rules={[{ required: true, message: 'Digite sua Senha!' }]}
          >
            <Input
              type="password"
              placeholder="Digite sua Senha"
              className="custom-input"
              style={{ padding: '12px', borderRadius: '15px', borderColor: '#dddddd8f' }}
            />
          </Form.Item>

          <Form.Item
            name="role"
            className="custom-form-item"
            rules={[{ required: true, message: 'Escolha seu tipo de acesso!' }]}
          >
            <Select placeholder="Escolha seu tipo de acesso" className="custom-input">
              <Option value="vendedor">Vendedor</Option>
              <Option value="gerente">Gerente</Option>
            </Select>
          </Form.Item>

          {error && <div className="error-message">{error}</div>}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Inscrever-se
            </Button>
            <div style={{ textAlign: 'center', marginTop: 10 }}>
              <span>Já tem uma conta?</span>
              <Link to="/"> Entre</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

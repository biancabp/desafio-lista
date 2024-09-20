import { DeleteOutlined } from '@ant-design/icons';
import { Button, Divider, Input, List, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { SKUs } from '../../data/produtosCaseSB';

const { Option } = Select;

const CreateSaleModal = ({ visible, onCancel, onAddSale }) => {
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [region, setRegion] = useState('nordeste');
  const [deliveryTime, setDeliveryTime] = useState('padrao');
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [skuError, setSkuError] = useState('');

  useEffect(() => {
    if (sku.trim() !== '') {
      const product = SKUs.find(p => p.SKU === sku);
      if (product) {
        setProductDescription(product.descricao);
        setSkuError('');
      } else {
        setProductDescription('');
        setSkuError('Produto não encontrado');
      }
    } else {
      setProductDescription('');
      setSkuError('');
    }
  }, [sku]);

  const calculateShipping = (products, region) => {
    const regionFactor = {
      norte: 1,
      nordeste: 0,
      centrooeste: 1.5,
      sudeste: 2,
      sul: 3,
    };
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    return regionFactor[region] * totalQuantity;
  };

  const calculateTotalPrice = () => {
    if (!products.length || !region || !deliveryTime) return 0;

    // Usar preco_cheio para calcular o total
    const productsSum = products.reduce((sum, product) => sum + (product.quantity * product.preco_cheio), 0);

    const deliveryAdditionalMap = {
      padrao: 0,
      turbo: 0.1,
      'super-turbo': 0.2,
    };

    const deliveryAdditional = productsSum * deliveryAdditionalMap[deliveryTime];
    const shippingCost = calculateShipping(products, region);

    return productsSum + shippingCost + deliveryAdditional - discount;
  };


  const handleAddProduct = () => {
    const product = SKUs.find(p => p.SKU === sku);

    if (products.some(p => p.sku === sku)) {
      setSkuError('Este SKU já foi adicionado');
      return;
    }

    if (product) {
      const newProduct = { sku, quantity, ...product, preco: product.preco_cheio }; // Usando o preco_cheio
      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts, newProduct];

        // Atualiza o total após adicionar o produto
        setTotal(calculateTotalPrice(updatedProducts));

        return updatedProducts;
      });

      setSku('');
      setQuantity(1);
    }
  };

  const handleRemoveProduct = (index) => {
    setProducts(prevProducts => {
      const updatedProducts = prevProducts.filter((_, i) => i !== index);
      setTotal(calculateTotalPrice(updatedProducts));
      return updatedProducts;
    });
  };

  useEffect(() => {
    setTotal(calculateTotalPrice());
    console.log("Valor Total Atualizado:", total); // Adicione este log
  }, [products, region, deliveryTime, discount]);

  return (
    <Modal
      title="Criar Venda"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>Cancelar</Button>,
        <Button key="add" type="primary" onClick={() => {
          const saleData = { products, region, deliveryTime, discount, total };
          onAddSale(saleData);
        }}>
          Adicionar Venda
        </Button>
      ]}
    >
      <h3>Produtos</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <Input
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          style={{ flex: '1' }}
        />
        <Input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{ flex: '1' }}
        />
      </div>

      {skuError && <p style={{ color: 'red' }}>{skuError}</p>}
      {productDescription && <p style={{ color: 'green' }}>{productDescription}</p>}

      <Button onClick={handleAddProduct} style={{ marginBottom: '20px' }}>
        Adicionar Produto
      </Button>

      <Divider>Produtos Selecionados</Divider>
      <List
        bordered
        dataSource={products}
        renderItem={(item, index) => (
          <List.Item className="list-item">
            <span>SKU: {item.sku}, Quantidade: {item.quantity}, Preço: R${item.preco_cheio}</span>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveProduct(index)}
            >
              Excluir
            </Button>
          </List.Item>
        )}
        style={{ marginBottom: '20px' }}
      />

      <h3>Detalhes</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <Select
          placeholder="Região Destino"
          value={region}
          onChange={(value) => setRegion(value)}
          style={{ flex: '1' }}
        >
          <Option value="norte">Norte</Option>
          <Option value="nordeste">Nordeste</Option>
          <Option value="centro-oeste">Centro-Oeste</Option>
          <Option value="sudeste">Sudeste</Option>
          <Option value="sul">Sul</Option>
        </Select>
        <Select
          placeholder="Prazo"
          value={deliveryTime}
          onChange={(value) => setDeliveryTime(value)}
          style={{ flex: '1' }}
        >
          <Option value="padrao">Padrão</Option>
          <Option value="turbo">Turbo</Option>
          <Option value="super-turbo">Super Turbo</Option>
        </Select>
      </div>
      <Input
        type="number"
        placeholder="Desconto R$"
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value))}
        style={{ marginBottom: '20px' }}
      />
    </Modal>
  );
};

export default CreateSaleModal;

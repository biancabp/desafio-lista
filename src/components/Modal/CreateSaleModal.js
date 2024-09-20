import { DeleteOutlined } from '@ant-design/icons';
import { Button, Divider, Input, List, Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { SKUs } from '../../data/produtosCaseSB';

const CreateSaleModal = ({ visible, onCancel, onAddSale }) => {
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [region, setRegion] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
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
      norte: 3,
      nordeste: 0,
      centrooeste: 3,
      sudeste: 0,
      sul: 3,
    };
    const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    return regionFactor[region] * totalQuantity;
  };

  const calculateTotalPrice = (products) => {
    if (!products.length || !region || !deliveryTime) return { total: 0, discount: 0 };

    const shippingCost = calculateShipping(products, region);
    const productsSum = products.reduce((sum, product) => sum + (product.quantity * product.preco_cheio), 0);
    const totalWithoutDiscount = productsSum + shippingCost;

    let maxDiscount = 0;
    if (deliveryTime === 'padrao') {
      maxDiscount = Math.max(shippingCost, productsSum * 0.05);
    } else if (deliveryTime === 'turbo') {
      maxDiscount = Math.max(shippingCost, productsSum * 0.1);
    } else if (deliveryTime === 'super-turbo') {
      maxDiscount = Math.max(shippingCost, productsSum * 0.2);
    }

    return {
      total: totalWithoutDiscount - maxDiscount,
      discount: maxDiscount,
    };
  };

  const updateTotals = () => {
    const { total, discount } = calculateTotalPrice(products);
    setTotal(total);
    setDiscount(discount);
  };

  const handleAddProduct = () => {
    const product = SKUs.find(p => p.SKU === sku);

    if (products.some(p => p.sku === sku)) {
      setSkuError('Este SKU já foi adicionado');
      return;
    }

    if (product) {
      const newProduct = { sku, quantity, ...product, preco: product.preco_cheio };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      updateTotals(); // Atualiza totais após adicionar produto

      setSku(''); // Limpar o SKU e quantidade
      setQuantity(1);
    }
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    updateTotals(); // Atualiza totais após remover produto
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    updateTotals(); // Atualiza totais ao mudar a região
  };

  const handleDeliveryTimeChange = (e) => {
    setDeliveryTime(e.target.value);
    updateTotals(); // Atualiza totais ao mudar o prazo
  };

  const handleAddSale = () => {
    const saleData = { products, region, deliveryTime, total, discount };
    onAddSale(saleData);
  };

  return (
    <Modal
      title="Criar Venda"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>Cancelar</Button>,
        <Button key="add" type="primary" onClick={handleAddSale}>
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
            <span>SKU: {item.sku}, Quantidade: {item.quantity}, Preço: R$ {item.preco_cheio}</span>
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
      <div>
        <h4>Região Destino</h4>
        <Radio.Group onChange={handleRegionChange} value={region}>
          <Radio value="norte">Norte</Radio>
          <Radio value="nordeste">Nordeste</Radio>
          <Radio value="centrooeste">Centro-Oeste</Radio>
          <Radio value="sudeste">Sudeste</Radio>
          <Radio value="sul">Sul</Radio>
        </Radio.Group>

        <h4>Prazo</h4>
        <Radio.Group onChange={handleDeliveryTimeChange} value={deliveryTime}>
          <Radio value="padrao">Padrão</Radio>
          <Radio value="turbo">Turbo</Radio>
          <Radio value="super-turbo">Super Turbo</Radio>
        </Radio.Group>

        <Divider />
        <h3>Resumo</h3>
        <p>Total: R$ {total.toFixed(2)}</p>
        <p>Desconto: R$ {discount.toFixed(2)}</p>
      </div>
    </Modal>
  );
};

export default CreateSaleModal;
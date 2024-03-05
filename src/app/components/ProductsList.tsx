import React, { useState, useEffect } from "react";
import { useProducts } from "../hooks/getProducts";
import Image from "next/image";
import ItemCarrinho from "../types/ItemCarrinho";
import Produto from "../types/Produto";
import Moeda from "../utils/Moeda";
import styled from "styled-components";
import axios from "axios";
import { useDeleteProduct } from "../hooks/deleteProducts";

interface CarrinhoProps {
  itens: ItemCarrinho[];
}

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
`;

const CartContainer = styled.div`
  margin-top: 40px;
`;

const CartTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;
const AddButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const TotalPrice = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const App: React.FC<CarrinhoProps> = () => {
  const [cart, setCart] = useState<Produto[]>([]);
  const { data, isLoading } = useProducts();
  const { mutate } = useDeleteProduct();

  const addToCart = (product: Produto) => setCart([...cart, product]);

  const removeFromCart = async (productId: number) => {
    mutate(productId);
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.preco, 0);
  };

  return (
    <Container>
      <Title>Loja Online</Title>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ProductsGrid>
          {data?.map((product: Produto) => (
            <ProductCard key={product.id}>
              <Image
                width={340}
                height={300}
                priority
                style={{ objectFit: "cover" }}
                src={product.imagem}
                alt={product.nome}
              />
              <h2>{product.nome}</h2>
              <p>Preço: R$ {product.preco}</p>
              <p>{product.descricao}</p>
              <AddButton onClick={() => addToCart(product)}>
                Adicionar ao carrinho
              </AddButton>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}
      <CartContainer>
        <CartTitle>Carrinho de Compras</CartTitle>
        {cart.map((item) => (
          <CartItem key={item.id}>
            <p>
              {item.nome} - R${item.preco}
            </p>
            <RemoveButton onClick={() => removeFromCart(item.id)}>
              Remover
            </RemoveButton>
          </CartItem>
        ))}
        <TotalPrice>Valor Total:{Moeda.formatar(getTotalPrice())}</TotalPrice>
      </CartContainer>
    </Container>
  );
};

export default App;

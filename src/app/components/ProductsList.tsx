import React, { useState, useEffect } from "react";
import { useProducts } from "../hooks/getProducts";
import Image from "next/image";

function ProductList() {
  const { data, isLoading, isError } = useProducts();

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {isError && <p>Ocorreu um erro</p>}
      <h1 className="text-center items-center justify-center">
        Lista de Produtos
      </h1>
      <div className="products">
        {data?.map((product: any) => (
          <div key={product.id} className="product-card">
            <Image
              width={340}
              height={300}
              style={{ objectFit: "cover" }}
              src={product.imagem}
              alt={product.nome}
            />
            <h2>{product.nome}</h2>
            <p>Preço: R$ {product.preco.toFixed(2)}</p>
            <p>{product.descricao}</p>
            <button onClick={() => console.log(product)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .product-card {
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 10px;
        }
      `}</style>
    </div>
  );
}

export default ProductList;

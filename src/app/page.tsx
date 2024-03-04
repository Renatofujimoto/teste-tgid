"use client";
import Image from "next/image";
import { useState } from "react";
import { useProducts } from "./hooks/getProducts";

export default function Home() {
  const [name, setName] = useState("");

  const { data, isLoading, isFetching, refetch } = useProducts();

  if (isLoading) return <div>Loading</div>;
  return (
    <section>
      <ul>
        <li>
          {data?.map((products: any) => (
            <div key={products.id}>
              <Image
                src={products.imagem}
                width={100}
                height={100}
                alt={"imagem"}
              />
              <p> {products.name}</p>
            </div>
          ))}
        </li>
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => refetch()}>Atualizar</button>
      {isFetching ? <span> Loading...</span> : null}{" "}
    </section>
  );
}

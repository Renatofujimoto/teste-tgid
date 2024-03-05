"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface deleteProps {
  products: {
    id?: number;
  };
}
const deleteProduct = async (productId: number) => {
  const res = await axios.delete(`http://localhost:4000/products/${productId}`); // Altere a URL conforme necessário

  return res.data;
};

const useDeleteProduct = () => {
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      console.log("Success delete Product");
    },
    onError: () => {
      console.log("Error delete Product");
    },
  });
};

export { useDeleteProduct, deleteProduct };

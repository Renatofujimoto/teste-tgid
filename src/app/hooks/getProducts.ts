import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProducts = async () => {
  const { data } = await axios.get("http://localhost:4000/products");
  return data;
};

const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

export { useProducts, fetchProducts };

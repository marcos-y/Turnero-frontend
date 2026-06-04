// api/products.api.js
import { api } from "./client";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const createProduct = async (payload) => {
  const response = await api.post("/products", payload);
  return response.data;
};
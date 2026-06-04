import { api } from "./client";

export const getBoxes = async () => {
  const response = await api.get("/boxes");
  return response.data;
};

export const getBoxesCajeros = async () => {
  const response = await api.get("/boxes/boxesCajero");
  return response.data;
};

export const getBoxById = async (id) => {
  const response = await api.get(`/boxes/${id}`);
  return response.data;
};

export const createBox = async (payload) => {
  const response = await api.post("/boxes", payload);
  return response.data;
};

export const updateBox = async (id,payload) => {
  const response = await api.put(`/boxes/${id}`, payload);
  return response.data;
};

export const deleteBox = async (id) => {
  const response = await api.delete(`/boxes/${id}`);
  return response.data;
};

export const updateEstado = async (id,payload) => {
  const response = await api.put(`/boxes/${id}/estado`);
  return response.data;
};
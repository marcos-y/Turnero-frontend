import { api } from "./client";

export const getCajeros = async () => {
  const response = await api.get("/cajeros");
  return response.data;
};

export const getCajeroById = async (id) => {
  const response = await api.get(`/cajeros/${id}`);
  return response.data;
};

export const createCajero = async (payload) => {
  const response = await api.post("/cajeros", payload);
  return response.data;
};

export const updateCajero = async (id,payload) => {
  const response = await api.put(`/cajeros/${id}/asignar-box`, payload);
  return response.data;
};

export const updatePassword = async (id,payload) => {
  const response = await api.put(`/cajeros${id}/password`, payload);
  return response.data;
};

export const deleteCajero = async (id) => {
  const response = await api.delete(`/cajeros/${id}`);
  return response.data;
};

export const updateEstado = async (id,payload) => {
  const response = await api.put(`/cajeros${id}/estado`, payload);
  return response.data;
};

export const assignType = async (id,payload) => {
  const response = await api.put(`/cajeros${id}/asignarTipoTurno`, payload);
  return response.data;
};

export const removeType = async (id,payload) => {
  const response = await api.put(`/cajeros${id}/removerTipoTurno`, payload);
  return response.data;
};

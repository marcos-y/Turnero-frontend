import { api } from "./client";

export const getTipos = async () => {
  const response = await api.get("/tipos-turno");
  return response.data;
};

export const getTiposActivos = async () => {
  const response = await api.get("/tipos-turno/activos");
  return response.data;
};

export const getTipoById = async (id) => {
  const response = await api.get(`/tipos-turno/${id}`);
  return response.data;
};

export const createTipo = async (payload) => {
  const response = await api.post("/tipos-turno", payload);
  return response.data;
};

export const updateTipo = async (id,payload) => {
  const response = await api.put(`/tipos-turno/${id}`, payload);
  return response.data;
};

export const updateState = async (id,payload) => {
  const response = await api.put(`/tipos-turno/${id}/estado`, payload);
  return response.data;
};

export const deleteTipo = async (id) => {
  const response = await api.delete(`/tipos-turno/${id}`);
  return response.data;
};
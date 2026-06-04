import { api } from "./client";

export const getTipos = async () => {
  const response = await api.get("/tipos-usuarios");
  return response.data;
};

export const getTiposActivos = async () => {
  const response = await api.get("/tipos-usuarios/activos");
  return response.data;
};

export const getTipoById = async (id) => {
  const response = await api.get(`/tipos-usuarios/${id}`);
  return response.data;
};

export const updateTipo = async (id,payload) => {
  const response = await api.put(`/tipos-usuarios/${id}`, payload);
  return response.data;
};

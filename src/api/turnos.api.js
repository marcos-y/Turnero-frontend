import { api } from "./client";

export const getTurnos = async () => {
  const response = await api.get("/turnos");
  return response.data;
};

export const getTurnosVisor = async () => {
  const response = await api.get("/turnos/visor");
  return response.data;
};


export const getTurnoById = async (id) => {
  const response = await api.get(`/turnos/${id}`);
  return response.data;
};

export const getTurnosByDia = async (id) => {
  const response = await api.get(`/turnos/dia/todos`);
  return response.data;
};

export const getTurnoByTipo = async (id) => {
  const response = await api.get(`/turnos/tipo/${id}`);
  return response.data;
};

export const createTurno = async (payload) => {
  const response = await api.post("/turnos", payload);
  return response.data;
};

export const assignBox = async (id,payload) => {
  const response = await api.put(`/turnos${id}/asignar-box`, payload);
  return response.data;
};

export const changeBox = async (id,payload) => {
  const response = await api.put(`/turnos${id}/cambiar-box`, payload);
  return response.data;
};

export const callTurn = async (id,payload) => {
  const response = await api.put(`/turnos${id}/llamar`, payload);
  return response.data;
};

export const finishTurn = async (id,payload) => {
  const response = await api.put(`/turnos${id}/finalizar`, payload);
  return response.data;
};

export const deleteTurno = async (id) => {
  const response = await api.delete(`/turnos/${id}`);
  return response.data;
};

export const getUltimosTurnos = async (id) => {
  const response = await api.get(`/turnos/${id}/ultimos`);
  return response.data;
};

export const getMetricasGlobales = async () => {
  const response = await api.get(`/turnos/metricas/globales`);
  return response.data;
};

export const getMetricasPorTurno  = async (id) => {
  const response = await api.get(`turnos/${id}/metricas`);
  return response.data;
};

export const getMetricasPorDia = async () => {
  const response = await api.get(`turnos/metricas/dias`);
  return response.data;
};
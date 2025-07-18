import axios from "axios";

const url = "http://localhost:3000/api/v1/tareas/";

export const allTareas = async () => {
  const data = await axios.get(`${url}`);
  return data;
};

export const tareaCreate = async (body) => {
  const { data } = await axios.post(`${url}`, body);
  return data;
};

export const tareaId = async (id) => {
  const data = await axios.get(`${url}${id}`);
  return data;
};

export const tareaClear = async (id) => {
  const data = await axios.delete(`${url}${id}`);
  return data;
};

export const tareaComplete = async (id) => {
  const data = await axios.put(`${url}${id}`);
  return data;
};

export const clearAllComplete = async () => {
  const data = await axios.delete(`${url}`);
  return data;
};

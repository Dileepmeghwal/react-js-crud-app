import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const getAllItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/items`);
  return response.data;
};

export const addItem = async (item) => {
  const response = await axios.post(`${API_BASE_URL}/items`, item);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await axios.put(`${API_BASE_URL}/items/${id}`, item);
  return response.data;
};

export const deleteItem = async (id) => {
  await axios.delete(`${API_BASE_URL}/items/${id}`);
};
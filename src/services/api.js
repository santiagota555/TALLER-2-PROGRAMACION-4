import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

export const productsAPI = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const usersAPI = {
  getAll: () => api.get("/users"),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

export const providersAPI = {
  getAll: () => api.get("/providers"),
  getById: (id) => api.get(`/providers/${id}`),
  create: (data) => api.post("/providers", data),
  update: (id, data) => api.put(`/providers/${id}`, data),
  delete: (id) => api.delete(`/providers/${id}`),
};

export const salesAPI = {
  getAll: () => api.get("/sales"),
  getById: (id) => api.get(`/sales/${id}`),
  create: (data) => api.post("/sales", data),
  update: (id, data) => api.put(`/sales/${id}`, data),
  delete: (id) => api.delete(`/sales/${id}`),
};

export const saleDetailsAPI = {
  getAll: () => api.get("/sale-details"),
  getById: (id) => api.get(`/sale-details/${id}`),
  create: (data) => api.post("/sale-details", data),
  update: (id, data) => api.put(`/sale-details/${id}`, data),
  delete: (id) => api.delete(`/sale-details/${id}`),
};

export default api;
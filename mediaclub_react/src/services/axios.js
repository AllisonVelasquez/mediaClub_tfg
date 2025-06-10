import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8000/api/", // Ajusta al dominio real de tu API
  withCredentials: true,
});

// Interceptor para agregar token a cada request (si está disponible)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;

  }
  return config;
});

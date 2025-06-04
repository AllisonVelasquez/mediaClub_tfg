import axios from "axios";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true, // Si usas autenticación con cookies/Sanctum
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


import axios from "axios";

// Instancia de axios para hacer peticiones
export const instance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});





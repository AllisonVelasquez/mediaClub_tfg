import { instance } from "../axios";

// Obtener hilos
export const getHilos = async () => {
  try {
    const response = await instance.get("hilos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener hilos:", error);
    throw error;
  }
};

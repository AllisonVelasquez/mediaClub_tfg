import { instance } from "../axios";

// Obtener respuestas de un hilo
export const getRespuestasHilo = async (hiloId) => {
  try {
    const response = await instance.get(`hilos/${hiloId}/respuestas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener respuestas al hilo:", error);
    throw error;
  }
};
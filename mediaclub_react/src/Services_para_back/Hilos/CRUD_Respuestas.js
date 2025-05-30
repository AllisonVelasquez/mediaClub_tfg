import { instance } from "../axios";
export const getRespuestasHilo = async () => {
  try {
    const response = await instance.get('/7');
    return response.data;
  } catch (error) {
    console.error("Error al obtener respuestas al hilo:", error);
    throw error;
  }
};
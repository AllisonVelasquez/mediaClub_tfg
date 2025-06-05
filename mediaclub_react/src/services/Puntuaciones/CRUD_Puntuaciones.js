import { instance } from "../axios";

// Obtener puntuaciones
export const getPuntuaciones = async () => {
  try {
    const response = await instance.get("puntuaciones");
    return response.data;
  } catch (error) {
    console.error("Error al obtener puntuaciones:", error);
    throw error;
  }
};

// Crear puntuación
export const crearPuntuacion = async (puntuacionData) => {
  try {
    const response = await instance.post("puntuaciones", puntuacionData);
    return response.data;
  } catch (error) {
    console.error("Error al crear puntuación:", error);
    throw error;
  }
};

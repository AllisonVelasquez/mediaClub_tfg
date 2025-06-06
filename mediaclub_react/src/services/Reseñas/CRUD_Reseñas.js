import { instance } from "../axios";

// Obtener reseñas de un frame (película)
export const getResenasByFrame = async (frameId) => {
  try {
    const response = await instance.get(`frames/${frameId}/resenas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    throw error;
  }
};

// Crear reseña para un frame
export const crearResena = async (frameId, resenaData) => {
  try {
    const response = await instance.post(`frames/${frameId}/anadir-resena`, resenaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear reseña:", error);
    throw error;
  }
};

// Eliminar reseña (ajusta la ruta si es necesario)
export const eliminarResena = async (resenaId) => {
  try {
    const response = await instance.delete(`mi/resenas/${resenaId}/borrar`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar reseña:", error);
    throw error;
  }
};
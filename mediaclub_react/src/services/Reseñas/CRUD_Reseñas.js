import { instance } from "../axios";

// Obtener reseñas
export const getReseñas = async () => {
  try {
    const response = await instance.get("reseñas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    throw error;
  }
};

// Crear reseña
export const crearReseña = async (reseñaData) => {
  try {
    const response = await instance.post("reseñas", reseñaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear reseña:", error);
    throw error;
  }
};

// Eliminar reseña
export const eliminarReseña = async (resenaId) => {
  try {
    const response = await instance.delete(`reseñas/${resenaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar reseña:", error);
    throw error;
  }
};
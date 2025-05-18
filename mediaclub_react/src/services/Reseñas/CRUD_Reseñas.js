import { instance } from "../axios";
// 3. Reseñas
export const getReseñas = async () => {
  try {
    const response = await instance.get('/2');
    return response.data;
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    throw error;
  }
};

export const crearReseña = async (reseñaData) => {
  try {
    const response = await instance.post('/2', reseñaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear reseña:", error);
    throw error;
  }
};

export const eliminarReseña = async (resenaId) => {
  try {
    const response = await instance.delete(`/2/${resenaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar reseña:", error);
    throw error;
  }
};
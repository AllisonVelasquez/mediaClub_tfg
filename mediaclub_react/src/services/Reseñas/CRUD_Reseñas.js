import { instance } from "../axios";

// ✅ Obtener TODAS las reseñas del usuario autenticado
export const getMisResenas = async () => {
  try {
    const response = await instance.get("mi/resenas/ver-todas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener tus reseñas:", error);
    throw error;
  }
};

// ✅ Obtener reseña individual (por ID)
export const getResenaPorId = async (resenaId) => {
  try {
    const response = await instance.get(`mi/resenas/${resenaId}/detalles`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener reseña con ID ${resenaId}:`, error);
    throw error;
  }
};

// ✅ Obtener reseñas del usuario para un frame específico
export const getMisResenasPorFrame = async (frameId) => {
  try {
    const response = await instance.get(`mi/resenas/${frameId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener reseñas del frame ${frameId}:`, error);
    throw error;
  }
};

// ✅ Eliminar una reseña
export const eliminarResena = async (resenaId) => {
  try {
    const response = await instance.delete(`mi/resenas/${resenaId}/borrar`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar reseña ${resenaId}:`, error);
    throw error;
  }
};
// ✅ Actualizar una reseña
export const actualizarResena = async (resenaId, contenido) => {
  try {
    const response = await instance.put(`mi/resenas/${resenaId}/actualizar`, { contenido });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar reseña ${resenaId}:`, error);
    throw error;
  }
};
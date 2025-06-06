// src/services/Resenas/resenasApi.js

import { instance } from "../axios";

// ✅ Obtener reseñas de un frame específico
export const getResenasFrame = async (frameId) => {
  try {
    const response = await instance.get(`frames/${frameId}/resenas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener reseñas del frame:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Obtener TODAS las reseñas del usuario autenticado
export const getResenasUsuario = async () => {
  try {
    const response = await instance.get("mi/resenas/ver-todas");
    return response.data;
  } catch (error) {
    console.error("Error al obtener reseñas del usuario:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Obtener una reseña específica por su ID
export const getResenaPorId = async (resenaId) => {
  try {
    const response = await instance.get(`mi/resenas/${resenaId}/detalles`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener reseña con ID ${resenaId}:`, error.response?.data || error.message);
    throw error;
  }
};

// ✅ Crear una nueva reseña
export const crearResena = async ({ frame_id, contenido, spoiler }) => {
  try {
    const response = await instance.post("mi/resenas/crear", {
      frame_id,
      contenido,
      spoiler,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear reseña:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Eliminar una reseña por ID
export const eliminarResena = async (resenaId) => {
  try {
    const response = await instance.delete(`mi/resenas/${resenaId}/borrar`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar reseña ${resenaId}:`, error.response?.data || error.message);
    throw error;
  }
};

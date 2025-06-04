import { instance } from "../axios";
// 2. Sesiones
export const getSesiones = async () => {
  try {
    const response = await instance.get('/1');
    return response.data;
  } catch (error) {
    console.error("Error al obtener sesiones:", error);
    throw error;
  }
};

export const crearSesion = async (sesionData) => {
  try {
    const response = await instance.post('/1', sesionData);
    return response.data;
  } catch (error) {
    console.error("Error al crear sesión:", error);
    throw error;
  }
};

export const eliminarSesion = async (sesionId) => {
  try {
    const response = await instance.delete(`/1/${sesionId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar sesión:", error);
    throw error;
  }
};
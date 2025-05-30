import { instance } from "../axios";
// 4. Puntuaciones
export const getPuntuaciones = async () => {
    try {
      const response = await instance.get('/3');
      return response.data;
    } catch (error) {
      console.error("Error al obtener 3:", error);
      throw error;
    }
  };
  
  export const crearPuntuacion = async (puntuacionData) => {
    try {
      const response = await instance.post('/3', puntuacionData);
      return response.data;
    } catch (error) {
      console.error("Error al crear puntuación:", error);
      throw error;
    }
  };
  
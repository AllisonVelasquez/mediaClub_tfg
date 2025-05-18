import { instance } from "../axios";// 6. Listas
export const getListas = async () => {
  try {
    const response = await instance.get('/6');
    
    return response.data;
  } catch (error) {
    console.error("Error al obtener 5:", error);
    throw error;
  }
};

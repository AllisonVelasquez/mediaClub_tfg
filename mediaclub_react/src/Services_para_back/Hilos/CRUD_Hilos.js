import { instance } from "../axios";
// 7. Hilos
export const getHilos = async () => {
  try {
    const response = await instance.get("/6");
    return response.data;
  } catch (error) {
    console.error("Error al obtener 6:", error);
    throw error;
  }
};

import { instance } from "../axios";
export const getChats = async () => {
    try {
      const response = await instance.get('/8');
      return response.data;
    } catch (error) {
      console.error("Error al obtener chats:", error);
      throw error;
    }
  };
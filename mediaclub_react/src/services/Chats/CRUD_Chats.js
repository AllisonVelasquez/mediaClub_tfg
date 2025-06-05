import { instance } from "../axios";

// Obtener chats
export const getChats = async () => {
  try {
    const response = await instance.get("chats");
    return response.data;
  } catch (error) {
    console.error("Error al obtener chats:", error);
    throw error;
  }
};
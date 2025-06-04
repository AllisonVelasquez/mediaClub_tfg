import { instance } from "../axios";

// Obtener todos los frames
export const getFrames = async () => {
  try {
    const response = await instance.get("frames/popular");
    console.log("Frames obtenidos:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error al obtener frames:", error);
    throw error;
  }
};

// Obtener un frame por ID
export const getFrameById = async (frameId) => {
  try {
    const response = await instance.get(`frames/${frameId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener frame por ID:", error);
    throw error;
  }
};

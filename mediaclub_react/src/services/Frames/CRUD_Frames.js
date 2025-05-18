import { instance } from "../axios";
// 5. Frames
// Obtener todos los frames
export const getFrames = async () => {
  try {
    const response = await instance.get("/5"); // Asegúrate que esta sea la ruta que devuelve el bloque de "Frames cargados"
    const framesBlock = response.data;
    console.log(framesBlock);

    // Busca el bloque correcto con el mensaje esperado
    if (framesBlock.message === "Frames cargados" && framesBlock.data?.frames) {
      return framesBlock.data.frames;
    } else if (Array.isArray(framesBlock)) {
      const match = framesBlock.find(
        (item) => item.message === "Frames cargados"
      );
      return match?.data?.frames || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al obtener frames:", error);
    throw error;
  }
};

// Obtener un frame por ID
export const getFrameById = async (frameId) => {
  try {
    const response = await instance.get("/5");
    const framesBlock = response.data;

    let frames = [];

    if (Array.isArray(framesBlock)) {
      const match = framesBlock.find(
        (item) => item.message === "Frames cargados"
      );
      frames = match?.data?.frames || [];
    } else if (framesBlock.message === "Frames cargados") {
      frames = framesBlock.data?.frames || [];
    }

    return frames.find((f) => f.frame_id === parseInt(frameId));
  } catch (error) {
    console.error("Error al obtener frame por ID:", error);
    throw error;
  }
};

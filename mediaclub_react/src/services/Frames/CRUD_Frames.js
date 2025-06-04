import { instance } from "../axios";

// Obtener todos los frames
//Ruta img https://image.tmdb.org/t/p/original
export const getFrames = async () => {
  try {
    const response = await instance.get("frames/popular");

    if (
      response.data &&
      response.data.contenido &&
      Array.isArray(response.data.contenido.data)
    ) {
      const frames = response.data.contenido.data.map((frame) => ({
        frame_id: frame.id,
        poster_url: "https://image.tmdb.org/t/p/original"+frame.poster_url,
        titulo: frame.titulo || "Sin título",
        promedio_muvis: frame.promedio_votos_muvis || 0,
        promedio_tmdb: frame.promedio_votos_tmdb || 0,
      }));
      console.log("Frames obtenidos:", frames);
      return frames;
    } else {
      console.warn("Respuesta inesperada:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener frames:", error.response?.data || error.message);
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

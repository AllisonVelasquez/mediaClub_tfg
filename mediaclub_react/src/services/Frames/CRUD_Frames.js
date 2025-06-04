import { instance } from "../axios";

// Populares
export const getFramesPopular = async () => {
  try {
    const response = await instance.get("frames/popular"); // o frames/recientes según tu endpoint
    if (
      response.data &&
      response.data.contenido &&
      Array.isArray(response.data.contenido.data)
    ) {
      const frames = response.data.contenido.data.map((frame) => ({
        frame_id: frame.id,
        poster_url: "https://image.tmdb.org/t/p/w342" + frame.poster_url,
        titulo: frame.titulo || "Sin título",
        promedio_muvis: frame.promedio_votos_muvis ?? 'N/A',
        promedio_tmdb: frame.promedio_votos_tmdb ?? frame.promedio_votos_tmdb ?? frame.promedio_votos_tmdb ?? 'N/A',
        fecha_estreno: frame.fecha_estreno ? new Date(frame.fecha_estreno).toLocaleDateString() : 'Sin fecha',
      }));
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


// Top 10
export const getTop10Frames = async () => {
  const response = await instance.get("frames/top-10");
  return response.data;
};

// Recientes
export const getRecentFrames = async () => {
  const response = await instance.get("frames/recientes");
  return response.data;
};

// Buscar por título
export const searchFramesByTitle = async (titulo) => {
  const response = await instance.get("frames/buscar", { params: { titulo } });
  return response.data;
};

// Detalles de una película
export const getFrameDetails = async (frameId) => {
  const response = await instance.get(`frames/${frameId}/detalles`);
  return response.data;
};

// Reseñas de una película
export const getFrameReviews = async (frameId) => {
  const response = await instance.get(`frames/${frameId}/resenas`);
  return response.data;
};

// Listas públicas de una película
export const getFramePublicLists = async (frameId) => {
  const response = await instance.get(`frames/${frameId}/listas-publicas`);
  return response.data;
};

// Películas similares
export const getSimilarFrames = async (frameId) => {
  const response = await instance.get(`frames/${frameId}/similar`);
  return response.data;
};

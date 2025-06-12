import { instance } from "../axios";

// Mapeo de frames a formato consistente
const mapFrames = (frames) =>
  frames.map((frame) => ({
    id: frame.id,
    poster_url: frame.poster_url
      ? `https://image.tmdb.org/t/p/w342${frame.poster_url}`
      : "",
    titulo: frame.titulo || "Sin título",
    promedio_votos_muvis: frame.promedio_votos_muvis ?? "N/A",
    promedio_votos_tmdb: frame.promedio_votos_tmdb ?? "N/A",
    fecha_estreno: frame.fecha_estreno
      ? new Date(frame.fecha_estreno).toLocaleDateString()
      : "Sin fecha",
  }));

// Obtener frames populares
export const getFramesPopulares = async () => {
  try {
    const response = await instance.get("frames/popular");    
    if (
      response.data &&
      response.data.contenido &&
      Array.isArray(response.data.contenido.data)
    ) {
      return mapFrames(response.data.contenido.data);
    } else {
      console.warn("Respuesta inesperada:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error al obtener frames populares:", error.response?.data || error.message);
    throw error;
  }
};
    // Obtener frames por género con paginación
export const getFramesByGenero = async (genero, pagina = 1) => {
  try {
    const response = await instance.get("frames/filtrar", {
      params: { genero: genero, page: pagina },
    });
    console.log("Respuesta de getFramesByGenero:", response.data.contenido);
    
    if (
      response.data?.contenido &&
      Array.isArray(response.data.contenido.data)
    ) {
      return {
        ...response.data,
        contenido: {
          ...response.data.contenido,
          data: mapFrames(response.data.contenido.data),
        },
      };
    }
    return response.data;
  } catch (error) {
    console.error("Error al obtener frames por género:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener frames por año de estreno con paginación
export const getFramesByFechaEstreno = async (fecha_estreno, pagina = 1) => {
  try {
    const response = await instance.get("frames/filtrar", {
      params: { fecha_estreno, page: pagina },
    });
    if (
      response.data?.contenido &&
      Array.isArray(response.data.contenido.data)
    ) {
      return {
        ...response.data,
        contenido: {
          ...response.data.contenido,
          data: mapFrames(response.data.contenido.data),
        },
      };
    }
    return response.data;
  } catch (error) {
    console.error("Error al obtener frames por fecha de estreno:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener frames por actor con paginación
export const getFramesOrderByDuracion = async (orden = 'asc', pagina = 1) => {
  try {
    const response = await instance.get("frames/filtrar", {
      params: { duracion: orden, page: pagina },
    });
    if (
      response.data?.contenido &&
      Array.isArray(response.data.contenido.data)
    ) {
      return {
        ...response.data,
        contenido: {
          ...response.data.contenido,
          data: mapFrames(response.data.contenido.data),
        },
      };
    }
    return response.data;
  } catch (error) {
    console.error("Error al obtener frames ordenados por duración:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener frames ordenados por votos TMDB y Muvis con paginación
export const getFramesOrderByVotosTmdb = async (orden = 'asc', pagina = 1) => {
  try {
    const response = await instance.get("frames/filtrar", {
      params: { promedio_votos_tmdb: orden, page: pagina },
    });
    if (
      response.data?.contenido &&
      Array.isArray(response.data.contenido.data)
    ) {
      return {
        ...response.data,
        contenido: {
          ...response.data.contenido,
          data: mapFrames(response.data.contenido.data),
        },
      };
    }
    return response.data;
  } catch (error) {
    console.error("Error al obtener frames ordenados por votos TMDB:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener frames ordenados por votos Muvis con paginación
export const getFramesOrderByVotosMuvis = async (orden = 'asc', pagina = 1) => {
  try {
    const response = await instance.get("frames/filtrar", {
      params: { promedio_votos_muvis: orden, page: pagina },
    });
    if (
      response.data?.contenido &&
      Array.isArray(response.data.contenido.data)
    ) {
      return {
        ...response.data,
        contenido: {
          ...response.data.contenido,
          data: mapFrames(response.data.contenido.data),
        },
      };
    }
    return response.data;
  } catch (error) {
    console.error("Error al obtener frames ordenados por votos Muvis:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener detalles de un frame específico
export const getDetallesFrame = async (frameId) => {
  try {
    const response = await instance.get(`frames/${frameId}/detalles`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles del frame:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener top 10 frames
export const getTop10Frames = async () => {
  try {
    const response = await instance.get("frames/top-10");
    return response.data;
  } catch (error) {
    console.error("Error al obtener top 10 frames:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener frames recientes con paginación
export const getFramesRecientes = async (pagina = 1) => {
  try {
    const response = await instance.get("frames/recientes", { params: { page: pagina } });
    return response.data;
  } catch (error) {
    console.error("Error al obtener frames recientes:", error.response?.data || error.message);
    throw error;
  }
};

// Buscar frames por título
export const buscarFramesPorTitulo = async (titulo) => {
  try {
    const response = await instance.get("frames/buscar", { params: { titulo } });
    return response.data;
  } catch (error) {
    console.error("Error al buscar frames por título:", error.response?.data || error.message);
    throw error;
  }
};



// Obtener listas públicas de un frame
export const getListasPublicasFrame = async (frameId) => {
  try {
    const response = await instance.get(`frames/${frameId}/listas-publicas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener listas públicas:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener frames similares a uno dado
export const getFramesSimilares = async (frameId) => {
  try {
    const response = await instance.get(`frames/${frameId}/similar`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener frames similares:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener todos los géneros
export const getGeneros = async () => {
  try {
    const response = await instance.get("frames/generos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener géneros:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener detalles de un género específico
export const getDetallesGenero = async (generoId) => {
  try {
    const response = await instance.get(`frames/generos/${generoId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles del género:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener frames por actor con paginación
export const getFramesPorActor = async (actorId, pagina = 1) => {
  try {
    const response = await instance.get(`frames/actor/${actorId}`, { params: { page: pagina } });
    return response.data;
  } catch (error) {
    console.error("Error al obtener frames por actor:", error.response?.data || error.message);
    throw error;
  }
};

//anadir puntuación a un frame

export const anadirPuntuacionFrame = async (frameId, puntuacion= "") => {
  try {
    const response = await instance.post(`frames/${frameId}/anadir-puntuacion`, {
      puntuacion: Number(puntuacion)
    });
    return response.data;
  } catch (error) {
    console.error("Error al añadir puntuación:", error.response?.data || error.message);
    throw error;
  }
};
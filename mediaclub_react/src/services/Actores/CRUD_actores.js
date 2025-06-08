import { instance } from "../axios";

// Obtener todos los actores
export const getAllActores = async (page = 1) => {
  const { data } = await instance.get(`actores/ver-todos?page=${page}`);
  return {
    actores: data.contenido.data,
    totalPaginas: data.contenido.last_page,
  };
};

// Buscar actores por nombre
export const buscarActoresPorNombre = async (nombre) => {
  const { data } = await instance.get(`actores/buscar/?nombre=${encodeURIComponent(nombre)}`);
  return data.contenido;
};

// Obtener detalles de un actor por ID
export const getActorDetalles = async (actorId) => {
  const { data } = await instance.get(`actores/${actorId}/detalles`);
  return data.contenido;
};

// Obtener filmografía de un actor por ID
export const getActorFilmografia = async (actorId) => {
  const { data } = await instance.get(`actores/${actorId}/filmografia`);
  return data.contenido;
};

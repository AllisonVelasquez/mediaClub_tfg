import { instance } from "../axios";

// Obtener todos los actores
export const getAllActores = async () => {
  const response = await instance.get("actores/ver-todos");
  return response.data;
};

// Buscar actores por nombre
export const searchActoresByName = async (nombre) => {
  const response = await instance.get(`actores/buscar`, { params: { nombre } });
  return response.data;
};

// Obtener detalles de un actor por ID
export const getActorDetalles = async (actorId) => {
  const response = await instance.get(`actores/${actorId}/detalles`);
  return response.data;
};

// Obtener filmografía de un actor por ID
export const getActorFilmografia = async (actorId) => {
  const response = await instance.get(`actores/${actorId}/filmografia`);
  return response.data;
};
// Obtener actores populares
export const getActoresPopulares = async () => {
  const response = await instance.get("actores/populares");
  return response.data;
};
// Obtener actores por película
export const getActoresPorPelicula = async (peliculaId) => {
  const response = await instance.get(`actores/pelicula/${peliculaId}`);
  return response.data;
};

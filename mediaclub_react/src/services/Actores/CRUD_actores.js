import { instance } from "../axios";

// Obtener todos los actores
// services/Actores/CRUD_actores.js
export const getAllActores = async (page = 1) => {
  const response = await instance.get(`actores/ver-todos?page=${page}`);
  return response.data;
};


// Buscar actores por nombre
export const buscarActoresPorNombre = async (nombre) => {
  const res = await fetch(`actores/buscar/?nombre=${encodeURIComponent(nombre)}`);
  if (!res.ok) throw new Error("Error al buscar actores");
  return res.json();
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

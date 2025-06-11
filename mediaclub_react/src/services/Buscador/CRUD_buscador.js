import { instance } from "../axios";
// ajusta si tu API tiene prefijo

export const buscarUsuarios = async (query) => {
  const response = await instance.get(`usuarios/buscar`, {
    params: { alias: query },
  });
  return response.data.contenido; // ajusta según cómo devuelva Laravel
};

export const buscarPeliculas = async (query) => {
  const response = await instance.get(`frames/buscar`, {
    params: { titulo: query },
  });
  return response.data.contenido;
};

export const buscarActores = async (query) => {
  const response = await instance.get(`actores/buscar`, {
    params: { nombre: query },
  });
  return response.data.contenido;
};

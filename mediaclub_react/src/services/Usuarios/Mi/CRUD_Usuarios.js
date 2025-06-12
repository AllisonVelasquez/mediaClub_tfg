import { instance } from "../../axios";

// PERFIL
export const obtenerMiPerfil = async () => {
  const response = await instance.get("mi/perfil");
  return response.data.contenido;
};

export const actualizarMiPerfil = async (datos) => {
  const formData = new FormData();

  for (const key in datos) {
    formData.append(key, datos[key]);
  }

   const response = await instance.patch("mi/actualizar-datos", formData);
  
  return response.data;
};

export const eliminarMiCuenta = async (datos) => {
  const response = await instance.delete("mi/borrar-cuenta", { data: datos });
  return response.data;
};

// AMISTADES
// AMISTADES
export const obtenerMisAmigos = async () => {
  const response = await instance.get("mi/amigos");
  return response.data;
};

export const eliminarAmigo = async (usuarioId) => {
  const response = await instance.delete(`mi/amigos/eliminar/${usuarioId}`);
  return response.data;
};

export const getFriendRequestsReceived = async () => {
  const response = await instance.get("mi/amistad/solicitudes-recibidas");
  return response.data;
};

export const getFriendRequestsSent = async () => {
  const response = await instance.get("mi/amistad/solicitudes-enviadas");
  return response.data;
};

export const acceptFriendRequest = async (usuarioId) => {
  const response = await instance.post(`mi/amistad/aceptar-solicitud/${usuarioId}`);
  return response.data;
};

export const rejectFriendRequest = async (usuarioId) => {
  const response = await instance.post(`mi/amistad/rechazar-solicitud/${usuarioId}`);
  return response.data;
};

export const cancelFriendRequest = async (usuarioId) => {
  const response = await instance.delete(`mi/amistad/cancelar-solicitud/${usuarioId}`);
  return response.data;
};

export const enviarSolicitudAmistad = async (usuarioId) => {
  const response = await instance.post(`mi/amistad/solicitar/${usuarioId}`);
  return response.data;
};


// ACTIVIDAD
export const obtenerMiActividad = async () => {
  const response = await instance.get("mi/actividad");
  return response.data;
};

// POSTS
export const obtenerMisPosts = async () => {
  const response = await instance.get("mi/posts/ver-todos");
  return response.data;
};

export const obtenerDetallePost = async (postId) => {
  const response = await instance.get(`mi/posts/${postId}/detalles`);
  return response.data;
};

export const crearPost = async (datosPost) => {
  const response = await instance.post("mi/posts/crear", datosPost);
  return response.data;
};

export const editarPost = async (postId, datosPost) => {
  const response = await instance.patch(`mi/posts/editar/${postId}`, datosPost);
  return response.data;
};

export const eliminarPost = async (postId) => {
  const response = await instance.delete(`mi/posts/borrar/${postId}`);
  return response.data;
};

export const obtenerMisListas = async () => {
  const response = await instance.get("mi/listas/ver-todas");
  return response.data.contenido;  // retorno solo contenido directamente
};

export const verDetallesLista = async (listaId) => {
  const response = await instance.get(`mi/listas/${listaId}/detalles`);
  return response.data.contenido;  // aquí también retorno solo contenido
};

export const crearLista = async (datosLista) => {
  const response = await instance.post("mi/listas/crear", datosLista);
  return response.data;
};

export const editarLista = async (listaId, datosLista) => {
  const response = await instance.patch(`mi/listas/editar/${listaId}`, datosLista);
  return response.data;
};

export const eliminarLista = async (listaId) => {
  const response = await instance.delete(`mi/listas/borrar/${listaId}`);
  return response.data;
};

export const añadirFrameALista = async (listaId, frameId) => {
  const response = await instance.post(`mi/listas/${listaId}/anadir/${frameId}`);
  return response.data;
};

export const quitarFrameDeLista = async (listaId, frameId) => {
  const response = await instance.delete(`mi/listas/${listaId}/quitar/${frameId}`);
  return response.data;
};
// RESEÑAS
export const obtenerMisResenas = async () => {
  const response = await instance.get("mi/resenas/ver-todas");
  return response.data;
};

export const obtenerResena = async (resenaId) => {
  const response = await instance.get(`mi/resenas/${resenaId}/detalles`);
  return response.data;
};

export const borrarResena = async (resenaId) => {
  const response = await instance.delete(`mi/resenas/${resenaId}/borrar`);
  return response.data;
};

export const obtenerResenasPorFrame = async (frameId) => {
  const response = await instance.get(`mi/resenas/${frameId}`);
  return response.data;
};

// PUNTUACIONES
export const obtenerMisPuntuaciones = async () => {
  const response = await instance.get("mi/puntuaciones/ver-todas");
  return response.data;
};

export const editarPuntuacion = async (puntuacionId, datosPuntuacion) => {
  const response = await instance.patch(`mi/puntuaciones/editar/${puntuacionId}`, datosPuntuacion);
  return response.data;
};

export const eliminarPuntuacion = async (puntuacionId) => {
  const response = await instance.delete(`mi/puntuaciones/borrar/${puntuacionId}`);
  return response.data;
};

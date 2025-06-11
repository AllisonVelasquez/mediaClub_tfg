import { instance } from "../../axios";

// PERFIL PÚBLICO DE UN USUARIO
export const getUserProfile = async (usuarioId) => {
  const response = await instance.get(`/usuarios/${usuarioId}/perfil`);
  return response.data;
};

// LISTAS PÚBLICAS
export const getUserPublicLists = async (usuarioId) => {
  const response = await instance.get(`/usuarios/${usuarioId}/listas-publicas`);
  return response.data;
};

export const getUserPublicListContent = async (usuarioId, listaId) => {
  const response = await instance.get(`/usuarios/${usuarioId}/listas-publicas/${listaId}`);
  return response.data;
};

// AMIGOS
export const getUserFriends = async (usuarioId) => {
  const response = await instance.get(`/usuarios/${usuarioId}/amigos`);
  return response.data;
};

// INFORMACIÓN BÁSICA (como alias, nombre, etc.)
export const getUserInfo = async (usuarioId) => {
  const response = await instance.get(`/usuarios/${usuarioId}/info`);
  return response.data;
};

// POSTS DEL USUARIO
export const getUserPosts = async (usuarioId) => {
  const response = await instance.get(`/usuarios/${usuarioId}/posts`);
  return response.data;
};

export const getUserPostDetail = async (usuarioId, postId) => {
  const response = await instance.get(`/usuarios/${usuarioId}/posts/${postId}`);
  return response.data;
};

// ACTIVIDAD
export const getUserActivity = async (usuarioId) => {
  const response = await instance.get(`/usuarios/${usuarioId}/actividad`);
  return response.data;
};

// BUSCAR USUARIOS POR ALIAS
export const searchUsersByAlias = async (alias) => {
  const response = await instance.get(`/usuarios/buscar?alias=${alias}`);
  return response.data;
};

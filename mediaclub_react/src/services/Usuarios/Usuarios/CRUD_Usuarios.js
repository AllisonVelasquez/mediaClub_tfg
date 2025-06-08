import { instance } from "../../axios";

export const getUserProfile = async (usuarioId) => {
  const { data } = await instance.get(`/usuarios/${usuarioId}/perfil`);
  console.log("Datos del perfil del usuario:", data.contenido);
  
  return data;
};

export const getUserPublicLists = async (usuarioId) => {
  const { data } = await instance.get(`/usuarios/${usuarioId}/listas-publicas`);
  return data;
};

export const getUserFriends = async (usuarioId) => {
  const { data } = await instance.get(`/usuarios/${usuarioId}/amigos`);
  return data;
};

export const getUserInfo = async (usuarioId) => {
  const { data } = await instance.get(`/usuarios/${usuarioId}/info`);
  return data;
};

export const getUserPosts = async (usuarioId) => {
  const { data } = await instance.get(`/usuarios/${usuarioId}/posts`);
  return data;
};

export const getUserActivity = async (usuarioId) => {
  const { data } = await instance.get(`/usuarios/${usuarioId}/actividad`);
  return data;
};

// Método para enviar solicitud de amistad
export const sendFriendRequest = async (usuarioId) => {
  const { data } = await instance.post(`/usuarios/${usuarioId}/solicitud-amistad`);
  return data;
};

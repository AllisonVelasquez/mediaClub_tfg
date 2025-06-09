import { instance } from "../../axios";

export const getUserProfile = async (usuarioId) => {
  const response= await instance.get(`/usuarios/${usuarioId}/perfil`);
  
  return response.data;
};

export const getUserPublicLists = async (usuarioId) => {
  const response= await instance.get(`/usuarios/${usuarioId}/listas-publicas`);
  return response.data;
};

export const getUserFriends = async (usuarioId) => {
  const response= await instance.get(`/usuarios/${usuarioId}/amigos`);
  return response.data;
};

export const getUserInfo = async (usuarioId) => {
  const response= await instance.get(`/usuarios/${usuarioId}/info`);
  return response.data;
};

export const getUserPosts = async (usuarioId) => {
  const response= await instance.get(`/usuarios/${usuarioId}/posts`);
  return response.data;
};

export const getUserActivity = async (usuarioId) => {
  const response= await instance.get(`/usuarios/${usuarioId}/actividad`);
  console.log("User activity response:", response.data);
  
  return response.data;
};

// Método para enviar solicitud de amistad
export const sendFriendRequest = async (usuarioId) => {
  const response= await instance.post(`/usuarios/${usuarioId}/solicitud-amistad`);
  return response.data;
};

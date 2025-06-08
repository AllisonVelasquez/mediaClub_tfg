// src/services/Posts/CRUD_post.js

import { instance } from "../axios";

export const getMyPosts = async (page = 1) => {
  const response = await instance.get(`mi/posts/ver-todos?page=${page}`);
  return response.data;
};

export const getPostById = async (postId) => {
  const response = await instance.get(`mi/posts/${postId}/detalles`);
  return response.data;
};

export const crearPost = async ({ titulo, contenido, publico }) => {
  const response = await instance.post("mi/posts/crear", {
    titulo,
    contenido,
    publico,
  });
  return response.data;
};

export const editPost = async (postId, postData) => {
  const response = await instance.patch(`mi/posts/editar/${postId}`, postData);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await instance.delete(`mi/posts/borrar/${postId}`);
  return response.data;
};

// 💙 Likes adaptados a posts
export const likePost = async (postId) => {
  const response = await instance.post(`posts/${postId}/anadir-like`);
  return response.data;
};

export const unlikePost = async (postId) => {
  const response = await instance.delete(`posts/${postId}/quitar-like`);
  return response.data;
};

export const getLikesPost = async (postId) => {
  const response = await instance.get(`posts/${postId}/ver-likes`);
  return response.data;
};
export const getUserPosts = async (userId=1, page = 1) => {
  try {
    const response = await instance.get(`usuarios/${userId}/posts?page=${page}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener posts del usuario ${userId}:`, error.response?.data || error.message);
    throw error;
  }
};

// src/components/Posts/Post.jsx
import React, { useState, useEffect } from "react";
import { deletePost, editPost, likePost, unlikePost, getLikesPost } from "../../services/Posts/CRUD_post";

const Post = ({ post, currentUserId, modo, onDelete, onUpdate }) => {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(post.titulo || "");
  const [contenido, setContenido] = useState(post.contenido);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const esPropietario = currentUserId && post.usuario_id === currentUserId;

  useEffect(() => {
    fetchLikes();
  }, []);

  const fetchLikes = async () => {
    try {
      const res = await getLikesPost(post.id);
      setLikes(res.total);
      setLiked(res.ya_dio_like || false);
    } catch (err) {
      console.error("Error obteniendo likes", err);
    }
  };

  const toggleLike = async () => {
    try {
      if (liked) {
        await unlikePost(post.id);
      } else {
        await likePost(post.id);
      }
      await fetchLikes();
    } catch (error) {
      console.error("Error al alternar like:", error);
    }
  };

  const handleGuardar = async () => {
    await onUpdate(post.id, { titulo, contenido });
    setEditando(false);
  };

  return (
    <div className="post">
      {editando ? (
        <>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          />
          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h4>{post.titulo}</h4>
          <p>{post.contenido}</p>
          <div>
            <button onClick={toggleLike}>{liked ? "💔 Quitar Like" : "❤️ Me gusta"}</button>
            <span>{likes} likes</span>
          </div>
          {modo === "usuario" && esPropietario && (
            <>
              <button onClick={() => setEditando(true)}>Editar</button>
              <button onClick={() => onDelete(post.id)}>Eliminar</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Post;

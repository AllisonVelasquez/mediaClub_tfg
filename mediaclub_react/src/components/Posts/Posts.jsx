import React, { useState, useEffect } from "react";
import { likePost, unlikePost, getLikesPost } from "../../services/Posts/CRUD_post";

const Post = ({ post, currentUserId, modo, onDelete, onUpdate }) => {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(post.titulo || "");
  const [contenido, setContenido] = useState(post.contenido || "");
  const [publico, setPublico] = useState(post.publico === 1);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const esPropietario = currentUserId && post.usuario_id === currentUserId;

  useEffect(() => {
    fetchLikes();
  }, []);

  const fetchLikes = async () => {
    try {
      const res = await getLikesPost(post.id);
      setLikes(res.total || 0);
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
    await onUpdate(post.id, {
      titulo: titulo.trim(),
      contenido: contenido.trim(),
      publico: publico ? 1 : 0,
    });
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
            placeholder="Título"
          />
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Contenido"
          />
          <label>
            Público:
            <input
              type="checkbox"
              checked={publico}
              onChange={() => setPublico(!publico)}
            />
          </label>
          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h4>{post.titulo}</h4>
          <p>{post.contenido}</p>
          <p>
            <strong>{publico ? "Público" : "Privado"}</strong>
          </p>
          <div>
            <button onClick={toggleLike}>
              {liked ? "💔 Quitar Like" : "❤️ Me gusta"}
            </button>
            <span>{likes} {likes === 1 ? "like" : "likes"}</span>
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

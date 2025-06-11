import React, { useState, useEffect } from "react";
import { deletePost, editPost, likePost, unlikePost, getLikesPost } from "../../services/Posts/CRUD_post";
import "./Post.css";

const Post = ({ post, currentUserId, modo, esPropio, onEliminar, onActualizar }) => {
  const [editando, setEditando] = useState(false);
  const [contenido, setContenido] = useState(post.contenido);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

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
    await onActualizar(post.id, { contenido });
    setEditando(false);
  };

  return (
    <div className="card-post">
      {editando ? (
        <>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="editar-input"
            style={{ minHeight: "80px", resize: "none" }}
          />
          <div className="card-post-acciones">
            <button onClick={handleGuardar}>Guardar</button>
            <button onClick={() => setEditando(false)}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <span className="card-post-loginid">{post.login_id}</span>
          <div className="card-post-contenido">{post.contenido}</div>
          <div className="card-post-acciones">
            {!esPropio && (
              <button className="like-btn" onClick={toggleLike}>
                {liked ? ":( Quitar Like" : "♡ Me gusta"}
              </button>
            )}
            <span>{likes} likes</span>
            {modo === "usuario" && esPropio && (
              <>
                <button onClick={() => setEditando(true)}>Editar</button>
                <button className="delete-btn" onClick={onEliminar}>Eliminar</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
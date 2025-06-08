import React, { useState } from "react";
import "./Resena.css";
import { likeResena, unlikeResena } from "../../services/Resenas/CRUD_Resenas";

const Resena = ({ resena, modo, onEliminar }) => {
  const [likesCount, setLikesCount] = useState(resena.likes || 0);
  const [likedByUser, setLikedByUser] = useState(resena.likedByUser || false);
  const [loadingLike, setLoadingLike] = useState(false);

  // Nuevo estado para controlar mostrar contenido con spoiler
  const [mostrarSpoiler, setMostrarSpoiler] = useState(false);

  const fecha = new Date(resena.fecha).toLocaleDateString("es-ES");

  const handleLikeClick = async () => {
    if (loadingLike) return;

    setLoadingLike(true);
    try {
      if (likedByUser) {
        await unlikeResena(resena.id);
        setLikesCount(likesCount - 1);
        setLikedByUser(false);
      } else {
        await likeResena(resena.id);
        setLikesCount(likesCount + 1);
        setLikedByUser(true);
      }
    } catch (error) {
      console.error("Error al actualizar like:", error);
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <div className="resena">
      <div className="resena-usuario-id">Usuario ID: {resena.usuario_id}</div>

      {modo === "usuario" && resena.frame && (
        <div className="resena-header">
          <img
            className="resena-poster"
            src={`https://image.tmdb.org/t/p/w200${resena.frame.poster_url}`}
            alt={resena.frame.titulo}
          />
          <h3 className="resena-titulo">{resena.frame.titulo}</h3>
        </div>
      )}

      <p className="resena-fecha">Fecha: {fecha}</p>

      {/* Contenido que oculta spoilers */}
      {resena.spoiler && !mostrarSpoiler ? (
        <div className="spoiler-aviso">
          <label>
            <input
              type="checkbox"
              checked={mostrarSpoiler}
              onChange={() => setMostrarSpoiler(!mostrarSpoiler)}
            />
            Mostrar contenido con spoilers ⚠️
          </label>
        </div>
      ) : (
        <>
          <p className="resena-contenido">{resena.contenido}</p>
          {resena.spoiler && (
            <p className="resena-spoiler">⚠️ Contiene spoilers</p>
          )}
        </>
      )}

      <div className="resena-likes">
        <button
          className={`btn-like ${likedByUser ? "liked" : ""}`}
          onClick={handleLikeClick}
          disabled={loadingLike}
          title={likedByUser ? "Quitar like" : "Dar like"}
        >
          {likedByUser ? "❤️" : "🤍"} {likesCount}
        </button>
      </div>

      {modo === "usuario" && onEliminar && (
        <button className="btn-eliminar" onClick={() => onEliminar(resena)}>
          Eliminar
        </button>
      )}
    </div>
  );
};

export default Resena;

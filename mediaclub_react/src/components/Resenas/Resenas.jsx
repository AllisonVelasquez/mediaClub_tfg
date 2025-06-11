import React, { useState } from "react";
import "./Resena.css";
import { likeResena, unlikeResena } from "../../services/Resenas/CRUD_Resenas";

const Resena = ({ resena, modo, onEliminar, onClick }) => {
  const [likesCount, setLikesCount] = useState(resena.likes || 0);
  const [likedByUser, setLikedByUser] = useState(resena.likedByUser || false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [mostrarSpoiler, setMostrarSpoiler] = useState(false);

  const fecha = resena.fecha
    ? new Date(resena.fecha).toLocaleDateString("es-ES")
    : "Fecha no disponible";

  const usuario = resena.usuario || {};
  const fotoPerfil = usuario.foto_perfil || "/images/perfiles/default.png";
  const aliasUsuario = usuario.alias || "Anónimo";

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

  const handleEliminar = (e) => {
    e.stopPropagation();
    if (window.confirm("¿Seguro que quieres eliminar esta reseña?")) {
      onEliminar(resena);
    }
  };

  return (
    <div className="resena" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="resena-avatar-nombre">
        <div className="resena-avatar-circulo">
          <img
            className="resena-usuario-avatar"
            src={fotoPerfil}
            alt={aliasUsuario}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/perfiles/default.png";
            }}
          />
        </div>
        <div className="resena-usuario-nombre">{aliasUsuario}</div>
      </div>
      <div className="resena-main">
        <div className="resena-fecha-likes">
          <span className="resena-fecha">Fecha: {fecha}</span>
          <button
            className={`resena-like-btn ${likedByUser ? "liked" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              handleLikeClick();
            }}
            disabled={loadingLike}
            title={likedByUser ? "Quitar like" : "Dar like"}
          >
            {likedByUser ? "❤" : "♡"} {likesCount}
          </button>
        </div>
        {resena.spoiler && !mostrarSpoiler ? (
          <div className="spoiler-aviso">
            <label>
              <input
                type="checkbox"
                checked={mostrarSpoiler}
                onChange={(e) => {
                  e.stopPropagation();
                  setMostrarSpoiler(!mostrarSpoiler);
                }}
              />
              Mostrar contenido con spoilers
            </label>
          </div>
        ) : (
          <>
            <p className="resena-contenido">{resena.contenido || "Sin contenido"}</p>
            {resena.spoiler && <p className="resena-spoiler">OJO! Contiene spoilers</p>}
          </>
        )}
        {modo === "usuario" && onEliminar && (
          <button className="btn-eliminar" onClick={handleEliminar}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Resena;
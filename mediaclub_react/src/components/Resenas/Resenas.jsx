import React, { useState } from "react";
import "./Resena.css";
import { likeResena, unlikeResena } from "../../services/Resenas/CRUD_Resenas";

const Resena = ({ resena, modo, onEliminar, onClick }) => {
  const [likesCount, setLikesCount] = useState(resena.likes || 0);
  const [likedByUser, setLikedByUser] = useState(resena.likedByUser || false);
  const [loadingLike, setLoadingLike] = useState(false);

  // Estado para mostrar contenido con spoiler
  const [mostrarSpoiler, setMostrarSpoiler] = useState(false);

  // Protege fecha si no existe o es inválida
  const fecha = resena.fecha
    ? new Date(resena.fecha).toLocaleDateString("es-ES")
    : "Fecha no disponible";

  // Protege usuario para no romper si es undefined
  const usuario = resena.usuario || {};
  const fotoPerfil = usuario.foto_perfil || "/images/perfiles/default.png";
  const aliasUsuario = usuario.alias || "Usuario anónimo";

  // Protege frame (película) si modo usuario y existe frame
  const tieneFrame = modo === "usuario" && resena.frame;

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
    <div className="resena" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="resena-usuario-id">
        <div>
          <img
            className="resena-usuario-avatar"
            src={fotoPerfil}
            alt={aliasUsuario}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/perfiles/default.png";
            }}
          />
          <span className="resena-usuario-nombre">{aliasUsuario}</span>
        </div>
      </div>

      {tieneFrame && (
        <div className="resena-header">
          <img
            className="resena-poster"
            src={`https://image.tmdb.org/t/p/w200${resena.frame.poster_url || ""}`}
            alt={resena.frame.titulo || "Película"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/posters/default.png";
            }}
          />
          <h3 className="resena-titulo">{resena.frame.titulo || "Título no disponible"}</h3>
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
              onChange={(e) => {
                e.stopPropagation();
                setMostrarSpoiler(!mostrarSpoiler);
              }}
            />
            Mostrar contenido con spoilers ⚠️
          </label>
        </div>
      ) : (
        <>
          <p className="resena-contenido">{resena.contenido || "Sin contenido"}</p>
          {resena.spoiler && <p className="resena-spoiler">⚠️ Contiene spoilers</p>}
        </>
      )}

      <div className="resena-likes">
        <button
          className={`btn-like ${likedByUser ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleLikeClick();
          }}
          disabled={loadingLike}
          title={likedByUser ? "Quitar like" : "Dar like"}
        >
          {likedByUser ? "❤️" : "🤍"} {likesCount}
        </button>
      </div>

      {modo === "usuario" && onEliminar && (
        <button
          className="btn-eliminar"
          onClick={(e) => {
            e.stopPropagation();
            onEliminar(resena);
          }}
        >
          Eliminar
        </button>
      )}
    </div>
  );
};

export default Resena;

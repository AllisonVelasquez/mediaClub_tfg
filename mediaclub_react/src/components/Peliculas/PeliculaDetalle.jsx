import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDetallesFrame,
  anadirPuntuacionFrame,
} from "../../services/Frames/CRUD_Frames.js";
import "./PeliculaDetalle.css";

const PeliculaDetalles = () => {
  const { id } = useParams();
  const [detalles, setDetalles] = useState(null);
  const [miVoto, setMiVoto] = useState(null);
  const [votoEnviado, setVotoEnviado] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const data = await getDetallesFrame(id);
        if (data.status === "success") {
          setDetalles(data.contenido);
        } else {
          setError("No se pudieron cargar los detalles.");
        }
      } catch (err) {
        console.error("Error al obtener detalles:", err);
        setError("Error al cargar detalles.");
      }
    };

    fetchDetalles();

    const votoGuardado = localStorage.getItem(`voto_pelicula_${id}`);
    if (votoGuardado) {
      setMiVoto(parseFloat(votoGuardado));
      setVotoEnviado(true);
    }
  }, [id]);

  const handleVotar = async (voto) => {
    if (voto < 1 || voto > 10 || !/^\d+(\.\d)?$/.test(voto)) {
      setError("La puntuación debe estar entre 1 y 10 y tener máximo un decimal.");
      return;
    }

    try {
      setError("");
      setMiVoto(voto);
      setVotoEnviado(true);
      localStorage.setItem(`voto_pelicula_${id}`, voto);

      const response = await anadirPuntuacionFrame(id, voto);
      if (response?.promedio_actualizado) {
        setDetalles((prev) => ({
          ...prev,
          promedio_votos_muvis: response.promedio_actualizado,
        }));
      }
    } catch (error) {
      console.error("Error al enviar puntuación:", error);
      setError("Error al enviar tu voto.");
      setVotoEnviado(false);
    }
  };

  if (!detalles) return <p>Cargando detalles...</p>;

  const baseImgUrl = "https://image.tmdb.org/t/p/w500";
  const fondoUrl = detalles.poster_url
    ? `${baseImgUrl}${detalles.poster_url}`
    : "";

  const fechaFormateada = detalles.fecha_estreno
    ? new Date(detalles.fecha_estreno).toLocaleDateString("es-ES")
    : "N/A";

  return (
    <div
      className="detalle-container"
      style={{
        backgroundImage: `url(${fondoUrl})`,
      }}
    >
      <div className="fondo-overlay" />

      <div className="detalle-contenido">
        <img
          src={fondoUrl || "https://via.placeholder.com/300x450?text=Sin+imagen"}
          alt={detalles.titulo}
          className="poster"
        />

        <h1 className="title">{detalles.titulo}</h1>
        <h3 className="subtitle">{detalles.titulo_original}</h3>

        <p className="descripcion">{detalles.descripcion}</p>

        <div className="info">
          <p><strong>Fecha de estreno:</strong> {fechaFormateada}</p>
          <p><strong>Duración:</strong> {detalles.duracion} minutos</p>
          <p><strong>Eslogan:</strong> {detalles.eslogan || "N/A"}</p>
          <p><strong>Promedio votos Muvis:</strong> {detalles.promedio_votos_muvis ?? "N/A"}</p>
          <p><strong>Promedio votos TMDB:</strong> {detalles.promedio_votos_tmdb ?? "N/A"}</p>
          <p><strong>Presupuesto:</strong> {detalles.presupuesto ? `$${detalles.presupuesto.toLocaleString()}` : "N/A"}</p>
          <p><strong>Ingresos:</strong> {detalles.ingresos ? `$${detalles.ingresos.toLocaleString()}` : "N/A"}</p>
        </div>

        <div className="generos">
          {detalles.generos.map((genero) => (
            <span key={genero.id} className="genre-badge">{genero.nombre}</span>
          ))}
        </div>

        <div className="actores">
          <h2>Actores</h2>
          <div className="actores-list">
            {detalles.actores.map((actor) => (
              <div key={actor.id} className="actor">
                <img
                  src={
                    actor.imagen_url
                      ? baseImgUrl + actor.imagen_url
                      : "https://via.placeholder.com/100x150?text=Sin+imagen"
                  }
                  alt={actor.nombre}
                />
                <p>{actor.nombre}</p>
                <p className="personaje">{actor.pivot.personaje}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="votacion">
          <h2>Tu puntuación</h2>
          {votoEnviado ? (
            <p className="voto-confirmado">Ya votaste: <strong>{miVoto}</strong></p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const voto = parseFloat(e.target.voto.value);
                handleVotar(voto);
              }}
            >
              <input
                type="number"
                name="voto"
                step="0.1"
                min="1"
                max="10"
                placeholder="Ej: 7.5"
              />
              <button type="submit">Votar</button>
            </form>
          )}
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default PeliculaDetalles;

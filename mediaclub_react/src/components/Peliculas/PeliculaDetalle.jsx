import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDetallesFrame,
  anadirPuntuacionFrame,
} from "../../services/Frames/CRUD_Frames.js";
import ListaResenas from "../Resenas/ListaResenas.jsx";
import ListaActores from "../Actores/ListaActores.jsx";

const PeliculaDetalles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detalles, setDetalles] = useState(null);
  const [miVoto, setMiVoto] = useState(null);
  const [votoEnviado, setVotoEnviado] = useState(false);
  const [error, setError] = useState("");
  const [comentario, setComentario] = useState("");

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

  const handleVotar = async (voto, comentario) => {
    if (voto < 1 || voto > 10 || !/^\d+(\.\d)?$/.test(voto)) {
      setError("La puntuación debe estar entre 1 y 10 y tener máximo un decimal.");
      return;
    }

    try {
      setError("");
      setMiVoto(voto);
      setVotoEnviado(true);
      localStorage.setItem(`voto_pelicula_${id}`, voto);

      const response = await anadirPuntuacionFrame(id, voto, comentario);

      if (response?.status === "success") {
        console.log("Comentario y puntuación enviados correctamente:", response.contenido);
      }

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

  const fechaFormateada = detalles.fecha_estreno
    ? new Date(detalles.fecha_estreno).toLocaleDateString("es-ES")
    : "N/A";

  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="pelicula-container">
      <div className="pelicula-poster">
        <img
          src={
            detalles.poster_url
              ? baseImgUrl + detalles.poster_url
              : "https://via.placeholder.com/400x600?text=Sin+imagen"
          }
          alt={detalles.titulo}
        />
      </div>

      <div className="pelicula-info">
        <h1>{detalles.titulo}</h1>
        <h3>{detalles.titulo_original}</h3>

        <p className="descripcion">{detalles.descripcion}</p>

        <p><strong>Fecha de estreno:</strong> {fechaFormateada}</p>
        <p><strong>Duración:</strong> {detalles.duracion} minutos</p>
        <p><strong>Eslogan:</strong> {detalles.eslogan || "N/A"}</p>
        <p><strong>Promedio votos Muvis:</strong> {detalles.promedio_votos_muvis ?? "N/A"}</p>
        <p><strong>Promedio votos TMDB:</strong> {detalles.promedio_votos_tmdb ?? "N/A"}</p>
        <p><strong>Presupuesto:</strong> {detalles.presupuesto ? `$${detalles.presupuesto.toLocaleString()}` : "N/A"}</p>
        <p><strong>Ingresos:</strong> {detalles.ingresos ? `$${detalles.ingresos.toLocaleString()}` : "N/A"}</p>

        <div className="generos">
          <h2>Géneros</h2>
          <ul>
            {detalles.generos.map((genero) => (
              <li key={genero.id}>{genero.nombre}</li>
            ))}
          </ul>
        </div>

        <div className="actores">
          <h2>Actores</h2>
          <ListaActores
            actoresIniciales={detalles.actores}
            onActorClick={(actor) => navigate(`/actores/${actor.id}`)}
          />
        </div>

        <div className="votacion">
          <h2>Tu puntuación</h2>
          {votoEnviado ? (
            <p className="voto-exito">Ya votaste: <strong>{miVoto}</strong></p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const voto = parseFloat(e.target.voto.value);
                const comentario = e.target.comentario.value.trim();
                handleVotar(voto, comentario);
              }}
            >
              <input
                type="number"
                name="voto"
                step="0.1"
                min="1"
                max="10"
                placeholder="Ej: 7.5"
                required
              />
              <textarea
                name="comentario"
                placeholder="Escribe un comentario (opcional)"
                rows="3"
              ></textarea>
              <button type="submit">Votar</button>
            </form>
          )}

          {error && <p className="error">{error}</p>}
        </div>
        <ListaResenas frameId={detalles.id} modo="frame" />

      </div>
    </div>
  );
};

export default PeliculaDetalles;

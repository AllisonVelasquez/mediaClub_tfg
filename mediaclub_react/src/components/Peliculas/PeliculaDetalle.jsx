import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetallesFrame, anadirPuntuacionFrame } from "../../services/Frames/CRUD_Frames.js";
import ListaResenas from "../Resenas/ListaResenas.jsx";
import ListaActores from "../Actores/ListaActores.jsx";
import MisListas from "../Listas/MisListas";
import { addFrameToLista } from "../../services/Listas/CRUD_Listas.js";
import "./PeliculaDetalles.css";

const PeliculaDetalles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detalles, setDetalles] = useState(null);
  const [miVoto, setMiVoto] = useState(null);
  const [votoEnviado, setVotoEnviado] = useState(false);
  const [error, setError] = useState("");

  const [listaSeleccionada, setListaSeleccionada] = useState(null);
  const [mensajeLista, setMensajeLista] = useState("");

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

      if (response?.status === "success") {
        console.log("Puntuación enviada correctamente:", response.contenido);
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

  const handleAñadirALista = async () => {
    if (!listaSeleccionada) {
      setMensajeLista("Selecciona una lista primero.");
      return;
    }
    try {
      setMensajeLista("");
      const res = await addFrameToLista(listaSeleccionada, detalles.id);
      if (res.status === "success") {
        setMensajeLista(`Película "${detalles.titulo}" añadida a la lista correctamente.`);
      } else {
        setMensajeLista("Error al añadir la película a la lista.");
      }
    } catch (error) {
      setMensajeLista("Error al añadir la película a la lista.");
      console.error(error);
    }
  };

  if (!detalles) return <p>Cargando detalles...</p>;

  const fechaFormateada = detalles.fecha_estreno
    ? new Date(detalles.fecha_estreno).toLocaleDateString("es-ES")
    : "N/A";


  return (
    <div className="pelicula-container">
      <div className="pelicula-header">
        <div className="pelicula-poster">
          <img
            src={detalles.poster_url}
            alt={detalles.titulo}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Info de la película */}
          <div className="pelicula-info">
            <h1 className="pelicula-titulo">{detalles.titulo}</h1>
            <h3 className="pelicula-titulo-original">{detalles.titulo_original}</h3>

            <div className="pelicula-datos-grid">
              <div>
                <span className="pelicula-label">Fecha de estreno:</span>
                <span className="pelicula-valor">{fechaFormateada}</span>
              </div>
              <div>
                <span className="pelicula-label">Duración:</span>
                <span className="pelicula-valor">{detalles.duracion} min</span>
              </div>
              <div>
                <span className="pelicula-label">Eslogan:</span>
                <span className="pelicula-valor">{detalles.eslogan || "N/A"}</span>
              </div>
              <div>
                <span className="pelicula-label">Presupuesto:</span>
                <span className="pelicula-valor">
                  {detalles.presupuesto ? `$${detalles.presupuesto.toLocaleString()}` : "N/A"}
                </span>
              </div>
              <div>
                <span className="pelicula-label">Ingresos:</span>
                <span className="pelicula-valor">
                  {detalles.ingresos ? `$${detalles.ingresos.toLocaleString()}` : "N/A"}
                </span>
              </div>
            </div>

            <div className="pelicula-promedios">
              <div>
                <span className="pelicula-label">Promedio Muvis:</span>
                <span className="pelicula-valor">
                  {detalles.promedio_votos_muvis ?? "N/A"}
                </span>
              </div>
              <div>
                <span className="pelicula-label">Promedio TMDB:</span>
                <span className="pelicula-valor">
                  {detalles.promedio_votos_tmdb ?? "N/A"}
                </span>
              </div>
            </div>
            <div className="pelicula-generos">
              <span className="pelicula-label">{
              detalles.generos.map((genero, index) => (
                <span key={genero.id}>  
                  {genero.nombre +" " }
                </span>
              )) || "N/A"}</span>
                            </div>
            <p className="pelicula-descripcion">{detalles.descripcion}</p>
          </div>
        </div>
      </div>

      {/* Añadir a lista */}
      <div className="añadir-a-lista mb-6">
        <h3>Añadir a una lista</h3>
        <MisListas seleccionable onSeleccionarLista={setListaSeleccionada} />
        <button
          onClick={handleAñadirALista}
          disabled={!listaSeleccionada}
          className="btn-añadir-lista"
        >
          Añadir a la lista
        </button>
        {mensajeLista && <p className="mensaje-lista">{mensajeLista}</p>}
      </div>

      
      <div className="actores">
        <ListaActores
          actoresIniciales={detalles.actores}
          onActorClick={(actor) => navigate(`/actores/${actor.id}`)}
        />
      </div>

      <div className="review-card">
        <h2>Tu puntuación</h2>
        {votoEnviado ? (
          <p className="voto-exito">
            Ya votaste: <strong>{miVoto}</strong>
          </p>
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
              required
              className="input-voto"
            />
            <button type="submit" className="btn-votar">
              Votar
            </button>
          </form>
        )}

        {error && <p className="error">{error}</p>}
      
      <div className="resenas-final">
        <ListaResenas frameId={detalles.id} modo="frame" className="resena" />
      </div>
      </div>
    </div>
  );
};

export default PeliculaDetalles;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFrameById } from "../../services/Frames/CRUD_Frames";
import {  } from "../../services/Actores/CRUD_actores";
import Resena from "../Resenas";
import "./PeliculaDetalle.css";

const PeliculaDetalle = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [reparto, setReparto] = useState([]);
  const [error, setError] = useState(null);
  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const emptyStars = 10 - fullStars;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push("★");
    for (let i = 0; i < emptyStars; i++) stars.push("☆");
    return stars.join("");
  };
  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        const data = await getFrameById(Number(id));
        if (!data) {
          setError("Película no encontrada.");
        } else {
          setPelicula(data);
          const r = await reparto(Number(data.reparto_id));
          setReparto(r);
        }
      } catch (err) {
        setError("Error al cargar los datos.");
        console.error("Error al obtener la película:", err);
      }
    };

    fetchPelicula();
  }, [id]);

  if (error) return <p class="detalle-error">{error}</p>;
  if (!pelicula) return <p class="detalle-cargando">Cargando...</p>;

  return (
    <div class="container">
      <div class="detalle-container">
        <img
          class="detalle-poster"
          src={pelicula.poster_url}
          alt={`Poster de ${pelicula.titulo}`}
        />
        <div class="detalle-info">
          <h1>{pelicula.titulo}</h1>
          <p>
            <strong>Tipo:</strong> {pelicula.tipo_contenido}
          </p>
          <p>
            <strong>Género:</strong> {pelicula.genero}
          </p>
          <p>
            <strong>Duración:</strong> {pelicula.duracion} min
          </p>
         
          {pelicula.numero_episodios && (
            <p>
              <strong>Episodios:</strong> {pelicula.numero_episodios}
            </p>
          )}
          <p>
            <strong>Fecha de lanzamiento:</strong>{" "}
            {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}
          </p>
          <p>
            <strong>IMDB:</strong>{" "}
            {pelicula.puntuacion_dbs?.imdb ?? "No disponible"}
          </p>
          <p>
            <strong>Descripción:</strong>
          </p>
          <p>{pelicula.descripcion}</p>

         <p>
            <strong>Reparto:</strong>
          </p>
          <div class="detalle-reparto">
            {repa.length > 0 ? (
              repa.map((actor, index) => (
                <div key={index} class="actor-card">
                  <img src={actor.img} alt={actor.nombre} class="actor-img" />
                  <div class="actor-info">
                    <h4>{actor.nombre}</h4>
                    <p>
                      <strong>Edad:</strong> {actor.edad}
                    </p>
                    <p>{actor.descripcion}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay reparto disponible.</p>
            )}
          </div> 
                 </div>
      </div>{" "}
      {renderStars(pelicula.puntuacion_dbs)}
      <div class="resenas-container">
        <Resena peliculaId={pelicula.frame_id} />
      </div>
    </div>
  );
};

export default PeliculaDetalle;

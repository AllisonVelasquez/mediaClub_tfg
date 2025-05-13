import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFrameById } from "../services/axios";
import "./PeliculaDetalle.css";

const PeliculaDetalle = () => {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFrameById(id)
      .then((data) => {
        if (!data) {
          setError("Película no encontrada.");
        } else {
          setPelicula(data);
        }
      })
      .catch(() => setError("Error al cargar los datos."));
  }, [id]);

  if (error) return <p className="detalle-error">{error}</p>;
  if (!pelicula) return <p className="detalle-cargando">Cargando...</p>;

  return (
    <div className="detalle-container">
      <img
        className="detalle-poster"
        src={pelicula.poster_url}
        alt={pelicula.titulo}
      />
      <div className="detalle-info">
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
      </div>
    </div>
  );
};

export default PeliculaDetalle;

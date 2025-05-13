import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFrames } from "../services/axios";
import "./landing.css";

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    getFrames().then(setPeliculas).catch(console.error);
  }, []);

  return (
    <div className="peliculas-container">
      <h1>PELICULAS</h1>
      {peliculas.map((peli) => (
        <Link
          to={`/pelicula/${peli.frame_id}`}
          key={peli.frame_id}
          className="pelicula-card"
        >
          <img src={peli.poster_url} alt={peli.titulo} className="poster-img" />
          <div className="pelicula-info">
            <h3>{peli.titulo}</h3>
            <p>
              <strong>Tipo:</strong> {peli.tipo_contenido}
            </p>
            <p>
              <strong>Duración:</strong> {peli.duracion} min
            </p>
            <p>
              <strong>IMDB:</strong> {peli.puntuacion_dbs?.imdb}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Peliculas;

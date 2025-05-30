import './ListaPeliculas.css';
import { useState, useEffect, useRef } from "react";
import { getFrames } from "../../services/Frames/CRUD_Frames";
import { useNavigate } from 'react-router-dom';

const VISIBLE = 4;

const ListaPeliculas = () => {
  const [frames, setFrames] = useState([]);
  const [start, setStart] = useState(0);
  const navigate = useNavigate();

  // Fetch las películas al cargar el componente
  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const data = await getFrames();
        setFrames(data);
      } catch (error) {
        console.error("Error fetching frames:", error);
      }
    };
    fetchFrames();
  }, []);

  // Función para manejar el botón "Anterior"
  const handlePrev = () => {
    setStart((prev) => {
      if (prev - VISIBLE < 0) {
        return frames.length - VISIBLE; // Si estamos al inicio, mostrar las últimas 4
      }
      return prev - VISIBLE;
    });
  };

  // Función para manejar el botón "Siguiente"
  const handleNext = () => {
    setStart((prev) => {
      if (prev + VISIBLE >= frames.length) {
        return 0; // Si estamos al final, volver al inicio
      }
      return prev + VISIBLE;
    });
  };

  // Función para redirigir a la página de detalles de la película
  const handleMovieClick = (id) => {
    navigate(`/pelicula/${id}`);
  };

  // Función para generar las estrellas en base a la puntuación
  const renderStars = (score) => {
    const fullStars = Math.floor(score); // Estrellas completas
    const emptyStars = 10 - fullStars; // Estrellas vacías
    const stars = [];

    // Añadir estrellas completas
    for (let i = 0; i < fullStars; i++) {
      stars.push('★'); // Estrella llena
    }

    // Añadir estrellas vacías
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆'); // Estrella vacía
    }

    return stars.join(''); // Unir las estrellas en un string
  };

  return (
    <div className="peliculas-bg">
      <h2 className="peliculas-title">
        Descubre nuestras películas recomendadas
      </h2>
      <div className="carousel-container">
        {/* Botón de anterior */}
        <button
          className="carousel-arrow"
          onClick={handlePrev}
          disabled={start === 0} // Deshabilitar cuando estamos al principio
        >
          &lt;
        </button>

        <div className="peliculas-carousel">
          {/* Mostrar las películas en el carrusel */}
          {frames.slice(start, start + VISIBLE).map((peli) => (
            <div
              className="pelicula-card-landing"
              key={peli.frame_id}
              onClick={() => handleMovieClick(peli.frame_id)} // Redirigir al hacer click
            >
              <div className="pelicula-poster-img">
                <img
                  src={peli.poster_url}
                  alt={peli.titulo}
                  className="poster-img"
                  loading="lazy"
                />
              </div>
              <div className="pelicula-nombre">{peli.titulo}</div>
              <div className="pelicula-genero">{peli.genero}</div>
              <div className="pelicula-fecha-lanzamiento">
                {new Date(peli.fecha_lanzamiento).toLocaleDateString()}
              </div>
              <div className="pelicula-descripcion">{peli.descripcion}</div>
              <div className="pelicula-puntuacion">
                {/* Mostrar las estrellas */}
                {renderStars(peli.puntuacion_dbs.imdb)}
                <span className="puntuacion-text"> ({peli.puntuacion_dbs.imdb})</span>
              </div>
            </div>
          ))}
        </div>

        {/* Botón de siguiente */}
        <button
          className="carousel-arrow"
          onClick={handleNext}
          disabled={start + VISIBLE >= frames.length} // Deshabilitar cuando estamos al final
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ListaPeliculas;

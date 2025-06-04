import "./ListaPeliculas.css";
import { useState, useEffect } from "react";
import { getFrames } from "../../services/Frames/CRUD_Frames";
import { useNavigate } from "react-router-dom";

const ListaPeliculas = () => {
  const [frames, setFrames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const data = await getFrames();
        setFrames(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching frames:", error);
        setFrames([]);
      }
    };
    fetchFrames();
  }, []);

  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const emptyStars = 10 - fullStars;
    const stars = [];
    for (let i = 0; i < fullStars; i++) stars.push("★");
    for (let i = 0; i < emptyStars; i++) stars.push("☆");
    return stars.join("");
  };

  const handleMovieClick = (id) => {
    navigate(`/pelicula/${id}`);
  };

  const byPuntuacion = [...frames].sort(
    (a, b) => b.puntuacion_dbs.imdb - a.puntuacion_dbs.imdb
  );
  const byFecha = [...frames].sort(
    (a, b) => new Date(b.fecha_lanzamiento) - new Date(a.fecha_lanzamiento)
  );
  const byNombre = [...frames].sort((a, b) => a.titulo.localeCompare(b.titulo));

  return (
    <div className="peliculas-bg">
      <h2 className="peliculas-title">
        Descubre nuestras películas recomendadas
      </h2>

      <Carrusel
        titulo="🔝 Mejores puntuadas"
        frames={byPuntuacion}
        onClick={handleMovieClick}
        renderStars={renderStars}
      />
      <Carrusel
        titulo="🕒 Estrenos recientes"
        frames={byFecha}
        onClick={handleMovieClick}
        renderStars={renderStars}
      />
      <Carrusel
        titulo="🔤 Orden alfabético"
        frames={byNombre}
        onClick={handleMovieClick}
        renderStars={renderStars}
      />
    </div>
  );
};

const Carrusel = ({ titulo, frames = [], onClick, renderStars }) => {
  const [start, setStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

  // Ajusta visibleCount según el tamaño de pantalla
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setVisibleCount(5);
      } else if (width >= 992) {
        setVisibleCount(4);
      } else if (width >= 768) {
        setVisibleCount(3);
      } else if (width >= 480) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
      setStart(0); // Resetear posición al cambiar el tamaño
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const handlePrev = () => {
    setStart((prev) => {
      const next = prev - visibleCount;
      return next < 0 ? Math.max(frames.length - visibleCount, 0) : next;
    });
  };

  const handleNext = () => {
    setStart((prev) => {
      const next = prev + visibleCount;
      return next >= frames.length ? 0 : next;
    });
  };

  return (
    <div className="carousel-block">
      <h3 className="carousel-title">{titulo}</h3>
      <div className="carousel-container"   style={{ "--visible-count": visibleCount }}
>
        <button
          className="carousel-arrow"
          onClick={handlePrev}
          disabled={frames.length <= visibleCount}
        >
          &lt;
        </button>

        <div className="peliculas-carousel">
          {frames.slice(start, start + visibleCount).map((peli) => (
            <div
              className="pelicula-card-landing"
              key={peli.frame_id}
              onClick={() => onClick(peli.frame_id)}
            >
              <div className="card-inner">
                {/* Cara frontal */}
                <div className="card-front">
                  <div className="pelicula-poster-img">
                    <img
                      src={peli.poster_url}
                      alt={peli.titulo}
                      className="poster-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="pelicula-nombre">{peli.titulo}</div>
                  <div className="pelicula-puntuacion">
                    {renderStars(peli.puntuacion_dbs.imdb)}
                    <span className="puntuacion-text">
                      {" "}
                      ({peli.puntuacion_dbs.imdb})
                    </span>
                  </div>
                </div>

                {/* Cara trasera */}
                <div className="card-back">
                  <div className="pelicula-nombre">{peli.titulo}</div>
                  <div className="pelicula-genero">{peli.genero}</div>
                  <div className="pelicula-fecha-lanzamiento">
                    {new Date(peli.fecha_lanzamiento).toLocaleDateString()}
                  </div>
                  <div className="pelicula-descripcion">{peli.descripcion}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-arrow"
          onClick={handleNext}
          disabled={frames.length <= visibleCount}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ListaPeliculas;

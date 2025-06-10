import { useEffect, useState, useRef } from "react";
import { getFramesPopulares } from "../../services/Frames/CRUD_Frames";
import { Link } from "react-router-dom";
import "./landing.css";

const VISIBLE = 5;

const Landing = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [start, setStart] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    getFramesPopulares()
      .then((data) => setPeliculas(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handlePrev = () => {
    setStart((prev) => Math.max(prev - VISIBLE, 0));
  };

  const handleNext = () => {
    setStart((prev) =>
      Math.min(prev + VISIBLE, Math.max(peliculas.length - VISIBLE, 0))
    );
  };

  const renderStars = (rating) => {
    if (typeof rating !== "number") return null;
    const stars = Math.round(rating / 2);
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < stars ? "star filled" : "star"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatRating = (value) => {
    return typeof value === "number" ? value.toFixed(1) : "--";
  };

  return (
    <div className="landing-bg">
      <header className="landing-header">
        <div className="landing-logo">
          <img src="../assents/logo_nombre_oscuro.png" alt="Muvis Logo" />
        </div>
        <div className="landing-actions">
          <Link to="/LogIn" className="landing-btn light">
            Entrar
          </Link>
          <Link to="/Registro" className="landing-btn dark">
            Registrarme
          </Link>
        </div>
      </header>
      <h2 className="landing-title">
        Descubre las valoraciones de
        <br />
        personas como tú
      </h2>
      <div className="carousel-container">
        <button
          className="carousel-arrow"
          onClick={handlePrev}
          disabled={start === 0}
        >
          &lt;
        </button>
        <div className="peliculas-carousel" ref={carouselRef}>
          {peliculas.slice(start, start + VISIBLE).map((peli) => (
            <div
              className="pelicula-card-landing"
              key={peli.frame_id || peli.id || peli.titulo}
            >
              <div className="pelicula-poster-img">
                <img
                  src={peli.poster_url}
                  alt={peli.titulo}
                  className="poster-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/default_poster.png";
                  }}
                />
              </div>
              <div className="pelicula-promedios">
                <span>
                  <b>Muvis:</b> {formatRating(peli.promedio_votos_muvis)}
                </span>
                {renderStars(peli.promedio_votos_muvis)}
                <br />
                <span>
                  <b>TMDB:</b> {formatRating(peli.promedio_votos_tmdb)}
                </span>
                {renderStars(peli.promedio_votos_tmdb)}
              </div>
              <div className="pelicula-nombre">{peli.titulo}</div>
            </div>
          ))}
        </div>
        <button
          className="carousel-arrow"
          onClick={handleNext}
          disabled={start + VISIBLE >= peliculas.length}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Landing;

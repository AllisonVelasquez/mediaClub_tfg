import { useEffect, useState, useRef } from "react";
import { getFrames } from "../services/axios";
import { Link } from "react-router-dom";
import logoNombreOscuro from "./logo_nombre_oscuro.png";
import "./landing.css";

const VISIBLE = 4;

const Landing = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [start, setStart] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    getFrames()
      .then((data) => setPeliculas(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handlePrev = () => {
    setStart((prev) => Math.max(prev - VISIBLE, 0));
  };

  const handleNext = () => {
    setStart((prev) =>
      Math.min(prev + VISIBLE, peliculas.length - VISIBLE)
    );
  };

  return (
    <div className="landing-bg">
      <header className="landing-header">
        <div className="landing-logo">
          <img src={logoNombreOscuro} alt="Muvis Logo" />
        </div>
        <div className="landing-actions">
          <Link to="/LogIn" className="landing-btn light">
            Sign In
          </Link>
          <Link to="/Registro" className="landing-btn dark">
            Register
          </Link>
        </div>
      </header>
      <h2 className="landing-title">
        Descubre las valoraciones de<br />personas como tu
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
            <div className="pelicula-card-landing" key={peli.frame_id}>
              <div className="pelicula-poster-img">
                <img
                  src={peli.poster_url}
                  alt={peli.titulo}
                  className="poster-img"
                  loading="lazy"
                />
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
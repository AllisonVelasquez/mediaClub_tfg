import { useEffect, useState, useRef } from "react";
import { getFramesPopulares } from "../../services/Frames/CRUD_Frames"; // Corrige la ruta si tus servicios están en 'services'
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

  return (
    <div className="landing-bg">
      <header className="landing-header">
        <div className="landing-logo">
          <img src="/logo_nombre_oscuro.png" alt="Muvis Logo" />
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
            <div className="pelicula-card-landing" key={peli.frame_id || peli.id || peli.titulo}>
              <div className="pelicula-poster-img">
                {/* Mostrar la imagen del frame */}
                <img
                  src={peli.poster_url}
                  alt={peli.titulo}
                  className="poster-img"
                  loading="lazy"
                  onError={e => { e.target.src = "/default_poster.png"; }}
                />
              </div>
               <div className="pelicula-promedios">
                <span><b>Muvis:</b> {peli.promedio_votos_muvis ?? '0/A' }</span><br/>
                <span><b>TMDB:</b> {peli.promedio_votos_tmdb ?? 'N/A'}</span>
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
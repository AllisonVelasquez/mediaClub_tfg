import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getFramesByGenero } from "../../services/Frames/CRUD_Frames";

const ListaPeliculas = ({ generoId }) => {
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFrames = async () => {
      setIsLoading(true);
      try {
        const data = await getFramesByGenero(generoId);
        setFrames(data.contenido?.data || []);
      } catch (error) {
        console.error("Error cargando frames:", error);
        setFrames([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (generoId) {
      fetchFrames();
    }
  }, [generoId]);

  const renderStars = (score) => {
    const maxStars = 5;
    const stars = [];
    const filledStars = Math.round(score / 2);
    for (let i = 0; i < maxStars; i++) {
      stars.push(
        <span
          key={i}
          className="pelicula-puntuacion-estrellas"
        >
          {i < filledStars ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };
  // Configuración del slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (isLoading) return <p>Cargando películas...</p>;
  if (frames.length === 0) return <p>No hay películas disponibles.</p>;

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {frames.map((frame) => (
          <div key={frame.id}>
            <div
              className="pelicula-card-landing"
              onClick={() => navigate(`/peliculasDetalles/${frame.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={frame.poster_url}
                alt={frame.titulo}
                style={{ width: "100%", borderRadius: "10px 10px 0 0" }}
              />
              <h4 className="pelicula-nombre">{frame.titulo}</h4>

              <div className="pelicula-info" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                {/* Votos TMDB */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span>voto TMDB:</span>
                  {renderStars(frame.promedio_votos_tmdb || 0)}
                  <span className="pelicula-puntuacion-num">
                    {typeof frame.promedio_votos_tmdb === "number"
                      ? frame.promedio_votos_tmdb.toFixed(1)
                      : "Sin puntuar"}
                  </span>
                </div>

                {/* Puntuacion Muvis */}
                <div style={{ marginLeft: "1rem", fontWeight: "600" }}>
                  <span>voto Muvis:</span>

                  {typeof frame.promedio_votos_muvis === "number"
                    ? `Muvis: ${frame.promedio_votos_muvis.toFixed(1)}`
                    : "Sin puntuar"}
                </div>

                {/* Fecha de estreno */}
                <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "#666" }}>
                 <span>fecha de estreno:</span> {frame.fecha_estreno}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ListaPeliculas;

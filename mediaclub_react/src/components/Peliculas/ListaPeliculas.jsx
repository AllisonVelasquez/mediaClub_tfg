import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getFramesByGenero } from "../../services/Frames/CRUD_Frames";
import { obtenerMisListas, añadirFrameALista } from "../../services/Usuarios/Mi/CRUD_Usuarios";
import "./ListaPeliculas.css";

const ListaPeliculas = ({ generoId }) => {
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listas, setListas] = useState([]);
  const [selectedFrameId, setSelectedFrameId] = useState(null);
  const [showSelector, setShowSelector] = useState(false);
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

    if (generoId) fetchFrames();
  }, [generoId]);

  const fetchMisListas = async () => {
    try {
      const listasData = await obtenerMisListas();
      setListas(listasData || []);
    } catch (error) {
      console.error("Error cargando tus listas:", error);
      setListas([]);
    }
  };

  const handleAddToListaClick = async (frameId) => {
    setSelectedFrameId(frameId);
    await fetchMisListas();
    setShowSelector(true);
  };

  const handleSeleccionLista = async (listaId) => {
    try {
      await añadirFrameALista(listaId, selectedFrameId);
      alert("Película añadida a la lista con éxito");
    } catch (err) {
      console.error("Error añadiendo frame a lista:", err);
      alert("Error al añadir la película");
    } finally {
      setShowSelector(false);
      setSelectedFrameId(null);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: false,
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
            <div className="pelicula-card-landing">
              <img
                className="pelicula-poster"
                src={frame.poster_url}
                alt={frame.titulo}
                onClick={() => navigate(`/peliculasDetalles/${frame.id}`)}
              />
              <h4 className="pelicula-nombre">{frame.titulo}</h4>
              <div className="pelicula-info">
                <div>
                  <span>TMDB:</span>
                  <span className="pelicula-puntuacion-num">
                    {typeof frame.promedio_votos_tmdb === "number"
                      ? frame.promedio_votos_tmdb.toFixed(1)
                      : "Sin puntuar"}
                  </span>
                </div>
                <div>
                  <span>Muvis:</span>{" "}
                  {typeof frame.promedio_votos_muvis === "number"
                    ? frame.promedio_votos_muvis.toFixed(1)
                    : "Sin puntuar"}
                </div>
                <span>
                  <span>Fecha de estreno:</span> {frame.fecha_estreno}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleAddToListaClick(frame.id)}
              >
                Añadir a una lista
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {showSelector && (
        <div>
          <div>
            <h3>Selecciona una lista</h3>
            <ul>
              {listas.map((lista) => (
                <li
                  key={lista.id}
                  onClick={() => handleSeleccionLista(lista.id)}
                >
                  {lista.nombre_lista} ({lista.publica ? "Pública" : "Privada"})
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowSelector(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaPeliculas;
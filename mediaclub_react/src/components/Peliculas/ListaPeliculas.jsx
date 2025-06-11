import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getFramesByGenero } from "../../services/Frames/CRUD_Frames";
import MisListas from "../Listas/MisListas";
import { addFrameToLista } from "../../services/Listas/CRUD_Listas";

const ListaPeliculas = ({ generoId = null, frames: framesProp = null }) => {
  const [frames, setFrames] = useState(framesProp || []);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [showSelector, setShowSelector] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFrames = async () => {
      // Solo hacer la petición si no se pasaron frames y sí hay un generoId
      if (!framesProp && generoId) {
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
      }
    };

    fetchFrames();
  }, [generoId, framesProp]);

  const handleAddToListaClick = (frame) => {
    setSelectedFrame(frame);
    setShowSelector(true);
    setMensaje("");
  };

  const handleConfirmarAñadir = async (idLista) => {
    try {
      await addFrameToLista(idLista, selectedFrame.id);
      setMensaje(`✅ Película "${selectedFrame.titulo}" añadida correctamente.`);
    } catch (err) {
      console.error("Error añadiendo frame a lista:", err);
      setMensaje("❌ Error al añadir la película.");
    } finally {
      setShowSelector(false);
      setSelectedFrame(null);
    }
  };

  const renderStars = (score) => {
    const maxStars = 5;
    const filled = Math.round(score / 2);
    return [...Array(maxStars)].map((_, i) => (
      <span key={i} className="pelicula-puntuacion-estrellas">
        {i < filled ? "★" : "☆"}
      </span>
    ));
  };

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
  if (!frames || frames.length === 0) return <p>No hay películas disponibles.</p>;

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {frames.map((frame) => (
          <div key={frame.id}>
            <div className="pelicula-card-landing relative">
              <img
                src={frame.poster_url}
                alt={frame.titulo}
                onClick={() => navigate(`/peliculasDetalles/${frame.id}`)}
                className="w-full rounded-t-lg cursor-pointer"
              />
              <h4 className="pelicula-nombre">{frame.titulo}</h4>
              <div className="pelicula-info">
                <div className="flex items-center gap-2">
                  <span>voto TMDB:</span>
                  {renderStars(frame.promedio_votos_tmdb || 0)}
                  <span className="pelicula-puntuacion-num">
                    {typeof frame.promedio_votos_tmdb === "number"
                      ? frame.promedio_votos_tmdb.toFixed(1)
                      : "Sin puntuar"}
                  </span>
                </div>
                <div className="ml-4 font-semibold">
                  voto Muvis:{" "}
                  {typeof frame.promedio_votos_muvis === "number"
                    ? frame.promedio_votos_muvis.toFixed(1)
                    : "Sin puntuar"}
                </div>
                <span className="ml-auto text-sm text-gray-600">
                  fecha de estreno: {frame.fecha_estreno}
                </span>
              </div>
              <button
                className="mt-2 text-sm text-blue-600 hover:underline"
                onClick={() => handleAddToListaClick(frame)}
              >
                Añadir a una lista
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {showSelector && selectedFrame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <h3 className="mb-2 font-semibold text-lg text-center">
              Añadir: <span className="text-blue-700">{selectedFrame.titulo}</span>
            </h3>
            <MisListas
              seleccionable
              onSeleccionarLista={handleConfirmarAñadir}
              peliculaTitulo={selectedFrame.titulo}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-300 px-3 py-1 rounded"
                onClick={() => {
                  setShowSelector(false);
                  setSelectedFrame(null);
                  setMensaje("");
                }}
              >
                Cancelar
              </button>
            </div>
            {mensaje && (
              <p className="mt-2 text-sm font-medium text-center text-green-600">
                {mensaje}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaPeliculas;

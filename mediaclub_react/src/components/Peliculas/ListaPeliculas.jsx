import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getFramesByGenero } from "../../services/Frames/CRUD_Frames";
import { obtenerMisListas, añadirFrameALista } from "../../services/Usuarios/Mi/CRUD_Usuarios";


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

  const renderStars = (score) => {
    const maxStars = 5;
    const stars = [];
    const filledStars = Math.round(score / 2);
    for (let i = 0; i < maxStars; i++) {
      stars.push(
        <span key={i} className="pelicula-puntuacion-estrellas">
          {i < filledStars ? "★" : "☆"}
        </span>
      );
    }
    return stars;
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
  if (frames.length === 0) return <p>No hay películas disponibles.</p>;

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {frames.map((frame) => (
          <div key={frame.id}>
            <div className="pelicula-card-landing" style={{ position: "relative" }}>
              <img
                src={frame.poster_url}
                alt={frame.titulo}
                onClick={() => navigate(`/peliculasDetalles/${frame.id}`)}
                style={{ width: "100%", borderRadius: "10px 10px 0 0", cursor: "pointer" }}
              />
              <h4 className="pelicula-nombre">{frame.titulo}</h4>
              <div className="pelicula-info">
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <span>voto TMDB:</span>
                  {renderStars(frame.promedio_votos_tmdb || 0)}
                  <span className="pelicula-puntuacion-num">
                    {typeof frame.promedio_votos_tmdb === "number"
                      ? frame.promedio_votos_tmdb.toFixed(1)
                      : "Sin puntuar"}
                  </span>
                </div>
                <div style={{ marginLeft: "1rem", fontWeight: "600" }}>
                  <span>voto Muvis:</span>{" "}
                  {typeof frame.promedio_votos_muvis === "number"
                    ? frame.promedio_votos_muvis.toFixed(1)
                    : "Sin puntuar"}
                </div>
                <span style={{ marginLeft: "auto", fontSize: "0.9rem", color: "#666" }}>
                  <span>fecha de estreno:</span> {frame.fecha_estreno}
                </span>
              </div>
              <button
                className="mt-2 text-sm text-blue-600 hover:underline"
                onClick={() => handleAddToListaClick(frame.id)}
              >
                Añadir a una lista
              </button>
            </div>
          </div>
        ))}
      </Slider>

      {showSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-3">Selecciona una lista</h3>
            <ul className="space-y-2">
              {listas.map((lista) => (
                <li
                  key={lista.id}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                  onClick={() => handleSeleccionLista(lista.id)}
                >
                  {lista.nombre_lista} ({lista.publica ? "Pública" : "Privada"})
                </li>
              ))}
            </ul>
            <button
              className="mt-4 text-red-600 hover:underline"
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

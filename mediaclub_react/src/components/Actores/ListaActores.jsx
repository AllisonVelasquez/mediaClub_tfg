import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllActores } from "../../services/Actores/CRUD_actores";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w185";
const BOTONES_VISIBLES = 5;

const ListaActores = ({ actoresIniciales = null, onActorClick = null }) => {
  const [actores, setActores] = useState(actoresIniciales || []);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(!actoresIniciales); // solo carga si no vienen actores
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!actoresIniciales) {
      fetchActores(pagina);
    }
  }, [pagina, actoresIniciales]);

  const fetchActores = async (paginaActual) => {
    try {
      setLoading(true);
      const { actores, totalPaginas } = await getAllActores(paginaActual);
      setActores(actores);
      setTotalPaginas(totalPaginas);
      setError(null);
    } catch (err) {
      setError("Error al cargar actores");
    } finally {
      setLoading(false);
    }
  };

  const obtenerBotonesPaginacion = () => {
    const grupoActual = Math.floor((pagina - 1) / BOTONES_VISIBLES);
    const inicio = grupoActual * BOTONES_VISIBLES + 1;
    const fin = Math.min(inicio + BOTONES_VISIBLES - 1, totalPaginas);
    return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i);
  };

  const handleClickActor = (actor) => {
    if (onActorClick) {
      onActorClick(actor);
    } else {
      navigate(`/actores/${actor.id}`);
    }
  };

  if (loading) return <div className="estado-carga">Cargando actores...</div>;
  if (error) return <div className="estado-error">{error}</div>;

  return (
    <div className="lista-actores">
      <h2>Actores {actoresIniciales ? "" : "Populares"}</h2>
      <div className="contenedor-actores">
        {actores.map((actor) => (
          <div
            key={actor.id}
            className="actor-card"
            onClick={() => handleClickActor(actor)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={BASE_IMG_URL + actor.imagen_url}
              onError={(e) => {
                e.target.alt = actor.nombre;
              }}
            />
            <div className="actor-nombre">{actor.nombre}</div>
            <div className="actor-popularidad">Popularidad: {actor.popularidad}</div>
          </div>
        ))}
      </div>

      {!actoresIniciales && (
        <div className="paginacion">
          <button onClick={() => setPagina(pagina - 1)} disabled={pagina === 1}>
            ⬅
          </button>

          {obtenerBotonesPaginacion().map((num) => (
            <button
              key={num}
              onClick={() => setPagina(num)}
              className={num === pagina ? "activo" : ""}
            >
              {num}
            </button>
          ))}

          <button onClick={() => setPagina(pagina + 1)} disabled={pagina === totalPaginas}>
            ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default ListaActores;

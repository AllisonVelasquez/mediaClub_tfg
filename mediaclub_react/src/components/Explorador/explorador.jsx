import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarUsuarios,
  buscarPeliculas,
  buscarActores,
} from "../../services/Buscador/CRUD_buscador";
import ListaPeliculas from "../Peliculas/ListaPeliculas";
import "./explorador.css";

const BuscadorConFiltro = () => {
  const [query, setQuery] = useState("");
  const [filtro, setFiltro] = useState("usuarios");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(true);
  const navigate = useNavigate();

  const realizarBusqueda = async () => {
    if (query.trim().length < 2) {
      alert("Introduce al menos 2 caracteres para buscar.");
      return;
    }

    setLoading(true);
    setBuscado(true);
    setResultados([]);

    try {
      let res = [];
      if (filtro === "usuarios") res = await buscarUsuarios(query);
      else if (filtro === "peliculas") res = await buscarPeliculas(query);
      else if (filtro === "actores") res = await buscarActores(query);

      const datos = res?.data || [];
      setResultados(datos);

      if (datos.length === 1) {
        const item = datos[0];
        if (filtro === "usuarios") navigate(`/perfil/${item.id}`);
        else if (filtro === "peliculas") navigate(`/peliculasDetalles/${item.id}`);
        else if (filtro === "actores") navigate(`/actores/${item.id}`);
      }
    } catch (error) {
      console.error("Error al buscar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = (item) => {
    if (filtro === "usuarios") navigate(`/perfil/${item.id}`);
    else if (filtro === "peliculas") navigate(`/peliculasDetalles/${item.id}`);
    else if (filtro === "actores") navigate(`/actores/${item.id}`);
  };

  return (
    <div className="buscador">
      <form onSubmit={(e) => { e.preventDefault(); realizarBusqueda(); }}>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="usuarios">Usuarios</option>
          <option value="peliculas">Películas</option>
          <option value="actores">Actores</option>
        </select>
        <input
          type="text"
          placeholder={`Buscar ${filtro}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="buscador-btn">
          Buscar
        </button>
      </form>

      {loading && <p className="center-text">Buscando...</p>}

      {buscado && resultados.length > 0 && (
        <div className="resultados-container">
          <button
            onClick={() => setMostrarResultados(!mostrarResultados)}
            className="toggle-resultados"
          >
            {mostrarResultados ? "▼ Ocultar resultados" : "▶ Mostrar resultados"}
          </button>
          {mostrarResultados && (
            <div className="resultados-content">
              {filtro === "peliculas" && (
                <ListaPeliculas frames={resultados} />
              )}
              {filtro === "usuarios" && (
                <div className="grid-usuarios">
                  {resultados.map((user) => (
                    <div
                      key={user.id}
                      className="resultado-usuario"
                      onClick={() => handleRedirect(user)}
                    >
                      <img
                        src={
                          user.foto_perfil
                            ? `${user.foto_perfil}`
                            : "/images/perfiles/default.png"
                        }
                        alt={`Foto de ${user.alias}`}
                      />
                      <p>{user.alias}</p>
                    </div>
                  ))}
                </div>
              )}
              {filtro === "actores" && (
                <div className="grid-actores">
                  {resultados.map((actor) => (
                    <div
                      key={actor.id}
                      className="resultado-actor"
                      onClick={() => handleRedirect(actor)}
                    >
                      <h4>{actor.nombre}</h4>
                      <p>{actor.biografia ? actor.biografia.slice(0, 100) : ""}...</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!loading && resultados.length === 0 && buscado && (
        <p className="center-text no-results">
          No se encontraron resultados para "{query}".
        </p>
      )}
    </div>
  );
};

export default BuscadorConFiltro;

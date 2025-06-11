import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarUsuarios,
  buscarPeliculas,
  buscarActores,
} from "../../services/Buscador/CRUD_buscador";
import ListaPeliculas from "../Peliculas/ListaPeliculas";

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
    if (filtro === "peliculas") navigate(`/peliculasDetalles/${item.id}`);
    if (filtro === "actores") navigate(`/actores/${item.id}`);
  };

  return (
    <div className="buscador w-full max-w-4xl mx-auto mt-4 px-4">
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border px-3 py-2 rounded"
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
          className="flex-grow border px-3 py-2 rounded"
        />
        <button type="submit" className="buscador-btn">
          Buscar
        </button>
      </div>

      {loading && <p className="text-center">Buscando...</p>}

      {buscado && resultados.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setMostrarResultados(!mostrarResultados)}
            className="w-full bg-gray-100 px-4 py-2 text-left font-semibold text-lg hover:bg-gray-200"
          >
            {mostrarResultados ? "▼ Ocultar resultados" : "▶ Mostrar resultados"}
          </button>

          {mostrarResultados && (
            <div className="p-4">
              {filtro === "peliculas" && (
                <ListaPeliculas frames={resultados} />
              )}

              {filtro === "usuarios" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resultados.map((user) => (
                    <div
                      key={user.id}
                      className="border p-3 rounded hover:shadow cursor-pointer flex gap-3 items-center"
                      onClick={() => handleRedirect(user)}
                    >
                      <img
                        src={
                          user.foto_perfil
                            ? `https://image.tmdb.org/t/p/w200/${user.foto_perfil}`
                            : "/images/perfiles/default.png"
                        }
                        alt={`Foto de ${user.alias}`}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                      <p className="font-medium text-blue-700">{user.alias}</p>
                    </div>
                  ))}
                </div>
              )}

              {filtro === "actores" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {resultados.map((actor) => (
                    <div
                      key={actor.id}
                      className="border p-3 rounded hover:shadow cursor-pointer"
                      onClick={() => handleRedirect(actor)}
                    >
                      <h4 className="font-semibold">{actor.nombre}</h4>
                      <p className="text-sm text-gray-600">
                        {actor.biografia?.slice(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!loading && resultados.length === 0 && buscado && (
        <p className="text-center text-gray-500">
          No se encontraron resultados para "{query}".
        </p>
      )}
    </div>
  );
};

export default BuscadorConFiltro;

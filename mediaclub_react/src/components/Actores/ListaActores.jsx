import { useEffect, useState } from "react";
import { getAllActores } from "../../services/Actores/CRUD_actores";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w185";

const ListaActores = () => {
  const [actores, setActores] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const botonesVisibles = 5;

  useEffect(() => {
    setLoading(true);
    getAllActores(pagina)
      .then((data) => {
        setActores(data.contenido.data);
        setTotalPaginas(data.contenido.last_page);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar actores");
        setLoading(false);
      });
  }, [pagina]);

  const cambiarPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) {
      setPagina(num);
    }
  };

  const obtenerBotonesPaginacion = () => {
    const grupoActual = Math.floor((pagina - 1) / botonesVisibles);
    const inicio = grupoActual * botonesVisibles + 1;
    const fin = Math.min(inicio + botonesVisibles - 1, totalPaginas);
    const paginas = [];

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }

    return paginas;
  };

  if (loading) return <div>Cargando actores...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Actores Populares</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
        {actores.map((actor) => (
          <div
            key={actor.id}
            style={{
              width: 150,
              textAlign: "center",
              background: "#f8ffe5",
              borderRadius: 10,
              boxShadow: "0 2px 8px #bcd2c2",
              padding: 10,
            }}
          >
            <img
              src={BASE_IMG_URL + actor.imagen_url}
              alt={actor.nombre}
              style={{
                width: 120,
                height: 180,
                objectFit: "cover",
                borderRadius: 8,
                marginBottom: 8,
              }}
              onError={(e) => {
                e.target.src = "/default_poster.png";
              }}
            />
            <div
              style={{
                fontWeight: 600,
                color: "#2e5135",
                fontSize: "1rem",
              }}
            >
              {actor.nombre}
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                color: "#212226",
              }}
            >
              Popularidad: {actor.popularidad}
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
<div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
  <div style={{ display: "inline-flex", gap: "0.5rem" }}>
    <button
      onClick={() => cambiarPagina(pagina - 1)}
      disabled={pagina === 1}
      style={{
        padding: "6px 10px",
        backgroundColor: "#e0e0e0",
        border: "1px solid #ccc",
        borderRadius: 4,
        cursor: pagina === 1 ? "not-allowed" : "pointer",
      }}
    >
      ⬅
    </button>

    {obtenerBotonesPaginacion().map((num) => (
      <button
        key={num}
        onClick={() => cambiarPagina(num)}
        style={{
          padding: "6px 10px",
          backgroundColor: num === pagina ? "#2e5135" : "#f0f0f0",
          color: num === pagina ? "#fff" : "#333",
          border: "1px solid #ccc",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        {num}
      </button>
    ))}

    <button
      onClick={() => cambiarPagina(pagina + 1)}
      disabled={pagina === totalPaginas}
      style={{
        padding: "6px 10px",
        backgroundColor: "#e0e0e0",
        border: "1px solid #ccc",
        borderRadius: 4,
        cursor: pagina === totalPaginas ? "not-allowed" : "pointer",
      }}
    >
      ➡
    </button>
  </div>
</div>

    </div>
  );
};

export default ListaActores;

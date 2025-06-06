// Generos.jsx
import { useEffect, useState } from "react";
import { getGeneros } from "../../services/Frames/CRUD_Frames";
import { useNavigate } from "react-router-dom";
import "./Generos.css";

const Generos = () => {
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGeneros(page);
        setGenres(data.contenido.data);
        setNextPage(data.contenido.next_page_url);
        setPrevPage(data.contenido.prev_page_url);
      } catch (error) {
        console.error("Error al cargar géneros:", error);
      }
    };
    fetchGenres();
  }, [page]);

  const handleGeneroClick = (id) => {
    navigate(`/Peliculas/Genero/${id}`);
  };

  return (
    <nav className="generos-nav">
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        {open ? "Cerrar géneros" : "Ver géneros"}
      </button>
      <ul className={`generos-list ${open ? "open" : ""}`}>
        {genres.map((g) => (
          <li
            key={g.id}
            className="genero-item"
            onClick={() => handleGeneroClick(g.id)}
          >
            {g.nombre}
          </li>
        ))}
      </ul>
      <div className="generos-pagination">
        <button onClick={() => setPage((p) => p - 1)} disabled={!prevPage}>
          Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={!nextPage}>
          Siguiente
        </button>
      </div>
    </nav>
  );
};

export default Generos;

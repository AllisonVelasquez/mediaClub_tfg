import { useEffect, useState } from "react";
import ListaPeliculas from "./ListaPeliculas";
import { getGeneros } from "../../services/Frames/CRUD_Frames";
import "./Generos.css";

const Generos = () => {
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedGeneroId, setSelectedGeneroId] = useState(null); 

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
    setSelectedGeneroId(id); 
  };

  return (
    <div>
      <nav className="generos-nav">
        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          {open ? "Cerrar géneros" : "Ver géneros"}
        </button>
        <ul className={`generos-list ${open ? "open" : ""}`}>
          {genres.map((g) => (
            <li
              key={g.id}
              className="genero-item"
              onClick={() => handleGeneroClick(g)} 
            >
              {g.nombre}
            </li>
          ))}
        </ul>

      </nav>

      {/* 👇 Mostrar ListaPeliculas si hay género seleccionado */}
      {selectedGeneroId && (
        <div style={{ marginTop: "2rem" }}>
          
          <h2>Películas del género seleccionado {selectedGeneroId.nombre}</h2>
          <ListaPeliculas generoId={selectedGeneroId.id} />
        </div>
      )}
    </div>
  );
};

export default Generos;

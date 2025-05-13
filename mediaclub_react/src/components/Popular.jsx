import  { useEffect, useState } from "react";
import axios from "../services/axios";
//Esto como tal es un feature pero de momento para mostrar lo pongo aqui, aqui deberia ir el card de cada peli (componentes)
const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/movies/popular")
      .then((response) => {
        console.log(response.data); //se quita a futuro
        setMovies(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las películas: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Películas Populares</h1>
      <ul>
        {movies.length > 0 ? (
          movies.map(movie => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              {/* Opcional: Mostrar una imagen */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "150px" }}
              />
            </li>
          ))
        ) : (
          <p>No se encontraron peliculas</p>
        )}
      </ul>
    </div>
  );
};

export default Popular;

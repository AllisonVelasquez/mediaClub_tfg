import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getActorDetalles, getActorFilmografia } from "../../services/Actores/CRUD_actores";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w300";

const Actor = () => {
  const { id } = useParams();
  const [detalles, setDetalles] = useState(null);
  const [filmografia, setFilmografia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        setLoading(true);
        const detallesActor = await getActorDetalles(id);
        const filmografiaActor = await getActorFilmografia(id);
        console.log("Detalles del actor:", detallesActor);
        console.log(getActorDetalles(id));
        setDetalles(detallesActor);
        setFilmografia(filmografiaActor.data);
      } catch (err) {
        setError("No se pudo cargar la información del actor.");
      } finally {
        setLoading(false);
      }
    };

    fetchDatos();
  }, [id]);



  if (loading) return <div>Cargando información del actor...</div>;
  if (error) return <div>{error}</div>;
  if (!detalles) return "null";
  return (
    <div className="actor-container">
      <div className="actor-header">
        <img
          className="actor-photo"
          src={BASE_IMG_URL + detalles.imagen_url}
          alt={detalles.nombre}
          onError={(e) => {
            e.target.src = "/default_poster.png";
          }}
        />
        <div className="actor-name">{detalles.nombre}</div>
        <div className="actor-popularidad">Popularidad: {detalles.popularidad}</div>
      </div>

      <div className="actor-section-title">Filmografía</div>
      <ul className="filmografia-lista">
        {filmografia.map((pelicula) => (
          <li className="filmografia-item" key={pelicula.frame_id}>
            <Link className="actor-link" to={`/peliculasDetalles/${pelicula.frame_id}`}>
              <img
                src={BASE_IMG_URL + pelicula.poster_url}
                alt={pelicula.titulo}
                onError={(e) => {
                  e.target.src = pelicula.titulo;
                }}
              />
              <div className="filmografia-titulo">{pelicula.titulo}</div>
              <div className="filmografia-personaje">{pelicula.personaje}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Actor;

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
  if (!detalles) return null;

const { imagen_url, nombre, popularidad } = detalles;
  if (!imagen_url || imagen_url === "null") {
     <div>El actor no tiene imagen disponible.</div>;
  } 

  return (
    <div>
      <h2>{detalles.nombre}</h2>
      <img
        src={detalles.imagen_url}
        alt={detalles.nombre}
        onError={(e) => {
          e.target.alt =detalles.nombre;
        }}
      />
      <p>Popularidad: {detalles.popularidad}</p>

      <h3>Filmografía</h3>
      <ul>
        {filmografia.map((pelicula) => (
          <li key={pelicula.frame_id}>
            <Link to={`/peliculasDetalles/${pelicula.frame_id}`}>
              <div>
                <strong>{pelicula.titulo}</strong> - {pelicula.personaje}
              </div>
              <img
                src={BASE_IMG_URL + pelicula.poster_url}
                alt={pelicula.titulo}
                width={120}
                height={180}
                onError={(e) => {
                  e.target.src = pelicula.titulo;
                }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Actor;

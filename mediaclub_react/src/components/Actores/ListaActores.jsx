import { useEffect, useState } from "react";
import { getAllActores } from "../../services/Actores/CRUD_actores";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/w185";

const ListaActores = () => {
  const [actores, setActores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllActores()
      .then((data) => {
        // data.contenido.data es el array de actores
        setActores(data.contenido.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar actores");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando actores...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div style={{padding: '2rem'}}>
      <h2>Actores Populares</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1.5rem'}}>
        {actores.map((actor) => (
          <div key={actor.id} style={{width: 150, textAlign: 'center', background: '#f8ffe5', borderRadius: 10, boxShadow: '0 2px 8px #bcd2c2', padding: 10}}>
            <img
              src={BASE_IMG_URL + actor.imagen_url}
              alt={actor.nombre}
              style={{width: 120, height: 180, objectFit: 'cover', borderRadius: 8, marginBottom: 8}}
              onError={e => { e.target.src = '/default_poster.png'; }}
            />
            <div style={{fontWeight: 600, color: '#2e5135', fontSize: '1rem'}}>{actor.nombre}</div>
            <div style={{fontSize: '0.9rem', color: '#212226'}}>Popularidad: {actor.popularidad}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaActores;

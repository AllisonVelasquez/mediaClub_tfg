import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/DetallesLista.css";
import { getFramesLista } from "../../services/Listas/CRUD_Listas"; 
//falta implementar la vista de los errores personalizados 
import { ErrorPage } from "../Error";

const ListDetail = () => {
  const { id } = useParams(); // Obtenemos el id de la lista desde los parámetros de la URL
  const listaId = parseInt(id);

  // Estado para almacenar las listas, frames y películas

  const [peliculas, setPeliculas] = useState([]);

  // Estado para manejar los errores si no se encuentran datos
  const [error, setError] = useState(null);
  const handleRemove = async (frameIdToRemove) => {
    try {
      // Aquí deberías llamar a tu servicio de eliminación
      // await removeFrameFromLista(listaId, frameIdToRemove);

      // Por ahora, solo lo eliminamos del estado local:
      setPeliculas((prev) =>
        prev.filter((p) => p.frame_id !== frameIdToRemove)
      );
    } catch (error) {
      console.error("Error al quitar la película:", error);
      setError("No se pudo quitar la película de la lista.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultado = await getFramesLista(listaId);

        if (!resultado || resultado.length === 0) {
          setError("No se encontraron películas en esta lista.");
          return;
        }

        const peliculasPlanas = resultado.flat();

        setPeliculas(peliculasPlanas);
      } catch (error) {
        setError("Error al obtener los datos.");
        console.error("Error al obtener detalles de la lista:", error);
      }
    };

    fetchData();
  }, [listaId]);
  // Solo se ejecuta cuando cambia el ID de la lista

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {error && <p>{error}</p>}

      {!error && (
        <>
          <div className="peliculas-grid">
            {peliculas.map((pelicula) => (
              <div key={pelicula.frame_id} className="pelicula-card">
                <img
                  src={pelicula.poster_url || "/images/default_movie.webp"}
                  alt={pelicula.titulo}
                  className="pelicula-img"
                />
                <h4>{pelicula.titulo}</h4>
                <p>
                  <strong>ID:</strong> {pelicula.frame_id}
                </p>
                <p>
                  <strong>IMDB ID:</strong> {pelicula.imdb_id}
                </p>
                <p>
                  <strong>Tipo:</strong> {pelicula.tipo_contenido}
                </p>
                <p>
                  <strong>Género:</strong> {pelicula.genero}
                </p>
                <p>
                  <strong>Duración:</strong> {pelicula.duracion} min
                </p>
                <p>
                  <strong>Fecha de Lanzamiento:</strong>{" "}
                  {new Date(pelicula.fecha_lanzamiento).toLocaleDateString()}
                </p>
                <p>
                  <strong>Descripción:</strong> {pelicula.descripcion}
                </p>
                <p>
                  {pelicula.tipo_contenido === "serie" && (
                    <p>
                      <strong>Episodios:</strong> {pelicula.numero_episodios}
                    </p>
                  )}
                </p>
                <p>
                  <strong>Última actualización:</strong>{" "}
                  {new Date(
                    pelicula.fecha_ultima_actualizacion
                  ).toLocaleString()}
                </p>
                <p>
                  <strong>Puntuaciones:</strong>
                </p>
                <ul>
                  {pelicula.puntuacion_dbs &&
                    Object.entries(pelicula.puntuacion_dbs).map(
                      ([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      )
                    )}
                </ul>
                <button
                  onClick={() => handleRemove(pelicula.frame_id)}
                  className="btn-quitar"
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListDetail;

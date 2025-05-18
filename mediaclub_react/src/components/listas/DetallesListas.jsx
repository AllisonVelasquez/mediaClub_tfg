// src/components/ListDetail.jsx
import { useParams } from "react-router-dom";

const ListDetail = ({ data }) => {
  const { id } = useParams();
  const listaId = parseInt(id);

  const listas =
    data.find((item) => item.message.includes("Listas"))?.data?.listas || [];
  const frames =
    data.find((item) => item.message.includes("Frames"))?.data?.frames || [];
  const puntuaciones =
    data.find((item) => item.message.includes("Puntuaciones"))?.data
      ?.puntuaciones || [];
  const resenas =
    data.find((item) => item.message.includes("Reseñas"))?.data?.resenas || [];

  const lista = listas.find((l) => l.lista_id === listaId);
  if (!lista) return <p>Lista no encontrada</p>;

  const usuarioId = lista.usuario_id;

  // Buscar frame_ids relacionados con este usuario
  const frameIds = [
    ...new Set([
      ...puntuaciones
        .filter((p) => p.usuario_id === usuarioId)
        .map((p) => p.frame_id),
      ...resenas
        .filter((r) => r.usuario_id === usuarioId)
        .map((r) => r.frame_id),
    ]),
  ];

  const peliculas = frames.filter((f) => frameIds.includes(f.frame_id));

  return (
    <div>
      <h2>{lista.nombre}</h2>
      {peliculas.length === 0 ? (
        <p>Esta lista no tiene películas asociadas.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {peliculas.map((pelicula) => (
            <div key={pelicula.frame_id} style={{ width: "150px" }}>
              <img
                src={pelicula.poster_url || "/images/default_movie.webp"}
                alt={pelicula.titulo}
                style={{ width: "100%", borderRadius: "4px" }}
              />
              <h5>{pelicula.titulo}</h5>
              <p>{pelicula.genero}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListDetail;

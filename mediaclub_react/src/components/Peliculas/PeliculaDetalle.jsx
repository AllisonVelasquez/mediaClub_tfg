import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDetallesFrame,
  anadirPuntuacionFrame,
} from "../../services/Frames/CRUD_Frames.js";

const PeliculaDetalles = () => {
  const { id } = useParams();
  const [detalles, setDetalles] = useState(null);
  const [miVoto, setMiVoto] = useState(null);
  const [votoEnviado, setVotoEnviado] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const data = await getDetallesFrame(id);
        if (data.status === "success") {
          setDetalles(data.contenido);
        } else {
          setError("No se pudieron cargar los detalles.");
        }
      } catch (err) {
        console.error("Error al obtener detalles:", err);
        setError("Error al cargar detalles.");
      }
    };

    fetchDetalles();

    const votoGuardado = localStorage.getItem(`voto_pelicula_${id}`);
    if (votoGuardado) {
      setMiVoto(parseFloat(votoGuardado));
      setVotoEnviado(true);
    }
  }, [id]);

  const handleVotar = async (voto) => {
    if (voto < 1 || voto > 10 || !/^\d+(\.\d)?$/.test(voto)) {
      setError("La puntuación debe estar entre 1 y 10 y tener máximo un decimal.");
      return;
    }

    try {
      setError("");
      setMiVoto(voto);
      setVotoEnviado(true);
      localStorage.setItem(`voto_pelicula_${id}`, voto);

      const response = await anadirPuntuacionFrame(id, voto);

      if (response?.promedio_actualizado) {
        setDetalles((prev) => ({
          ...prev,
          promedio_votos_muvis: response.promedio_actualizado,
        }));
      }
    } catch (error) {
      console.error("Error al enviar puntuación:", error);
      setError("Error al enviar tu voto.");
      setVotoEnviado(false);
    }
  };

  if (!detalles) return <p>Cargando detalles...</p>;

  // Formatear fecha a algo legible, ejemplo: "23/06/1994"
  const fechaFormateada = detalles.fecha_estreno
    ? new Date(detalles.fecha_estreno).toLocaleDateString("es-ES")
    : "N/A";

  // Base URL para imágenes
  const baseImgUrl = "https://image.tmdb.org/t/p/w342";

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{detalles.titulo}</h1>
      <h3 className="italic mb-4">{detalles.titulo_original}</h3>

      <img
        src={
          detalles.poster_url
            ? baseImgUrl + detalles.poster_url
            : "https://via.placeholder.com/300x450?text=Sin+imagen"
        }
        alt={detalles.titulo}
        className="mb-4 rounded-lg"
      />

      <p className="mb-4">{detalles.descripcion}</p>

      <p className="mb-1 text-lg">
        <strong>Fecha de estreno:</strong> {fechaFormateada}
      </p>
      <p className="mb-1 text-lg">
        <strong>Duración:</strong> {detalles.duracion} minutos
      </p>
      <p className="mb-1 text-lg">
        <strong>Eslogan:</strong> {detalles.eslogan || "N/A"}
      </p>

      <p className="mb-1 text-lg">
        <strong>Promedio votos Muvis:</strong>{" "}
        {detalles.promedio_votos_muvis ?? "N/A"}
      </p>
      <p className="mb-1 text-lg">
        <strong>Promedio votos TMDB:</strong>{" "}
        {detalles.promedio_votos_tmdb ?? "N/A"}
      </p>
      <p className="mb-1 text-lg">
        <strong>Presupuesto:</strong>{" "}
        {detalles.presupuesto
          ? `$${detalles.presupuesto.toLocaleString()}`
          : "N/A"}
      </p>
      <p className="mb-1 text-lg">
        <strong>Ingresos:</strong>{" "}
        {detalles.ingresos ? `$${detalles.ingresos.toLocaleString()}` : "N/A"}
      </p>

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">Géneros</h2>
        <ul className="flex flex-wrap gap-2">
          {detalles.generos.map((genero) => (
            <li
              key={genero.id}
              className="bg-gray-200 px-3 py-1 rounded text-sm"
            >
              {genero.nombre}
            </li>
          ))}
        </ul>
      </div>

      <div className="my-6">
        <h2 className="text-xl font-semibold mb-2">Actores</h2>
        <ul className="flex flex-wrap gap-4">
          {detalles.actores.map((actor) => (
            <li
              key={actor.id}
              className="w-24 flex flex-col items-center text-center"
            >
              <img
                src={
                  actor.imagen_url
                    ? baseImgUrl + actor.imagen_url
                    : "https://via.placeholder.com/100x150?text=Sin+imagen"
                }
                alt={actor.nombre}
                className="rounded mb-1"
              />
              <p className="font-semibold">{actor.nombre}</p>
              <p className="text-sm italic text-gray-600">
                {actor.pivot.personaje}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Tu puntuación</h2>

        {votoEnviado ? (
          <div className="text-green-600">
            Ya votaste: <strong>{miVoto}</strong>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const voto = parseFloat(e.target.voto.value);
              handleVotar(voto);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="number"
              name="voto"
              step="0.1"
              min="1"
              max="10"
              placeholder="Ej: 7.5"
              className="border p-2 rounded w-24"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Votar
            </button>
          </form>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default PeliculaDetalles;

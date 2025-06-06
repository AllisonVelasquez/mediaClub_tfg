import React, { useEffect, useState } from "react";
import Resena from "./Resenas";
import {
  getResenasFrame,
  getResenasUsuario,
  crearResena,
  eliminarResena
} from "../../services/Resenas/CRUD_Resenas";

const ListaResenas = ({ frameId = null, modo }) => {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [spoiler, setSpoiler] = useState(false);

  useEffect(() => {
    cargarResenas();
  }, [frameId, modo]);

  const cargarResenas = async () => {
    setLoading(true);
    try {
      let data;
      if (modo === "frame" && frameId) {
        data = await getResenasFrame(frameId);
      } else if (modo === "usuario") {
        data = await getResenasUsuario();
      }
      setResenas(data.contenido.data);
    } catch (error) {
      console.error("Error al cargar reseñas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = async () => {
    if (!nuevoContenido.trim()) return;
    if (nuevoContenido.length > 1300) {
      alert("La reseña no puede superar los 1300 caracteres.");
      return;
    }

    try {
      await crearResena({
        frame_id: frameId,
        contenido: nuevoContenido,
        spoiler: spoiler,
      });

      setNuevoContenido("");
      setSpoiler(false);
      await cargarResenas();
    } catch (error) {
      console.error("Error al crear reseña:", error);
    }
  };

  const handleEliminar = async (resena) => {
    try {
      await eliminarResena(resena.id);
      await cargarResenas();
    } catch (error) {
      console.error("Error al eliminar reseña:", error);
    }
  };

  if (loading) return <p>Cargando reseñas...</p>;

  return (
    <div>
      {(modo === "frame" || modo === "usuario") && (
        <div>
          <textarea
            value={nuevoContenido}
            onChange={(e) => setNuevoContenido(e.target.value)}
            placeholder="Escribe tu reseña"
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={spoiler}
                onChange={(e) => setSpoiler(e.target.checked)}
              />
              ¿Contiene spoilers?
            </label>
          </div>
          <button onClick={handleCrear}>Publicar reseña</button>
        </div>
      )}

      {resenas.length === 0 ? (
        <p>No hay reseñas disponibles.</p>
      ) : (
        resenas.map((resena) => (
          <Resena
            key={resena.id}
            resena={resena}
            modo={modo}
            onEliminar={modo === "usuario" ? handleEliminar : undefined}
          />
        ))
      )}
    </div>
  );
};

export default ListaResenas;

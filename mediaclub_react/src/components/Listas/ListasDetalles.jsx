// ListaDetalle.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMiListaPorId } from "../../services/Listas/CRUD_Listas"; // Asegúrate de que la ruta sea correcta

const ListaDetalle = () => {
  const { id } = useParams();
  const [lista, setLista] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const data = await getMiListaPorId(id);
        setLista(data);
      } catch (error) {
        console.error("Error al obtener detalle de la lista");
      } finally {
        setLoading(false);
      }
    };
    fetchDetalle();
  }, [id]);

  if (loading) return <p className="p-4">Cargando...</p>;
  if (!lista) return <p className="p-4">Lista no encontrada</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">{lista.nombre_lista}</h2>
      <p className="mb-2">Visibilidad: {lista.publica ? "Pública" : "Privada"}</p>
      <p className="mb-4">Frames en la lista: {lista.frames_count}</p>

      {lista.frames.length === 0 ? (
        <p>No hay frames en esta lista.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {lista.frames.map((frame) => (
            <li key={frame.id} className="border rounded p-2 shadow">
              <p className="font-medium">{frame.titulo}</p>
              {/* Puedes expandir más detalles del frame aquí */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaDetalle;

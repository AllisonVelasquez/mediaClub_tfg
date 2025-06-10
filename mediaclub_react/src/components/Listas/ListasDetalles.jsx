import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verDetallesLista } from "../../services/Usuarios/Mi/CRUD_Usuarios";

const ListaDetalle = () => {
  const { id } = useParams();
  const [lista, setLista] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      setLoading(true);
      try {
        const data = await verDetallesLista(id);
        setLista(data);  // ya es el contenido directo
        setError(null);
      } catch (error) {
        console.error("Error al obtener detalle de la lista", error);
        setError("No se pudo cargar la lista");
      } finally {
        setLoading(false);
      }
    };
    fetchDetalle();
  }, [id]);

  if (loading) return <p className="p-4">Cargando...</p>;
  if (error) return <p className="p-4" style={{ color: "red" }}>{error}</p>;
  if (!lista) return <p className="p-4">Lista no encontrada</p>;

  return (
    <div className="p-4" style="background-color: #f9f9f9; border-radius: 8px;">
      <h2 className="text-2xl font-semibold mb-2">{lista.nombre_lista}</h2>
      <p className="mb-2">Visibilidad: {lista.publica ? "Pública" : "Privada"}</p>
      <p className="mb-4">Frames en la lista: {lista.frames_count}</p>

      {(!lista.frames || lista.frames.length === 0) ? (
        <p>No hay frames en esta lista.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {lista.frames.map((frame) => (
            <li key={frame.id} className="border rounded p-2 shadow">
              <p className="font-medium">{frame.titulo}</p>
              {/* Más detalles del frame si quieres */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaDetalle;

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
        setLista(data); // Ya es el contenido directo
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
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (!lista) return <p className="p-4">Lista no encontrada</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-3">{lista.nombre_lista}</h2>
      <p className="text-gray-700 mb-1">
        <strong>Visibilidad:</strong> {lista.publica ? "Pública" : "Privada"}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Frames en la lista:</strong> {lista.frames_count}
      </p>

      {(!lista.frames || lista.frames.length === 0) ? (
        <p className="text-gray-500">No hay frames en esta lista.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lista.frames.map((frame) => (
            <li key={frame.id} className="bg-white border rounded p-3 shadow hover:shadow-lg transition">
              <p className="font-semibold">{frame.titulo}</p>
              {/* Aquí puedes agregar más detalles del frame si los tienes */}
              {/* <p className="text-sm text-gray-500">{frame.descripcion}</p> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaDetalle;

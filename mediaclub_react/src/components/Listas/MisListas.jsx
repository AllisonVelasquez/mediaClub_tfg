import React, { useEffect, useState } from "react";
import { obtenerMisListas } from "../../services/Usuarios/Mi/CRUD_Usuarios";
import { Link } from "react-router-dom";

const MisListas = () => {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListas = async () => {
      setLoading(true);
      setError(null);
      try {
        const contenido = await obtenerMisListas(); // ya retorna contenido directo
        setListas(Array.isArray(contenido) ? contenido : []);
      } catch (error) {
        console.error("Error cargando listas", error);
        setError("No se pudieron cargar las listas.");
        setListas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchListas();
  }, []);

  if (loading) return <div className="p-4">Cargando listas...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (listas.length === 0) return <div className="p-4">No tienes listas disponibles.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Listas</h1>
      <ul className="space-y-3">
        {listas.map((lista) => (
          <li key={lista.id} className="border p-3 rounded shadow-md">
            <Link
              to={`/listas/${lista.id}`}
              className="text-blue-600 hover:underline"
            >
              {lista.nombre_lista} ({lista.publica ? "Pública" : "Privada"})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisListas;

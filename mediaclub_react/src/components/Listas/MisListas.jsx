// MisListas.jsx
import React, { useEffect, useState } from "react";
import { getMisListas } from "../../services/Listas/CRUD_Listas";
import { Link } from "react-router-dom";

const MisListas = () => {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    const fetchListas = async () => {
      try {
        const data = await getMisListas();
        setListas(data.contenido);
      } catch (error) {
        console.error("Error cargando listas");
      }
    };
    fetchListas();
  }, []);

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

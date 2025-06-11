import React, { useEffect, useState } from "react";
import { obtenerMisListas } from "../../services/Usuarios/Mi/CRUD_Usuarios";

const MisListas = ({ seleccionable = false, onSeleccionarLista }) => {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [ultimaPagina, setUltimaPagina] = useState(1);
  const [listasSeleccionadas, setListasSeleccionadas] = useState([]);

  useEffect(() => {
    const fetchListas = async () => {
      setLoading(true);
      setError(null);
      try {
        const contenido = await obtenerMisListas(paginaActual);
        setListas(Array.isArray(contenido.data) ? contenido.data : []);
        setUltimaPagina(contenido.last_page || 1);
      } catch (error) {
        console.error("Error cargando listas", error);
        setError("No se pudieron cargar las listas.");
        setListas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchListas();
  }, [paginaActual]);

  const handlePaginaCambio = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= ultimaPagina) {
      setPaginaActual(nuevaPagina);
    }
  };

  const handleCheckboxChange = (listaId) => {
    let nuevasSeleccionadas;
    if (listasSeleccionadas.includes(listaId)) {
      // Desmarcar
      nuevasSeleccionadas = listasSeleccionadas.filter((id) => id !== listaId);
    } else {
      // Marcar
      nuevasSeleccionadas = [...listasSeleccionadas, listaId];
    }
    setListasSeleccionadas(nuevasSeleccionadas);
    if (onSeleccionarLista) {
      onSeleccionarLista(nuevasSeleccionadas);
    }
  };

  if (loading) return <div className="p-4">Cargando listas...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (listas.length === 0) return <div className="p-4">No tienes listas disponibles.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Listas</h1>
      <div className="flex flex-wrap gap-2">
        {listas.map((lista) =>
          seleccionable ? (
            <label key={lista.id} className="flex items-center space-x-2 px-4 py-2 rounded border cursor-pointer select-none
              bg-white text-black border-gray-300 hover:bg-gray-100">
              <input
                type="checkbox"
                checked={listasSeleccionadas.includes(lista.id)}
                onChange={() => handleCheckboxChange(lista.id)}
              />
              <span>{lista.nombre_lista}</span>
            </label>
          ) : (
            <p key={lista.id} className="mb-2">{lista.nombre_lista}</p>
          )
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePaginaCambio(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-4 py-2">
          Página {paginaActual} de {ultimaPagina}
        </span>
        <button
          onClick={() => handlePaginaCambio(paginaActual + 1)}
          disabled={paginaActual === ultimaPagina}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MisListas;

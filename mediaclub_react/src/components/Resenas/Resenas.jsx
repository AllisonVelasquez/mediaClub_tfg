import React, { useEffect, useState } from 'react';
import { getReseñas, eliminarReseña } from '../../services/Reseñas/CRUD_Reseñas'; // Ajusta esta ruta si es distinta
import "./Resenas.css";

const Resena = ({ peliculaId }) => {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ visible: false, resenaId: null });

  const cargarResenas = async () => {
    try {
      const todasLasResenas = await getReseñas();
      const filtradas = todasLasResenas.filter(resena => resena.frame_id === peliculaId);
      setResenas(filtradas);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    try {
      await eliminarReseña(modal.resenaId);
      setResenas(prev => prev.filter(resena => resena.resena_id !== modal.resenaId));
      cerrarModal();
    } catch (error) {
      console.error('Error al eliminar reseña:', error);
    }
  };

  const confirmarEliminar = (id) => {
    setModal({ visible: true, resenaId: id });
  };

  const cerrarModal = () => {
    setModal({ visible: false, resenaId: null });
  };

  useEffect(() => {
    cargarResenas();
  }, [peliculaId]);

  if (loading) return <p>Cargando reseñas...</p>;

  return (
    <div className="resenas-container">
      <h2>Reseñas de la película</h2>

      {resenas.length === 0 ? (
        <p>No hay reseñas para esta película.</p>
      ) : (
       <ul className="resenas-list">
  {resenas.map(resena => (
    <li key={resena.resena_id} className="resena-item">
      <button className="btn-eliminar" onClick={() => confirmarEliminar(resena.resena_id)}>
        Eliminar
      </button>

      <p className="resena-contenido">{resena.contenido}</p>

      <span className="resena-fecha">
        {new Date(resena.fecha).toLocaleDateString()}
      </span>
    </li>
  ))}
</ul>

      )}

      {modal.visible && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Estás seguro de que quieres eliminar esta reseña?</p>
            <div className="modal-buttons">
              <button className="confirm" onClick={handleEliminar}>Sí, eliminar</button>
              <button className="cancel" onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resena;

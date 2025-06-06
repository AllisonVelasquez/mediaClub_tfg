import React, { useEffect, useState } from 'react';
import { getResenasByFrame, eliminarResena } from '../../services/Reseñas/CRUD_Reseñas';
import CrearResena from './CrearResena';
import "./Resenas.css";

const Resena = ({ peliculaId }) => {
  const [resenas, setResenas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ visible: false, resenaId: null });

  const cargarResenas = async () => {
    setLoading(true);
    try {
      const data = await getResenasByFrame(peliculaId);
      setResenas(data || []);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    try {
      await eliminarResena(modal.resenaId);
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
      <CrearResena frameId={peliculaId} onResenaCreada={cargarResenas} />
      {resenas.length === 0 ? (
        <p>No hay reseñas para esta película.</p>
      ) : (
        <ul className="resenas-list">
          {resenas.map(resena => (
            <li key={resena.resena_id} className="resena-item">
              <button className="btn-eliminar" onClick={() => confirmarEliminar(resena.resena_id)}>
                Eliminar
              </button>
              <div>
                <strong>{resena.usuario_nombre || "Usuario"}</strong> - {new Date(resena.fecha).toLocaleDateString()}
                {resena.spoiler && <span style={{ color: "red", marginLeft: 8 }}>[Spoiler]</span>}
              </div>
              <p className="resena-contenido">{resena.contenido}</p>
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

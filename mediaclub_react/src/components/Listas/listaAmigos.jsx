import React, { useEffect, useState } from "react";
import "./listaAmigos.css";
import {
  obtenerMisAmigos,
  getFriendRequestsReceived,
  getFriendRequestsSent,
  enviarSolicitudAmistad,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  eliminarAmigo,
} from "../../services/Usuarios/Mi/CRUD_Usuarios";

const ListaAmigos = ({ mi = false, userId }) => {
  const [amigos, setAmigos] = useState([]);
  const [solicitudesEnviadas, setSolicitudesEnviadas] = useState([]);
  const [solicitudesRecibidas, setSolicitudesRecibidas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const resAmigos = await obtenerMisAmigos();
        setAmigos(resAmigos.contenido || []);

        if (mi) {
          const resEnviadas = await getFriendRequestsSent();
          setSolicitudesEnviadas(resEnviadas.contenido || []);
          const resRecibidas = await getFriendRequestsReceived();
          setSolicitudesRecibidas(resRecibidas.contenido || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [mi]);

  const handleEnviar = async (id) => {
    await enviarSolicitudAmistad(id);
    setAmigos(amigos.map(a => a.id === id ? { ...a, solicitud_enviada: true } : a));
    setSolicitudesEnviadas(prev => [...prev, amigos.find(a => a.id === id)]);
  };

  const handleCancelarEnviado = async (id) => {
    await cancelFriendRequest(id);
    setAmigos(amigos.map(a => a.id === id ? { ...a, solicitud_enviada: false } : a));
    setSolicitudesEnviadas(prev => prev.filter(s => s.id !== id));
  };

  const handleEliminar = async (id) => {
    await eliminarAmigo(id);
    setAmigos(prev => prev.filter(a => a.id !== id));
  };

  const handleAceptar = async (id) => {
    await acceptFriendRequest(id);
    setSolicitudesRecibidas(prev => prev.filter(s => s.id !== id));
    setAmigos(prev => [...prev, solicitudesRecibidas.find(s => s.id === id)]);
  };

  const handleRechazar = async (id) => {
    await rejectFriendRequest(id);
    setSolicitudesRecibidas(prev => prev.filter(s => s.id !== id));
  };

  if (loading) return <p>Cargando amigos...</p>;

  return (
    <div className="lista-amigos">
      <h3>{mi ? "Mis Amigos" : "Amigos del Usuario"}</h3>
      <div className="amigos-grid">
        {amigos.map((a) => (
          <div key={a.id} className="amigo-card">
            <img src={a.foto_perfil || "/images/perfiles/default.png"} alt={a.alias} />
            <div className="amigo-nombre">{a.alias}</div>
            {mi ? (
              <button onClick={() => handleEliminar(a.id)}>Eliminar amigo</button>
            ) : a.solicitud_enviada ? (
              <button onClick={() => handleCancelarEnviado(a.id)}>Cancelar solicitud</button>
            ) : (
              <button onClick={() => handleEnviar(a.id)}>Solicitar amistad</button>
            )}
          </div>
        ))}
      </div>

      {mi && (
        <>
          <h4>Solicitudes recibidas</h4>
          <ul className="solicitudes-list">
            {solicitudesRecibidas.map((s) => (
              <li key={s.id}>
                {s.alias}
                <button onClick={() => handleAceptar(s.id)}>Aceptar</button>
                <button onClick={() => handleRechazar(s.id)}>Rechazar</button>
              </li>
            ))}
          </ul>

          <h4>Solicitudes enviadas</h4>
          <ul className="solicitudes-list">
            {solicitudesEnviadas.map((s) => (
              <li key={s.id}>
                {s.alias}
                <button onClick={() => handleCancelarEnviado(s.id)}>Cancelar</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ListaAmigos;
 
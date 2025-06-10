import React, { useEffect, useState } from "react";
import {
  obtenerMisAmigos,
  eliminarAmigo,
  getFriendRequestsSent,
  cancelFriendRequest, // Cancela solicitud enviada (desde CRUD mi_usuarioso)
} from "../../services/Usuarios/Mi/CRUD_Usuarios";

import {
  getUserFriends,
  sendFriendRequest,
} from "../../services/Usuarios/CRUD_Usuarios"; // Obtiene amigos de otro usuario

const ListaAmigos = ({ mi = false, usuarioId }) => {
  const [amigos, setAmigos] = useState([]);
  const [solicitudesEnviadas, setSolicitudesEnviadas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarAmigos();
    if (!mi) {
      cargarSolicitudesEnviadas();
    }
  }, [mi, usuarioId]);

  const cargarAmigos = async () => {
    setLoading(true);
    try {
      if (mi) {
        // Amigos propios
        const data = await obtenerMisAmigos();
        setAmigos(data);
      } else {
        // Amigos de otro usuario
        const data = await getUserFriends(usuarioId);
        setAmigos(data);
      }
    } catch (error) {
      console.error("Error al cargar amigos:", error);
      setAmigos([]);
    } finally {
      setLoading(false);
    }
  };

  const cargarSolicitudesEnviadas = async () => {
    try {
      const data = await getFriendRequestsSent();
      setSolicitudesEnviadas(data);
    } catch (error) {
      console.error("Error al cargar solicitudes enviadas:", error);
      setSolicitudesEnviadas([]);
    }
  };

  const handleEliminarAmigo = async (amigoId) => {
    if (!window.confirm("¿Seguro que deseas eliminar a este amigo?")) return;
    try {
      await eliminarAmigo(amigoId);
      await cargarAmigos();
    } catch (error) {
      console.error("Error al eliminar amigo:", error);
    }
  };

  const handleSolicitarAmistad = async (usuarioId) => {
    try {
      await sendFriendRequest(usuarioId);
      await cargarSolicitudesEnviadas();
    } catch (error) {
      console.error("Error al solicitar amistad:", error);
    }
  };

  const handleCancelarSolicitud = async (usuarioId) => {
    try {
      await cancelFriendRequest(usuarioId);
      await cargarSolicitudesEnviadas();
    } catch (error) {
      console.error("Error al cancelar solicitud:", error);
    }
  };

  if (loading) return <p>Cargando amigos...</p>;

  if (amigos.length === 0) return <p>No hay amigos para mostrar.</p>;

  return (
    <div>
      <h3>{mi ? "Mis Amigos" : "Amigos del Usuario"}</h3>
      <ul>
        {amigos.map((amigo) => {
          const solicitudEnviada = solicitudesEnviadas.some(
            (s) => s.id === amigo.id
          );

          return (
            <li key={amigo.id} style={{ marginBottom: "1rem" }}>
              <span>{amigo.nombre || amigo.username || amigo.email}</span>
              {mi ? (
                <button
                  onClick={() => handleEliminarAmigo(amigo.id)}
                  style={{ marginLeft: "1rem" }}
                >
                  Cancelar amistad
                </button>
              ) : solicitudEnviada ? (
                <button
                  onClick={() => handleCancelarSolicitud(amigo.id)}
                  style={{ marginLeft: "1rem" }}
                >
                  Cancelar solicitud
                </button>
              ) : (
                <button
                  onClick={() => handleSolicitarAmistad(amigo.id)}
                  style={{ marginLeft: "1rem" }}
                >
                  Solicitar amistad
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListaAmigos;

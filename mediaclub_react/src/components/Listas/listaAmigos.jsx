import React, { useEffect, useState } from "react";
import "./listaAmigos.css"; // ✅ Importa tu archivo CSS

import {
  obtenerMisAmigos,
  eliminarAmigo,
  getFriendRequestsSent,
  cancelFriendRequest,
  enviarSolicitudAmistad,
} from "../../services/Usuarios/Mi/CRUD_Usuarios";

import { getUserFriends } from "../../services/Usuarios/Usuarios/CRUD_Usuarios";

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
      const data = mi ? await obtenerMisAmigos() : await getUserFriends(usuarioId);
      setAmigos(data.contenido || []);
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
      await enviarSolicitudAmistad(usuarioId);
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
      <div className="lista-amigos-container">
        {amigos.map((amigo) => {
          const solicitudEnviada = solicitudesEnviadas.some((s) => s.id === amigo.id);

          return (
            <div key={amigo.id} className="amigo-card">
              <img
                src={amigo.foto_perfil || "/images/perfiles/default.png"}
                alt={amigo.alias || amigo.username}
              />
              <h4 className="amigo-nombre">
                {amigo.alias || amigo.nombre || amigo.username || amigo.email}
              </h4>

              {mi ? (
                <button onClick={() => handleEliminarAmigo(amigo.id)}>
                  Cancelar amistad
                </button>
              ) : solicitudEnviada ? (
                <button onClick={() => handleCancelarSolicitud(amigo.id)}>
                  Cancelar solicitud
                </button>
              ) : (
                <button onClick={() => handleSolicitarAmistad(amigo.id)}>
                  Solicitar amistad
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListaAmigos;

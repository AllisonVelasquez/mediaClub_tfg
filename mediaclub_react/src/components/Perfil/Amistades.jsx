import React, { useEffect, useState } from "react";
import {
  getFriendRequestsReceived,
  getFriendRequestsSent,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
} from "../../services/Usuarios/Mi/CRUD_Usuarios";

const Amistades = () => {
  const [solicitudesRecibidas, setSolicitudesRecibidas] = useState([]);
  const [solicitudesEnviadas, setSolicitudesEnviadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar solicitudes
  const cargarSolicitudes = async () => {
    setLoading(true);
    try {
      const recibidas = await getFriendRequestsReceived();
      const enviadas = await getFriendRequestsSent();

      // Aseguramos que recibimos arrays (ajusta 'contenido' si tu API usa otro campo)
      setSolicitudesRecibidas(Array.isArray(recibidas.contenido) ? recibidas.contenido : []);
      setSolicitudesEnviadas(Array.isArray(enviadas.contenido) ? enviadas.contenido : []);

      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const manejarAceptar = async (usuarioId) => {
    try {
      await acceptFriendRequest(usuarioId);
      cargarSolicitudes();
    } catch (err) {
      alert("Error al aceptar la solicitud");
    }
  };

  const manejarRechazar = async (usuarioId) => {
    try {
      await rejectFriendRequest(usuarioId);
      cargarSolicitudes();
    } catch (err) {
      alert("Error al rechazar la solicitud");
    }
  };

  const manejarCancelar = async (usuarioId) => {
    try {
      await cancelFriendRequest(usuarioId);
      cargarSolicitudes();
    } catch (err) {
      alert("Error al cancelar la solicitud");
    }
  };

  if (loading) return <div>Cargando solicitudes...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>Solicitudes de amistad recibidas</h2>
      {solicitudesRecibidas.length === 0 ? (
        <p>No tienes solicitudes de amistad pendientes.</p>
      ) : (
        <ul>
          {solicitudesRecibidas.map(({ id, alias }) => (
            <li key={id}>
              {alias}{" "}
              <button onClick={() => manejarAceptar(id)}>Aceptar</button>{" "}
              <button onClick={() => manejarRechazar(id)}>Rechazar</button>
            </li>
          ))}
        </ul>
      )}

      <h2>Solicitudes de amistad enviadas</h2>
      {solicitudesEnviadas.length === 0 ? (
        <p>No has enviado solicitudes pendientes.</p>
      ) : (
        <ul>
          {solicitudesEnviadas.map(({ id, alias }) => (
            <li key={id}>
              {alias}{" "}
              <button onClick={() => manejarCancelar(id)}>Cancelar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Amistades;

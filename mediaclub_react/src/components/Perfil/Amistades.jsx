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
        <ul style={{ listStyle: "none", padding: 0 }}>
          {solicitudesRecibidas.map((solicitud, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <img
                src={solicitud.foto_perfil || "/images/perfiles/default.png"}
                alt={`Foto de ${solicitud.alias}`}
                style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                onError={(e) => (e.target.src = "/images/perfiles/default.png")}
              />
              <span>{solicitud.alias}</span>
              <button onClick={() => manejarAceptar(solicitud.remitente_id)}>Aceptar</button>
              <button onClick={() => manejarRechazar(solicitud.remitente_id)}>Rechazar</button>
            </li>
          ))}
        </ul>
      )}

      <h2>Solicitudes de amistad enviadas</h2>
      {solicitudesEnviadas.length === 0 ? (
        <p>No has enviado solicitudes pendientes.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {solicitudesEnviadas.map((solicitud, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <img
                src={solicitud.foto_perfil || "/images/perfiles/default.png"}
                alt={`Foto de ${solicitud.alias}`}
                style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                onError={(e) => (e.target.src = "/images/perfiles/default.png")}
              />
              <span>{solicitud.alias}</span>
              <button onClick={() => manejarCancelar(solicitud.remitente_id)}>Cancelar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Amistades;

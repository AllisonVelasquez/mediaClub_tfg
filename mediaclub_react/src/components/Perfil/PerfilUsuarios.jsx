import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  obtenerPerfilUsuario,
  obtenerListasPublicas,
  obtenerAmigosUsuario,
  obtenerActividadUsuario,
} from "../../services/Usuarios/CRUD_Usuarios";
import ListaPosts from "../Posts/ListaPosts";
import "./perfil.css";

const PerfilUsuario = () => {
  const { userId } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [listas, setListas] = useState([]);
  const [amigos, setAmigos] = useState([]);
  const [actividad, setActividad] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perfilRes = await obtenerPerfilUsuario(userId);
        setUsuario(perfilRes.contenido);

        const listasRes = await obtenerListasPublicas(userId);
        setListas(listasRes.contenido || []);

        const amigosRes = await obtenerAmigosUsuario(userId);
        setAmigos(amigosRes.contenido || []);

        const actividadRes = await obtenerActividadUsuario(userId);
        setActividad(actividadRes.contenido || []);
      } catch (error) {
        console.error("Error al cargar perfil de usuario:", error);
      }
    };
    fetchData();
  }, [userId]);

  if (!usuario) return <div>Cargando perfil...</div>;

  // Parsear redes
  let redesArray = [];
  try {
    redesArray = usuario.redes ? JSON.parse(usuario.redes) : [];
  } catch (e) {
    console.error("Error al parsear redes sociales:", e);
  }

  const urlBasePorRed = {
    Facebook: "https://facebook.com/",
    Twitter: "https://twitter.com/",
    Instagram: "https://instagram.com/",
    YouTube: "https://youtube.com/",
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-photo">
          <img
            src={usuario.foto_perfil || "/images/perfiles/default.png"}
            alt={usuario.alias}
            className="photo-img"
          />
        </div>

        <div className="profile-info">
          <div className="profile-username">{usuario.alias}</div>
          <div className="profile-bio">{usuario.bio || "Sin biografía"}</div>
          <div className="profile-creation-date">
            <small>
              Miembro desde:{" "}
              {new Date(usuario.created_at).toLocaleDateString()}
            </small>
          </div>

          {redesArray.length > 0 && (
            <div className="profile-redes">
              <h4>Redes Sociales:</h4>
              <ul>
                {redesArray.map(({ nombre, url }, i) => {
                  const link = (urlBasePorRed[nombre] || "") + url;
                  return (
                    <li key={i}>
                      <strong>{nombre}: </strong>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h2>Listas Públicas</h2>
        {listas.length > 0 ? (
          <ul>
            {listas.map((lista) => (
              <li key={lista.id}>{lista.nombre}</li>
            ))}
          </ul>
        ) : (
          <p>No hay listas públicas.</p>
        )}
      </div>

      <div className="profile-section">
        <h2>Amigos</h2>
        {amigos.length > 0 ? (
          <ul>
            {amigos.map((amigo) => (
              <li key={amigo.id}>{amigo.alias}</li>
            ))}
          </ul>
        ) : (
          <p>No tiene amigos visibles.</p>
        )}
      </div>

      <div className="profile-section">
        <h2>Posts</h2>
        <ListaPosts modo="perfilUsuario" usuarioId={userId} mostrarFormulario={false} />
      </div>

      <div className="profile-section">
        <h2>Actividad Reciente</h2>
        {actividad.length > 0 ? (
          <ul>
            {actividad.map((item, index) => (
              <li key={index}>{item.descripcion}</li>
            ))}
          </ul>
        ) : (
          <p>Sin actividad reciente.</p>
        )}
      </div>
    </div>
  );
};

export default PerfilUsuario;

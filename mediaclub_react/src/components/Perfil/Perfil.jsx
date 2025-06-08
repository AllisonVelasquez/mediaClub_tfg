import React, { useState, useEffect, useContext } from "react";
import { obtenerMiPerfil, eliminarMiCuenta } from "../../services/Usuarios/CRUD_Usuarios";
import EditarPerfil from "./EditarPerfil";
import ListaResenas from "../Resenas/ListaResenas";
import ListaPosts from "../Posts/ListaPosts";
import { AuthContext } from "../LogIn/AuthContext";
import "./perfil.css";

const Perfil = () => {
  const [profile, setProfile] = useState(null);
  const [editando, setEditando] = useState(false);
  const { logOut } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await obtenerMiPerfil();
        setProfile(user);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Cargando...</div>;
  }

  // Parsear redes (string JSON)
  let redesArray = [];
  try {
    redesArray = profile.redes ? JSON.parse(profile.redes) : [];
  } catch (error) {
    console.error("Error al parsear redes:", error);
  }

  const urlBasePorRed = {
    Facebook: "https://facebook.com/",
    Twitter: "https://twitter.com/",
    Instagram: "https://instagram.com/",
    YouTube: "https://youtube.com/",
  };

  const handleEditarClick = () => setEditando(true);
  const handleCancelar = () => setEditando(false);

  const handleGuardar = async () => {
    try {
      const user = await obtenerMiPerfil();
      setProfile(user);
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
    }
    setEditando(false);
  };

  const handleEliminarCuenta = async () => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible.")) return;

    const contrasena = window.prompt("Por favor, confirma tu contraseña para eliminar la cuenta:");
    if (!contrasena) {
      alert("Debes ingresar tu contraseña.");
      return;
    }

    try {
      await eliminarMiCuenta({ login_id: profile.login_id, contrasena });
      alert("Cuenta eliminada correctamente.");
      logOut();
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      alert("No se pudo eliminar la cuenta. Verifica tu contraseña e intenta de nuevo.");
    }
  };

  if (editando) {
    return <EditarPerfil datos={profile} onCancel={handleCancelar} onSave={handleGuardar} />;
  }

  const userId = profile.id;

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-photo">
          <img
            src={profile.foto_perfil || "/images/perfiles/default.png"}
            alt={profile.alias || "Foto de perfil"}
            className="photo-img"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>

        <div className="profile-info">
          <div className="profile-username">{profile.alias || "Sin alias"}</div>
          <div className="profile-bio">{profile.bio || "Sin biografía"}</div>
          <div className="profile-creation-date">
            <small>
              Miembro desde:{" "}
              {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : "Fecha no disponible"}
            </small>
          </div>

          <div className="profile-redes">
            <h4>Redes Sociales:</h4>
            {redesArray.length > 0 ? (
              <ul>
                {redesArray.map(({ nombre, url }, index) => {
                  const base = urlBasePorRed[nombre] || "";
                  const link = base + url;
                  return (
                    <li key={index}>
                      <strong>{nombre}:</strong>{" "}
                      {url ? (
                        <a href={link} target="_blank" rel="noopener noreferrer">
                          {link}
                        </a>
                      ) : (
                        "No disponible"
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>No hay redes sociales registradas.</p>
            )}
          </div>
        </div>

        <div className="profile-actions">
          <button className="icon-btn" title="Editar perfil" onClick={handleEditarClick}>
            <span role="img" aria-label="editar">
              Editar Datos ⚙️
            </span>
          </button>
        </div>
      </div>

      <button
        className="btn-eliminar-cuenta"
        onClick={handleEliminarCuenta}
        style={{ backgroundColor: "red", color: "white", marginTop: "20px" }}
      >
        Eliminar mi cuenta
      </button>

      <div className="profile-resenas">
        <h2>Mis Reseñas</h2>
        <ListaResenas modo="usuario" mostrarFormulario={false} />
      </div>

      <div className="profile-posts">
        <h2>Mis Posts</h2>
        <ListaPosts modo="usuario" mostrarFormulario={true} currentUserId={userId} />
      </div>
    </div>
  );
};

export default Perfil;

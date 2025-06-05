import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerMiPerfil } from "../../services/Usuarios/CRUD_Usuarios";
import "./perfil.css";

const Perfil = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await obtenerMiPerfil(userId);
        setProfile(user);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchProfile();
    setLoggedUserId(userId);
  }, [userId]);

  if (!profile) {
    return <div>Cargando...</div>;
  }

  const isOwner = String(loggedUserId) === String(userId);
  const redes = profile.redes || {};

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-photo">
          <img
            src={profile.foto_perfil}
            alt={`${profile.alias}`}
            className="photo-img"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>

        <div className="profile-info">
          <div className="profile-username">{profile.alias}</div>
          {isOwner && (
            <>
              <div className="profile-userid">{profile.login_id}</div>
              <div className="profile-bio">{profile.bio}</div>
              <div className="profile-creation-date">
                <small>
                  Miembro desde:{" "}
                  {new Date(profile.fecha_creacion).toLocaleDateString()}
                </small>
              </div>
            </>
          )}
        </div>

        {isOwner && (
          <div className="profile-actions">
            <button className="icon-btn" title="Configuración">
              <span role="img" aria-label="configuración">
                Editar Datos ⚙️
              </span>
            </button>
          </div>
        )}
      </div>

      {isOwner && (
        <div className="profile-socials">
          <h3>Redes Sociales</h3>
          <div className="social-links">
            {redes.facebook && (
              <a
                href={redes.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link fb"
              >
                Facebook
              </a>
            )}
            {redes.twitter && (
              <a
                href={redes.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link twitter"
              >
                Twitter
              </a>
            )}
            {redes.instagram && (
              <a
                href={redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link insta"
              >
                Instagram
              </a>
            )}
            {(redes.youtube || redes.youtube_url) && (
              <a
                href={redes.youtube || redes.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link youtube"
              >
                YouTube
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;

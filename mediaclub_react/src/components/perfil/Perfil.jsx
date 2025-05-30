import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importamos useParams
import { getUsuario } from "../../services/Usuarios/CRUD_Usuarios";
import "./perfil.css";

const Profile = () => {
  const { userId } = useParams(); // Extraemos userId de los parámetros de la URL
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUsuario(userId); // Obtener el usuario por su ID desde la URL
        setProfile(user); // Establecer el usuario en el estado
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchProfile();
  }, [userId]); // Ejecutar solo si cambia el userId

  if (!profile) {
    return <div>Cargando...</div>; // Muestra un mensaje mientras se carga el perfil
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-photo">
          <img
            src={profile.foto_perfil}
            alt={`${profile.alias}'s Foto de Perfil`}
            className="photo-img"
          />
        </div>
        <div className="profile-info">
          <div className="profile-username">{profile.alias}</div>
          <div className="profile-userid">@{profile.login_id}</div>
          <div className="profile-bio">{profile.bio}</div>
          <div className="profile-creation-date">
            <small>Miembro desde: {new Date(profile.fecha_creacion).toLocaleDateString()}</small>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="new-review-btn">
          <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>+</span> Nueva reseña
        </button>
        <button className="icon-btn" title="Compartir">
          <span role="img" aria-label="compartir">🔗</span>
        </button>
        <button className="icon-btn" title="Configuración">
          <span role="img" aria-label="configuración">⚙️</span>
        </button>
      </div>

      <div className="profile-socials">
        <h3>Redes Sociales</h3>
        <div className="social-links">
          {profile.redes.facebook && (
            <a href={profile.redes.facebook} target="_blank" rel="noopener noreferrer" className="social-link fb">
              Facebook
            </a>
          )}
          {profile.redes.twitter && (
            <a href={profile.redes.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
              Twitter
            </a>
          )}
          {profile.redes.instagram && (
            <a href={profile.redes.instagram} target="_blank" rel="noopener noreferrer" className="social-link insta">
              Instagram
            </a>
          )}
          {profile.redes.youtube && (
            <a href={profile.redes.youtube} target="_blank" rel="noopener noreferrer" className="social-link youtube">
              YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

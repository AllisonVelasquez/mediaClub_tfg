import { useState, useEffect } from "react";
import { getUsuarios } from "../../services/axios";
import "./perfil.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUsuarios();
        const usuarios = Array.isArray(response.data)
          ? response.data[0]?.data?.usuarios
          : response.data?.usuarios;
        if (usuarios && usuarios.length > 0) {
          setProfile(usuarios[0]);
        }
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-photo">
        <img
          src={profile.foto_perfil}
          alt={`${profile.alias}'s Foto de Perfil`}
        />
      </div>
      <div className="profile-card">
        <div className="profile-username">{profile.alias}</div>
        <div className="profile-userid">@{profile.login_id}</div>
        <div className="profile-actions">
          <button>
            <span style={{ fontWeight: "bold", fontSize: "1.1em" }}>+</span> Nueva reseña
          </button>
          <button className="icon-btn" title="Compartir">
            <span role="img" aria-label="compartir">enlace</span>
          </button>
          <button className="icon-btn" title="Configuración">
            <span role="img" aria-label="configuración">config</span>
          </button>
        </div>
        <div className="profile-bio">
          {profile.bio}
        </div>
      </div>
    </div>
  );
};

export default Profile;
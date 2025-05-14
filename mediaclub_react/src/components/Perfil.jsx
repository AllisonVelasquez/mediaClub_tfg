import { useState, useEffect } from "react";
import { getUsuarios } from "../services/axios";


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
      <h1>Perfil de {profile.alias}</h1>
      <div className="profile-info">
        <div className="profile-photo">
          <img
            src={profile.foto_perfil}
            alt={`${profile.alias}'s Foto de Perfil`}
          />
        </div>
        <div className="profile-details">
          <p>
            <strong>ID de Usuario:</strong> {profile.usuario_id}
          </p>
          <p>
            <strong>Login ID:</strong> {profile.login_id}
          </p>
          <p>
            <strong>Correo:</strong> {profile.correo}
          </p>
          <p>
            <strong>Alias:</strong> {profile.alias}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>

          <h3>Redes Sociales:</h3>
          <ul>
            <li>
              <a
                href={profile.redes.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={profile.redes.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href={profile.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={profile.redes.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            </li>
          </ul>

          <p>
            <strong>Fecha de Creación:</strong>{" "}
            {new Date(profile.fecha_creacion).toLocaleDateString()}
          </p>
          <p>
            <strong>Última Actualización:</strong>{" "}
            {new Date(profile.fecha_ultima_actualizacion).toLocaleDateString()}
          </p>
          <p>
            <strong>Confirmado:</strong> {profile.confirmado ? "Sí" : "No"}
          </p>
          <p>
            <strong>Bloqueado:</strong> {profile.bloqueado ? "Sí" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

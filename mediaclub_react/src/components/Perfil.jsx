import { useState, useEffect } from 'react';

const exampleProfile = {
  usuario_id: 123,
  login_id: 'user123',
  correo: 'usuario@example.com',
  contrasena_hash: 'hashdelacontraseña12345',
  alias: 'Usuario Alias',
  bio: 'Soy un desarrollador web apasionado por React y Laravel.',
  redes: {
    facebook: 'https://facebook.com/usuario',
    twitter: 'https://twitter.com/usuario',
    instagram: 'https://instagram.com/usuario',
    youtube: 'https://youtube.com/c/usuario',
  },
  fecha_creacion: '2021-01-01T10:00:00Z',
  fecha_ultima_actualizacion: '2023-05-09T10:00:00Z',
  confirmado: true,
  foto_perfil: '/images/default.webp',
  bloqueado: false,
};

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Aquí deberías hacer una solicitud a tu API para obtener el perfil
    // Por ahora, usamos los datos de ejemplo
    setProfile(exampleProfile);
  }, []);

  if (!profile) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="profile">
      <h1>Perfil de {profile.alias}</h1>
      <div className="profile-info">
        <div className="profile-photo">
          <img src={profile.foto_perfil} alt={`${profile.alias}'s Foto de Perfil`} />
        </div>
        <div className="profile-details">
          <p><strong>ID de Usuario:</strong> {profile.usuario_id}</p>
          <p><strong>Login ID:</strong> {profile.login_id}</p>
          <p><strong>Correo:</strong> {profile.correo}</p>
          <p><strong>Alias:</strong> {profile.alias}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>

          <h3>Redes Sociales:</h3>
          <ul>
            <li><a href={profile.redes.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href={profile.redes.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href={profile.redes.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={profile.redes.youtube} target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>

          <p><strong>Fecha de Creación:</strong> {new Date(profile.fecha_creacion).toLocaleDateString()}</p>
          <p><strong>Última Actualización:</strong> {new Date(profile.fecha_ultima_actualizacion).toLocaleDateString()}</p>
          <p><strong>Confirmado:</strong> {profile.confirmado ? 'Sí' : 'No'}</p>
          <p><strong>Bloqueado:</strong> {profile.bloqueado ? 'Sí' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { obtenerMiPerfil } from "../../services/Usuarios/Mi/CRUD_Usuarios";
import MisListas from "../Listas/MisListas";
import ListaResenas from "../Resenas/ListaResenas";
import ListaPosts from "../Posts/ListaPosts";
import ListaAmigos from "../Listas/listaAmigos";
import EditarPerfil from "./EditarPerfil"; // Asegúrate de que la ruta sea correcta
import "./perfil.css";

const Perfil = () => {
  const [profile, setProfile] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const load = async () => {
      const p = await obtenerMiPerfil();
      setProfile(p);
    };
    load();
  }, []);

  const handleEditarClick = () => setEditando(true);
  const handleCancelar = () => setEditando(false);

  const handleGuardar = async () => {
    // Refresca el perfil actualizado
    const p = await obtenerMiPerfil();
    setProfile(p);
    setEditando(false);
  };

  if (!profile) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-page">
      {editando ? (
        <EditarPerfil datos={profile} onCancel={handleCancelar} onSave={handleGuardar} />
      ) : (
        <>
          <div className="profile-header">
            <img src={profile.foto_perfil} alt={profile.alias} />
            <div className="profile-info">
              <h2>{profile.alias}</h2>
              <p>{profile.bio}</p>
              <p>
                <strong>Correo:</strong> {profile.correo}
              </p>
<p>
  <strong>Redes Sociales:</strong><br />
  {JSON.parse(profile.redes).map((red) => {
    let urlBase = "";

    switch (red.nombre.toLowerCase()) {
      case "facebook":
        urlBase = "https://www.facebook.com/";
        break;
      case "instagram":
        urlBase = "https://www.instagram.com/";
        break;
      case "twitter":
        urlBase = "https://twitter.com/";
        break;
      case "youtube":
        urlBase = "https://www.youtube.com/";
        break;
      default:
        urlBase = "";
    }

    const fullUrl = urlBase + red.url;

    return (
      <span key={red.nombre}>
        <a href={fullUrl} target="_blank" rel="noopener noreferrer">
          {red.nombre}
        </a>
        <br />
      </span>
    );
  })}
</p>


              <small>Miembro desde: {new Date(profile.created_at).toLocaleDateString()}</small>
              <button className="edit-profile-btn" onClick={handleEditarClick}>
                Editar Datos
              </button>
            </div>
          </div>

          <section>
            <h2>Mis listas</h2>
            <MisListas modo="usuario" mostrarFormulario currentUserId={profile.id} />
          </section>

          <section>
            <h2>Mis reseñas</h2>
            <ListaResenas modo="usuario" mostrarFormulario={false} />
          </section>

          <section>
            <h2>Mis posts</h2>
            <ListaPosts modo="usuario" mostrarFormulario currentUserId={profile.id} />
          </section>

          <section>
            <h2>Amistades</h2>
            <ListaAmigos mi={true} userId={profile.id} />
          </section>
        </>
      )}
    </div>
  );
};

export default Perfil;

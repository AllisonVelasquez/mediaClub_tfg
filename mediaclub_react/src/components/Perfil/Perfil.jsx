import React, { useEffect, useState } from "react";
import { obtenerMiPerfil } from "../../services/Usuarios/Mi/CRUD_Usuarios";
import MisListas from "../Listas/MisListas";
import ListaResenas from "../Resenas/ListaResenas";
import ListaPosts from "../Posts/ListaPosts";
import ListaAmigos from "../Listas/listaAmigos";
import "./perfil.css";
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w300";

const Perfil = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      const p = await obtenerMiPerfil();
      setProfile(p);
    };
    load();
  }, []);

  if (!profile) return <p>Cargando perfil...</p>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={BASE_IMG_URL+profile.foto_perfil || "/images/perfiles/default.png"} alt={profile.alias} />
        <div>
          <h2>{profile.alias}</h2>
          <p>{profile.bio}</p>
          <small>Miembro desde: {new Date(profile.created_at).toLocaleDateString()}</small>
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
    </div>
  );
};

export default Perfil;

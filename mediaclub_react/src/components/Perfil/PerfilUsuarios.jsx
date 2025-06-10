import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  getUserPublicLists,
  getUserFriends,
  getUserInfo,
  getUserPosts,
  getUserActivity,
  sendFriendRequest
} from "../../services/Usuarios/Usuarios/CRUD_Usuarios";
import "./PerfilUsuarios.css";

const UserFullProfile = () => {
  const { id: usuarioId } = useParams();

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);
  const [profile, setProfile] = useState(null);

  const [publicLists, setPublicLists] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [errorLists, setErrorLists] = useState(null);

  const [friends, setFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [errorFriends, setErrorFriends] = useState(null);

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [errorPosts, setErrorPosts] = useState(null);

  const [activity, setActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [errorActivity, setErrorActivity] = useState(null);

  const [userInfo, setUserInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    if (!usuarioId) {
      setErrorProfile("No se proporcionó ID de usuario");
      setLoadingProfile(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(usuarioId);
        setProfile(res.contenido || null);
      } catch (err) {
        setErrorProfile("No se pudo cargar el perfil.");
      } finally {
        setLoadingProfile(false);
      }
    };

    const fetchPublicLists = async () => {
      try {
        const res = await getUserPublicLists(usuarioId);
        setPublicLists(Array.isArray(res.contenido) ? res.contenido : []);
      } catch (err) {
        setErrorLists("No se pudieron cargar las listas públicas.");
      } finally {
        setLoadingLists(false);
      }
    };

    const fetchFriends = async () => {
      try {
        const res = await getUserFriends(usuarioId);
        setFriends(Array.isArray(res.contenido) ? res.contenido : []);
      } catch (err) {
        setErrorFriends("No se pudieron cargar los amigos.");
      } finally {
        setLoadingFriends(false);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo(usuarioId);
        setUserInfo(res.contenido || null);
      } catch (err) {
        setErrorInfo("No se pudo cargar la información.");
      } finally {
        setLoadingInfo(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await getUserPosts(usuarioId);
        setPosts(Array.isArray(res.contenido) ? res.contenido : []);
      } catch (err) {
        setErrorPosts("No se pudieron cargar los posts.");
      } finally {
        setLoadingPosts(false);
      }
    };

    const fetchActivity = async () => {
      try {
        const res = await getUserActivity(usuarioId);
        const actividad = res?.contenido?.data;
        setActivity(Array.isArray(actividad) ? actividad : []);
      } catch (err) {
        setErrorActivity("No se pudo cargar la actividad.");
      } finally {
        setLoadingActivity(false);
      }
    };

    fetchProfile();
    fetchPublicLists();
    fetchFriends();
    fetchUserInfo();
    fetchPosts();
    fetchActivity();
  }, [usuarioId]);

  return (
    <div className="perfil-contenedor">
      <h1>Perfil completo de {profile?.alias || "Usuario"}</h1>

      <section className="perfil-seccion">
        <h2>Perfil</h2>
        {loadingProfile ? (
          <p className="estado-carga">Cargando perfil...</p>
        ) : errorProfile ? (
          <p className="error">{errorProfile}</p>
        ) : profile ? (
          <div className="perfil-card">
            <img
              src={profile.foto_perfil || "/images/perfiles/default.png"}
              alt={`${profile.alias}'s profile`}
              className="perfil-foto"
            />
            <div>
              <p><strong>Alias:</strong> {profile.alias}</p>
              <p><strong>Correo:</strong> {profile.correo}</p>
              <p><strong>Bio:</strong> {profile.bio || "Sin bio"}</p>
              

            </div>
          </div>
        ) : (
          <p>Perfil no disponible.</p>
        )}
      </section>

      <section className="perfil-seccion">
        <h2>Información adicional</h2>
        {loadingInfo ? (
          <p className="cargando">Cargando información...</p>
        ) : errorInfo ? (
          <p className="error">{errorInfo}</p>
        ) : userInfo ? (
          <div className="info-cards">
            <div className="info-card"><h4>Reseñas</h4><p>{userInfo.resenas}</p></div>
            <div className="info-card"><h4>Puntuaciones</h4><p>{userInfo.puntuaciones}</p></div>
            <div className="info-card"><h4>Listas Públicas</h4><p>{userInfo.listas_publicas}</p></div>
            <div className="info-card"><h4>Listas Privadas</h4><p>{userInfo.listas_privadas}</p></div>
          </div>
        ) : (
          <p>Información no disponible.</p>
        )}
      </section>

      <section className="perfil-seccion">
        <h2>Listas públicas</h2>
        {loadingLists ? (
          <p className="cargando">Cargando listas públicas...</p>
        ) : errorLists ? (
          <p className="error">{errorLists}</p>
        ) : publicLists.length === 0 ? (
          <p>No tiene listas públicas.</p>
        ) : (
          <ul>
            {publicLists.map((lista) => (
              <li key={lista.id}>{lista.name || lista.title || "Lista sin nombre"}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="perfil-seccion">
        <h2>Amigos</h2>
        {loadingFriends ? (
          <p className="cargando">Cargando amigos...</p>
        ) : errorFriends ? (
          <p className="error">{errorFriends}</p>
        ) : friends.length === 0 ? (
          <p>No tiene amigos.</p>
        ) : (
          <ul>
            {friends.map((friend) => (
              <li key={friend.id}>{friend.alias || friend.name || "Amigo sin nombre"}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="perfil-seccion">
        <h2>Posts</h2>
        {loadingPosts ? (
          <p className="cargando">Cargando posts...</p>
        ) : errorPosts ? (
          <p className="error">{errorPosts}</p>
        ) : posts.length === 0 ? (
          <p>No tiene posts.</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title || post.content?.slice(0, 30) || "Post sin título"}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="perfil-seccion">
        <h2>Actividad reciente</h2>
        {loadingActivity ? (
          <p className="cargando">Cargando actividad...</p>
        ) : errorActivity ? (
          <p className="error">{errorActivity}</p>
        ) : activity.length === 0 ? (
          <p>No tiene actividad reciente.</p>
        ) : (
          <ul className="actividad-lista">
            {activity.map((act) => (
              <li key={act.id} className="actividad-item">
                <div className="actividad-icono">📝</div>
                <div className="actividad-detalle">
                  <p className="actividad-descripcion">{act.descripcion}</p>
                  <p className="actividad-fecha">
                    {new Date(act.created_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default UserFullProfile;

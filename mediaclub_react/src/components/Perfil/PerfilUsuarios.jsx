import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUserProfile,
  getUserPublicLists,
  getUserFriends,
  getUserInfo,
  getUserPosts,
  getUserActivity,
} from "../../services/Usuarios/Usuarios/CRUD_Usuarios";
import "./PerfilUsuarios.css"; // Asegúrate de tener estilos para el perfil
const UserFullProfile = () => {
  const { id: usuarioId } = useParams();

  // Estados para perfil y errores
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);
  const [profile, setProfile] = useState(null);

  // Estados para listas (arrays)
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

  // Estado para info (objeto)
  const [userInfo, setUserInfo] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    if (!usuarioId) {
      setErrorProfile("No se proporcionó ID de usuario");
      setLoadingProfile(false);
      return;
    }

    // Cargar perfil
    const fetchProfile = async () => {
      setLoadingProfile(true);
      setErrorProfile(null);
      try {
        const res = await getUserProfile(usuarioId);
        setProfile(res.contenido || null);
      } catch (err) {
        console.error("Error al cargar perfil:", err);
        setErrorProfile("No se pudo cargar el perfil.");
      } finally {
        setLoadingProfile(false);
      }
    };

    // Cargar listas públicas
    const fetchPublicLists = async () => {
      setLoadingLists(true);
      setErrorLists(null);
      try {
        const res = await getUserPublicLists(usuarioId);
        setPublicLists(Array.isArray(res.contenido) ? res.contenido : []);
      } catch (err) {
        console.error("Error al cargar listas públicas:", err);
        setErrorLists("No se pudieron cargar las listas públicas.");
      } finally {
        setLoadingLists(false);
      }
    };

    // Cargar amigos
    const fetchFriends = async () => {
      setLoadingFriends(true);
      setErrorFriends(null);
      try {
        const res = await getUserFriends(usuarioId);
        setFriends(Array.isArray(res.contenido) ? res.contenido : []);
      } catch (err) {
        console.error("Error al cargar amigos:", err);
        setErrorFriends("No se pudieron cargar los amigos.");
      } finally {
        setLoadingFriends(false);
      }
    };

    // Cargar info adicional
    const fetchUserInfo = async () => {
      setLoadingInfo(true);
      setErrorInfo(null);
      try {
        const res = await getUserInfo(usuarioId);
        setUserInfo(res.contenido || null);
      } catch (err) {
        console.error("Error al cargar info:", err);
        setErrorInfo("No se pudo cargar la información.");
      } finally {
        setLoadingInfo(false);
      }
    };

    // Cargar posts
    const fetchPosts = async () => {
      setLoadingPosts(true);
      setErrorPosts(null);
      try {
        const res = await getUserPosts(usuarioId);
        setPosts(Array.isArray(res.contenido) ? res.contenido : []);
      } catch (err) {
        console.error("Error al cargar posts:", err);
        setErrorPosts("No se pudieron cargar los posts.");
      } finally {
        setLoadingPosts(false);
      }
    };

    // Cargar actividad
    const fetchActivity = async () => {
      setLoadingActivity(true);
      setErrorActivity(null);
      try {
        const res = await getUserActivity(usuarioId);
        setActivity(Array.isArray(res.contenido) ? res.contenido : []);
      } catch (err) {
        console.error("Error al cargar actividad:", err);
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
    <div>
      <h1>Perfil completo de {profile?.alias || "Usuario"}</h1>

      <section>
        <h2>Perfil</h2>
        {loadingProfile ? (
          <p>Cargando perfil...</p>
        ) : errorProfile ? (
          <p style={{ color: "red" }}>{errorProfile}</p>
        ) : profile ? (
          <div>
            <img
              src={profile.foto_perfil || "/images/perfiles/default.png"}
              alt={`${profile.alias}'s profile`}
              width={120}
              height={120}
              style={{ borderRadius: "50%" }}
            />
            <p><strong>Alias:</strong> {profile.alias}</p>
            <p><strong>Correo:</strong> {profile.correo}</p>
            <p><strong>Bio:</strong> {profile.bio || "Sin bio"}</p>
            {/* Puedes mostrar redes parseando JSON si quieres */}
          </div>
        ) : (
          <p>Perfil no disponible.</p>
        )}
      </section>

      <section>
        <h2>Información</h2>
        {loadingInfo ? (
          <p>Cargando información...</p>
        ) : errorInfo ? (
          <p style={{ color: "red" }}>{errorInfo}</p>
        ) : userInfo ? (
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        ) : (
          <p>Información no disponible.</p>
        )}
      </section>

      <section>
        <h2>Listas públicas</h2>
        {loadingLists ? (
          <p>Cargando listas públicas...</p>
        ) : errorLists ? (
          <p style={{ color: "red" }}>{errorLists}</p>
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

      <section>
        <h2>Amigos</h2>
        {loadingFriends ? (
          <p>Cargando amigos...</p>
        ) : errorFriends ? (
          <p style={{ color: "red" }}>{errorFriends}</p>
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

      <section>
        <h2>Posts</h2>
        {loadingPosts ? (
          <p>Cargando posts...</p>
        ) : errorPosts ? (
          <p style={{ color: "red" }}>{errorPosts}</p>
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

      <section>
        <h2>Actividad</h2>
        {loadingActivity ? (
          <p>Cargando actividad...</p>
        ) : errorActivity ? (
          <p style={{ color: "red" }}>{errorActivity}</p>
        ) : activity.length === 0 ? (
          <p>No tiene actividad reciente.</p>
        ) : (
          <ul>
            {activity.map((act, i) => (
              <li key={i}>{JSON.stringify(act)}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default UserFullProfile;

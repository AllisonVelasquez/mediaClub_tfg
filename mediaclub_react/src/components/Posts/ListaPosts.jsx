import React, { useEffect, useState } from "react";
import { getMyPosts, getUserPosts, deletePost, editPost, crearPost } from "../../services/Posts/CRUD_post";
import Post from "./Posts";
import "./ListaPosts.css";

const MAX_CARACTERES = 1500;

const ListaPosts = ({ modo = "publico", mostrarFormulario = false, currentUserId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [nuevoContenido, setNuevoContenido] = useState("");
  const [nuevoPublico, setNuevoPublico] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarPosts(page);
  }, [page]);

  const cargarPosts = async (pageNum) => {
    setLoading(true);
    try {
      let data;
      if (modo === "usuario") {
        data = await getMyPosts(pageNum);
      } else {
        data = await getUserPosts(currentUserId, pageNum);
      }
      setPosts(data.contenido.data);
      setTotalPages(data.contenido.last_page);
    } catch (error) {
      console.error("Error al cargar posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (postId) => {
    if (!window.confirm("¿Seguro que deseas eliminar este post?")) return;
    try {
      await deletePost(postId);
      await cargarPosts(page);
    } catch (error) {
      console.error("Error al eliminar post:", error);
    }
  };

  const handleActualizar = async (postId, datosActualizados) => {
    try {
      await editPost(postId, datosActualizados);
      await cargarPosts(page);
    } catch (error) {
      console.error("Error al editar post:", error);
    }
  };

  const handleCrear = async () => {
    setError("");
    if (!nuevoContenido.trim()) {
      setError("El contenido es obligatorio.");
      return;
    }
    if (nuevoContenido.length > MAX_CARACTERES) {
      setError("El contenido supera el máximo de 1500 caracteres.");
      return;
    }
    try {
      await crearPost({ contenido: nuevoContenido, publico: nuevoPublico ? 1 : 0 });
      setNuevoContenido("");
      setNuevoPublico(true);
      setError("");
      await cargarPosts(page);
    } catch (error) {
      console.error("Error al crear post:", error);
    }
  };

  if (loading) return <p>Cargando posts...</p>;

  return (
    <div>
      {mostrarFormulario && modo === "usuario" && (
        <div className="nuevo-post-form">
          <h3>Crear nuevo post</h3>
          <div>
            <textarea
              placeholder="Contenido"
              value={nuevoContenido}
              onChange={(e) => {
                setNuevoContenido(e.target.value);
                if (e.target.value.length <= MAX_CARACTERES) setError("");
              }}
              maxLength={MAX_CARACTERES + 1}
            />
            <div className={`contador-caracteres${nuevoContenido.length > MAX_CARACTERES ? " error" : ""}`}>
              {nuevoContenido.length}/{MAX_CARACTERES}
            </div>
          </div>
          <div className="nuevo-post-options">
            <label>
              Público:
              <input
                type="checkbox"
                checked={nuevoPublico}
                onChange={() => setNuevoPublico(!nuevoPublico)}
              />
            </label>
            <button onClick={handleCrear}>Publicar</button>
          </div>
          {error && <div className="mensaje-error">{error}</div>}
        </div>
      )}

      {posts.length === 0 ? (
        <p>No hay posts para mostrar.</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            modo={modo}
            currentUserId={currentUserId}
            onDelete={() => handleEliminar(post.id)}
            onUpdate={handleActualizar}
          />
        ))
      )}

      <div className="paginacion">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ListaPosts;
import React, { useEffect, useState } from "react";
import { getMyPosts, getUserPosts, deletePost, editPost, crearPost } from "../../services/Posts/CRUD_post";
import Post from "./Posts";

const ListaPosts = ({ modo = "publico", mostrarFormulario = false, currentUserId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [nuevoPublico, setNuevoPublico] = useState(true);

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
        // para modo público, usa getUserPosts con currentUserId (de perfil ajeno)
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
    if (!nuevoTitulo.trim() || !nuevoContenido.trim()) {
      alert("El título y contenido son obligatorios.");
      return;
    }
    try {
      await crearPost({ titulo: nuevoTitulo, contenido: nuevoContenido, publico: nuevoPublico ? 1 : 0 });
      setNuevoTitulo("");
      setNuevoContenido("");
      setNuevoPublico(true);
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
          <input
            type="text"
            placeholder="Título"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
          />
          <textarea
            placeholder="Contenido"
            value={nuevoContenido}
            onChange={(e) => setNuevoContenido(e.target.value)}
          />
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
      )}

      {posts.length === 0 ? (
        <p>No hay posts para mostrar.</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            modo={modo}
            esPropio={modo === "usuario" && post.usuario_id === currentUserId}
            onEliminar={() => handleEliminar(post.id)}
            onActualizar={handleActualizar}
          />
        ))
      )}

      {/* Paginación básica */}
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

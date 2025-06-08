// PerfilUsuario.jsx
import React, { useState, useEffect } from "react";
import { getUserProfile } from "../../services/Usuarios/CRUD_Usuarios"; // Ajusta la ruta

const PerfilUsuario = ({ usuarioId }) => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await getUserProfile(usuarioId);
        setPerfil(data.contenido);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    if (usuarioId) cargarPerfil();
  }, [usuarioId]);

  if (loading) return <p>Cargando perfil...</p>;
  if (!perfil) return <p>Perfil no encontrado.</p>;

  return (
    <div>
      <h2>{perfil.alias}</h2>
      <img
        src={perfil.foto_perfil}
        alt={`${perfil.alias} foto`}
        style={{ width: "150px", borderRadius: "50%" }}
      />
      <p>Correo: {perfil.correo}</p>
      <p>Bio: {perfil.bio || "Sin biografía"}</p>
      {/* Puedes mostrar más campos si quieres */}
    </div>
  );
};

export default PerfilUsuario;

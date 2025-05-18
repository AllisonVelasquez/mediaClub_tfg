// src/components/PerfilUsuario.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  getListas } from "../../../services/Listas/CRUD_Listas"; 
import { getUsuarios } from "../../../services/Usuarios/CRUD_Usuarios"; 

const PerfilUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [listas, setListas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const usuarios = await getUsuarios();
      const listasAll = await getListas();

      const user = usuarios.data.usuarios.find(
        (u) => u.usuario_id === parseInt(id)
      );
      const listasUsuario = listasAll.data.listas.filter(
        (l) => l.usuario_id === user.usuario_id
      );

      setUsuario(user);
      setListas(listasUsuario);
    };

    fetchData();
  }, [id]);

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h2>Perfil de {usuario.alias}</h2>
      <img
        src={usuario.foto_perfil || "/images/default.webp"}
        alt="perfil"
        width={100}
      />
      <p>{usuario.bio}</p>

      <h3>Listas</h3>
      <div style={{ display: "flex", gap: "1rem" }}>
        {listas.map((lista) => (
          <div
            key={lista.lista_id}
            onClick={() => navigate(`/lista/${lista.lista_id}`)}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              cursor: "pointer",
              width: "150px",
            }}
          >
            <h4>{lista.nombre}</h4>
            <small>{lista.publica ? "Pública" : "Privada"}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfilUsuario;

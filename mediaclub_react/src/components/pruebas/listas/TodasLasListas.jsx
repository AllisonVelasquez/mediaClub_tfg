// src/components/TodasLasListas.jsx
import React, { useEffect, useState } from "react";
import { getListas } from "../../../services/Listas/CRUD_Listas";
import { getUsuarios } from "../../../services/Usuarios/CRUD_Usuarios"; 

import { useNavigate } from "react-router-dom";

const TodasLasListas = () => {
  const [listas, setListas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const [listasRes, usuariosRes] = await Promise.all([
        getListas(),
        getUsuarios(),
      ]);
        
      const publicas = listasRes.data.listas.filter((l) => l.publica);
      setListas(publicas);
      setUsuarios(usuariosRes.data.usuarios);
    };
    fetchData();
  }, []);

  const getUsuario = (id) => usuarios.find((u) => u.usuario_id === id);

  return (
    <div>
      <h2>Listas Públicas</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {listas.map((lista) => {
          const user = getUsuario(lista.usuario_id);
          return (
            <div
              key={lista.lista_id}
              onClick={() => navigate(`/lista/${lista.lista_id}`)}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                cursor: "pointer",
                width: 200,
              }}
            >
              <h4>{lista.nombre}</h4>
              <p>
                de{" "}
                <span
                  onClick={() => navigate(`/perfil/${user.usuario_id}`)}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {user.alias}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodasLasListas;

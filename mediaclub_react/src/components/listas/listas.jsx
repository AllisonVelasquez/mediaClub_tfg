import React, { useEffect, useState } from "react";
import "./styles/listas.css"; // Asegúrate de que la ruta sea correcta
import { getListas, deleteLista } from "../../services/Listas/CRUD_Listas";
import { getUsuarios } from "../../services/Usuarios/CRUD_Usuarios";
import { useNavigate } from "react-router-dom";

const TodasLasListas = () => {
  const [listas, setListas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listasRes = await getListas();
        const publicas = listasRes.filter((l) => l.publica);
        const usuariosRes = await getUsuarios();
        setUsuarios(usuariosRes);
        setListas(publicas);
      } catch (error) {
        console.error("Error al obtener las listas o usuarios:", error);
      }
    };
    fetchData();
  }, []);

  const getUsuario = (id) => usuarios.find((u) => u.usuario_id === id);

  const handleDelete = async (listaId) => {
    try {
      await deleteLista(listaId);
      setListas(listas.filter((lista) => lista.lista_id !== listaId));
    } catch (error) {
      console.error("Error al eliminar la lista:", error);
    }
  };

  const handleEdit = (listaId) => {
    navigate(`/EditarLista/${listaId}`);
  };

  const handleCreate = () => {
    navigate("/landing");
  };

  const handleViewDetails = (listaId) => {
    navigate(`/DetalleLista/${listaId}`);
  };

  return (
    <div className="cards-container">
      {listas.map((lista) => {
        const user = getUsuario(lista.usuario_id);
        return (
          <div key={lista.lista_id} className="card">
            <img
              src="/images/default_movie.webp"
              alt={`${lista.nombre}`}
              onClick={() => handleViewDetails(lista.lista_id)}
            />
            <h4>{lista.nombre}</h4>
            <p>
              de{" "}
              <span
                onClick={() => navigate(`/perfil/${user?.usuario_id}`)}
                className="user-link"
              >
                {user ? user.alias : "Cargando..."}
              </span>
            </p>
            <div className="card-actions">
              <button
                className="card-btn edit"
                onClick={() => handleEdit(lista.lista_id)}
              >
                Editar
              </button>
              <button
                className="card-btn delete"
                onClick={() => handleDelete(lista.lista_id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        );
      })}
      <div className="create-button-container">
        <button className="create-list-button" onClick={handleCreate}>
          Crear Nueva Lista
        </button>
      </div>
    </div>
  );
};

export default TodasLasListas;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUsuarios } from "../../services/Usuarios/CRUD_Usuarios";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsuarios(); // Aquí data es { usuarios: [...] }
        const usuarios = Array.isArray(data) ? data : [];
        setUsers(usuarios);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Cargando usuarios...</div>;
  if (!users.length) return <div>No hay usuarios disponibles.</div>;

  return (
    <div className="user-list">
      <h2>Usuarios</h2>
      <div className="user-list-container">
        {users.map((user) => (
          <div className="user-card" key={user.usuario_id}>
            <Link to={`/perfil/${user.usuario_id}`} className="user-link">
              <div className="user-photo">
                <img
                  src={user.foto_perfil}
                  alt={user.alias}
                  className="user-img"
                />
              </div>
              <div className="user-name">{user.alias}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;

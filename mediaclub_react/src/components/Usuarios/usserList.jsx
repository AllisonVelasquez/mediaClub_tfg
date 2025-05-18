// src/components/UserLists.jsx
import { useNavigate } from "react-router-dom";

const UserLists = ({ usuarioId, data }) => {
  const navigate = useNavigate();

  // Filtrar listas del usuario
  const listas =
    data.find((item) => item.message.includes("Listas"))?.data?.listas || [];
  const usuario = data
    .find((item) => item.message.includes("Usuarios"))
    ?.data?.usuarios?.find((u) => u.usuario_id === usuarioId);

  const listasUsuario = listas.filter(
    (lista) => lista.usuario_id === usuarioId
  );

  if (!usuario) return <p>Usuario no encontrado</p>;

  return (
    <div>
      <h2>Listas de {usuario.alias}</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {listasUsuario.map((lista) => (
          <div
            key={lista.lista_id}
            onClick={() => navigate(`/lista/${lista.lista_id}`)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "8px",
              textAlign: "center",
              width: "150px",
            }}
          >
            <img
              src={usuario.foto_perfil || "/images/default.webp"}
              alt={usuario.alias}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <h4>{lista.nombre}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLists;

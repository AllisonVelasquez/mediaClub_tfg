// import React, { useEffect, useState } from "react";
// import api from "../services/axios";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);
//   const [newUser, setNewUser] = useState({
//     login_id: "",
//     correo: "",
//     alias: "",
//     bio: "",
//     redes: {
//       facebook: "",
//       twitter: "",
//       instagram: "",
//       youtube: "",
//     },
//   });

//   useEffect(() => {
//     api.getUsuarios()
//       .then((response) => {
//         console.log(response.data.usuarios);
//         setUsers(response.data.usuarios);
//       })
//       .catch((err) => {
//         if (err.response) {
//           setError(err.response.data.message);
//         } else {
//           setError("Error del servidor (api).");
//         }
//         console.error(err);
//       });
//   }, []);

//   // Manejar cambios en los campos del formulario para crear un usuario
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in newUser.redes) {
//       setNewUser({
//         ...newUser,
//         redes: {
//           ...newUser.redes,
//           [name]: value,
//         },
//       });
//     } else {
//       setNewUser({
//         ...newUser,
//         [name]: value,
//       });
//     }
//   };

//   // Crear un nuevo usuario
//   const handleCreateUser = (e) => {
//     e.preventDefault();

//     const userData = {
//       ...newUser,
//       fecha_creacion: new Date().toISOString(),
//       confirmado: false,
//       foto_perfil: "/images/default.webp", // Usamos una foto predeterminada
//       bloqueado: false,
//     };

//     api.crearUsuario(userData)
//       .then((response) => {
//         console.log("Nuevo usuario creado:", response.data);
//         setUsers((prevUsers) => [...prevUsers, response.data.data]);
//         setNewUser({
//           login_id: "",
//           correo: "",
//           alias: "",
//           bio: "",
//           redes: {
//             facebook: "",
//             twitter: "",
//             instagram: "",
//             youtube: "",
//           },
//         });
//       })
//       .catch((err) => {
//         console.error("Error al crear usuario:", err);
//         setError("Error al crear usuario.");
//       });
//   };

//   // Eliminar un usuario
//   const handleDeleteUser = (userId) => {
//     api.eliminarUsuario(userId)
//       .then((response) => {
//         console.log("Usuario eliminado:", response.data);
//         setUsers((prevUsers) => prevUsers.filter((user) => user.usuario_id !== userId));
//       })
//       .catch((err) => {
//         console.error("Error al eliminar usuario:", err);
//         setError("Error al eliminar usuario.");
//       });
//   };

//   return (
//     <div>
//       <h2>Lista de usuarios</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
      
//       <ul>
//         {users.map((user) => (
//           <li key={user.usuario_id}>
//             {user.alias} &nbsp;&nbsp;&nbsp; {user.correo}
//             <button onClick={() => handleDeleteUser(user.usuario_id)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>

//       <h3>Crear nuevo usuario</h3>
//       <form onSubmit={handleCreateUser}>
//         <div>
//           <label>Login ID:</label>
//           <input
//             type="text"
//             name="login_id"
//             value={newUser.login_id}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Correo:</label>
//           <input
//             type="email"
//             name="correo"
//             value={newUser.correo}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Alias:</label>
//           <input
//             type="text"
//             name="alias"
//             value={newUser.alias}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Bio:</label>
//           <textarea
//             name="bio"
//             value={newUser.bio}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <h4>Redes sociales</h4>
//         <div>
//           <label>Facebook:</label>
//           <input
//             type="text"
//             name="facebook"
//             value={newUser.redes.facebook}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Twitter:</label>
//           <input
//             type="text"
//             name="twitter"
//             value={newUser.redes.twitter}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Instagram:</label>
//           <input
//             type="text"
//             name="instagram"
//             value={newUser.redes.instagram}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Youtube:</label>
//           <input
//             type="text"
//             name="youtube"
//             value={newUser.redes.youtube}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Crear Usuario</button>
//       </form>
//     </div>
//   );
// };

// export default UserList;

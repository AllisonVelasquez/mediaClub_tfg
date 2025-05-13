// import React, { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { getUsuarios, crearSesion } from "../services/axios"; // Asegúrate de tener el CRUD de axios importado
// import bcrypt from "bcryptjs"; // Usamos bcryptjs para simular la verificación de contraseñas en hash

// /*bcrypt.hash('hash123', 10, (err, hash) => {
//   console.log(hash);
// });*/
// const LogIn = () => {
//   const [formData, setFormData] = useState({
//     usuario: "",
//     password: "",
//   });

//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const history = useNavigate(); // Usamos useNavigate  para redirigir a Perfil.jsx

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // Verificación: Comprobar si las contraseñas coinciden

//     try {
//       // 1. Obtener usuarios
//       const response = await getUsuarios();
//       const usuarios = response.data.usuarios;

//       const usuario = usuarios.find(
//         (user) => user.login_id === formData.usuario
//       );
//       console.log(usuario);

//       if (!usuario) {
//         setError("El usuario no existe");
//         setLoading(false);
//         return;
//       }
//       bcrypt.compare(
//         formData.password,
//         usuario.contrasena_hash,
//         (err, result) => {
//           if (err) {
//             // Manejo de errores
//             console.error(err);
//             return;
//           }

//           if (!result) {
//             // La contraseña no coincide
//             console.log("Contraseña incorrecta");
//           } else {
//             const sesionData = {
//               usuarioId: usuario.usuario_id,
//             };

//             history('/Perfil');
//           }
//         }
//       );
//     } catch (err) {
//       setError("Error al iniciar sesión");
//       console.error("Error al iniciar sesión", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Iniciar sesión</h2>

//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="usuario">Usuario:</label>
//           <input
//             type="text"
//             id="usuario"
//             name="usuario"
//             value={formData.usuario}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Contraseña:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit" disabled={loading}>
//           {loading ? "Cargando..." : "Iniciar sesión"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LogIn;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../services/axios";
import bcrypt from "bcryptjs";
import "./LogIn.css";
import logoNombreOscuro from "./logo_nombre_oscuro.png";

const LogIn = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await getUsuarios();
      const usuarios = response.data.usuarios;

      const usuario = usuarios.find(
        (user) => user.login_id === formData.usuario
      );

      if (!usuario) {
        setError("El usuario no existe");
        setLoading(false);
        return;
      }
      bcrypt.compare(
        formData.password,
        usuario.contrasena_hash,
        (err, result) => {
          if (err) {
            setError("Error al verificar la contraseña");
            setLoading(false);
            return;
          }

          if (!result) {
            setError("Contraseña incorrecta");
            setLoading(false);
          } else {
            // Aquí podrías guardar la sesión si lo necesitas
            navigate("/Perfil");
          }
        }
      );
    } catch (err) {
      setError("Error al iniciar sesión");
      console.error("Error al iniciar sesión", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/Registro");
  };

  return (
    <div className="login-bg">
      <div className="login-header">
        <img src={logoNombreOscuro} alt="Muvis Logo" />
      </div>
      <h2 style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#2a3b42", marginTop: "1.5rem" }}>
        Iniciar sesión
      </h2>
      <form className="login-container" onSubmit={handleLogin}>
        <label htmlFor="usuario">Usuario:</label>
        <input
          type="text"
          id="usuario"
          name="usuario"
          value={formData.usuario}
          onChange={handleChange}
          autoComplete="username"
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        {error && <div className="error">{error}</div>}
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Entrar"}
        </button>
        <button className="register-btn" onClick={handleRegister} type="button">
          Quiero registrarme
        </button>
      </form>
    </div>
  );
};

export default LogIn;
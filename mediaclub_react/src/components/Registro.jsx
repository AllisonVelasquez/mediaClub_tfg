// import React, { useState } from 'react';

// const Registro = () => {
//   const [formData, setFormData] = useState({
//     nombre: '',
//     email: '',
//     alias_publico: '',
//     contraseña: '',
//     repetirContraseña: ''
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     if (formData.contraseña !== formData.repetirContraseña) {
//       setError('Las contraseñas no coinciden');
//       return;
//     }

//     // Aquí podrías enviar los datos a una API
//     console.log('Datos enviados:', formData);
//     setSuccess('Registro exitoso');
//   };

//   return (
//     <div>
//       <h2>Registro</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="nombre"
//           placeholder="Nombre"
//           value={formData.nombre}
//           onChange={handleChange}
//           required
//         /><br />

//         <input
//           type="email"
//           name="email"
//           placeholder="Correo electrónico"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         /><br />

//         <input
//           type="text"
//           name="alias_publico"
//           placeholder="Alias público"
//           value={formData.alias_publico}
//           onChange={handleChange}
//           required
//         /><br />

//         <input
//           type="password"
//           name="contraseña"
//           placeholder="Contraseña"
//           value={formData.contraseña}
//           onChange={handleChange}
//           required
//         /><br />

//         <input
//           type="password"
//           name="repetirContraseña"
//           placeholder="Repetir contraseña"
//           value={formData.repetirContraseña}
//           onChange={handleChange}
//           required
//         /><br />

//         <button type="submit">Registrarse</button>

//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {success && <p style={{ color: 'green' }}>{success}</p>}
//       </form>
//     </div>
//   );
// };

// export default Registro;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Registro.css";
import logoNombreOscuro from "./logo_nombre_oscuro.png";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    alias_publico: "",
    contraseña: "",
    repetirContraseña: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //const navigate = useNavigate();

  // Validaciones simples
  const isNombreOk = formData.nombre.length > 2;
  const isAliasOk = formData.alias_publico.length > 2;
  const isEmailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPassOk = formData.contraseña.length >= 6;
  const isRepeatOk =
    formData.contraseña === formData.repetirContraseña && isPassOk;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isNombreOk || !isAliasOk || !isEmailOk || !isPassOk || !isRepeatOk) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }

    setSuccess("Registro exitoso");
    // navigate('/LogIn'); // Si quieres redirigir tras registrar
  };

  return (
    <div className="registro-bg">
      <div className="registro-header">
        <img src={logoNombreOscuro} alt="Muvis Logo" />
      </div>
      <div className="registro-title">Registra una nueva cuenta</div>
      <form
        className="registro-container"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="registro-form">
          {/* Nombre de usuario */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="nombre">
              Nombre de usuario
            </label>
            <input
              className="registro-input"
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            {formData.nombre && (
              <span
                className={`registro-icon ${isNombreOk ? "success" : "error"}`}
              >
                {isNombreOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {/* Contraseña */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="contraseña">
              Contraseña
            </label>
            <input
              className="registro-input"
              type="password"
              name="contraseña"
              id="contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              required
            />
            {formData.contraseña && (
              <span
                className={`registro-icon ${isPassOk ? "success" : "error"}`}
              >
                {isPassOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {/* Alias público */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="alias_publico">
              Alias público
            </label>
            <input
              className="registro-input"
              type="text"
              name="alias_publico"
              id="alias_publico"
              value={formData.alias_publico}
              onChange={handleChange}
              required
            />
            {formData.alias_publico && (
              <span
                className={`registro-icon ${isAliasOk ? "success" : "error"}`}
              >
                {isAliasOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {/* Repetir contraseña */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="repetirContraseña">
              Repetir contraseña
            </label>
            <input
              className="registro-input"
              type="password"
              name="repetirContraseña"
              id="repetirContraseña"
              value={formData.repetirContraseña}
              onChange={handleChange}
              required
            />
            {formData.repetirContraseña && (
              <span
                className={`registro-icon ${isRepeatOk ? "success" : "error"}`}
              >
                {isRepeatOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {/* Correo */}
          <div className="registro-field" style={{ gridColumn: "1 / span 1" }}>
            <label className="registro-label" htmlFor="email">
              Correo
            </label>
            <input
              className="registro-input"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {formData.email && (
              <span
                className={`registro-icon ${isEmailOk ? "success" : "error"}`}
              >
                {isEmailOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {/* Botón */}
          <div className="registro-btn-row">
            <button className="registro-btn" type="submit">
              Registrarme
            </button>
          </div>
          {/* Mensajes */}
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </div>
      </form>
      <div className="registro-link">
        <Link to="/LogIn" className="enlace">
          Ya tengo una cuenta
        </Link>
      </div>
      <div className="registro-link">
        <Link to="/" className="enlace">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Registro;

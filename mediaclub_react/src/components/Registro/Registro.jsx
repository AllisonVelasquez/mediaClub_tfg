import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import logoNombreOscuro from "../assents/logo_nombre_oscuro.png";
import "./Registro.css";
import { crearUsuario } from "../../services/Usuarios/log";

const Registro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login_id: "",
    correo: "",
    alias: "",
    contrasena: "",
    contrasena_confirmation: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const isLoginIdOk =
    formData.login_id.length > 2 &&
    formData.login_id === formData.login_id.toLowerCase() &&
    !/\s/.test(formData.login_id);
  const isAliasOk = formData.alias.length > 2;
  const isCorreoOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo);
  const isPassOk = formData.contrasena.length >= 8;
  const isRepeatOk =
    formData.contrasena === formData.contrasena_confirmation && isPassOk;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (!isLoginIdOk || !isAliasOk || !isCorreoOk || !isPassOk || !isRepeatOk) {
    setError("Por favor, completa todos los campos correctamente.");
    return;
  }

  const payload = new FormData();
  payload.append("login_id", formData.login_id);
  payload.append("correo", formData.correo);
  payload.append("alias", formData.alias);
  payload.append("contrasena", formData.contrasena);
  payload.append("contrasena_confirmation", formData.contrasena_confirmation);

  try {
    await crearUsuario(payload);
    setSuccess("Registro exitoso. ");
    
    setTimeout(() => {
      {window.location.href = "/LogIn";} 
    }, 500); 

  } catch (err) {
    setError(
      err?.response?.data?.message ||
      "Error al registrar. Intenta más tarde."
    );
  }
};


  return (
    <div className="registro-bg">
      <div className="registro-header">
        <img src={logoNombreOscuro} alt="Muvis Logo" />
      </div>
      <div className="registro-title">Registra una nueva cuenta</div>
      <form className="registro-container" onSubmit={handleSubmit} autoComplete="off">
        <div className="registro-form">
          {/* login_id */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="login_id">ID de usuario</label>
            <input
              className="registro-input"
              type="text"
              name="login_id"
              id="login_id"
              placeholder="sin espacios y en minúsculas"
              value={formData.login_id}
              onChange={handleChange}
              required
            />
            {formData.login_id && (
              <span className={`registro-icon ${isLoginIdOk ? "success" : "error"}`}>
                {isLoginIdOk ? "✓" : "✗"}
              </span>
            )}
          </div>

          {/* Contraseña */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="contrasena">Contraseña</label>
            <input
              className="registro-input"
              type={showPassword ? "text" : "password"}
              name="contrasena"
              id="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="registro-toggle-btn"
              onClick={() => setShowPassword((v) => !v)}
              aria-label="Mostrar/Ocultar contraseña"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {formData.contrasena && (
              <span className={`registro-icon ${isPassOk ? "success" : "error"}`} style={{ right: "2.5rem" }}>
                {isPassOk ? "✓" : "✗"}
              </span>
            )}
          </div>

          {/* Confirmar contraseña */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="contrasena_confirmation">Repetir contraseña</label>
            <input
              className="registro-input"
              type={showPasswordConfirm ? "text" : "password"}
              name="contrasena_confirmation"
              id="contrasena_confirmation"
              value={formData.contrasena_confirmation}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="registro-toggle-btn"
              onClick={() => setShowPasswordConfirm((v) => !v)}
              aria-label="Mostrar/Ocultar contraseña"
            >
              {showPasswordConfirm ? "🙈" : "👁️"}
            </button>
            {formData.contrasena_confirmation && (
              <span className={`registro-icon ${isRepeatOk ? "success" : "error"}`} style={{ right: "2.5rem" }}>
                {isRepeatOk ? "✓" : "✗"}
              </span>
            )}
          </div>

          {/* Alias */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="alias">Alias</label>
            <input
              className="registro-input"
              type="text"
              name="alias"
              id="alias"
              value={formData.alias}
              onChange={handleChange}
              required
            />
            {formData.alias && (
              <span className={`registro-icon ${isAliasOk ? "success" : "error"}`}>
                {isAliasOk ? "✓" : "✗"}
              </span>
            )}
          </div>

          {/* Correo */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="correo">Correo</label>
            <input
              className="registro-input"
              type="email"
              name="correo"
              id="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            {formData.correo && (
              <span className={`registro-icon ${isCorreoOk ? "success" : "error"}`}>
                {isCorreoOk ? "✓" : "✗"}
              </span>
            )}
          </div>

          <div className="registro-btn-row">
            <button className="registro-btn" type="submit">Registrarme</button>
          </div>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </div>
      </form>

      <div className="registro-link">
        <a href="/LogIn" className="enlace">Ya tengo una cuenta</a>
      </div>
      <div className="login-link">
        <Link to="/" className='enlace'>Volver al inicio</Link>
      </div>

    </div>
  );
};

export default Registro;

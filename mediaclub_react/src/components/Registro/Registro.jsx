import React, { useState } from "react";
import logoNombreOscuro from "../assents/logo_nombre_oscuro.png";
import "./Registro.css";
import { crearUsuario } from "../../services/Usuarios/CRUD_Usuarios";

const Registro = () => {
  const [formData, setFormData] = useState({
    login_id: "",
    correo: "",
    alias: "",
    contrasena: "",
    contrasena_confirmation: "",
    bio: "",
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    foto_perfil: "/images/default.webp",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validaciones simples
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

    const nuevoUsuario = {
      login_id: formData.login_id,
      correo: formData.correo,
      contrasena: formData.contrasena,
      contrasena_confirmation: formData.contrasena_confirmation,
      alias: formData.alias,
      bio: formData.bio,
      redes: {
        facebook: formData.facebook,
        twitter: formData.twitter,
        instagram: formData.instagram,
        youtube: formData.youtube,
      },
      foto_perfil: formData.foto_perfil,
    };

    try {
      await crearUsuario(nuevoUsuario);
      setSuccess("Registro exitoso");
      // Opcional: redirigir al login
      // navigate('/LogIn');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Error al registrar usuario. Intenta más tarde."
      );
    }
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
          {/* login_id */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="login_id">
              ID de usuario (minúsculas, sin espacios)
            </label>
            <input
              className="registro-input"
              type="text"
              name="login_id"
              id="login_id"
              value={formData.login_id}
              onChange={handleChange}
              required
            />
            {formData.login_id && (
              <span
                className={`registro-icon ${isLoginIdOk ? "success" : "error"}`}
              >
                {isLoginIdOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {/* Contraseña */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="contrasena">
              Contraseña
            </label>
            <input
              className="registro-input"
              type="password"
              name="contrasena"
              id="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
            {formData.contrasena && (
              <span
                className={`registro-icon ${isPassOk ? "success" : "error"}`}
              >
                {isPassOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {/* Repetir contraseña */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="contrasena_confirmation">
              Repetir contraseña
            </label>
            <input
              className="registro-input"
              type="password"
              name="contrasena_confirmation"
              id="contrasena_confirmation"
              value={formData.contrasena_confirmation}
              onChange={handleChange}
              required
            />
            {formData.contrasena_confirmation && (
              <span
                className={`registro-icon ${isRepeatOk ? "success" : "error"}`}
              >
                {isRepeatOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {/* Alias */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="alias">
              Alias
            </label>
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
              <span
                className={`registro-icon ${isAliasOk ? "success" : "error"}`}
              >
                {isAliasOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {/* Correo */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="correo">
              Correo
            </label>
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
              <span
                className={`registro-icon ${isCorreoOk ? "success" : "error"}`}
              >
                {isCorreoOk ? "✓" : "✗"}
              </span>
            )}
          </div>
          {/* Bio */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="bio">
              Biografía
            </label>
            <textarea
              className="registro-input"
              name="bio"
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={2}
            />
          </div>
          {/* Redes sociales */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="facebook">
              Facebook
            </label>
            <input
              className="registro-input"
              type="text"
              name="facebook"
              id="facebook"
              value={formData.facebook}
              onChange={handleChange}
            />
          </div>
          <div className="registro-field">
            <label className="registro-label" htmlFor="twitter">
              Twitter
            </label>
            <input
              className="registro-input"
              type="text"
              name="twitter"
              id="twitter"
              value={formData.twitter}
              onChange={handleChange}
            />
          </div>
          <div className="registro-field">
            <label className="registro-label" htmlFor="instagram">
              Instagram
            </label>
            <input
              className="registro-input"
              type="text"
              name="instagram"
              id="instagram"
              value={formData.instagram}
              onChange={handleChange}
            />
          </div>
          <div className="registro-field">
            <label className="registro-label" htmlFor="youtube">
              YouTube
            </label>
            <input
              className="registro-input"
              type="text"
              name="youtube"
              id="youtube"
              value={formData.youtube}
              onChange={handleChange}
            />
          </div>
          {/* Foto de perfil */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="foto_perfil">
              Foto de perfil (URL)
            </label>
            <input
              className="registro-input"
              type="text"
              name="foto_perfil"
              id="foto_perfil"
              value={formData.foto_perfil}
              onChange={handleChange}
            />
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
        <a href="/LogIn" className="enlace">
          Ya tengo una cuenta
        </a>
      </div>
    </div>
  );
};

export default Registro;

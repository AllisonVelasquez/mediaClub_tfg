import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logoNombreOscuro from "../assents/logo_nombre_oscuro.png";
import "./Registro.css";
import { crearUsuario, logInUsuario } from "../../services/Usuarios/CRUD_Usuarios";

const Registro = () => {
  const navigate = useNavigate();

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
    foto_perfil: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(null);

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // Validaciones
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

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten imágenes.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setFormData((f) => ({ ...f, foto_perfil: file }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isLoginIdOk || !isAliasOk || !isCorreoOk || !isPassOk || !isRepeatOk) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("login_id", formData.login_id);
    formPayload.append("correo", formData.correo);
    formPayload.append("alias", formData.alias);
    formPayload.append("contrasena", formData.contrasena);
    formPayload.append("contrasena_confirmation", formData.contrasena_confirmation);
    formPayload.append("bio", formData.bio);
    formPayload.append("facebook", formData.facebook);
    formPayload.append("twitter", formData.twitter);
    formPayload.append("instagram", formData.instagram);
    formPayload.append("youtube", formData.youtube);
    if (formData.foto_perfil) {
      formPayload.append("foto_perfil", formData.foto_perfil);
    }

    try {
      const registroResponse = await crearUsuario(formPayload);
      setSuccess("Registro exitoso");

      // Login automático
      const loginData = {
        correo: formData.correo,
        contrasena: formData.contrasena,
      };

      const loginResponse = await logInUsuario(loginData);

      if (loginResponse.token) {
        localStorage.setItem("token", loginResponse.token);
      }

      const alias = registroResponse?.contenido?.alias;
      if (alias) {
        navigate(`/usuarios/${alias}/perfil`);
      } else {
        navigate("/Perfil");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Error al registrar o iniciar sesión. Intenta más tarde."
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
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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
              aria-label={showPasswordConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
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

          {/* Bio y redes */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="bio">Biografía</label>
            <textarea className="registro-input" name="bio" id="bio" value={formData.bio} onChange={handleChange} rows={2} />
          </div>

          {["facebook", "twitter", "instagram", "youtube"].map((red) => (
            <div className="registro-field" key={red}>
              <label className="registro-label" htmlFor={red}>{red.charAt(0).toUpperCase() + red.slice(1)}</label>
              <input
                className="registro-input"
                type="text"
                name={red}
                id={red}
                value={formData[red]}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Dropzone */}
          <div
            className="registro-dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("foto_perfil_input").click()}
          >
            {preview ? (
              <img src={preview} alt="Vista previa" className="registro-preview" />
            ) : (
              <p>Arrastra y suelta una imagen o haz clic para seleccionar</p>
            )}
            <input
              type="file"
              accept="image/*"
              id="foto_perfil_input"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file?.type.startsWith("image/")) {
                  setError("Solo se permiten imágenes.");
                  return;
                }
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreview(reader.result);
                  setFormData((f) => ({ ...f, foto_perfil: file }));
                };
                reader.readAsDataURL(file);
              }}
            />
          </div>

          {/* Botón */}
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
    </div>
  );
};
export default Registro;

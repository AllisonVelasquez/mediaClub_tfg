import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { logInUsuario } from "../../services/Usuarios/CRUD_Usuarios";
import { AuthContext } from "./AuthContext";
import "./LogIn.css";
import logoNombreOscuro from "../assents/logo_nombre_oscuro.png";

const LogIn = () => {
  const [formData, setFormData] = useState({
    login_id: "",
    contrasena: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { logIn } = useContext(AuthContext);

  // Validación visual para login_id (minúsculas y sin espacios)
  const isLoginIdOk =
    formData.login_id.length > 2 &&
    formData.login_id === formData.login_id.toLowerCase() &&
    !/\s/.test(formData.login_id);

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

    if (!isLoginIdOk) {
      setError("El usuario debe estar en minúsculas y sin espacios.");
      setLoading(false);
      return;
    }

    try {
      const response = await logInUsuario({
        login_id: formData.login_id,
        contrasena: formData.contrasena,
      });

      const { access_token } = response.contenido.original;

      logIn(access_token);
      navigate("/Perfil");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Error al iniciar sesión. Verifica tus credenciales."
      );
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
      <h2
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          color: "#2a3b42",
          marginTop: "1.5rem",
        }}
      >
        Iniciar sesión
      </h2>
      <form className="login-container" onSubmit={handleLogin}>
        <label htmlFor="login_id">Usuario:</label>
        <input
          type="text"
          id="login_id"
          name="login_id"
          value={formData.login_id}
          onChange={handleChange}
          autoComplete="username"
        />
        {!isLoginIdOk && formData.login_id && (
          <div className="error">
            El usuario debe estar en minúsculas y sin espacios.
          </div>
        )}
        <label htmlFor="contrasena">Contraseña:</label>
        <input
          type="password"
          id="contrasena"
          name="contrasena"
          value={formData.contrasena}
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
      <div className="login-link">
        <Link to="/" className='enlace'>Volver al inicio</Link>
      </div>

    </div>
  );
};

export default LogIn;

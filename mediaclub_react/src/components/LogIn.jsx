import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUsuarios } from "../services/axios";
import bcrypt from "bcryptjs";
import "./LogIn.css";

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
        <img src="/logo_nombre_oscuro.png" alt="Muvis Logo" />
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
      <div className="login-link">
        <Link to="/" className='enlace'>Volver al inicio</Link>
      </div>
    </div>
  );
};

export default LogIn;
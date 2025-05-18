import React, { useState } from "react";
import bcrypt from "bcryptjs";

import { useNavigate } from 'react-router-dom';
import './Registro.css';
import logoNombreOscuro from './logo_nombre_oscuro.png';
import { crearUsuario,getUsuarios,getUsuario } from "../services/Usuarios/CRUD_Usuarios";
const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    alias_publico: '',
    contraseña: '',
    repetirContraseña: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Validaciones simples
  const isNombreOk = formData.nombre.length > 2;
  const isAliasOk = formData.alias_publico.length > 2;
  const isEmailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPassOk = formData.contraseña.length >= 6;
  const isRepeatOk = formData.contraseña === formData.repetirContraseña && isPassOk;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {

    
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isNombreOk || !isAliasOk || !isEmailOk || !isPassOk || !isRepeatOk) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      const usuarios = await getUsuarios();
  // Validaciones de duplicado
  const emailExiste =usuarios.some((u) => u.correo === formData.email);
  const aliasExiste =usuarios.some((u) => u.alias === formData.alias_publico);
  const loginExiste =usuarios.some((u) => u.login_id === formData.nombre);

  if (emailExiste) {
    setError("El correo ya está registrado.");
    return;
  }
  if (aliasExiste) {
    setError("El alias público ya está en uso.");
    return;
  }
  if (loginExiste) {
    setError("El nombre de usuario ya está en uso.");
    return;
  }

  // Simula hash y datos para crear usuario
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(formData.contraseña, salt);

  const nuevoUsuario = {
    login_id: formData.nombre,
    correo: formData.email,
    contrasena_hash: hashedPassword,
    alias: formData.alias_publico,
    bio: "",
    redes: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    },
    confirmado: false,
    bloqueado: false,
    fecha_creacion: new Date().toISOString(),
    fecha_ultima_actualizacion: new Date().toISOString(),
    foto_perfil: "/images/default.webp",
  };

  await crearUsuario(nuevoUsuario);
  setSuccess("Registro exitoso");
  // navigate('/LogIn'); // si quieres redirigir
      
    } catch (err) {
      console.error(err);
      setError("Error al registrar usuario. Intenta más tarde.");
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
          {/* Nombre de usuario */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="nombre">Nombre de usuario</label>
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
              <span className={`registro-icon ${isNombreOk ? 'success' : 'error'}`}>
                {isNombreOk ? '✓' : '✗'}
              </span>
            )}
          </div>
          {/* Contraseña */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="contraseña">Contraseña</label>
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
              <span className={`registro-icon ${isPassOk ? 'success' : 'error'}`}>
                {isPassOk ? '✓' : '✗'}
              </span>
            )}
          </div>
          {/* Alias público */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="alias_publico">Alias público</label>
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
              <span className={`registro-icon ${isAliasOk ? 'success' : 'error'}`}>
                {isAliasOk ? '✓' : '✗'}
              </span>
            )}
          </div>
          {/* Repetir contraseña */}
          <div className="registro-field">
            <label className="registro-label" htmlFor="repetirContraseña">Repetir contraseña</label>
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
              <span className={`registro-icon ${isRepeatOk ? 'success' : 'error'}`}>
                {isRepeatOk ? '✓' : '✗'}
              </span>
            )}
          </div>
          {/* Correo */}
          <div className="registro-field" style={{ gridColumn: "1 / span 1" }}>
            <label className="registro-label" htmlFor="email">Correo</label>
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
              <span className={`registro-icon ${isEmailOk ? 'success' : 'error'}`}>
                {isEmailOk ? '✓' : '✗'}
              </span>
            )}
          </div>
          {/* Botón */}
          <div className="registro-btn-row">
            <button className="registro-btn" type="submit">Registrarme</button>
          </div>
          {/* Mensajes */}
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </div>
      </form>
      <div className="registro-link">
        <a href="/LogIn" className='enlace'>Ya tengo una cuenta</a>
      </div>
    </div>
  );
};

export default Registro;
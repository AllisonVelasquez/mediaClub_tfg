import React, { useState } from 'react';

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.contraseña !== formData.repetirContraseña) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Aquí podrías enviar los datos a una API
    console.log('Datos enviados:', formData);
    setSuccess('Registro exitoso');
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        /><br />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        /><br />

        <input
          type="text"
          name="alias_publico"
          placeholder="Alias público"
          value={formData.alias_publico}
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          required
        /><br />

        <input
          type="password"
          name="repetirContraseña"
          placeholder="Repetir contraseña"
          value={formData.repetirContraseña}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Registrarse</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
};

export default Registro;

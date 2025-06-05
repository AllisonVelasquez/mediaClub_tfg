import React, { useState, useEffect } from "react";
import "./explorador.css";

const Buscador = ({ valorInicial = "", contextoOculto }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(valorInicial);
  }, [valorInicial]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Búsqueda enviada:", {
      query,
      contexto: contextoOculto,
    });

  };

  return (
    <div class="buscador-container">
      <nav class="desplegable">
        <select class="opciones" name="opciones">
          <option value="Todos">Todos</option>
          <option value="Todos">Todos</option>
          <option value="Todos">Todos</option>
          <option value="Todos">Todos</option>
          <option value="Todos">Todos</option>
          <option value="Todos">Todos</option>
          <option value="Todos">Todos</option>
          <option value="Todos">Todos</option>
          <option value="Todos">Todos</option>
        </select>
      </nav>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar..."
          className="buscador-input"
        />
        <button type="submit" className="buscador-btn">
          🔍
        </button>
      </form>
    </div>
  );
};

export default Buscador;

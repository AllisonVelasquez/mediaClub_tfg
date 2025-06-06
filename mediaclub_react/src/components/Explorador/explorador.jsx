import React, { useState, useEffect } from "react";
import "./explorador.css";

const Buscador = ({ valorInicial = "", contextoOculto, onBuscar }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(valorInicial);
  }, [valorInicial]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onBuscar) {
      onBuscar(query.trim());
    }

    console.log("Búsqueda enviada:", {
      query,
      contexto: contextoOculto,
    });
  };

  return (
    <div className="buscador-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar por nombre..."
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

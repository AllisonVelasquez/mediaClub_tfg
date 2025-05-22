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

    // Aquí podrías llamar a una función de búsqueda o hacer fetch
  };

  return (
    <form className="buscador-container" onSubmit={handleSubmit}>
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
  );
};

export default Buscador;

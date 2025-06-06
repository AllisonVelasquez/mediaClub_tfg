import React from "react";

const Resena = ({ resena, modo, onEliminar }) => {
  const fecha = new Date(resena.fecha).toLocaleDateString("es-ES");

  return (
    <div>
      {modo === "usuario" && resena.frame && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w200${resena.frame.poster_url}`}
            alt={resena.frame.titulo}
          />
          <h3>{resena.frame.titulo}</h3>
        </div>
      )}

      <p>Fecha: {fecha}</p>
      <p>{resena.contenido}</p>

      {resena.spoiler && (
        <p>⚠️ Contiene spoilers</p>
      )}

      {modo === "usuario" && onEliminar && (
        <button onClick={() => onEliminar(resena)}>Eliminar</button>
      )}
    </div>
  );
};

export default Resena;

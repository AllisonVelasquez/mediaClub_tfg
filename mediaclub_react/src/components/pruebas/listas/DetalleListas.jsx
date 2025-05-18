// src/components/DetalleLista.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListas } from "../../../services/Listas/CRUD_Listas"; // Importa desde 'services/axios'

const DetalleLista = () => {
  const { id } = useParams();
  const [lista, setLista] = useState(null);

  useEffect(() => {
    const fetchLista = async () => {
        const listasRes = await getListas();
        
      const listaEncontrada = listasRes.data.listas.find(
        (l) => l.lista_id === parseInt(id)
      );
        setLista(listaEncontrada);
        console.log(listaEncontrada);
        
    };

    fetchLista();
  }, [id]);

  if (!lista) return <p>Cargando lista...</p>;

  return (
    <div>
      <h2>{lista.nombre}</h2>
      <p>{lista.descripcion}</p>
      <h3>Películas</h3>
      <ul>
        {lista.map((pelicula) => (
          <li key={pelicula.id}>{pelicula.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default DetalleLista;

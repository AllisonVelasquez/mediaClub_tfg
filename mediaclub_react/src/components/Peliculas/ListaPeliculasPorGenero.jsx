import React, { useEffect, useState } from "react";
import "./ListaPeliculasPorGenero.css";
import { getGeneros } from "../../services/Frames/CRUD_Frames";
import ListaPeliculas from "./ListaPeliculas";
import { useNavigate } from "react-router-dom";

const PeliculasPorGenero = () => {
  const [generos, setGeneros] = useState([]);
  const [loadingGeneros, setLoadingGeneros] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const data = await getGeneros();
        setGeneros(data.contenido?.data || []);
      } catch (error) {
        console.error("Error al cargar géneros:", error);
      } finally {
        setLoadingGeneros(false);
      }
    };
    fetchGeneros();
  }, []);

  const handleVerMasClick = () => {
    navigate("/generos");
  };

  if (loadingGeneros) return <p className="estado-carga">Cargando todas las películas...</p>;

  return (
    <div className="peliculas-container">
      <div className="peliculas-bg">
        <h2 className="peliculas-title">Películas por género</h2>
        {generos.map((genero) => (
          <section key={genero.id} style={{ marginBottom: "3rem" }}>
            <h3>{genero.nombre}</h3>
                      { console.log(genero.id) }

            <ListaPeliculas generoId={genero.id} />
          </section>
        ))}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button className="ver-mas-btn" onClick={handleVerMasClick}>
            Ver más géneros
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeliculasPorGenero;
import React from "react";
import "./Menu.css";
import Buscador from "../Explorador/explorador";
import { NavLink, Link } from "react-router-dom";

function Menu() {
  return (
    <div className="container_menu">
    <nav class="container_nav">
      <Link to="/Inicio">
        <img src="/logo.png" alt="Muvis Logo" className="logo" />
      </Link>
      <div className="menu-links">
        <NavLink
          to="/Inicio"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/Perfil"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Perfil
        </NavLink>
        <NavLink
          to="/Peliculas"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Peliculas{" "}
        </NavLink>
        <NavLink
          to="/ListaUsuarios"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Usuarios
        </NavLink>
        <NavLink
          to="/DetallesPeliculas"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          DetallesPeliculas
        </NavLink>
        <NavLink
          to="/Resenas"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Reseñas
        </NavLink>
                <NavLink
          to="/error"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          error
        </NavLink>
                <NavLink
          to="/Resenas"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Reseñas{" "}
        </NavLink>
      </div>  

    </nav>   
         <Buscador/>
    </div>
  );
}

export default Menu;

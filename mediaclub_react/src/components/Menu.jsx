import React from "react";
import "./Menu.css";
import { NavLink, Link } from "react-router-dom";
import logo from "./logo.png";

function Menu() {
  return (
    <nav>
      <Link to="/Inicio">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="menu-links">
        <NavLink
          to="/Inicio"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Inicio
        </NavLink>
        {/* <NavLink to="/Explorar" className={({ isActive }) => isActive ? 'opcion-activa' : 'opcion'}>
        Explorar
      </NavLink>
      <NavLink to="/Listas" className={({ isActive }) => isActive ? 'opcion-activa' : 'opcion'}>
        Listas
      </NavLink> */}
        <NavLink
          to="/Perfil"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Perfil
        </NavLink>
        <NavLink
          to="/Registro"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Registro
        </NavLink>
        <NavLink
          to="/Login"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Login
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          Cerrar sesión
        </NavLink>
      </div>
    </nav>
  );
}

export default Menu;

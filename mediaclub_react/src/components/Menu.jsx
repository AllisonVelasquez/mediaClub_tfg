import React from "react";
import "./Menu.css";
import { NavLink, Link } from "react-router-dom";
import logo from "./LOGO.png";

function Menu() {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="menu-links">
        <NavLink
          to="/landing"
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
          to="/TodasLasListas"
          className={({ isActive }) => (isActive ? "opcion-activa" : "opcion")}
        >
          listas
        </NavLink>
      </div>
    </nav>
  );
}

export default Menu;

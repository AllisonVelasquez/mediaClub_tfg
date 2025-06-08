import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../LogIn/AuthContext";
import Buscador from "../Explorador/explorador";
import "./Menu.css";

function Menu() {
  const { logOut } = useContext(AuthContext);

  return (
    <div className="container_menu">
      <nav className="container_nav">
        <Link to="/Inicio">
          <img src="/logo.png" alt="Muvis Logo" className="logo" />
        </Link>
        <div className="menu-links">
          <NavLink
            to="/Inicio"
            className={({ isActive }) =>
              isActive ? "opcion-activa" : "opcion"
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/Perfil"
            className={({ isActive }) =>
              isActive ? "opcion-activa" : "opcion"
            }
          >
            Perfil
          </NavLink>

          <NavLink
            to="/listaActores"
            className={({ isActive }) =>
              isActive ? "opcion-activa" : "opcion"
            }
          >
            Actores
          </NavLink>
          <NavLink
            to="/PeliculasPorGenero"
            className={({ isActive }) =>
              isActive ? "opcion-activa" : "opcion"
            }
          >
             Películas
          </NavLink>
                   <NavLink
            to="/Posts"
            className={({ isActive }) =>
              isActive ? "opcion-activa" : "opcion"
            }
          >
             Posts
          </NavLink>

          <button className="logout-btn" onClick={logOut}>
            Cerrar sesión
          </button>
        </div>
      </nav>
      <Buscador />
    </div>
  );
}

export default Menu;

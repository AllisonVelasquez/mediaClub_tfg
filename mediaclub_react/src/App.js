import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "./components/perfil/Perfil.jsx";
import Registro from "./components/Registro";
import UserManagement from "./components/LogIn";
import Menu from "./components/Menu";
import Peliculas from "./components/landing/landing.jsx";
import PeliculaDetalle from "./components/PeliculaDetalle";
import Inicio from "./components/inicio/inicio.jsx";

function App() {
  const location = useLocation();
  const hideMenu = ["/", "/LogIn", "/Registro"].includes(location.pathname);

  return (
    <>
      {!hideMenu && <Menu />}
      <Routes>
        <Route path="/" element={<Peliculas />} /> 
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Perfil" element={<Profile />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/LogIn" element={<UserManagement />} />
        <Route path="/pelicula/:id" element={<PeliculaDetalle />} />
      </Routes>
    </>
  );
}

export default App;
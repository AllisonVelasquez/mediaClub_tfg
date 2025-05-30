import { Routes, Route,useLocation } from "react-router-dom";
import Profile from "./components/perfil/Perfil.jsx";
import Registro from "./components/Registro/Registro.jsx";
import UserManagement from "./components/LogIn/LogIn.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Landing from "./components/landing/landing.jsx";
import Peliculas from "./components/Peliculas/ListaPeliculas.jsx";
import PeliculaDetalle from "./components/Peliculas/PeliculaDetalle";
import TodasLasListas from "./components/listas/listas";
import DetalleLista from "./components/listas/DetallesListas";
import Inicio from "./components/inicio/inicio.jsx";
import UserList from "./components/Usuarios/usserList.jsx";


function App() {
    const location = useLocation();
  const hideMenu = ["/", "/LogIn", "/Registro"].includes(location.pathname);

  return (
    <>
      {!hideMenu && <Menu />}
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Perfil/:userId" element={<Profile />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/LogIn" element={<UserManagement />} />
        <Route path="/pelicula/:id" element={<PeliculaDetalle />} />
      
        <Route path="/Peliculas" element={<Peliculas />} />
        <Route path="/DetalleLista/:id" element={<DetalleLista />} />
        <Route path="/TodasLasListas" element={<TodasLasListas />} />
        <Route path="/ListaUsuarios" element={<UserList />} />
      </Routes>
    </>
  );
}

export default App;

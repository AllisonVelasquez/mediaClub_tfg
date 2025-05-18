import { Routes, Route } from "react-router-dom";
import Profile from "./components/Perfil";
import Registro from "./components/Registro";
import UserManagement from "./components/LogIn";
import Menu from "./components/Menu";
import Peliculas from "./components/landing";
import PeliculaDetalle from "./components/PeliculaDetalle";
import DetalleLista from "./components/pruebas/listas/DetalleListas";
import TodasLasListas from "./components/pruebas/listas/TodasLasListas";
import PerfilUsuario from "./components/pruebas/perfil/PerfilUsuario";
import Prueba from "./components/pruebas/newAxios"


function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/Perfil" element={<Profile />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/LogIn" element={<UserManagement />} />
        <Route path="/landing" element={<Peliculas />} />
        <Route path="/pelicula/:id" element={<PeliculaDetalle />} />

        {/* Pruebas */}
        <Route path="/todas" element={<TodasLasListas />} />
        <Route path="/perfil/:id" element={<PerfilUsuario />} />
        <Route path="/lista/:id" element={<DetalleLista />} />
        <Route path="/prueba" element={<Prueba />} />
      </Routes>
    </>
  );
}


export default App;

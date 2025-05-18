import { Routes, Route } from "react-router-dom";
import Profile from "./components/Perfil";
import Registro from "./components/Registro";
import UserManagement from "./components/LogIn";
import Menu from "./components/Menu";
import Peliculas from "./components/landing";
import PeliculaDetalle from "./components/PeliculaDetalle";
import TodasLasListas from "./components/listas/listas";
import DetalleLista from "./components/listas/DetallesListas";

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
        <Route path="/DetalleLista/:id" element={<DetalleLista />} />

        <Route path="/TodasLasListas" element={<TodasLasListas />} />
      </Routes>
    </>
  );
}

export default App;

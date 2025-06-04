import { Routes, Route, useLocation } from "react-router-dom";
import Menu from "./components/Menu/Menu.jsx";
import Landing from "./components/landing/landing.jsx";
import Registro from "./components/Registro/Registro.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import Perfil from "./components/Perfil/Perfil.jsx"; 
import PrivateRoute from "./components/PrivateRouter.jsx"; 
import Peliculas from "./components/Peliculas/ListaPeliculas.jsx";
import PeliculaDetalle from "./components/Peliculas/PeliculaDetalle";

function App() {
  const location = useLocation();
  const hideMenu = ["/", "/LogIn", "/Registro"].includes(location.pathname);

  return (
    <>
      {!hideMenu && <Menu />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Registro" element={<Registro />} />

        {/* Rutas protegidas */}
        <Route
          path="/Perfil"
          element={
            <PrivateRoute>
              <Perfil />
              <PeliculaDetalle />
              <Peliculas />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

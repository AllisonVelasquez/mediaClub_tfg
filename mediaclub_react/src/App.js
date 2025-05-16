// import { Routes, Route } from "react-router-dom";
// import Profile from "./components/Perfil";
// import Registro from "./components/Registro";
// import UserManagement from "./components/LogIn";
// import Menu from "./components/Menu";
// import Peliculas from "./components/landing";
// import PeliculaDetalle from "./components/PeliculaDetalle";

// function App() {
//   return (
//     <>
//       <Menu />
//       <Routes>
//         <Route path="/Perfil" element={<Profile />} />
//         <Route path="/Registro" element={<Registro />} />
//         <Route path="/LogIn" element={<UserManagement />} />
//         <Route path="/landing" element={<Peliculas />} />
//         <Route path="/pelicula/:id" element={<PeliculaDetalle />} />
//       </Routes>
//     </>
//   );
// }

// export default App;


import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "./components/perfil/Perfil.jsx";
import Registro from "./components/Registro";
import UserManagement from "./components/LogIn";
import Menu from "./components/Menu";
import Peliculas from "./components/landing/landing.jsx";
import PeliculaDetalle from "./components/PeliculaDetalle";

function App() {
  const location = useLocation();
  // Oculta el menú en landing (/), LogIn y Registro
  const hideMenu = ["/", "/LogIn", "/Registro"].includes(location.pathname);

  return (
    <>
      {!hideMenu && <Menu />}
      <Routes>
        <Route path="/" element={<Peliculas />} /> {/* landing es la página principal */}
        <Route path="/inicio" element={<Peliculas />} /> {/* Inicio ahora es /inicio */}
        <Route path="/Perfil" element={<Profile />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/LogIn" element={<UserManagement />} />
        <Route path="/pelicula/:id" element={<PeliculaDetalle />} />
      </Routes>
    </>
  );
}

export default App;
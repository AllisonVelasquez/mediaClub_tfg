import { Routes, Route, useLocation } from "react-router-dom";
import Menu from "./components/Menu/Menu.jsx";
import Landing from "./components/landing/landing.jsx";
import Registro from "./components/Registro/Registro.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import Perfil from "./components/Perfil/Perfil.jsx";
import PrivateRoute from "./components/PrivateRouter.jsx";
import ListaActores from "./components/Actores/ListaActores.jsx";
import ListaPeliculas from "./components/Peliculas/ListaPeliculas.jsx";
import PeliculasPorGenero from "./components/Peliculas/ListaPeliculasPorGenero.jsx";
import Generos from "./components/Peliculas/Generos.jsx";
import PeliculaDetalles from "./components/Peliculas/PeliculaDetalle.jsx";
import Actor from "./components/Actores/Actor.jsx";
import EditarPerfil from "./components/Perfil/EditarPerfil.jsx";
import ListaPosts from "./components/Posts/ListaPosts.jsx";
import ListaDetalle from "./components/Listas/ListasDetalles.jsx";
import UserProfileFull from "./components/Perfil/PerfilUsuarios.jsx";
import Inicio from "./components/Inicio/Inicio.jsx";
// import Resenas from "./components/Resenas/Resenas.jsx"; // <-- Importa el componente de reseñas

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
          path="/Inicio"
          element={
            <PrivateRoute>
              <Inicio />
            </PrivateRoute>
          }
        />
        <Route
          path="/Perfil/:id"
          element={
            <PrivateRoute>
              <UserProfileFull />
            </PrivateRoute>
          } />  
        <Route
          path="/Perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar-perfil"
          element={
            <PrivateRoute>
              <EditarPerfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/Peliculas/Genero/:id"
          element={
            <PrivateRoute>
              <ListaPeliculas />
            </PrivateRoute>
          }
        />
        <Route
          path="/Peliculas"
          element={
            <PrivateRoute>
              <Generos />
            </PrivateRoute>
          }
        />
        <Route
          path="/PeliculasPorGenero"
          element={
            <PrivateRoute>
              <PeliculasPorGenero />
            </PrivateRoute>
          }
        />
        <Route
          path="/peliculasDetalles/:id"
          element={
            <PrivateRoute>
              <PeliculaDetalles />
            </PrivateRoute>
          }>

        </Route>
        <Route
          path="/Generos"
          element={
            <PrivateRoute>
              <Generos />
            </PrivateRoute>
          }
        />
        <Route
          path="/ListaActores"
          element={
            <PrivateRoute>
              <ListaActores />
            </PrivateRoute>
          }></Route>
        <Route
          path="/listas/:id"
          element={
            <PrivateRoute>
              <ListaDetalle />
            </PrivateRoute>
          }></Route>
        <Route
          path="/actores/:id"
          element={
            <PrivateRoute>
              <Actor />
            </PrivateRoute>
          } ></Route>

        <Route
          path="/Posts"
          element={
            <PrivateRoute>
              <ListaPosts />
            </PrivateRoute>
          } ></Route>

      </Routes>
    </>
  );
}

export default App;

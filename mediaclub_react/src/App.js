import { Routes, Route,useLocation } from "react-router-dom";
import Menu from "./components/Menu/Menu.jsx";
import Landing from "./components/landing/landing.jsx";
import Registro from "./components/Registro/Registro.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";

function App() {
    const location = useLocation();
  const hideMenu = ["/", "/LogIn", "/Registro"].includes(location.pathname);

  return (
    <>
      {!hideMenu && <Menu />}
      <Routes>
        <Route path="/" element={<Landing />} /> 

      </Routes>
    </>
  );
}

export default App;

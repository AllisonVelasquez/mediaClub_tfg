import { Routes, Route,useLocation } from "react-router-dom";
import Menu from "./components/Menu";


function App() {
    const location = useLocation();
  const hideMenu = ["/", "/LogIn", "/Registro"].includes(location.pathname);

  return (
    <>
      {!hideMenu && <Menu />}
      <Routes>

      </Routes>
    </>
  );
}

export default App;

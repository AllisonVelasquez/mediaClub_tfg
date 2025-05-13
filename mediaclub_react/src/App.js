import { Routes, Route } from "react-router-dom";
import Profile from "./components/Perfil";
import Registro from "./components/Registro";
import UserManagement from "./components/LogIn";
import Menu from "./components/Menu";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/Perfil" element={<Profile />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/LogIn" element={<UserManagement />} />
      </Routes>
    </>
  );
}

export default App;
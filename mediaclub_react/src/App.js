import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import UserList from "./components/UserList";
import Profile from "./components/Perfil";
import Registro from "./components/Registro";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/Perfil">Inicio</Link>
        <Link to="/UserList">Inicio</Link>
        <Link to="/Registro">Inicio</Link>
      </nav>
      <Routes>
        <Route path="/Perfil" element={<Profile />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/UserList" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;

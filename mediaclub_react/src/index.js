import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"; 
import { BrowserRouter } from 'react-router-dom';


// const Index = () => {
//   const [isDarkTheme, setIsDarkTheme] = useState(true); 

//   const toggleTheme = () => {
//     setIsDarkTheme(!isDarkTheme); 
//   };

//   useEffect(() => {
//     document.body.classList[isDarkTheme ? 'remove' : 'add']('light-theme');
//   }, [isDarkTheme]);

//   return (
//     <div>
//       {/* Botón para cambiar entre temas */}
//       <button onClick={toggleTheme}>
//         Cambiar a {isDarkTheme ? 'Claro' : 'Oscuro'}
//       </button>

//       {/* Aquí renderizamos el componente App */}
//       <App />
//     </div>
//   );
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter><App /> </BrowserRouter>
);
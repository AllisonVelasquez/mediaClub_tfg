import React from 'react';
import  { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./index.css"; 

const Index = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true); 

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme); 
  };

  useEffect(() => {
    document.body.classList[isDarkTheme ? 'remove' : 'add']('light-theme');
  }, [isDarkTheme]);

  return (
    <div>
      {/* Botón para cambiar entre temas */}
      <button onClick={toggleTheme}>
        Cambiar a {isDarkTheme ? 'Claro' : 'Oscuro'}
      </button>

      {/* Aquí renderizamos el componente App */}
      <App />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Index /> {/* Renderizamos el componente Index que maneja el tema */}
  </React.StrictMode>
);

reportWebVitals();

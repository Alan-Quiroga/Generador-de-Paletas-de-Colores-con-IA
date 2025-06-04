import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css"; // Estilos globales (opcional)

// Renderiza la app en el div con id="root" del index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
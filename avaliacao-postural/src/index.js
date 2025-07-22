import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroPaciente from "./CadastroPaciente";
import Pacientes from "./pacientes";
import App from "./App"; // seu componente de avaliação

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Pacientes />} />
      <Route path="/cadastro" element={<CadastroPaciente />} />
      <Route path="/avaliar/:id" element={<App />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  </BrowserRouter>
);

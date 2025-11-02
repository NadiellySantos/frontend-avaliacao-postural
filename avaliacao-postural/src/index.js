import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroPaciente from "./CadastroPaciente";
import Pacientes from "./pacientes";
import CadastroMedico from "./CadastroMedico";
import Medicos from "./medicos";
import Login from "./Login";
import CadastroAvaliacao from "./CadastroAvaliacao";
import PesquisarHistoricoPaciente from "./PesquisaHistoricoPaciente";
import Historico from "./historico";
import App from "./App"; // seu componente de avaliação frontal
import Sagital from "./Sagital";
import Sobre from "./Sobre";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/*<Route path="/" element={<Pacientes />} />*/}
      <Route path="/pacientes" element={<Pacientes />} />
      <Route path="/medicos" element={<Medicos />} />
      <Route path="/" element={<Login />} />
      <Route path="/historicoPaciente" element={<PesquisarHistoricoPaciente />} />
      <Route path="/cadastro" element={<CadastroPaciente />} />
      <Route path="/cadastroMedico" element={<CadastroMedico />} />
      <Route path="/avaliar/:id" element={<App />} />
      <Route path="/sagital/:id" element={<Sagital />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastrar-avaliacao" element={<CadastroAvaliacao />} />
      <Route path="/listar-avaliacao" element={<PesquisarHistoricoPaciente />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="*" element={<h1>Página não encontrada</h1>} />
      <Route path="/sobre" element={<Sobre />} />
    </Routes>
  </BrowserRouter>
);

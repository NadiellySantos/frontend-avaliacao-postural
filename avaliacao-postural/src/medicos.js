// Pacientes.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Medicos = () => {
  const navigate = useNavigate();
  const [medico, setMedico] = useState([]);

  useEffect(() => {
    axios.get("https://backend-alignme.azurewebsites.net/listar-medicos")
      .then(response => setMedico(response.data))
      .catch(error => console.error("Erro ao buscar medicos:", error));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Medicos Cadastrados</h2>

      <button
        onClick={() => navigate("/cadastroMedico")}
        style={{ marginBottom: "20px", backgroundColor: "#007bff", color: "white", padding: "10px", border: "none", cursor: "pointer" }}
      >
        Cadastrar Novo Médico
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {medico.map(m => (
          <li key={m.id_medico} style={{ margin: "10px 0" }}>
            <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
              <strong>{m.nome}</strong> - {m.sexo} - Especialidade: {m.especialidade} 
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Medicos;

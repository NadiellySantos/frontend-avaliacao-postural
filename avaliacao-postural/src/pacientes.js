// Pacientes.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pacientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/listar-pacientes")
      .then(response => setPacientes(response.data))
      .catch(error => console.error("Erro ao buscar pacientes:", error));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Pacientes Cadastrados</h2>

      <button
        onClick={() => navigate("/cadastro")}
        style={{ marginBottom: "20px", backgroundColor: "#007bff", color: "white", padding: "10px", border: "none", cursor: "pointer" }}
      >
        Cadastrar Novo Paciente
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {pacientes.map(p => (
          <li key={p.id} style={{ margin: "10px 0" }}>
            <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
              <strong>{p.nome}</strong> - {p.idade} anos - {p.sexo}
              <button
                onClick={() => navigate(`/avaliar/${p.id}`)}
                style={{ marginLeft: "20px", padding: "5px 10px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}
              >
                Avaliar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pacientes;

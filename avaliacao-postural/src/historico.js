import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Historico = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Proteção para quando a página for acessada diretamente sem state
  const historico = Array.isArray(location.state?.resultados?.avaliacoes)
    ? location.state.resultados.avaliacoes
    : null;

  const handleVoltar = () => navigate("/");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Avaliações Cadastradas</h2>

      <button
        onClick={handleVoltar}
        style={{
          marginBottom: "20px",
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Voltar
      </button>

      {historico === null ? (
        <p>Nenhum dado encontrado. Por favor, pesquise um paciente primeiro.</p>
      ) : historico.length === 0 ? (
        <p>Este paciente ainda não possui avaliações cadastradas.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {historico.map((h) => (
            <li key={h.id_foto} style={{ margin: "10px 0" }}>
              <div
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <strong>CPF:</strong> {h.cpf} <br />
                <strong>Altura:</strong> {h.altura} <br />
                <strong>Resultado:</strong> {h.resultado_avaliacao} <br />
                <strong>Data:</strong> {h.data_avaliacao}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Historico;

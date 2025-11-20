import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IMaskInput } from 'react-imask';

const PesquisarHistoricoPaciente = () => {
  const navigate = useNavigate();

  const [historico, setPesquisarHistorico] = useState({
    cpf: ""
  });

  const [mensagem, setMensagem] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPesquisarHistorico((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limparCPF = (cpf) => cpf.replace(/\D/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cpfParaEnvio = {
        ...historico,
        cpf: limparCPF(historico.cpf)
      };
      
      const response = await axios.post(
        "https://backend-alignme.azurewebsites.net/listar-avaliacao",
        cpfParaEnvio,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/historico", { state: { resultados: response.data } });

    } catch (error) {
      console.error("Erro ao encontrar paciente:", error.response?.data || error.message);
      setMensagem(error.response?.data?.detail || "Erro ao encontrar paciente.");
    }
  };

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Digite o CPF do paciente para encontrar o histórico de avaliações</h2>

      <button onClick={handleVoltar} type="button">
        Voltar
      </button>

      <form onSubmit={handleSubmit}>
        <div>
          <label>CPF:</label>
          <IMaskInput
            mask="000.000.000-00"
            name="cpf"
            value={historico.cpf}
            onAccept={(value) => handleChange({target: {name: 'cpf', value}})}
            required
            className="form-input"
          />
        </div>
        <button type="submit">Pesquisar</button>
      </form>

      {mensagem && (
        <p className={mensagem.includes("sucesso") ? "message-success" : "message-error"}>
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default PesquisarHistoricoPaciente;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadastroPaciente = () => {
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState({
    nome: "",
    idade: "",
    sexo: "",
    endereco: "",
    telefone: "",
    email: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/cadastrar-paciente",
        paciente
      );
      setMensagem("Paciente cadastrado com sucesso!");
      console.log(response.data);
      setPaciente({
        nome: "",
        idade: "",
        sexo: "",
        endereco: "",
        telefone: "",
        email: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      setMensagem("Erro ao cadastrar paciente.");
    }
  };

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Cadastro de Paciente</h2>

      {/* Botão Voltar */}
      <button onClick={handleVoltar} type="button">
        Voltar
      </button>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={paciente.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Idade:</label>
          <input
            type="number"
            name="idade"
            value={paciente.idade}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Sexo:</label>
          <select
            name="sexo"
            value={paciente.sexo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={paciente.endereco}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={paciente.telefone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={paciente.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>

      {mensagem && (
        <p className={mensagem.includes("sucesso") ? "message-success" : "message-error"}>
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default CadastroPaciente;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadastroPaciente = () => {
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState({
    cpf: "",
    nome: "",
    data_nascimento: "",
    peso: "",
    raca: "",
    profissao: "",
    telefone: "",
    tipo_corporal: "",
    idade: "",
    sexo: "",
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
        cpf: "",
        nome: "",
        data_nascimento: "",
        peso: "",
        raca: "",
        profissao: "",
        telefone: "",
        tipo_corporal: "",
        idade: "",
        sexo: "",
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

      <button onClick={handleVoltar} type="button">
        Voltar
      </button>

      <form onSubmit={handleSubmit}>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={paciente.cpf}
            onChange={handleChange}
            required
          />
        </div>

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
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            value={paciente.data_nascimento}
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
          />
        </div>

        <div>
          <label>Sexo:</label>
          <select name="sexo" value={paciente.sexo} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label>Peso (kg):</label>
          <input
            type="number"
            step="0.01"
            name="peso"
            value={paciente.peso}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Raça:</label>
          <input
            type="text"
            name="raca"
            value={paciente.raca}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Profissão:</label>
          <input
            type="text"
            name="profissao"
            value={paciente.profissao}
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
          <label>Tipo Corporal:</label>
          <input
            type="text"
            name="tipo_corporal"
            value={paciente.tipo_corporal}
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CadastroMedico = () => {
  const navigate = useNavigate();

  const [medico, setMedico] = useState({
    cpf: "",
    nome: "",
    data_nascimento: "",
    especialidade: "",
    telefone: "",
    crm: "",
    sexo: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedico((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/cadastrar-medico",
        medico,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMensagem("Médico cadastrado com sucesso!");
      console.log(response.data);
      setMedico({
        cpf: "",
        nome: "",
        data_nascimento: "",
        especialidade: "",
        telefone: "",
        crm: "",
        sexo: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar médico:", error.response?.data || error.message);
      setMensagem("Erro ao cadastrar médico.");
    }
  };

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Cadastro de Médico</h2>

      <button onClick={handleVoltar} type="button">
        Voltar
      </button>

      <form onSubmit={handleSubmit}>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="cpf"
            value={medico.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={medico.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="data_nascimento"
            value={medico.data_nascimento}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Sexo:</label>
          <select name="sexo" value={medico.sexo} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label>Especialidade:</label>
          <input
            type="text"
            name="especialidade"
            value={medico.especialidade}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={medico.telefone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>CRM:</label>
          <input
            type="text"
            name="crm"
            value={medico.crm}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Salvar</button>
      </form>

      {mensagem && (
        <p
          className={
            mensagem.includes("sucesso")
              ? "message-success"
              : "message-error"
          }
        >
          {mensagem}
        </p>
      )}
    </div>
  );
};

export default CadastroMedico;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputMask from "react-input-mask";

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
    email: "",
    senha: ""
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedico((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limparCPF = (cpf) => cpf.replace(/\D/g, "");
  const limparTelefone = (tel) => tel.replace(/\D/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const medicoParaEnvio = {
        ...medico,
        cpf: limparCPF(medico.cpf),
        telefone: limparTelefone(medico.telefone)
      };

      const response = await axios.post(
        "http://localhost:5000/cadastrar-medico",
        medicoParaEnvio,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMensagem("Médico cadastrado com sucesso!");
      setMedico({
        cpf: "",
        nome: "",
        data_nascimento: "",
        especialidade: "",
        telefone: "",
        crm: "",
        sexo: "",
        email: "",
        senha: ""
      });
    } catch (error) {
      console.error("Erro ao cadastrar médico:", error.response?.data || error.message);
      setMensagem(error.response?.data?.detail || "Erro ao cadastrar médico.");
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
          <InputMask
            mask="999.999.999-99"
            name="cpf"
            value={medico.cpf}
            onChange={handleChange}
            required
            title="Digite um CPF válido"
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </div>

        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={medico.nome} onChange={handleChange} required />
        </div>

        <div>
          <label>Data de Nascimento:</label>
          <input type="date" name="data_nascimento" value={medico.data_nascimento} onChange={handleChange} required />
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
          <input type="text" name="especialidade" value={medico.especialidade} onChange={handleChange} />
        </div>

        <div>
          <label>Telefone:</label>
          <InputMask
            mask="(99) 99999-9999"
            name="telefone"
            value={medico.telefone}
            onChange={handleChange}
            required
          >
            {(inputProps) => <input {...inputProps} type="text" />}
          </InputMask>
        </div>

        <div>
          <label>CRM:</label>
          <input type="text" name="crm" value={medico.crm} onChange={handleChange} />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={medico.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={medico.senha}
            onChange={handleChange}
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,}"
            title="A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial."
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

export default CadastroMedico;

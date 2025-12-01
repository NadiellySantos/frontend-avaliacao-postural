import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IMaskInput } from 'react-imask';
import './cadastroMedico.css'; // <- CSS exclusivo desta página
import { Helmet } from "react-helmet";
import HeaderFisioterapeutas from "./headerFisioterapeutas.js";
import Footer from "./footer.js";

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
  const limparTelefone = (telefone) => telefone.replace(/\D/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const medicoParaEnvio = {
        ...medico,
        cpf: limparCPF(medico.cpf),
        telefone: limparTelefone(medico.telefone)
      };

      await axios.post("https://backend-alignme.azurewebsites.net/cadastrar-medico", medicoParaEnvio, {
        headers: { "Content-Type": "application/json" },
      });

      setMensagem("Fisoterapeuta cadastrado com sucesso!");
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
      setMensagem(error.response?.data?.detail || "Erro ao cadastrar fisioterapeuta.");
    }
  };

  const handleVoltar = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Pacientes - AlignMe</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        <link
          rel="stylesheet"
          href="/assets/css/main.css"
        />
        <link
          rel="stylesheet"
          href="/CadastroPacientes.css"
        />
      </Helmet>
      <div className="container-fluid cadastro-medico-container min-vh-100">

        
          <HeaderFisioterapeutas />
          
                  <div
                    className="page-title text-center text-dark"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('/img/medititle.jpg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      padding: "40px 0",
                    }}
                  >
                    <h2 className="fw-bold">Cadastro de Fisioterapeutas</h2>
                  </div>
          
          <div className="container my-5">
            
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>CPF:</label>
                  <IMaskInput
                    mask="000.000.000-00"
                    name="cpf"
                    value={medico.cpf}
                    onAccept={(value) => handleChange({target: {name: 'cpf', value}})}
                    required
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Nome:</label>
                  <input type="text" name="nome" value={medico.nome} onChange={handleChange} required className="form-control" />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Data de Nascimento:</label>
                  <input type="date" name="data_nascimento" value={medico.data_nascimento} onChange={handleChange} required className="form-control" />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Sexo:</label>
                  <select name="sexo" value={medico.sexo} onChange={handleChange} className="form-select">
                    <option value="">Selecione</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label>Especialidade:</label>
                  <input type="text" name="especialidade" value={medico.especialidade} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Telefone:</label>
                  <IMaskInput
                    mask="(00) 00000-0000"
                    name="telefone"
                    value={medico.telefone}
                    onAccept={(value) => handleChange({target: {name: 'telefone', value}})}
                    required
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>CREFITO:</label>
                  <input type="text" name="crm" value={medico.crm} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email:</label>
                  <input type="email" name="email" value={medico.email} onChange={handleChange} required className="form-control" />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Senha:</label>
                  <input
                    type="password"
                    name="senha"
                    value={medico.senha}
                    onChange={handleChange}
                    required
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]).{8,}"
                    title="Mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial."
                    className="form-control"
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                {/* <button type="button" onClick={handleVoltar} className="btn btn-secondary">Voltar</button> */}
                <button type="submit" className="btn btn-primary">Salvar</button>
              </div>

              {mensagem && (
                <p className={`mt-3 ${mensagem.includes("sucesso") ? "text-success" : "text-danger"}`}>
                  {mensagem}
                </p>
              )}
            </form>
          </div>          
        </div>
      < Footer/>
    </>
  );
};

export default CadastroMedico;

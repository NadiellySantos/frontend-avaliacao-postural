import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header.js";
import Footer from "./footer.js";
import "./cadastroPaciente.css";
import { Helmet } from "react-helmet";
import { IMaskInput } from 'react-imask';
import LgpdModal from "./LgpdModal"; // LINHA 1: Import

const CadastroPaciente = () => {
  const navigate = useNavigate();

  useEffect(() => {
    loadBootstrap();
  }, []);

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
  const [showLgpdModal, setShowLgpdModal] = useState(false); // LINHA 2: Estado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const limparCPF = (cpf) => cpf.replace(/\D/g, "");
  const limparTelefone = (telefone) => telefone.replace(/\D/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowLgpdModal(true); // LINHA 3: Abrir modal
  };

  const handleLgpdConfirm = async () => {
    try {
      const pacienteParaEnvio = {
        ...paciente,
        cpf: limparCPF(paciente.cpf),
        telefone: limparTelefone(paciente.telefone)
      };

      await axios.post("http://localhost:5000/cadastrar-paciente", pacienteParaEnvio);
      setMensagem("Paciente cadastrado com sucesso!");
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
      setShowLgpdModal(false);
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);
      setMensagem("Erro ao cadastrar paciente.");
      setShowLgpdModal(false);
    }
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
          href="/pacientes.css"
        />
      </Helmet>

      <LgpdModal // LINHA 4: Modal no JSX
        show={showLgpdModal}
        onClose={() => setShowLgpdModal(false)}
        onConfirm={handleLgpdConfirm}
        patientName={paciente.nome}
      />

      <div className="d-flex flex-column min-vh-100">
        <Header />

        <div
          className="page-title text-center text-dark"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('/img/medititle.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "40px 0",
          }}
        >
          <h2 className="fw-bold">Cadastro de Paciente</h2>
        </div>

        <div className="container my-5">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">CPF:</label>
              <IMaskInput
                mask="000.000.000-00"
                name="cpf"
                onAccept={(value) => handleChange({target: {name: 'cpf', value}})}
                required
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Nome:</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                value={paciente.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Data de Nascimento:</label>
              <input
                type="date"
                name="data_nascimento"
                className="form-control"
                value={paciente.data_nascimento}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Idade:</label>
              <input
                type="number"
                name="idade"
                className="form-control"
                value={paciente.idade}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Sexo:</label>
              <select
                name="sexo"
                className="form-select"
                value={paciente.sexo}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Peso (kg):</label>
              <input
                type="number"
                step="0.01"
                name="peso"
                className="form-control"
                value={paciente.peso}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Raça:</label>
              <input
                type="text"
                name="raca"
                className="form-control"
                value={paciente.raca}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Profissão:</label>
              <input
                type="text"
                name="profissao"
                className="form-control"
                value={paciente.profissao}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Telefone:</label>
              <IMaskInput
                mask="(00) 00000-0000"
                name="telefone"
                onAccept={(value) => handleChange({target: {name: 'telefone', value}})}
                required
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Tipo Corporal:</label>
              <input
                type="text"
                name="tipo_corporal"
                className="form-control"
                value={paciente.tipo_corporal}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary px-4">
                Salvar
              </button>
            </div>
          </form>

          {mensagem && (
            <div
              className={`alert mt-4 ${
                mensagem.includes("sucesso") ? "alert-success" : "alert-danger"
              }`}
            >
              {mensagem}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

// Carrega Bootstrap CSS e JS dinamicamente
const loadBootstrap = () => {
  // CSS
  const cssLink = document.createElement("link");
  cssLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
  cssLink.rel = "stylesheet";
  cssLink.integrity = "sha384-Gtvn6A1SdT1oTi16rjYI6X1u1G4IM6zD0RbzWAcUuCdC7RlIrGb1n8H6sVfyc2Yg";
  cssLink.crossOrigin = "anonymous";
  document.head.appendChild(cssLink);

  // Bootstrap Icons (opcional)
  const iconLink = document.createElement("link");
  iconLink.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css";
  iconLink.rel = "stylesheet";
  document.head.appendChild(iconLink);

  // JS Bundle
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
  script.integrity = "sha384-Cw9F3z+1EEXNPAIXF7opbX/NqEPXYYs+Q9dBoHtLNjOnCMgS3SVxvUZonhzGFLX8";
  script.crossOrigin = "anonymous";
  document.body.appendChild(script);
};

export default CadastroPaciente;
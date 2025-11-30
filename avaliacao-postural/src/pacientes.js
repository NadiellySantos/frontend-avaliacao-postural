import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import "./pacientes.css"; // Você pode usar esse arquivo para customizações específicas
import HeaderPacientes from "./headerPacientes.js";
import Footer from "./footer.js";


const Pacientes = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-alignme.azurewebsites.net/listar-pacientes")
      .then((response) => setPacientes(response.data))
      .catch((error) => console.error("Erro ao buscar pacientes:", error));
  }, []);

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
      <div className="container-page" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <HeaderPacientes />
        <div className="containerPacientes">
          <div className="page-title">
          <div className="breadcrumbs">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/"><i className="bi bi-house"></i> Home</a></li>
                <li className="breadcrumb-item active current">Pacientes</li>
              </ol>
            </nav>
          </div>

          <div className="title-wrapper">
            <h1>Pacientes</h1>
            <p>Veja a lista de pacientes cadastrados ou adicione um novo.</p>
          </div>
        </div>
            <button
              onClick={() => navigate("/cadastro")}
              className="btn btn-primary"
              style={{ margin: "20px", padding: "10px 20px" }}
            >
              Cadastrar Novo Paciente
          </button>
          <div className="row" style={{ marginLeft: "0px" }}>
            {pacientes.map((paciente) => (
              <div className="col-md-4 mb-4" key={paciente.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{paciente.nome}</h5>
                    <p className="card-text">Idade: {paciente.idade}</p>
                    <p className="card-text">Sexo: {paciente.sexo}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/historico", { state: { paciente_id: paciente.id } })}
                    >
                      Avaliar Postura
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer style={{ alignSelf: "end" }} />
      </div>
     
 

      {/* Botão Voltar para Pacientes */}
    </>
  );
};

export default Pacientes;


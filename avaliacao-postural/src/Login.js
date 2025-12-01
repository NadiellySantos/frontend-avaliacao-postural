import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Footer from "./footer.js";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    senha: ""
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backend-alignme.azurewebsites.net/login",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMensagem("Login realizado com sucesso!");
      console.log(response.data);
      navigate("/pacientes");
    } catch (error) {
      console.error("Erro ao realizar login:", error.response?.data || error.message);
      setMensagem("Erro ao realizar login. Verifique suas credenciais.");
    }
  };

  const handleCadastro = () => {
    navigate("/cadastroMedico");
  };

  const irParaSobre = () => {
    navigate("/sobre");
  };

  return (
    <>
      <Helmet>
        <title>Login - AlignMe</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
      </Helmet>

      <div className="login-wrapper">

        <div className="alignme-logo-login">
          <i className="bi bi-hospital alignme-logo-icon"></i>
          <span className="alignme-logo-text">AlignMe</span>
        </div>

        <div className="login-card">
          <h3 className="login-title">
            <i className="bi bi-person-circle"></i> Login
          </h3>

          {mensagem && (
            <div
              className={`alert ${
                mensagem.includes("sucesso") ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              {mensagem}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="senha" className="form-label">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={credentials.senha}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-box-arrow-in-right"></i> Entrar
              </button>
              <button
                type="button"
                onClick={handleCadastro}
                className="btn btn-outline-success"
              >
                <i className="bi bi-person-plus"></i> Criar conta
              </button>
            </div>
          </form>
        </div>

        <div>
          <button className="botao-sobre-link" onClick={() => navigate("/sobre")}>
            Sobre o Sistema
          </button>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default Login;

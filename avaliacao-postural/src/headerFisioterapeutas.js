// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css"; // <-- Importa o CSS aqui

const HeaderFisioterapeutas = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="custom-header header-fisio">
      <div className="header-container">

        {/* Botão Voltar à ESQUERDA */}
        <button
          className="btn btn-outline-secondary header-back-btn"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left"></i> Voltar
        </button>

        {/* Título CENTRALIZADO */}
        <h5 className="header-title-centered">
          <i className="bi bi-hospital"></i> AlignMe
        </h5>

      </div>
    </header>
  );
};

export default HeaderFisioterapeutas;

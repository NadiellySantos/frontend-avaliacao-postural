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
    <header className="custom-header">
      <div className="containerFisioterapeutas">
        {/* Botão Voltar */}
        <button style={{marginLeft: "6%"}} className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Voltar
        </button>
       
        {/* Nome do App */}
        <h5 style={{marginRight: "40%"}} className="headerFisioterapeutasTitle">
          <i className="bi bi-hospital"></i> AlignMe
        </h5>

      </div>
    </header>
  );
};

export default HeaderFisioterapeutas;

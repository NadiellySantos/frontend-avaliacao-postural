// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css"; // <-- Importa o CSS aqui

const HeaderPacientes = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="custom-header header-pacientes">
      <div className="header-container">
        {/* TÍTULO CENTRALIZADO */}
        <h5 className="header-title-centered">
          <i className="bi bi-hospital"></i> AlignMe
        </h5>

        {/* BOTÃO À DIREITA */}
        <button
          className="btn btn-outline-danger header-logout-btn"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </header>
  );
};

export default HeaderPacientes;

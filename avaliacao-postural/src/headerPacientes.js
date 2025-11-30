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
    <header className="custom-header">
      <div className="container">
        

        {/* Nome do App */}
        <h5 style={{marginLeft: "50%"}}>
          <i className="bi bi-hospital"></i> AlignMe
        </h5>

        {/* Botão Logout */}
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </header>
  );
};

export default HeaderPacientes;

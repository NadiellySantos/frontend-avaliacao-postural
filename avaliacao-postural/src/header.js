// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="custom-header header-general">
      <div className="header-container">
        
        {/* ESQUERDA: Voltar + Home */}
        <div className="header-left">
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left"></i> Voltar
          </button>

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/pacientes")}
          >
            <i className="bi bi-house"></i>
          </button>
        </div>

        {/* CENTRO: AlignMe */}
        <h5 className="header-title-centered">
          <i className="bi bi-hospital"></i> AlignMe
        </h5>

        {/* DIREITA: Logout */}
        <div className="header-right">
          <button
            className="btn btn-outline-danger"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-muted py-4 mt-auto" style={{ backgroundColor: "#e0e1e2ff" }}>
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} AlignMe. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

const Header = ({ onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        {/* Espaço à esquerda, se quiser colocar logo ou ícone */}
        <div className="header-left"></div>

        <h1 className="header-title">COPILOTO DE VENDAS</h1>

        <button className="logout-btn" onClick={onLogout}>
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;

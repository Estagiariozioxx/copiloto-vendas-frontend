// src/components/Header.js
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Header = ({ onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          {/* Aqui você pode colocar um logo ou deixar vazio */}
        </div>
        <h1 className="header-title">COPILOTO DE VENDAS</h1>
        <button className="logout-btn" onClick={onLogout}>
          <FaSignOutAlt style={{ marginRight: "8px" }} />
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;

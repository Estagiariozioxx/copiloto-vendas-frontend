// src/components/Login.js
import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Ao enviar o formulário, chama onLogin (simulação de login bem-sucedido)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você poderia validar email/senha ou chamar uma API
    onLogin();
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Bem-vindo!</h2>
        <p>Faça login para acessar o Copiloto de Vendas</p>

        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useAuth } from "../App";
import { api } from "../api";

export default function Login() {
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");

  const handle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "login") {
        const data = await api.login(username, password);
        setUser(data);
      } else {
        await api.register(username, password);
        const data = await api.login(username, password);
        setUser(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h1>📚 Livraria</h1>
        <p className="subtitle">{mode === "login" ? "Entre na sua conta" : "Crie sua conta"}</p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handle}>
          <input placeholder="Usuário" value={username} onChange={e => setUsername(e.target.value)} required />
          <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit" disabled={loading}>{loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Cadastrar"}</button>
        </form>
        <p className="toggle-mode">
          {mode === "login" ? "Não tem conta?" : "Já tem conta?"}
          <button onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "Cadastre-se" : "Entre"}
          </button>
        </p>
        <p className="hint">Teste: admin / 1234</p>
      </div>
    </div>
  );
}

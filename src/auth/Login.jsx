import { useState } from "react";
import axios from "axios";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const emailTrim = email.trim();
    const senhaTrim = senha.trim();

    if (!validarEmail(emailTrim)) {
      setError("Email inválido.");
      return;
    }

    if (senhaTrim.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setError(""); // limpa erro antigo

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: emailTrim,
        senha: senhaTrim,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      onLogin(); // login bem-sucedido
    } catch (erro) {
      if (erro.response?.status === 401) {
        setError("Email ou senha incorretos.");
      } else {
        setError("Erro ao conectar com o servidor.");
      }
    }
  }

  return (
    <div className="bg-white w-100 p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#0292B7]">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-500 px-4 py-2 rounded text-sm mb-4">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 rounded focus:outline-none"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          className="mb-4 p-2 border border-gray-300 rounded focus:outline-none"
        />

        <button
          type="submit"
          className="bg-[#0292B7] text-white py-2 rounded-md cursor-pointer hover:bg-[#0292B6] transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

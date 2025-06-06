import { useState } from "react";

export function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        // Aqui você faria a chamada à API para login e receber o token JWT
        // Simulação de login:
        localStorage.setItem("token", "token-simulado");
        onLogin(); // Atualiza o estado no App para esconder o modal
    }

    return (
        <div className="bg-white w-100 p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#0292B7]">Login</h2>

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

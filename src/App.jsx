import { useState, useEffect } from "react";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./auth/Login";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Atualiza o token se ele mudar no localStorage (por login ou logout)
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogin = () => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className={token ? "" : "filter blur-lg"}>
        <Dashboard />
      </div>

      {!token && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
          <Login onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

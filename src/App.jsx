import { Dashboard } from "./components/Dashboard";
import { Login } from "./auth/Login";
import { useState } from "react";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className={token ? "" : "filter blur-lg"}>
        <Dashboard />
      </div>

      {!token && (
        <div className="fixed inset-0 flex items-center justify-center">
          <Login onLogin={() => setToken("token-simulado")} />

        </div>
      )}
    </div>
  );
}

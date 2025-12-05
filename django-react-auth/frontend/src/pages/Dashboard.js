import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    setUsername("Usuário Autenticado");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">📊 Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 font-semibold"
        >
          Sair
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-md border"
        >
          <h2 className="text-xl font-bold">Bem-vindo!</h2>
          <p className="text-gray-600 mt-2">
            Usuário autenticado: <strong>{username}</strong>
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-md border"
        >
          <h2 className="text-xl font-bold">Status</h2>
          <p className="text-gray-600 mt-2">JWT funcionando corretamente ✔</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-md border"
        >
          <h2 className="text-xl font-bold">Próximos passos</h2>
          <p className="text-gray-600 mt-2">
            Adicionar rotas protegidas e consumo real da API.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

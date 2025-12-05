import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await axios.post("http://127.0.0.1:8000/api/reset-password/confirm/", {
        password,
      });

      setMsg("Senha redefinida com sucesso!");
    } catch {
      setMsg("Não foi possível atualizar a senha.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-lg rounded-2xl 
                   shadow-xl border border-gray-700 p-8"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          🔐 Definir Nova Senha
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-300 font-medium">Nova Senha</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-800 text-gray-100 
                         border border-gray-700 focus:border-indigo-500 
                         focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {msg && (
            <p className="text-center text-indigo-400">{msg}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl 
                       text-white font-semibold shadow-lg shadow-indigo-500/30 transition"
          >
            Atualizar Senha
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

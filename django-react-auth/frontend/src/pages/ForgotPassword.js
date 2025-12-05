import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando link de recuperação para:", email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl w-full max-w-md p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Recuperar Conta
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Digite seu email para receber um link de redefinição de senha.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600"
              placeholder="Digite seu email"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-purple-600 text-white py-3 rounded-xl shadow-lg font-semibold text-lg"
          >
            Enviar Link
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

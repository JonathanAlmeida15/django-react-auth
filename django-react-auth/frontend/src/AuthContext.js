import { createContext, useState, useEffect } from "react";
import api from "./api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(username, password) {
    try {
      const { data } = await api.post("/api/token/", {
        username,
        password,
      });

      // Salva tokens localmente
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // Carrega o usuário logado
      const me = await api.get("/api/me/");
      setUser(me.data);

      return true;
    } catch (error) {
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  }

  // Quando abre a página, tenta logar automaticamente
  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("access");
      if (!token) return;

      try {
        const me = await api.get("/api/me/");
        setUser(me.data);
      } catch {
        logout();
      }
    }

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

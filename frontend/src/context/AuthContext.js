import React, { useState, useCallback, createContext } from "react";

import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@gobarber:token");
    const user = localStorage.getItem("@gobarber:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@gobarber:token", token);
    localStorage.setItem("@gobarber:user", JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@gobarber:token");
    localStorage.removeItem("@gobarber:user");

    setData(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

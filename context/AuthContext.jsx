'use client'
import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = Cookies.get("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  const user = {
    name: "مدیر سیستم",
    role: "ادمین",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const login = (authToken) => {
    Cookies.set("token", authToken, { expires: 7 });
    setToken(authToken);
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  const value = {
    token,
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

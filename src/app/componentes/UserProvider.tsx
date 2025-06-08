"use client";

import React, { useState, useEffect } from "react";
import Header from "./header";

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("nomeLogado");
    if (storedName) {
      setUserName(storedName);
    }

    const handleUserLoggedIn = () => {
      const updatedName = localStorage.getItem("nomeLogado");
      setUserName(updatedName);
    };

    const handleUserLoggedOut = () => {
      localStorage.removeItem("nomeLogado");
      localStorage.removeItem("userId");
      // Delete the userId cookie by setting its expiration date to past
      document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUserName(null);
      // Force a page reload to clear components state
      window.location.reload();
    };

    window.addEventListener("userLoggedIn", handleUserLoggedIn);
    window.addEventListener("userLoggedOut", handleUserLoggedOut);

    return () => {
      window.removeEventListener("userLoggedIn", handleUserLoggedIn);
      window.removeEventListener("userLoggedOut", handleUserLoggedOut);
    };
  }, []);

  const handleLogout = () => {
    window.dispatchEvent(new Event("userLoggedOut"));
  };

  return (
    <>
      <Header userName={userName} onLogout={handleLogout} />
      {children}
    </>
  );
};

export default UserProvider;

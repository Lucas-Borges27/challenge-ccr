"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Recentes() {
  const [recentes, setRecentes] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchRecentes = async () => {
    try {
      const response = await fetch("https://challenge-java-fgyb.onrender.com/api/destinos", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        // Assuming data is an array of destination objects with a 'nome' property
        interface Destino {
          nome: string;
        }
        const nomes = data.map((destino: Destino) => destino.nome);
        setRecentes(nomes);
      } else {
        // fallback to empty list if API fails
        setRecentes([]);
      }
    } catch (error) {
      console.error("Error fetching recent destinations:", error);
      // fallback to empty list on error
      setRecentes([]);
    }
  };

  useEffect(() => {
    const nomeLogado = localStorage.getItem("nomeLogado");
    setIsLoggedIn(!!nomeLogado);

    if (nomeLogado) {
      fetchRecentes();
    }

    const handleUserLoggedIn = () => {
      setIsLoggedIn(true);
      fetchRecentes();
    };

    const handleUserLoggedOut = () => {
      setIsLoggedIn(false);
      setRecentes([]);
    };

    const handleUserLoggedOutClear = () => {
      setIsLoggedIn(false);
      setRecentes([]);
    };

    const handleDestinoSalvo = () => {
      if (isLoggedIn) {
        fetchRecentes();
      }
    };

    window.addEventListener("userLoggedIn", handleUserLoggedIn);
    window.addEventListener("userLoggedOut", handleUserLoggedOut);
    window.addEventListener("userLoggedOut", handleUserLoggedOutClear);
    window.addEventListener("destinoSalvo", handleDestinoSalvo);
    return () => {
      window.removeEventListener("userLoggedIn", handleUserLoggedIn);
      window.removeEventListener("userLoggedOut", handleUserLoggedOut);
      window.removeEventListener("userLoggedOut", handleUserLoggedOutClear);
      window.removeEventListener("destinoSalvo", handleDestinoSalvo);
    };
  }, [isLoggedIn]);

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 border-b pb-2 mb-3">Destinos Recentes</h3>

      {isLoggedIn ? (
        recentes.length > 0 ? (
          <div className="flex flex-col gap-2">
            {recentes.map((destino, index) => (
              <button
                key={index}
              className={`border-b-2 border-gray-300  w-full text-left ${
                index === recentes.length - 1 ? "mb-0" : "mb-2"
              }`}
              onClick={() => {
                window.dispatchEvent(new CustomEvent("recentDestinationSelected", { detail: destino }));
              }}
            >
              <p className="ml-1 text-[#424448]/80 mt-2">{destino}</p>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-sm">Nenhum destino recente</p>
        )
      ) : (
        <p className="text-gray-500 italic text-sm">
          <Link href="/login">Por favor, faça login para ver destinos recentes.</Link> 
        </p>
      )}
    </div>
  );
}

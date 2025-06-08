"use client";

import { useEffect, useState } from "react";

export default function Recentes() {
  const [recentes, setRecentes] = useState<string[]>([]);

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
        fetchRecentes();

        const handleUserLoggedIn = () => {
            fetchRecentes();
        };

        const handleUserLoggedOut = () => {
            setRecentes([]);
        };

        const handleUserLoggedOutClear = () => {
            setRecentes([]);
        };

        const handleDestinoSalvo = () => {
            fetchRecentes();
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
    }, []);

  return (
    <div className="relative max-w-[400px] mx-auto mt-5 border-2 border-gray-300 rounded-lg">
      <div className="h-5 mt-1 border-b-2 border-gray-300">
        <p className="ml-1 text-[#424448]/80 ">RECENTES</p>
      </div>

      {recentes.length > 0 ? (
        recentes.map((destino, index) => (
          <button
            key={index}
            className={`border-b-2 border-gray-300 w-full text-left ${
              index === recentes.length - 1 ? "mb-0" : "mb-2"
            }`}
            onClick={() => {
              window.dispatchEvent(new CustomEvent("recentDestinationSelected", { detail: destino }));
            }}
          >
            <p className="ml-1 text-[#424448]/80 mt-2">{destino}</p>
          </button>
        ))
      ) : (
        <p className="ml-1 text-[#424448]/80 italic">Nenhum destino recente</p>
      )}
    </div>
  );
}

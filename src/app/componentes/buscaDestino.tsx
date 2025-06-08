"use client";

import { useState, useEffect } from "react";

export default function BuscaDestino({ onBuscarRota }: { onBuscarRota: (origem: string, destino: string) => void }) {
    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");
    const [usarMinhaLocalizacao, setUsarMinhaLocalizacao] = useState(false);
    const [recentes] = useState(["Casa", "Trabalho", "Faculdade"]);

    useEffect(() => {
        const handleRecentDestinationSelected = (event: CustomEvent) => {
            setDestino(event.detail);
        };

        window.addEventListener("recentDestinationSelected", handleRecentDestinationSelected as EventListener);

        return () => {
            window.removeEventListener("recentDestinationSelected", handleRecentDestinationSelected as EventListener);
        };
    }, []);

    // Function to save a single recent destination to backend API
    const saveDestino = async (destino: string) => {
        try {
            // Call backend API to create destination, including credentials to send cookies
            const response = await fetch(`https://challenge-java-fgyb.onrender.com/api/destinos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ nome: destino }),
            });
            const responseBody = await response.text();
            console.log("Response from save recent destination:", responseBody);
            if (!response.ok) {
                console.error("Failed to save recent destination:", response.statusText);
                alert("Falha ao salvar o destino: " + response.statusText);
            } else {
                // Dispatch event to notify Recentes component to refresh
                window.dispatchEvent(new Event("destinoSalvo"));
            }
            // Update localStorage with the new destination added to existing ones
            let destinosSalvos = JSON.parse(localStorage.getItem("destinosRecentes") || "[]");
            destinosSalvos = [destino, ...destinosSalvos.filter((d: string) => d !== destino)].slice(0, 2);
            localStorage.setItem("destinosRecentes", JSON.stringify(destinosSalvos));
        } catch (error) {
            console.error("Error saving recent destination:", error);
            alert("Erro ao salvar o destino.");
            // fallback to localStorage on error
            let destinosSalvos = JSON.parse(localStorage.getItem("destinosRecentes") || "[]");
            destinosSalvos = [destino, ...destinosSalvos.filter((d: string) => d !== destino)].slice(0, 2);
            localStorage.setItem("destinosRecentes", JSON.stringify(destinosSalvos));
        }
    };

    const salvarDestinoRecente = (novoDestino: string) => {
        saveDestino(novoDestino);
    };

    const buscarRota = () => {
        const origemFinal = usarMinhaLocalizacao ? "Minha Localização" : origem;

        if (!origemFinal || origemFinal.trim() === "") {
            alert("Por favor, insira a origem antes de buscar a rota.");
            return;
        }

        if (!destino) {
            alert("Por favor, insira um destino.");
            return;
        }

        salvarDestinoRecente(destino);
        onBuscarRota(origemFinal, destino);

        setOrigem("");
        setDestino("");
        setUsarMinhaLocalizacao(false);
    };

    return (
        <div className="flex flex-col items-center mt-5">
            {/* Campo de destino sempre visível */}
            <input
                type="text"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                placeholder="Para onde você vai ?"
                className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 text-lg"
            />

            {/* Campo de origem aparece automaticamente se tiver destino preenchido */}
            {destino && (
                <div className="w-full max-w-md mt-4 p-4 border rounded-lg shadow-lg">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={origem}
                            onChange={(e) => setOrigem(e.target.value)}
                            placeholder="Onde você está ?"
                            className="w-full px-4 py-2 rounded-full border border-gray-300 text-lg"
                            disabled={usarMinhaLocalizacao}
                        />
                        <div className="flex items-center ml-2 whitespace-nowrap">
                            <input
                                type="checkbox"
                                id="usarLocalizacao"
                                checked={usarMinhaLocalizacao}
                                onChange={() => setUsarMinhaLocalizacao(!usarMinhaLocalizacao)}
                                className="mr-1"
                            />
                            <label htmlFor="usarLocalizacao" className="text-sm">Usar Minha Localização</label>
                        </div>
                    </div>

                    <div className="mt-3">
                        <p className="text-gray-600 mb-1">Recentes:</p>
                        <div className="flex gap-2">
                            {recentes.map((lugar, index) => (
                                <button
                                    key={index}
                                    onClick={() => setOrigem(lugar)}
                                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                                >
                                    {lugar}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Botão de buscar rota visível se destino tiver algo */}
            {destino && (
                <button
                    onClick={buscarRota}
                    className="mt-3 bg-[#8B2119] text-white px-4 py-2 rounded-full"
                >
                    Buscar Rota
                </button>
            )}
        </div>
    );
}

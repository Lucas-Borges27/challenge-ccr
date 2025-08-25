"use client";

import "./globals.css";
import { useState } from "react";
import BuscaDestino from "./componentes/buscaDestino";
import Recentes from "./componentes/recentes";
import Mapa from "./componentes/mapa";

export default function Home() {
    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");
    const [tempoProximoTrem, setTempoProximoTrem] = useState<string | null>(null);

    const handleBuscarRota = (novaOrigem: string, novoDestino: string) => {
        setOrigem(novaOrigem);
        setDestino(novoDestino);

        const tempos = ["1 min", "2 min", "3 min", "4 min"];
        const tempoAleatorio = tempos[Math.floor(Math.random() * tempos.length)];
        setTempoProximoTrem(tempoAleatorio);
        setTimeout(() => {
            setTempoProximoTrem(null);
        }, 9000);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 font-sans">
            <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
                
                {/* Barra de busca e recentes */}
                <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-100">
                    <BuscaDestino onBuscarRota={handleBuscarRota} />
                    <Recentes />
                </div>

                {/* Card do próximo trem */}
                {tempoProximoTrem && (
                    <div className="flex justify-center">
                        <div className="bg-gradient-to-r [#EFE9FF] text-white px-6 py-4 rounded-2xl shadow-xl text-center max-w-sm w-full transform transition-all duration-500">
                            <div className="text-4xl font-bold mb-2">🚇</div>
                            <p className="text-lg font-medium">Próximo trem em</p>
                            <p className="text-3xl font-extrabold text-[#5E22F3] mt-1 animate-pulse">
                                {tempoProximoTrem}
                            </p>
                        </div>
                    </div>
                )}

                {/* Mapa */}
                <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
                    <Mapa origem={origem} destino={destino} />
                </div>
            </div>
        </main>
    );
}

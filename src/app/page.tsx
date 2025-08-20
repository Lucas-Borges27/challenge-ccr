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
        <>
            <main>
                <div>
                    <BuscaDestino onBuscarRota={handleBuscarRota} />
                    <Recentes />
                    {tempoProximoTrem && (
                        <div className="flex justify-center mt-6">
                            <div className="bg-gradient-to-r from-[#8B2119] to-[#A52A2A] text-white p-4 rounded-xl shadow-lg text-center">
                                <div className="text-2xl font-bold mb-1">🚇</div>
                                <div className="text-lg font-semibold">Próximo trem em</div>
                                <div className="text-3xl font-bold text-yellow-300">{tempoProximoTrem}</div>
                            </div>
                        </div>
                    )}
                    <Mapa origem={origem} destino={destino} />
                </div>
            </main>
        </>
    );
}

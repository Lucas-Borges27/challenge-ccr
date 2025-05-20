"use client";

import "./globals.css";
import { useState } from "react";
import BuscaDestino from "./componentes/buscaDestino";
import Recentes from "./componentes/recentes";
import Mapa from "./componentes/mapa";

export default function Home() {
    const [origem, setOrigem] = useState("");
    const [destino, setDestino] = useState("");

    const handleBuscarRota = (novaOrigem: string, novoDestino: string) => {
        setOrigem(novaOrigem);
        setDestino(novoDestino);
    };

    return (
        <>
            <main>
                <div>
                    <BuscaDestino onBuscarRota={handleBuscarRota} />
                    <Recentes />
                    <Mapa origem={origem} destino={destino} />
                </div>
            </main>
        </>
    );
}

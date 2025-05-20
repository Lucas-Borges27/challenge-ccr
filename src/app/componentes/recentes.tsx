"use client";

import { useEffect, useState } from "react";

export default function Recentes() {
    const [recentes, setRecentes] = useState<string[]>([]);

    useEffect(() => {
        const destinosSalvos = JSON.parse(localStorage.getItem("destinosRecentes") || "[]");
        setRecentes(destinosSalvos.slice(0, 2));
    }, []);

    return (
        <div className="relative max-w-[400px] mx-auto mt-5 border-2 border-gray-300 rounded-lg">
            <div className="h-5 mt-1 border-b-2 border-gray-300">
                <p className="ml-1 text-[#424448]/80 ">RECENTES</p>
            </div>
            

            {recentes.length > 0 ? (
                recentes.map((destino, index) => (
                    <div key={index} className={`border-b-2 border-gray-300 ${index === recentes.length - 1 ? "mb-0" : "mb-2"}`}>
                        <p className="ml-1 text-[#424448]/80 mt-2">{destino}</p>
                    </div>
                ))
            ) : (
                <p className="ml-1 text-[#424448]/80 italic">Nenhum destino recente</p>
            )}
        </div>
    );
}
 
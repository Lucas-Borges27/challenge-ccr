"use client";
import { useState } from "react";

export default function BotaoDenuncia() {
  const [showDenuncias, setShowDenuncias] = useState(false);

  const toggleDenuncias = () => {
    setShowDenuncias(!showDenuncias);
  };

  return (
    <div className="p-4">
      <div className="container">
        <div className="text-left text-lg font-bold text-[#8B2119] pb-2">
          Canal de Atendimento
        </div>

        <div
          className="text-center text-2xl font-bold text-white bg-[#8B2119] rounded-md p-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:transform hover:-translate-y-1"
          onClick={toggleDenuncias}
        >
          DENUNCIAS
        </div>

        <div id="opcoes_denuncia" className={`${showDenuncias ? "block" : "hidden"} mt-2`}>
          <a
            className="block w-full p-3 my-1 bg-gray-100 border border-[#F0EFEF] rounded-md text-center text-lg text-[#424448] no-underline hover:bg-gray-200"
            href="#"
          >
            Violência Física
          </a>
          <a
            className="block w-full p-3 my-1 bg-gray-100 border border-[#F0EFEF] rounded-md text-center text-lg text-[#424448] no-underline hover:bg-gray-200"
            href="#"
          >
            Violência Verbal
          </a>
          <a
            className="block w-full p-3 my-1 bg-gray-100 border border-[#F0EFEF] rounded-md text-center text-lg text-[#424448] no-underline hover:bg-gray-200"
            href="#"
          >
            Violência Sexual
          </a>
          <a
            className="block w-full p-3 my-1 bg-gray-100 border border-[#F0EFEF] rounded-md text-center text-lg text-[#424448] no-underline hover:bg-gray-200"
            href="#"
          >
            Vendas Ilegais
          </a>
        </div>
      </div>
    </div>
  );
}
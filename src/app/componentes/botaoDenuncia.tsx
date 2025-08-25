"use client";
import { useState } from "react";

export default function BotaoDenuncia() {
  const [showDenuncias, setShowDenuncias] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);

  const toggleDenuncias = () => {
    const novoEstado = !showDenuncias;
    setShowDenuncias(novoEstado);

    if (!novoEstado) {
      setTipoSelecionado(null); // fecha o formulário também
    }
  };

  const abrirFormulario = (tipo: string) => {
    setTipoSelecionado(tipo);
  };

  return (
    <div className="p-4">
      <div className="container">
        <div className="text-left text-lg font-bold text-[#5E22F3] pb-2">
          Canal de Atendimento
        </div>

        {/* Botão principal */}
        <div
          className="text-center text-2xl font-bold text-white bg-[#5E22F3] rounded-md p-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:transform hover:-translate-y-1"
          onClick={toggleDenuncias}
        >
          DENUNCIAS
        </div>

        {/* Lista de opções */}
        <div
          id="opcoes_denuncia"
          className={`${showDenuncias ? "block" : "hidden"} mt-2`}
        >
          <button
            onClick={() => abrirFormulario("Violência Física")}
            className="block w-full p-3 my-1 bg-gray-100 border border-[#F0EFEF] rounded-md text-center text-lg text-[#424448] hover:bg-gray-200"
          >
            Violência Física
          </button>
          <button
            onClick={() => abrirFormulario("Violência Verbal")}
            className="block w-full p-3 my-1 bg-gray-100 border border-[#F0EFEF] rounded-md text-center text-lg text-[#424448] hover:bg-gray-200"
          >
            Violência Verbal
          </button>
          <button
            onClick={() => abrirFormulario("Violência Sexual")}
            className="block w-full p-3 my-1 bg-gray-100 border border-[#F0EFEF] rounded-md text-center text-lg text-[#424448] hover:bg-gray-200"
          >
            Violência Sexual
          </button>
          <button
            onClick={() => abrirFormulario("Vendas Ilegais")}
            className="block w-full p-3 my-1 bg-gray-100 border border-[#F0EFEF] rounded-md text-center text-lg text-[#424448] hover:bg-gray-200"
          >
            Vendas Ilegais
          </button>
        </div>

        {/* Formulário aparece só se tiver um tipo selecionado */}
        {tipoSelecionado && (
          <div className="mt-6 p-4 border rounded-md bg-gray-50">
            <h2 className="text-xl font-bold mb-4">
              Denúncia de {tipoSelecionado}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Denúncia enviada com sucesso!");
                setTipoSelecionado(null); // reseta depois
              }}
              className="space-y-4"
            >
              <div>
                <label className="block font-semibold">Nome (opcional):</label>
                <input
                  type="text"
                  name="nome"
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block font-semibold">Descrição:</label>
                <textarea
                  name="descricao"
                  required
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block font-semibold">Local do ocorrido:</label>
                <input
                  type="text"
                  name="local"
                  className="border p-2 rounded w-full"
                />
              </div>

              <button
                type="submit"
                className="bg-[#5E22F3] text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Enviar denúncia
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

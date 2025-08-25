"use client";
import Image from "next/image";
import Script from "next/script";

export default function ChatMobi() {


  return (
    <>
    <Script src="https://cdn.userway.org/widget.js" data-account="wWYZXkVTsK" strategy="lazyOnload" />
    <div className="flex m-5 flex-col h-screen bg-gray-100 font-montserrat rounded-lg">
      <div className="bg-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-[#5E22F3]">ChatMobi</div>
        </div>
        <div className="w-60">
          <a
            href="https://www.viamobilidade.com.br/duvidas"
            className="flex items-center text-[#9D9D9D] text-lg no-underline"
          >
            <Image
              src="/images/perguntasFrequentes.png"
              alt="Perguntas Frequentes"
              width={20}
              height={20}
              className="mr-2"
            />
            Perguntas frequentes
          </a>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-200 p-3 rounded-lg max-w-[60%] mb-3">
            Olá! Eu sou o ChatMobi e estou aqui para tirar as suas dúvidas. Como posso te ajudar?
          </div>

          <div className="bg-white p-3 rounded-lg">
            Olá! Gostaria de saber qual o horário do próximo trem a chegar na estação Pinheiros no
            sentido Osasco.
          </div>
        </div>
      </div>

      <div className="flex border-t border-gray-300 p-2.5 bg-white">
        <input
          className="flex-1 p-2.5 border border-gray-300 rounded-md"
          placeholder="Digite sua pergunta aqui"
          type="text"
        />
      </div>
    </div>
    </>
  );
}

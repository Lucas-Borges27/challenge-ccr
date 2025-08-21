"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {

  return (
    <footer className="bg-[#54565aE6]/90 w-11/12 mx-auto mt-5 p-5 text-white font-montserrat flex flex-col items-center " >

      <div className="flex items-center text-white">
        <Image src="/images/simboloccr.png" alt="Logo Simbolo" width={24} height={24} />
        <h3 className="ml-3">Fale com a ViaMobilidade</h3>
      </div>
      <p className="text-xs text-center max-w-xs mt-5">
        Para informações sobre as linhas, achados e perdidos e atendimento nas estações, ligue para a Central de Atendimento.
      </p>
      <div className="flex items-center text-red-700 font-bold text-sm mt-5">
        <Image src="/images/telefoneVermelho.png" alt="Telefone" width={20} height={20} className="mr-2" />
          <a href="sms:0800 - 770 - 7106" className="text-red-700 font-semibold">
            0800 - 770 - 7106
          </a>
      </div>
      <p className="text-xs mt-2">Segunda a sexta das 06h30 às 22h00, sábado das 08h00 às 18h00</p>
      
      <div className="flex flex-col items-center mt-4">
        <a href="https://www.grupoccr.com.br/contatos/" className="flex items-center bg-[#9D9D9D] text-gray-800 px-5 py-2 rounded-md border border-gray-500 text-lg w-72  my-2 transition-all duration-200 hover:shadow-lg hover:transform hover:-translate-y-1">
          <Image src="/images/simboloccrCinza.png" alt="Ouvidoria" width={28} height={28} className="mr-4 ml-12" />
          Ouvidoria
        </a>
        <a href="https://rodovias.grupoccr.com.br/riosp/central-de-ajuda/fale-conosco/" className="flex items-center bg-[#9D9D9D] text-gray-800 px-5 py-2 rounded-md border border-gray-500 text-lg    w-72 justify-center my-2 transition-all duration-200 hover:shadow-lg hover:transform hover:-translate-y-1">
          <Image src="/images/simboloccrCinza.png" alt="Fale Conosco" width={28} height={28} className="mr-4" />
          Fale Conosco
        </a>
      </div>


      <div className="flex flex-wrap justify-between w-full max-w-lg mt-5 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Acesse</h4>
          <ul className="space-y-1">
            <li><Link href="/" className="text-white hover:text-gray-300">Rotas</Link></li>
            <li><Link href="/status" className="text-white hover:text-gray-300">Status</Link></li>
            <li><Link href="/suporte" className="text-white hover:text-gray-300">Suporte</Link></li>
            
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Motiva</h4>
          <ul className="space-y-1">
            <li><a href="https://www.viamobilidade.com.br/nos/empresas" className="text-white hover:text-gray-300">Sobre Nós</a></li>
            <li><a href="https://viamobilidade.com.br/politica-de-privacidade" className="text-white hover:text-gray-300">Política de Privacidade</a></li>
            <li><a href="https://www.viamobilidade.com.br/termos-de-uso" className="text-white hover:text-gray-300">Termos de uso</a></li>
          </ul>
        </div>
      </div>
    </footer>

  );
}

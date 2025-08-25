"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2E2E2E] text-white font-montserrat mt-10">
      <div className="max-w-7xl mx-auto px-1 py-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
        
        {/* Contato */}
        <div>
          <div className="flex items-center">
            <Image src="/images/simboloccr.png" alt="CCR" width={25} height={25} />
            <h3 className="ml-3 font-semibold">Fale com a ViaMobilidade</h3>
          </div>
          <p className="text-sm mt-4 text-gray-300">
            Para informações sobre as linhas, achados e perdidos e atendimento
            nas estações, ligue para a Central de Atendimento.
          </p>
          <div className="flex items-center mt-4 text-[#FFFFFF] font-semibold">
            <Image
              src="/images/telefoneVermelho.png"
              alt="Telefone"
              width={20}
              height={20}
              className="mr-2"
            />
            <a href="sms:0800-770-7106" className="hover:underline">
              0800 - 770 - 7106
            </a>
          </div>
          <p className="text-xs mt-1 text-gray-400">
            Seg-Sex: 06h30 às 22h | Sáb: 08h às 18h
          </p>
        </div>

        {/* Links principais */}
        <div>
          <h4 className="font-semibold mb-3">Acesse</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white">Rotas</Link></li>
            <li><Link href="/status" className="hover:text-white">Status</Link></li>
            <li><Link href="/suporte" className="hover:text-white">Suporte</Link></li>
          </ul>
        </div>

        {/* Institucional */}
        <div>
          <h4 className="font-semibold mb-3">Motiva</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="https://www.viamobilidade.com.br/nos/empresas" className="hover:text-white">Sobre Nós</a></li>
            <li><a href="https://viamobilidade.com.br/politica-de-privacidade" className="hover:text-white">Política de Privacidade</a></li>
            <li><a href="https://www.viamobilidade.com.br/termos-de-uso" className="hover:text-white">Termos de uso</a></li>
          </ul>
        </div>
      </div>

      {/* Rodapé final */}
      <div className="bg-[#1F1F1F] text-center py-4 text-xs text-gray-400">
        © {new Date().getFullYear()} ViaMobilidade. Todos os direitos reservados.
      </div>
    </footer>
     );
}

import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface LinhaData {
  id: number;
  nome: string;
  cor: string;
  corNome?: string;
  operadora: string;
  logo: string;
  horario: string;
  status: string;
  estacoes: string[];
}

interface LinhasData {
  linhas: LinhaData[];
}

interface LinhaMetroProps {
  linhaId: string;
}

const LinhaMetro = ({ linhaId }: LinhaMetroProps) => {
  const [linhasData, setLinhasData] = useState<LinhasData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/linhas.json')
      .then(response => response.json())
      .then(data => {
        setLinhasData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar dados das linhas:', error);
        setLoading(false);
      });
  }, []);

  if (loading || !linhasData) {
    return <div>Carregando...</div>;
  }

  // Encontrar a linha correta no array de linhas
  const linha = linhasData.linhas.find(l => l.id === parseInt(linhaId.replace('linha', '')));
  
  if (!linha) {
    return <div>Linha não encontrada</div>;
  }

  // Encontrar índices para navegação
  const currentIndex = linhasData.linhas.findIndex(l => l.id === linha.id);
  const previousLine = currentIndex > 0 ? linhasData.linhas[currentIndex - 1] : linhasData.linhas[linhasData.linhas.length - 1];
  const nextLine = currentIndex < linhasData.linhas.length - 1 ? linhasData.linhas[currentIndex + 1] : linhasData.linhas[0];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div style={{ backgroundColor: linha.cor }} className="text-white text-center p-4 text-lg relative">
        <Link href={`/linha${previousLine.id}`} className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center">
          <Image src="/images/setaEsquerda.png" alt="status" width={14} height={14} className="mr-2 filter brightness-0 invert" />
          Linha {previousLine.id}
        </Link>
        <span>{linha.nome}</span>
        <Link href={`/linha${nextLine.id}`} className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
          Linha {nextLine.id}
          <Image src="/images/setaDireita.png" alt="status" width={14} height={14} className="mr-2 filter brightness-0 invert ml-2"/>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 my-4 relative">
        <div className="flex items-center">
          <div style={{ backgroundColor: linha.cor }} className="text-white rounded-full w-10 h-10 flex items-center justify-center text-lg mr-2">
            {linha.id}
          </div>
          <div className="text-lg">{linha.nome.split(' ')[2]}</div>
        </div>
        <Image alt="ViaMobilidade logo" className="absolute top-4 right-4" src={linha.logo} width={136} height={40} />
        <div className="mt-2 text-sm flex items-center">
          <span className="w-4 h-4 rounded-full bg-green-500 inline-block mr-2"></span>
          <span>{linha.horario}</span>
        </div>
        <div className="mt-2 text-sm text-green-600">{linha.status}</div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg mb-4">Estações</h2>
        {linha.estacoes.map((estacao, index) => (
          <div key={index} className="py-2 border-b border-gray-300 last:border-none">
            <div className="flex-grow flex items-center">
              <Image src="/images/imagemLoc.png" alt="status" width={20} height={20} className="mr-2" />
              {estacao}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinhaMetro;

"use client"

import { useState } from 'react';

export default function Status() {
  const [searchTerm, setSearchTerm] = useState('');

  const linhas = [
    { numero: '1', nome: 'Azul', cor: '#011289', status: 'Operação normal', corStatus: '#4CAF50', bolinha: 'bg-green-500', href: '/linha1' },
    { numero: '2', nome: 'Verde', cor: '#01775A', status: 'Operação normal', corStatus: '#4CAF50', bolinha: 'bg-green-500', href: '/linha2' },
    { numero: '3', nome: 'Vermelha', cor: '#F51200', status: 'Operação normal', corStatus: '#4CAF50', bolinha: 'bg-green-500', href: '/linha3' },
    { numero: '4', nome: 'Amarela', cor: '#F9A800', status: 'Operação normal', corStatus: '#4CAF50', bolinha: 'bg-green-500', href: '/linha4' },
    { numero: '5', nome: 'Lilás', cor: '#9A3784', status: 'Operação normal', corStatus: '#4CAF50', bolinha: 'bg-green-500', href: '/linha5' },
    { numero: '7', nome: 'Rubi', cor: '#C80857', status: 'Operação normal', corStatus: '#4CAF50', bolinha: 'bg-green-500', href: '/linha7' },
    { numero: '8', nome: 'Diamante', cor: '#949488', status: 'Circulação de trens', corStatus: '#FACC15', bolinha: 'bg-yellow-400', href: '/linha8' },
    { numero: '9', nome: 'Esmeralda', cor: '#50B8A1', status: 'Falta de energia', corStatus: '#EF4444', bolinha: 'bg-red-500', href: '/linha9' },
    { numero: '10', nome: 'Turquesa', cor: '#40B0C1', status: 'Operação normal', corStatus: '#4CAF50', bolinha: 'bg-green-500', href: '/linha10' },
    { numero: '11', nome: 'Coral', cor: '#FF7F50', status: 'Obras na via', corStatus: '#FACC15', bolinha: 'bg-yellow-400', href: '/linha11' },
    { numero: '12', nome: 'Safira', cor: '#1F2086', status: 'Operação normal', corStatus: '#4CAF50', bolinha: 'bg-green-500', href: '/linha12' },
    { numero: '13', nome: 'Jade', cor: '#29B352', status: 'Operação normal', corStatus: '#4CAF50', bolinha: 'bg-green-500', href: '/linha13' },
  ];

  const linhasFiltradas = linhas.filter((linha) =>
    linha.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="🔍 Busque uma estação"
          className="w-full p-2 border rounded-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {linhasFiltradas.length === 0 ? (
        <div className="text-center text-gray-600 font-semibold">Nenhuma linha encontrada</div>
      ) : (
        <div className="status-list grid grid-cols-1 gap-4">
          {linhasFiltradas.map((linha) => (
            <a key={linha.numero} href={linha.href} className="no-underline text-black">
              <button className="status-item flex items-center p-4 border rounded-lg shadow-md w-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:transform hover:-translate-y-1">
                <div className="w-10 h-10 flex items-center justify-center text-white font-bold rounded-full" style={{ backgroundColor: linha.cor }}>
                  {linha.numero}
                </div>
                <div className="ml-4">
                  <div className="font-semibold">{linha.nome}</div>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="text-sm mr-2 font-bold" style={{ color: linha.corStatus }}>
                    {linha.status}
                  </div>
                  <div className={`w-6 h-6 ${linha.bolinha} rounded-full`}></div>
                </div>
              </button>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

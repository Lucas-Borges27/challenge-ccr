"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CadastroForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cadastroData = {
      nome: nome,
      email: email,
      senha: senha
    };
    
    console.log('Dados enviados:', cadastroData);
  
    try { 
      const apiUrl = `/api/usuarios/cadastrar`;
      console.log('Fetching URL:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cadastroData)
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso! Faça o Login.');
        router.push('/login');
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          console.error('Erro ao cadastrar, dados do erro:', data);
          const errorMessage = data.message && data.message.trim() !== '' ? data.message : 'Erro desconhecido ao cadastrar';
          alert('Erro ao cadastrar: ' + errorMessage);
        } else {
          const text = await response.text();
          alert('Erro ao cadastrar: ' + text);
          console.error('Erro ao cadastrar, resposta do servidor:', text);
        }
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor.', error);
      alert('Erro ao conectar com o servidor: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  return (
    <div className="flex items-center justify-center flex-grow bg-gray-100 py-5">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Cadastrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu-email@exemplo.com"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Crie uma senha"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#5E22F3] text-white py-2 rounded cursor-pointer hover:bg-gray-700"
          >
            Cadastrar
          </button>
          <p className="mt-4 text-center text-gray-600">
            Já tem uma conta? <a href="/login" className="text-blue-500">Entrar</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CadastroForm;

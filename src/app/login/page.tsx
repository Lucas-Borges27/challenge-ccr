"use client";
import API_BASE from "@/app/service/api"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try { 
      const apiUrl = `${ API_BASE }/api/usuarios/login`;
      console.log('Fetching URL:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });

      if (response.ok) {
        alert('Login realizado com sucesso!');
        router.push('/');
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          alert('Erro no login: ' + data.message);
        } else {
          const text = await response.text();
          alert('Erro no login: ' + text);
          console.error('Erro no login, resposta do servidor:', text);
        }
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor.', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        alert('Erro ao conectar com o servidor: Verifique se o servidor está ativo e se a URL está correta.');
      } else {
        alert('Erro ao conectar com o servidor: ' + (error instanceof Error ? error.message : String(error)));
      }
    }
  };

  return (
    <div className="flex items-center justify-center flex-grow bg-gray-100 py-5">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Entrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              E-mail
            </label>
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
            <label className="block text-gray-700" htmlFor="senha">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <a href="#" className="text-blue-500 text-sm mb-4 block text-right">
            Esqueci minha senha
          </a>
          <button
            type="submit"
            className="w-full bg-[#8b2119] text-white py-2 rounded cursor-pointer hover:bg-gray-700"
          >
            Entrar
          </button>
          <p className="mt-4 text-center text-gray-600">
            Ainda não faz parte? <a href="/cadastro" className="text-blue-500">Cadastre-se!</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

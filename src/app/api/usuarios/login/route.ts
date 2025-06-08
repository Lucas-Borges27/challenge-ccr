import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch('https://challenge-java-fgyb.onrender.com/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: data.message || 'Erro desconhecido ao fazer login' }, { status: response.status });
    }

    const res = NextResponse.json(data, { status: response.status });

    // Forward Set-Cookie header from backend response to client
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      res.headers.set('set-cookie', setCookie);
    }

    return res;
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao conectar com o servidor: ' + (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}

import Link from 'next/link';

const NotFound = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404 🚧</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Página não encontrada</h2>
        <p className="text-gray-600 mb-6">
          Eita! Essa página está fora dos trilhos.
        </p>
        <Link href="/">
          <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
            Voltar pra Home
          </a>
        </Link>
      </div>
    );
  };
  
  export default NotFound;
  
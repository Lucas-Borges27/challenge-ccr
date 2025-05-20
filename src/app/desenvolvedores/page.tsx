import Image from 'next/image';

export default function Desenvolvedores() {
  return (
    <div className="w-full h-auto p-6 bg-gray-100 flex flex-wrap justify-center gap-6">
      {[
        {
          nome: 'Lucas Borges de Souza',
          rm: '560027',
          foto: '/images/LucasFoto.jpg',
          github: 'https://github.com/ImnotBorges',
          linkedin: 'https://www.linkedin.com/in/lucas-borges-de-souza-21b691235/',
          insta: 'https://www.instagram.com/lucas.borges._/',
        },
        {
          nome: 'Pedro Henrique da Silva',
          rm: '560393',
          foto: '/images/Pedrofoto.jpg',
          github: 'https://github.com/pedrosilva132',
          linkedin: 'https://www.linkedin.com/in/pedrohenrique2004',
          insta: 'https://www.instagram.com/dapazjjpriv',
        },
        {
          nome: 'Yasmin Pereira da Silva',
          rm: '560039',
          foto: '/images/YasminFoto.jpg',
          github: 'https://github.com/yasilvaa',
          linkedin: 'https://www.linkedin.com/in/yasmin-silva-9b28b01a2/',
          insta: 'https://www.instagram.com/minsilvaa/',
        },
      ].map((dev, index) => (
        <div
          key={index}
          className={`flex flex-col items-center bg-white p-6 shadow-md rounded-lg ${
            dev.nome.includes('Pedro') ? 'w-96' : 'w-72'
          }`}
        >
          <Image
            alt={`Foto de perfil de ${dev.nome}`}
            src={dev.foto}
            width={128}
            height={128}
            className="rounded-full mb-4 object-cover"
          />
          <h2 className="text-xl font-semibold text-center">{dev.nome}</h2>
          <p className="text-gray-600 text-center mb-4">RM: {dev.rm}</p>

          <div className="flex flex-col space-y-2 w-full">
            <a href={dev.github} className="flex items-center">
              <Image src="/images/github.png" alt="GitHub" width={20} height={20} className="mr-2" />
              <span>GitHub</span>
            </a>
            <a href={dev.linkedin} className="flex items-center">
              <Image src="/images/linkedin.png" alt="LinkedIn" width={20} height={20} className="mr-2" />
              <span>LinkedIn</span>
            </a>
            <a href={dev.insta} className="flex items-center">
              <Image src="/images/simbolo-do-instagram.png" alt="Instagram" width={20} height={20} className="mr-2" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

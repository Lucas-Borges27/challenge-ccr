"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface HeaderProps {
  userName: string | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    router.push('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header>
      <div className="bg-[#eeeeee] h-14 w-full flex items-center justify-between px-4 relative">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              id="logoViaMobilidade"
              src="/images/LogoCCR.png"
              alt="Logo"
              width={181}
              height={26}
              className="m-5"
            />
          </Link>
          {userName && <p className=" mt-1 text-lg">Olá, {userName}</p>}
        </div>

        <div className="flex items-center gap-4 relative">
          <span
            id="burguer"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 text-[#8B2119] block text-center p-4 cursor-pointer ml-2 mb-5"
          >
            ☰
          </span>

          <div className="flex items-center gap-6">
            {!userName ? (
              <span
                onClick={handleLogin}
                className="relative cursor-pointer text-green-400 font-medium after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter') handleLogin() }}
              >
                Login
              </span>
            ) : (
              <span
                onClick={onLogout}
                className="cursor-pointer text-red-600 hover:text-orange-400 font-medium"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter') onLogout() }}
              >
                Sair
              </span>
            )}
          </div>

          {/* Menu hamburguer */}
          <div
            ref={menuRef}
            className={`absolute top-1 right-17 transform ${
              menuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-10 opacity-0 invisible"
            } transition-all duration-300 ease-in-out z-50 bg-gray-100 rounded-lg p-5`}
          >
            <ul className="list-none p-0">
              {[
                { href: "/", label: "Rotas" },
                { href: "/status", label: "Status" },
                { href: "/suporte", label: "Suporte" },
                { href: "/desenvolvedores", label: "Devs" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block w-full max-w-[300px] mx-auto my-1 rounded-lg p-2 text-center bg-white text-black border-2 border-black transition-all duration-200 hover:shadow-lg hover:transform hover:-translate-y-1"
                    legacyBehavior
                  >
                    <a>{label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

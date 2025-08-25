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
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
  <header className="bg-[#5E22F3] flex justify-between items-center px-8 bg-gradient-to-r shadow-md relative">
      <div className="flex items-center text-white font-bold text-xl">
        <Link href="/">
            <Image
              id="logoViaMobilidade"
              src="/images/LogoMotivaSemEscritaESemFundo.png"
              alt="Logo"
              width={60}
              height={8}
              className="m-5 mr-3"
          />
        </Link>
        ViaMobilidade
        {userName && <span className="ml-4 text-base font-normal">Olá, {userName}</span>}
      </div>
      <div className="flex items-center gap-4">
        {!userName ? (
          <button
            onClick={handleLogin}
            className="text-white font-medium hover:underline transition"
          >
            <a> Login</a>
          </button>
        ) : (
          <button
            onClick={onLogout}
            className="text-white font-medium hover:text-gray-200 transition"
          >
            Sair
          </button>
        )}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#5E22F3] transition"
        >
          ☰
        </button>
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-16 right-8 bg-white text-gray-800 rounded-xl shadow-lg w-40 py-2 z-50"
          >
            <ul>
              {[
                { href: "/", label: "Rotas" },
                { href: "/status", label: "Status" },
                { href: "/beneficios", label: "Benefícios" },
                { href: "/suporte", label: "Suporte" },
                { href: "/desenvolvedores", label: "Devs" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-[#5E22F3] transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

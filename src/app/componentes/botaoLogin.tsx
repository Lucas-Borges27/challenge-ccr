"use client";
import Image from "next/image";
import Link from "next/link";

export default function BotaoLogin() {
  return (
    <Link href="/login" className="rounded-full hover:opacity-80 transition">
      <Image
        src="/imagens/userLogin.jpg" 
        alt="Login"
        width={50}
        height={50}
        className="rounded-full"
      />
    </Link>
  );
}

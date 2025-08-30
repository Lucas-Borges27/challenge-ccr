

"use client";

import { usePathname } from "next/navigation";
import UserProvider from "./UserProvider";
import Footer from "./footer";
import BotaoBaixeApp from "./botaoBaixeApp";
import Script from "next/script";
import WatsonChat from "./watsonChat";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Rotas onde o footer NÃO deve aparecer
  const hideFooter = pathname === "/login" || pathname === "/cadastro";

  return (
    <>
      <Script src="https://cdn.userway.org/widget.js" data-account="wWYZXkVTsK"></Script>
      <UserProvider>
        <main className="flex-grow flex flex-col">{children}</main>
      </UserProvider>
      {!hideFooter && <Footer />}
      <WatsonChat />
      <BotaoBaixeApp />
    </>
  );
}

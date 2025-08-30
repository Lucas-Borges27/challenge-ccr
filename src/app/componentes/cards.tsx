"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  {
    id: 1,
    titulo: "Faça sua denúncia",
    descricao: "Ajude a comunidade reportando problemas rapidamente.",
    link: "/denuncia",
  },
  {
    id: 2,
    titulo: "Ocorrências ao vivo",
    descricao: "Veja em tempo real os alertas da sua região.",
    link: "/ocorrencias",
  },
  {
    id: 3,
    titulo: "Dicas de segurança",
    descricao: "Confira como agir em situações de risco.",
    link: "/dicas",
  },
];

export default function Cards() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative overflow-hidden rounded-2xl shadow-lg bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={cards[index].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="p-6 text-center"
        >
          <h2 className="text-xl font-bold mb-2">{cards[index].titulo}</h2>
          <p className="text-gray-600 mb-4">{cards[index].descricao}</p>
          <a
            href={cards[index].link}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Clique aqui
          </a>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-2 mt-4 pb-4">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

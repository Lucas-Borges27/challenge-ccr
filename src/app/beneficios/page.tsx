"use client";

import { useMemo, useState } from "react";

type Tipo = "beneficio" | "dica";

type Estacao = {
  id: string;
  nome: string;
  tipo: Tipo;
  detalhe: string;
  x: number;
  y: number;
};

type Linha = {
  id: "4" | "5" | "8" | "9";
  nome: string;
  cor: string;
  estacoes: Estacao[];
};

const LINHAS: Linha[] = [
  {
    id: "4",
    nome: "Linha 4 • Amarela",
    cor: "#F9A800",
    estacoes: [
      { id: "butanta", nome: "Butantã", tipo: "beneficio", detalhe: "10% de desconto no Museu da USP.", x: 10, y: 40 },
      { id: "pinheiros", nome: "Pinheiros", tipo: "dica", detalhe: "Mercado de Pinheiros com ótima gastronomia.", x: 20, y: 40 },
      { id: "faria-lima", nome: "Faria Lima", tipo: "beneficio", detalhe: "Desconto em cafés parceiros.", x: 30, y: 40 },
      { id: "fradique", nome: "Fradique Coutinho", tipo: "dica", detalhe: "Rua dos Pinheiros com bares e restaurantes.", x: 40, y: 40 },
      { id: "oscar-freire", nome: "Oscar Freire", tipo: "beneficio", detalhe: "Entrada gratuita no MIS às quartas.", x: 50, y: 40 },
      { id: "paulista", nome: "Paulista", tipo: "dica", detalhe: "Próxima à Avenida Paulista, cheia de cultura.", x: 60, y: 40 },
      { id: "republica", nome: "República", tipo: "beneficio", detalhe: "Desconto em teatros parceiros.", x: 70, y: 40 },
    ],
  },
  {
    id: "5",
    nome: "Linha 5 • Lilás",
    cor: "#9A3784",
    estacoes: [
      { id: "capao", nome: "Capão Redondo", tipo: "dica", detalhe: "Próximo ao CEU Capão, opções esportivas e culturais.", x: 10, y: 55 },
      { id: "campo-limpo", nome: "Campo Limpo", tipo: "beneficio", detalhe: "Desconto em academias locais.", x: 20, y: 55 },
      { id: "giovanni", nome: "Giovanni Gronchi", tipo: "dica", detalhe: "Perto do Shopping Jardim Sul.", x: 30, y: 55 },
      { id: "santo-amaro-5", nome: "Santo Amaro", tipo: "beneficio", detalhe: "Meia-entrada em cinema conveniado.", x: 40, y: 55 },
      { id: "borba-gato", nome: "Borba Gato", tipo: "dica", detalhe: "Escultura histórica próxima à estação.", x: 50, y: 55 },
      { id: "alto-bv", nome: "Alto da Boa Vista", tipo: "beneficio", detalhe: "Desconto em cursos de idiomas.", x: 60, y: 55 },
      { id: "brooklin", nome: "Brooklin", tipo: "dica", detalhe: "Perto do Parque Severo Gomes.", x: 70, y: 55 },
    ],
  },
  {
    id: "8",
    nome: "Linha 8 • Diamante",
    cor: "#949488",
    estacoes: [
      { id: "julio-prestes", nome: "Júlio Prestes", tipo: "dica", detalhe: "Sala São Paulo, concertos renomados.", x: 10, y: 70 },
      { id: "barra-funda", nome: "Palmeiras-Barra Funda", tipo: "beneficio", detalhe: "Desconto em estacionamento conveniado.", x: 20, y: 70 },
      { id: "lapa", nome: "Lapa", tipo: "dica", detalhe: "Mercado da Lapa, comidas típicas paulistas.", x: 30, y: 70 },
      { id: "domingos", nome: "Domingos de Moraes", tipo: "beneficio", detalhe: "Promoção em restaurantes locais.", x: 40, y: 70 },
      { id: "osasco-8", nome: "Osasco", tipo: "dica", detalhe: "Shopping União com lazer e gastronomia.", x: 50, y: 70 },
      { id: "comandante", nome: "Comandante Sampaio", tipo: "beneficio", detalhe: "Café grátis em padarias conveniadas.", x: 60, y: 70 },
      { id: "carapicuiba", nome: "Carapicuíba", tipo: "dica", detalhe: "Praça da Bíblia com eventos e lazer.", x: 70, y: 70 },
    ],
  },
  {
    id: "9",
    nome: "Linha 9 • Esmeralda",
    cor: "#50B8A1",
    estacoes: [
      { id: "osasco-9", nome: "Osasco", tipo: "beneficio", detalhe: "Desconto em lojas de eletrônicos.", x: 15, y: 25 },
      { id: "altino", nome: "Presidente Altino", tipo: "dica", detalhe: "Próximo ao parque Vila dos Remédios.", x: 25, y: 25 },
      { id: "usp", nome: "Cidade Universitária", tipo: "beneficio", detalhe: "Entrada gratuita em exposições da USP.", x: 35, y: 25 },
      { id: "pinheiros-9", nome: "Pinheiros", tipo: "dica", detalhe: "Feira gastronômica no Largo da Batata.", x: 45, y: 25 },
      { id: "vila-olimpia", nome: "Vila Olímpia", tipo: "beneficio", detalhe: "10% em restaurantes parceiros.", x: 55, y: 25 },
      { id: "berrini", nome: "Berrini", tipo: "dica", detalhe: "Próximo à ponte estaiada, cartão postal.", x: 65, y: 25 },
      { id: "santo-amaro-9", nome: "Santo Amaro", tipo: "beneficio", detalhe: "Desconto em academias parceiras.", x: 75, y: 25 },
    ],
  },
];

export default function BeneficiosPage() {
  const [linhaSelecionada, setLinhaSelecionada] = useState<Linha>(LINHAS[0]);
  const [filtro, setFiltro] = useState<"todos" | Tipo>("todos");
  const [busca, setBusca] = useState("");
  const [estacaoAtiva, setEstacaoAtiva] = useState<string | null>(null);

  const estacoesFiltradas = useMemo(() => {
    const list = linhaSelecionada.estacoes;
    return list.filter((e) => {
      const matchFiltro = filtro === "todos" || e.tipo === filtro;
      const matchBusca = e.nome.toLowerCase().includes(busca.toLowerCase().trim());
      return matchFiltro && matchBusca;
    });
  }, [linhaSelecionada, filtro, busca]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-[300px_1fr] gap-8">
        {/* Coluna Esquerda */}
        <aside className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Linhas</h2>
          <div className="space-y-2">
            {LINHAS.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  setLinhaSelecionada(l);
                  setEstacaoAtiva(null);
                }}
                className={`w-full text-left rounded-xl px-4 py-3 border transition shadow-sm
                  ${linhaSelecionada.id === l.id
                    ? "bg-white border-gray-200 shadow-md"
                    : "bg-gray-50 hover:bg-white border-gray-200"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-block w-3 h-3 rounded-full" style={{ background: l.cor }} />
                  <div className="flex flex-col">
                    <span className="font-semibold">{l.nome}</span>
                    <span className="text-xs text-gray-500">
                      {l.estacoes.length} estações com benefícios/dicas
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Coluna Direita */}
        <section className="space-y-6">
          {/* Mapa mock */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Mapa (ilustrativo)</h3>
              <div className="flex gap-3">
                {LINHAS.map((l) => (
                  <div key={l.id} className="flex items-center gap-2 text-sm">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ background: l.cor }} />
                    <span className="text-gray-600">{l.id}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full aspect-[16/7] rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 grid place-items-center">
              <svg viewBox="0 0 100 80" className="w-[96%] h-[90%]">
                {LINHAS.map((l) => {
                  const pts = l.estacoes.map((e) => `${e.x},${e.y}`).join(" ");
                  const isActive = linhaSelecionada.id === l.id;
                  return (
                    <g key={l.id} opacity={isActive ? 1 : 0.35}>
                      <polyline
                        points={pts}
                        fill="none"
                        stroke={l.cor}
                        strokeWidth={isActive ? 2.8 : 1.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {l.estacoes.map((e) => {
                        const selected = estacaoAtiva === e.id;
                        return (
                          <g key={e.id} transform={`translate(${e.x}, ${e.y})`}>
                            <circle
                              r={selected ? 2.8 : 2.0}
                              fill="#ffffff"
                              stroke={l.cor}
                              strokeWidth={selected ? 1.2 : 0.9}
                              className="cursor-pointer transition-transform"
                              onMouseEnter={() => setEstacaoAtiva(e.id)}
                              onMouseLeave={() => setEstacaoAtiva(null)}
                            />
                            {selected && (
                              <foreignObject x={2} y={-6} width="60" height="14">
                                <div className="text-[6px] bg-white/90 border border-gray-200 rounded px-1 py-[1px] shadow whitespace-nowrap">
                                  {e.nome}
                                </div>
                              </foreignObject>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow p-5">
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                placeholder="Pesquisar estação..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5E22F3] w-full md:w-1/2"
              />
              <div className="flex gap-2">
                {(["todos", "beneficio", "dica"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFiltro(t)}
                    className={`px-3 py-2 rounded-xl text-sm border transition
                      ${filtro === t
                        ? "bg-[#5E22F3] text-white border-transparent shadow"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-white"}`}
                  >
                    {t === "todos" ? "Todos" : t === "beneficio" ? "Benefícios" : "Dicas"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lista de estações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {estacoesFiltradas.map((e) => (
              <div
                key={e.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow p-4 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{e.nome}</h4>
                    <p className="text-sm text-gray-600">{e.detalhe}</p>
                  </div>
                  <span
                    className="ml-3 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                    style={{
                      background:
                        e.tipo === "beneficio" ? "rgba(94,34,243,0.1)" : "rgba(15,118,110,0.08)",
                      color: e.tipo === "beneficio" ? "#5E22F3" : "#0F766E",
                    }}
                  >
                    {e.tipo === "beneficio" ? "Benefício" : "Dica"}
                  </span>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Linha:{" "}
                  <span className="font-medium" style={{ color: linhaSelecionada.cor }}>
                    {linhaSelecionada.nome}
                  </span>
                </div>
              </div>
            ))}
            {estacoesFiltradas.length === 0 && (
              <div className="col-span-full text-sm text-gray-500 italic">
                Nenhum resultado encontrado com os filtros atuais.
              </div>
            )}
          </div>

          {/* Aviso mensal */}
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
            <strong>Importante:</strong> os benefícios são atualizados mensalmente e podem variar de acordo com a estação.
          </div>
        </section>
      </div>
    </main>
  );
}

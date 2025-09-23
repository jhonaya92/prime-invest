"use client";
import { useEffect, useState } from "react";

type Props = { symbol: string };
type Ai = { title: string; bullets: string[] };

export default function AnalysisBox({ symbol }: Props) {
  const code = (symbol.split(":").pop() || symbol).toUpperCase();
  const [ai, setAi] = useState<Ai | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`/api/ai/analisa?symbol=${encodeURIComponent(code)}`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (alive && d?.title) setAi(d); })
      .catch(()=>{});
    return () => { alive = false; };
  }, [code]);

  const title = ai?.title ?? "Compra Leve (tendência de alta moderada)";
  const bullets = ai?.bullets ?? [
    `Momento de alta em ~16% no período analisado (demo).`,
    `Volatilidade estimada ~13% (demo).`,
    `Viés positivo  adequado para entrada parcial com stops (demo).`,
  ];

  const links = [
    { label: "Fundamentei", href: `https://fundamentei.com.br/acoes/${code}` },
    { label: "Fundamentus", href: `https://www.fundamentus.com.br/detalhes.php?papel=${code}` },
    { label: "Status Invest", href: `https://statusinvest.com.br/acoes/${code.toLowerCase()}` },
  ];

  return (
    <div className="card h-full">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-300">Análise (IA didática)</div>
        <span className="badge">Compra Leve</span>
      </div>
      <div className="mt-2 font-semibold">{title}</div>
      <ul className="mt-2 list-disc list-inside text-sm text-gray-200 space-y-1">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map(l => (
          <a key={l.href} target="_blank" rel="noreferrer" href={l.href} className="btn soft">
            Ver no {l.label}
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">*Conteúdo demonstrativo  não é recomendação.</p>
    </div>
  );
}

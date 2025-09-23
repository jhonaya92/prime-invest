"use client";
import { useEffect, useState } from "react";

export default function AIInsight({ symbol }: { symbol: string }) {
  const [text, setText] = useState("Carregando análise...");
  useEffect(() => {
    const code = symbol.split(":").pop() || symbol;
    (async () => {
      try {
        const r = await fetch(`/api/ai/analisa?ticker=${encodeURIComponent(code)}`);
        if (r.ok) {
          const data = await r.json();
          setText(data.text || data.message || fallback(code));
        } else setText(fallback(code));
      } catch {
        setText(fallback(code));
      }
    })();
  }, [symbol]);

  function fallback(code:string){
    return `Sinal didático para ${code}: Compra Leve (tendência de alta moderada).
- Momento de alta em ~16% no período analisado.
- Volatilidade estimada ~13%.
- Viés positivo — adequado para entrada parcial com stops definidos.`;
  }

  return (
    <div className="card animate-in">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-300">Análise (IA didática)</div>
        <span className="chip">Compra Leve</span>
      </div>
      <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-200">{text}</pre>
      <div className="text-xs text-gray-500 mt-3">* Conteúdo demonstrativo — não é recomendação.</div>
    </div>
  );
}

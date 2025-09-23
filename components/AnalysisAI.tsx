"use client";
import { useEffect, useState } from "react";

export default function AnalysisAI({ symbol }: { symbol: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let dead = false;
    setLoading(true);
    (async () => {
      try {
        const t = symbol.includes(":") ? symbol.split(":")[1] : symbol;
        const r = await fetch(
          `/api/ai/analisa?symbol=${encodeURIComponent(t)}`,
        );
        const j = await r.json();
        if (!dead) setData(j);
      } finally {
        if (!dead) setLoading(false);
      }
    })();
    return () => {
      dead = true;
    };
  }, [symbol]);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-300">Análise (IA didática)</div>
        {data && (
          <span className="px-2 py-1 rounded-md text-xs bg-white/10 border border-white/10">
            {data.rating}
          </span>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">
          <div className="h-5 w-40 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-64 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-72 bg-white/10 rounded animate-pulse" />
        </div>
      ) : (
        <div className="space-y-2">
          <div className="font-semibold">{data?.headline}</div>
          <div className="text-sm text-gray-300">{data?.summary}</div>
          <ul className="text-sm text-gray-200 list-disc ml-5">
            {(data?.bullets || []).map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="text-[11px] text-gray-400 mt-2">
            * Conteúdo demonstrativo — não é recomendação.
          </div>
        </div>
      )}
    </div>
  );
}

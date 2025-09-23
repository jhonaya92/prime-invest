"use client";
import { useEffect, useState } from "react";

type Row = { sym: string; name?: string; price?: number; chg?: number };

const LIST = [
  "BMFBOVESPA:PETR4",
  "BMFBOVESPA:VALE3",
  "BMFBOVESPA:ITUB4",
  "BMFBOVESPA:BBDC4",
  "BMFBOVESPA:BBAS3",
  "BMFBOVESPA:PRIO3",
];

export default function QuoteChips({ tickers = LIST }: { tickers?: string[] }) {
  // começa com linhas válidas para evitar undefined
  const [rows, setRows] = useState<Row[]>(tickers.map((s) => ({ sym: s })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const data = await Promise.all(
          tickers.map(async (s) => {
            try {
              const t = s.includes(":") ? s.split(":")[1] : s;
              const r = await fetch(`/api/quote/${t}`);
              const j = r.ok ? await r.json() : null;
              const q = j?.results?.[0];
              return {
                sym: s,
                name: q?.shortName || q?.longName || s.split(":").pop(),
                price: q?.regularMarketPrice ?? q?.close ?? undefined,
                chg: q?.regularMarketChangePercent ?? undefined,
              } as Row;
            } catch {
              return { sym: s } as Row; // fallback seguro
            }
          })
        );
        if (!dead) setRows(data.filter((x) => !!x && !!x.sym));
      } finally {
        if (!dead) setLoading(false);
      }
    })();
    return () => {
      dead = true;
    };
  }, [tickers.join("|")]);

  // skeleton separado (não mistura com rows)
  if (loading) {
    return (
      <div className="overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
              <div className="h-4 w-16 bg-white/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <div className="flex items-center gap-2 min-w-max">
        {rows
          .filter((r) => r && r.sym)
          .map((r, i) => {
            const sym = r.sym!;
            const code = sym.includes(":") ? sym.split(":")[1] : sym;
            const price =
              r.price !== undefined ? "R$ " + r.price.toFixed(2) : "—";
            const chgTxt =
              r.chg === undefined ? "—" : (r.chg >= 0 ? "+" : "") + r.chg.toFixed(2) + "%";
            const chgCls =
              r.chg === undefined ? "text-gray-400" : r.chg >= 0 ? "text-green-400" : "text-red-400";

            return (
              <a
                key={i}
                href={`/ativos/${encodeURIComponent(sym)}`}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <span className="font-semibold mr-2">{code}</span>
                <span className="text-gray-300 mr-1">{price}</span>
                <span className={chgCls}>{chgTxt}</span>
              </a>
            );
          })}
      </div>
    </div>
  );
}
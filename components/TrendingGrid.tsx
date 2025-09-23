"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Row = { symbol: string; price?: number; change?: number; name?: string };

const DEFAULTS = [
  "BMFBOVESPA:PETR4",
  "BMFBOVESPA:VALE3",
  "BMFBOVESPA:ITUB4",
  "BMFBOVESPA:BBDC4",
  "BMFBOVESPA:BBAS3",
  "BMFBOVESPA:PRIO3",
];

export default function TrendingGrid({
  tickers = DEFAULTS,
}: {
  tickers?: string[];
}) {
  const [rows, setRows] = useState<Row[]>(tickers.map((s) => ({ symbol: s })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const data = await Promise.all(
          tickers.map(async (s) => {
            const t = s.includes(":") ? s.split(":")[1] : s;
            const r = await fetch(`/api/quote/${t}`);
            const j = r.ok ? await r.json() : null;
            const q = j?.results?.[0];

            return {
              symbol: s,
              name: q?.longName || q?.shortName || s.split(":").pop(),
              price: q?.regularMarketPrice ?? q?.close ?? undefined,
              change: q?.regularMarketChangePercent ?? undefined,
            } as Row;
          }),
        );
        if (!dead) setRows(data);
      } finally {
        if (!dead) setLoading(false);
      }
    })();
    return () => {
      dead = true;
    };
  }, [tickers.join("|")]);

  // Enquanto carrega, mostra somente skeletons (sem map duplo!)
  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 bg-white/5 border border-white/10"
          >
            <div className="h-4 w-28 bg-white/10 rounded animate-pulse mb-2" />
            <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  // Lista final (com guardas de segurança)
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {rows
        .filter((r) => r && r.symbol)
        .map((r, i) => {
          const sym = r.symbol!;
          const code = sym.split(":").pop()!;
          return (
            <Link
              key={i}
              href={`/ativos/${encodeURIComponent(sym)}`}
              className="rounded-2xl p-4 bg-white/5 border border-white/10 hover:border-white/20 transition"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold">{code}</div>
                <div
                  className={`text-sm ${
                    r.change === undefined
                      ? "text-gray-400"
                      : r.change >= 0
                        ? "text-green-400"
                        : "text-red-400"
                  }`}
                >
                  {r.change === undefined
                    ? "—"
                    : (r.change >= 0 ? "+" : "") + r.change.toFixed(2) + "%"}
                </div>
              </div>
              <div className="text-xs text-gray-400">{r.name || code}</div>
              <div className="mt-2 text-gray-200">
                {r.price !== undefined ? "R$ " + r.price.toFixed(2) : "—"}
              </div>
            </Link>
          );
        })}
    </div>
  );
}

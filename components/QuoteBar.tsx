"use client";
import { useEffect, useState } from "react";

type Row = { symbol: string; price?: number; change?: number };

const DEFAULTS = [
  "BMFBOVESPA:PETR4","BMFBOVESPA:VALE3","BMFBOVESPA:ITUB4",
  "BMFBOVESPA:BBDC4","BMFBOVESPA:BBAS3","BMFBOVESPA:PRIO3"
];

function Chip({ r }: { r: Row }) {
  const pct = typeof r.change === "number" ? r.change : undefined;
  const cls = pct === undefined ? "text-gray-300" : pct >= 0 ? "text-green-400" : "text-red-400";
  return (
    <div className="shrink-0 rounded-xl px-3 py-1.5 bg-white/5 border border-white/10 flex items-center gap-2">
      <span className="font-semibold">{r.symbol.split(":").pop()}</span>
      <span className="text-gray-300">{r.price !== undefined ? "R$ "+r.price.toFixed(2) : "—"}</span>
      <span className={`text-sm ${cls}`}>{pct !== undefined ? (pct>=0?"+":"")+pct.toFixed(2)+"%" : "—"}</span>
    </div>
  );
}

export default function QuoteBar({ tickers = DEFAULTS }: { tickers?: string[] }) {
  const [rows, setRows] = useState<Row[]>(tickers.map(s => ({ symbol: s })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const res = await Promise.all(
          tickers.map(async (s) => {
            const t = s.includes(":") ? s.split(":")[1] : s;
            const r = await fetch(`/api/quote/${encodeURIComponent(t)}`);
            const j = r.ok ? await r.json() : null;
            const q = j?.results?.[0];
            return {
              symbol: s,
              price: q?.regularMarketPrice ?? q?.close ?? undefined,
              change: q?.regularMarketChangePercent ?? undefined,
            } as Row;
          })
        );
        if (!dead) setRows(res);
      } catch {
        // fica com "—" e segue
      } finally {
        if (!dead) setLoading(false);
      }
    })();
    return () => { dead = true; };
  }, [tickers.join("|")]);

  return (
    <div className="mb-4">
      <div className="glass rounded-2xl px-3 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          {(loading ? Array.from({length:6}).map((_,i)=>(
            <div key={i} className="shrink-0 rounded-xl px-3 py-1.5 bg-white/5 border border-white/10">
              <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
            </div>
          )) : rows.map((r,i)=>(<Chip key={i} r={r} />)))}
        </div>
      </div>
    </div>
  );
}
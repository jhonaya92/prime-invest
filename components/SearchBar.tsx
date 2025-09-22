"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TICKERS } from "@/lib/tickers";

function normalizeInput(v: string) {
  return v.trim().toUpperCase();
}
function toSymbol(v: string) {
  const s = normalizeInput(v);
  if (s.includes(":")) return s;
  // assume B3 por padrão
  return `BMFBOVESPA:${s}`;
}

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    const s = normalizeInput(q);
    if (!s) return [];
    return TICKERS.filter(t => t.symbol.includes(s) || t.name.toUpperCase().includes(s)).slice(0, 6);
  }, [q]);

  function go(sym: string) {
    const url = "/ativos/" + encodeURIComponent(sym);
    router.push(url);
    setQ("");
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && q.trim()) {
      go(toSymbol(q));
    }
  }

  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        onKeyDown={onKey}
        placeholder="Buscar ação (ex: PETR4, VALE3)"
        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-white/20"
      />
      {q && results.length > 0 && (
        <div className="absolute z-20 mt-1 w-full bg-black/80 backdrop-blur rounded-xl border border-white/10 p-1">
          {results.map((r)=>(
            <button
              key={r.symbol}
              onClick={()=>go(r.symbol)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-sm"
            >
              <span className="font-semibold">{r.symbol.split(":")[1]}</span>
              <span className="text-gray-400"> — {r.name}</span>
            </button>
          ))}
          <div className="px-3 py-1 text-[11px] text-gray-400">Pressione Enter para buscar “{q.toUpperCase()}”.</div>
        </div>
      )}
    </div>
  );
}
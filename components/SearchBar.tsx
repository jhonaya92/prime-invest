'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function go(symbol?: string) {
    const raw = symbol ?? q;
    if (!raw) return;
    const clean = raw.toUpperCase().replace(/[^A-Z0-9:]/g, "");
    const ticker = clean.includes(":") ? clean : `BMFBOVESPA:${clean}`;
    router.push(`/ativos/${encodeURIComponent(ticker)}`);
  }

  return (
    <div className="hidden md:flex items-center gap-2 w-[360px]">
      <div className="flex-1 relative">
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          onKeyDown={(e)=> e.key === 'Enter' && go() }
          placeholder="Buscar ação (ex: PETR4, VALE3)"
          className="w-full rounded-xl bg-subtle/70 border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]/30 placeholder:text-gray-500"
        />
        <span className="absolute right-3 top-2.5 text-xs text-gray-400">Enter</span>
      </div>
      <button onClick={()=>go()} className="px-3 py-2 rounded-xl bg-[var(--accent)] text-black text-sm font-semibold">Buscar</button>
    </div>
  );
}

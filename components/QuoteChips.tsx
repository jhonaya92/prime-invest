"use client";
import { useEffect, useState } from "react";
const LIST = ["BMFBOVESPA:PETR4","BMFBOVESPA:VALE3","BMFBOVESPA:ITUB4","BMFBOVESPA:BBDC4","BMFBOVESPA:BBAS3","BMFBOVESPA:PRIO3"];

export default function QuoteChips({ tickers=LIST }:{ tickers?: string[] }){
  const [rows,setRows] = useState<any[]>([]);
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    let dead=false;
    (async()=>{
      try{
        const data = await Promise.all(tickers.map(async s=>{
          const t = s.includes(":")? s.split(":")[1] : s;
          const r = await fetch(`/api/quote/${t}`); const j = r.ok? await r.json():null;
          const q = j?.results?.[0];
          return {
            sym: s,
            name: q?.shortName || q?.longName || s.split(":").pop(),
            price: q?.regularMarketPrice ?? q?.close,
            chg: q?.regularMarketChangePercent
          }
        }));
        if(!dead) setRows(data);
      } finally{ if(!dead) setLoading(false); }
    })();
    return ()=>{dead=true};
  },[tickers.join("|")]);

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <div className="flex items-center gap-2 min-w-max">
        {(loading?Array.from({length:6}).map((_,i)=>(
          <div key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <div className="h-4 w-16 bg-white/10 rounded animate-pulse"/>
          </div>
        )):rows).map((r:any,i:number)=>(
          <a key={i} href={`/ativos/${encodeURIComponent(r.sym)}`}
             className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
            <span className="font-semibold mr-2">{r.sym.split(":").pop()}</span>
            <span className="text-gray-300 mr-1">{r.price!==undefined? "R$ "+r.price.toFixed(2):"—"}</span>
            <span className={r.chg===undefined? "text-gray-400" : (r.chg>=0?"text-green-400":"text-red-400")}>
              {r.chg===undefined? "—" : (r.chg>=0?"+":"")+r.chg.toFixed(2)+"%"}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
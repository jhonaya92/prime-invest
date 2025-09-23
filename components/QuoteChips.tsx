"use client";
import { useEffect, useState } from "react";
type Row = { sym: string; price?: number; change?: number };

const DEFAULTS: Row[] = [
  { sym: "BMFBOVESPA:PETR4", price: 31.37, change: 1.0 },
  { sym: "BMFBOVESPA:VALE3", price: 58.0,  change: 0.14 },
  { sym: "BMFBOVESPA:ITUB4", price: 38.44, change: -1.44 },
  { sym: "BMFBOVESPA:BBDC4" },
  { sym: "BMFBOVESPA:BBAS3" },
  { sym: "BMFBOVESPA:PRIO3" },
];

export default function QuoteChips() {
  const [rows, setRows] = useState<Row[]>(DEFAULTS);
  useEffect(()=>{ /* pode ligar no /api/quote depois; demo fica estável */ },[]);
  return (
    <div className="flex flex-wrap gap-3">
      {rows.map((r,i)=>{
        const code = (r.sym ?? "").split(":").pop() || "—";
        const cls = r.change===undefined?"text-gray-300":r.change>=0?"text-green-400":"text-red-400";
        return (
          <span key={i} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
            <strong>{code}</strong>
            <span className="text-gray-300">{r.price!==undefined?`R$ ${r.price.toFixed(2)}`:"— —"}</span>
            <span className={cls}>{r.change!==undefined?`${r.change>0?"+":""}${r.change.toFixed(2)}%`:"— —"}</span>
          </span>
        );
      })}
    </div>
  );
}

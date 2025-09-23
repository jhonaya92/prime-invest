"use client";
import { useState } from "react";
import LightChart from "./LightChart";
const LIST = ["BMFBOVESPA:PETR4","BMFBOVESPA:VALE3","BMFBOVESPA:ITUB4","BMFBOVESPA:BBDC4","BMFBOVESPA:PRIO3"];
export default function ChartCard({ initial=LIST[0], height=380 }:{ initial?: string; height?: number }){
  const [sym,setSym]=useState(initial);
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-300">Gráfico (B3)</div>
        <div className="flex items-center gap-2">
          {LIST.map(s=>(
            <button key={s} onClick={()=>setSym(s)}
              className={`px-3 py-1.5 rounded-xl text-sm ${s===sym?"bg-white/20":"bg-white/5 hover:bg-white/10"} transition`}>
              {s.split(":").pop()}
            </button>
          ))}
        </div>
      </div>
      <LightChart symbol={sym} height={height}/>
    </div>
  );
}
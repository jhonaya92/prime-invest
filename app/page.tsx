"use client";
import { useState } from "react";
import MostSearched from "@/components/MostSearched";
import TradingViewPro from "@/components/TradingViewPro";

const HOTS = ["BMFBOVESPA:PETR4","BMFBOVESPA:VALE3","BMFBOVESPA:ITUB4","BMFBOVESPA:BBDC4","BMFBOVESPA:PRIO3"];

export default function Page() {
  const [sym, setSym] = useState(HOTS[0]);
  return (
    <main className="space-y-4">
      <section className="card animate-in">
        <h1 className="text-3xl font-extrabold">Destaques do dia</h1>
        <p className="text-gray-400 text-sm">Altas e quedas com carregamento suave.</p>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <div className="text-sm text-gray-300 mb-2">Maiores altas (B3)</div>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><strong>PRIO3</strong><span className="text-gray-300">R$ 43,20</span><span className="text-green-400">+3,91%</span></li>
            <li className="flex justify-between"><strong>PETR4</strong><span className="text-gray-300">R$ 37,10</span><span className="text-green-400">+2,84%</span></li>
            <li className="flex justify-between"><strong>BBAS3</strong><span className="text-gray-300">R$ 52,60</span><span className="text-green-400">+2,31%</span></li>
            <li className="flex justify-between"><strong>ITUB4</strong><span className="text-gray-300">R$ 33,70</span><span className="text-green-400">+1,95%</span></li>
            <li className="flex justify-between"><strong>VALE3</strong><span className="text-gray-300">R$ 68,10</span><span className="text-green-400">+1,42%</span></li>
          </ul>
        </div>
        <MostSearched />
      </section>

      <section className="card">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-300">Gráfico (B3)</div>
          <div className="flex flex-wrap gap-2">
            {HOTS.map((s)=>(
              <button key={s} onClick={()=>setSym(s)} className={`chip ${sym===s?"ring-1 ring-white/30":""}`}>
                {s.split(":").pop()}
              </button>
            ))}
          </div>
        </div>
        <TradingViewPro symbol={sym} height={380} />
      </section>
    </main>
  );
}

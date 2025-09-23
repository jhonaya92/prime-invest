import TradingViewPro from "@/components/TradingViewPro";

const HOT = ["BMFBOVESPA:PETR4","BMFBOVESPA:VALE3","BMFBOVESPA:ITUB4","BMFBOVESPA:BBDC4","BMFBOVESPA:PRIO3"];

export default function GraphHome() {
  const sym = HOT[0];
  return (
    <section className="card">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-300">Gr�fico (B3)</div>
        <div className="flex flex-wrap gap-2">
          {HOT.map(s => <a key={s} className="chip" href={`/ativos/${encodeURIComponent(s)}`}>{s.split(":").pop()}</a>)}
        </div>
      </div>
      <TradingViewPro symbol={sym} height={420} />
    </section>
  );
}

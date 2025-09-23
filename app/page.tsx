import Highlights from "@/components/Highlights";
import MostSearched from "@/components/MostSearched";
import TradingViewPro from "@/components/TradingViewPro";

export default function Page() {
  const SYMBOLS = [
    "BMFBOVESPA:PETR4",
    "BMFBOVESPA:VALE3",
    "BMFBOVESPA:ITUB4",
    "BMFBOVESPA:BBDC4",
    "BMFBOVESPA:PRIO3",
  ];

  return (
    <main className="space-y-4">
      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-6 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">Destaques do dia</h1>
            <p className="text-gray-400 text-sm">
              Altas e quedas com carregamento suave.
            </p>
          </div>
          <Highlights />
        </div>
        <MostSearched />
      </section>

      <section className="card">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-300">Gráfico (B3)</div>
          <div className="flex gap-2">
            {SYMBOLS.map((s) => (
              <a
                key={s}
                href={`/ativos/${encodeURIComponent(s)}`}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
              >
                {s.split(":")[1]}
              </a>
            ))}
          </div>
        </div>
        <TradingViewPro symbol={SYMBOLS[0]} height={420} />
      </section>
    </main>
  );
}

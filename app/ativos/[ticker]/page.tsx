import TradingViewWidget from "@/components/TradingViewWidget";

type Props = { params: { ticker: string } };

const kpis = [
  { label: "P/L", value: "5,9" },
  { label: "P/VP", value: "1,3" },
  { label: "ROE", value: "18,2%" },
  { label: "Dividend Yield", value: "9,1%" },
];

export default function AssetPage({ params }: Props) {
  const symbol = decodeURIComponent(params.ticker);
  const name = symbol.split(":").pop();
  return (
    <main>
      <section className="glass rounded-2xl p-6 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">{name} <span className="text-sm md:text-base text-gray-400">({symbol})</span></h1>
        <p className="text-gray-400 text-sm">Visualização do ativo com gráfico TradingView e KPIs ilustrativos.</p>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TradingViewWidget symbol={symbol} height={520} />
        </div>
        <div className="space-y-4">
          <div className="card">
            <div className="text-sm text-gray-300 mb-2">KPIs Fundamentais (mock)</div>
            <ul className="text-sm text-gray-200 grid grid-cols-2 gap-3">
              {kpis.map((k, i)=> (
                <li key={i} className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-gray-400">{k.label}</span>
                  <span className="font-semibold">{k.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <div className="text-sm text-gray-300 mb-2">Comparar rápido</div>
            <ul className="text-sm space-y-2">
              {["BMFBOVESPA:VALE3", "BMFBOVESPA:ITUB4", "BMFBOVESPA:BBDC4"].map((s,i)=>(
                <li key={i}><a className="link" href={`/ativos/${encodeURIComponent(s)}`}>{s.split(":").pop()}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

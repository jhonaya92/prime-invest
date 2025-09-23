import TradingViewPro from "@/components/TradingViewPro";
import AIInsight from "@/components/AIInsight";

type Props = { params: { ticker: string } };
const HOTS = ["BMFBOVESPA:PETR4","BMFBOVESPA:VALE3","BMFBOVESPA:ITUB4","BMFBOVESPA:BBDC4","BMFBOVESPA:PRIO3"];

export default function AssetPage({ params }: Props) {
  const raw = decodeURIComponent(params.ticker);
  const symbol = raw.includes(":") ? raw : `BMFBOVESPA:${raw}`;
  const code = symbol.split(":").pop() || symbol;
  const peers = ["BMFBOVESPA:VALE3","BMFBOVESPA:ITUB4","BMFBOVESPA:BBDC4","BMFBOVESPA:BBAS3"];

  return (
    <main className="space-y-4">
      <section className="card">
        <h1 className="text-3xl font-extrabold">
          {code} <span className="text-sm text-gray-400">({symbol})</span>
        </h1>
        <p className="text-gray-400 text-sm">Visão do papel com gráfico e análise assistida (demo).</p>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-300">Gráfico (B3)</div>
            <div className="flex flex-wrap gap-2">
              {HOTS.map((s)=>(
                <a key={s} className="chip" href={`/ativos/${encodeURIComponent(s)}`}>{s.split(":").pop()}</a>
              ))}
            </div>
          </div>
          <TradingViewPro symbol={symbol} height={420} />
        </div>

        <div className="space-y-4">
          <AIInsight symbol={symbol} />
          <div className="card">
            <div className="text-sm text-gray-300 mb-2">Comparar rápido</div>
            <div className="grid grid-cols-2 gap-3">
              {peers.map((p)=>(
                <a key={p} className="btn soft text-center" href={`/ativos/${encodeURIComponent(p)}`}>
                  {p.split(":").pop()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import ChartCard from "@/components/ChartCard";
import AnalysisAI from "@/components/AnalysisAI";

type Props = { params: { ticker: string } };

export default function AssetPage({ params }: Props) {
  const symbol = decodeURIComponent(params.ticker);
  const name = symbol.split(":").pop();

  const peers = [
    "BMFBOVESPA:VALE3",
    "BMFBOVESPA:ITUB4",
    "BMFBOVESPA:BBDC4",
    "BMFBOVESPA:BBAS3",
  ];

  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          {name}{" "}
          <span className="text-sm md:text-base text-gray-400">({symbol})</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Visão do papel com gráfico e análise assistida (demo).
        </p>
      </section>

      <section className="grid xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <ChartCard initial={symbol} height={460} />
        </div>
        <div className="space-y-4">
          <AnalysisAI symbol={symbol} />
          <div className="card">
            <div className="text-sm text-gray-300 mb-2">Comparar rápido</div>
            <ul className="text-sm grid grid-cols-2 gap-2">
              {peers.map((s, i) => (
                <li key={i}>
                  <a
                    className="link block bg-white/5 rounded-lg px-3 py-2 text-center"
                    href={`/ativos/${encodeURIComponent(s)}`}
                  >
                    {s.split(":").pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

import TradingViewPro from "@/components/TradingViewPro";

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
        <h1 className="text-2xl md:text-3xl font-extrabold">
          {name} <span className="text-sm text-gray-400">({symbol})</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Visão do papel com gráfico e análise assistida (demo).
        </p>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-300">Gráfico (B3)</div>
            <div className="flex gap-2">
              {[
                "BMFBOVESPA:PETR4",
                "BMFBOVESPA:VALE3",
                "BMFBOVESPA:ITUB4",
                "BMFBOVESPA:BBDC4",
                "BMFBOVESPA:PRIO3",
              ].map((s) => (
                <a
                  key={s}
                  href={"/ativos/" + encodeURIComponent(s)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  {s.split(":")[1]}
                </a>
              ))}
            </div>
          </div>
          <TradingViewPro symbol={symbol} height={460} />
        </div>

        <div className="space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-300">Análise (IA didática)</div>
              <span className="px-2 py-1 text-xs rounded bg-white/10 border border-white/10">
                Compra Leve
              </span>
            </div>
            <div className="font-semibold mb-1">
              Compra Leve (tendência de alta moderada)
            </div>
            <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
              <li>Momento de alta em 16.2% no período analisado.</li>
              <li>Volatilidade anualizada estimada: 13.4%.</li>
              <li>
                Viés positivo — adequado para entrada parcial com stops
                definidos.
              </li>
            </ul>
            <div className="text-[11px] text-gray-500 mt-3">
              * Conteúdo demonstrativo — não é recomendação.
            </div>
          </div>

          <div className="card">
            <div className="text-sm text-gray-300 mb-2">Comparar rápido</div>
            <div className="grid grid-cols-2 gap-2">
              {peers.map((p) => (
                <a
                  key={p}
                  href={"/ativos/" + encodeURIComponent(p)}
                  className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10"
                >
                  {p.split(":")[1]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

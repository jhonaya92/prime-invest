import LightChart from "@/components/LightChart";

type Props = { params: { ticker: string } };

const kpis = [
  { label: "P/L", value: "6,1" },
  { label: "P/VP", value: "1,3" },
  { label: "ROE", value: "18,2%" },
  { label: "ROIC", value: "14,7%" },
  { label: "Margem Líquida", value: "12,4%" },
  { label: "Div. Líq./EBITDA", value: "0,8x" },
  { label: "Payout", value: "62%" },
  { label: "Dividend Yield", value: "9,1%" },
  { label: "LPA", value: "3,42" },
  { label: "VPA", value: "18,9" },
];

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
    <main>
      <section className="glass rounded-2xl p-6 mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          {name}{" "}
          <span className="text-sm md:text-base text-gray-400">({symbol})</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Gráfico próprio (Lightweight Charts) + KPIs mock + comparador rápido.
        </p>
      </section>

      <section className="grid xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <LightChart symbol={symbol} height={520} />
        </div>
        <div className="space-y-4">
          <div className="card">
            <div className="text-sm text-gray-300 mb-2">
              KPIs Fundamentais (mock)
            </div>
            <ul className="text-sm text-gray-200 grid grid-cols-2 gap-3">
              {kpis.map((k, i) => (
                <li
                  key={i}
                  className="bg-white/5 rounded-xl p-3 flex items-center justify-between"
                >
                  <span className="text-gray-400">{k.label}</span>
                  <span className="font-semibold">{k.value}</span>
                </li>
              ))}
            </ul>
          </div>
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

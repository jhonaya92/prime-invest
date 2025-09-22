import LightChart from "@/components/LightChart";

export const revalidate = 300;

async function getQuote(symbolParam: string) {
  const raw = decodeURIComponent(symbolParam || "");
  const s = raw.includes(":") ? raw.split(":")[1] : raw;
  const url = `https://brapi.dev/api/quote/${encodeURIComponent(s)}?range=6mo&interval=1d&fundamental=true`;
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.results?.[0] ?? null;
  } catch { return null; }
}

function pctClass(v?: number) {
  if (typeof v !== "number") return "text-gray-300";
  return v >= 0 ? "text-green-400" : "text-red-400";
}

type Props = { params: { ticker: string } };

export default async function AssetPage({ params }: Props) {
  const symbol = decodeURIComponent(params.ticker);
  const name = symbol.split(":").pop();
  const q = await getQuote(symbol);

  const price = q?.regularMarketPrice as number | undefined;
  const change = q?.regularMarketChangePercent as number | undefined;

  const kpis = [
    { label: "P/L", value: q?.priceEarnings ?? "6,1" },
    { label: "P/VP", value: q?.priceToBook ?? "1,3" },
    { label: "ROE", value: (q?.roeTTM ? (q.roeTTM*100).toFixed(1)+"%" : "18,2%") },
    { label: "Margem Líq.", value: (q?.profitMargins ? (q.profitMargins*100).toFixed(1)+"%" : "12,4%") },
    { label: "Div.Yield", value: (q?.dividendYield ? (q.dividendYield*100).toFixed(1)+"%" : "9,1%") },
    { label: "Beta", value: q?.beta ?? "0,9" },
  ];

  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-4 md:p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{name} <span className="text-sm md:text-base text-gray-400">({symbol})</span></h1>
            <p className="text-gray-400 text-sm">Gráfico + preço em tempo real (quando disponível) e KPIs ilustrativos.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold leading-tight">{price ? "R$ "+price.toFixed(2) : "—"}</div>
            <div className={`text-sm ${pctClass(change)}`}>{typeof change==="number" ? (change>=0?"+":"")+change.toFixed(2)+"%" : "—"}</div>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-4 mt-4">
          {/* Gráfico ocupa 2 colunas */}
          <div className="xl:col-span-2 card p-0"><LightChart symbol={symbol} height={520} /></div>

          {/* KPIs ao lado, no mesmo bloco visual */}
          <div className="card">
            <div className="text-sm text-gray-300 mb-2">KPIs principais</div>
            <ul className="text-sm text-gray-200 grid grid-cols-2 gap-3">
              {kpis.map((k, i)=> (
                <li key={i} className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-gray-400">{k.label}</span>
                  <span className="font-semibold">{k.value as any}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 text-xs text-gray-400">
              * Alguns valores podem estar em modo demo (mock) caso a API esteja indisponível.
            </div>
          </div>
        </div>

        {/* Acesso rápido no mesmo card, abaixo */}
        <div className="mt-4">
          <div className="text-sm text-gray-300 mb-2">Comparar rapidamente</div>
          <ul className="text-sm grid grid-cols-2 md:grid-cols-4 gap-2">
            {["BMFBOVESPA:PETR4","BMFBOVESPA:VALE3","BMFBOVESPA:ITUB4","BMFBOVESPA:BBDC4"].map((s)=>(
              <li key={s}><a className="link block bg-white/5 rounded-lg px-3 py-2 text-center" href={`/ativos/${encodeURIComponent(s)}`}>{s.split(":").pop()}</a></li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
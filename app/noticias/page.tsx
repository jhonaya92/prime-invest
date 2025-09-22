import { news as base } from "@/lib/mock";

const fallback = [
  { title: "Ibovespa sobe com commodities em alta", time: "há 8 min" },
  { title: "Banco central sinaliza manutenção de juros", time: "há 32 min" },
  { title: "Setor de varejo reage após dados de vendas", time: "há 54 min" },
];

export default function Page() {
  const news = Array.isArray(base) && base.length ? base : fallback;
  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Notícias</h1>
        <p className="text-gray-400 text-sm">Atualizações mais recentes (mock).</p>
      </section>
      <section className="card">
        <ul className="space-y-4">
          {news.map((n, i)=>(
            <li key={i}>
              <div className="text-base">{n.title}</div>
              <div className="text-xs text-gray-400">{n.time}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
import Link from "next/link";
import { TICKERS } from "@/lib/tickers";

export default function Page() {
  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold">Ativos</h1>
        <p className="text-gray-400 text-sm">Selecione um papel para abrir o gráfico e KPIs.</p>
      </section>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {TICKERS.map((t)=>(
          <Link key={t.symbol} href={`/ativos/${encodeURIComponent(t.symbol)}`} className="card hover:scale-[1.01] transition">
            <div className="text-lg font-semibold">{t.symbol.split(":")[1]}</div>
            <div className="text-gray-400 text-sm">{t.name}</div>
          </Link>
        ))}
      </section>
    </main>
  );
}
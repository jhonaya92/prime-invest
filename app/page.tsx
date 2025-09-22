import StatCard from "@/components/StatCard";
import TradingViewWidget from "@/components/TradingViewWidget";
import TrendingList from "@/components/TrendingList";
import { indices } from "@/lib/mock";

export default function Page() {
  return (
    <main>
      <section className="glass rounded-2xl p-8 mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Prime Invest:<br/>Seu futuro em mãos de <span className="text-[var(--accent)]">elite</span>.</h1>
        <p className="mt-3 text-gray-300 max-w-2xl">Dashboard premium com gráficos TradingView, ranking de ações e alertas de notícias em tempo real (mock).</p>
        <div className="mt-6">
          <a href="#" className="inline-block px-5 py-3 rounded-xl bg-[var(--accent)] text-black font-semibold">Comece agora</a>
        </div>
      </section>

      <section className="grid md:grid-cols-4 gap-4">
        {indices.map((s, i)=> (
          <StatCard key={i} label={s.name} value={s.value} change={s.change} />
        ))}
      </section>

      <section className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-2 space-y-4">
          <TradingViewWidget symbol="BMFBOVESPA:PETR4" height={380} />
          <div className="grid sm:grid-cols-2 gap-4">
            <TradingViewWidget symbol="BMFBOVESPA:VALE3" height={280} />
            <TradingViewWidget symbol="BMFBOVESPA:ITUB4" height={280} />
          </div>
        </div>
        <div className="space-y-4">
          <TrendingList />
          <div className="card">
            <div className="text-sm text-gray-300 mb-2">Dica</div>
            <p className="text-sm text-gray-400">Clique em uma ação em “Mais buscadas” ou use a busca no topo para abrir a página do ativo.</p>
          </div>
        </div>
      </section>

      <section className="card mt-4">
        <div className="text-sm text-gray-400">Disclaimer</div>
        <p className="text-sm text-gray-300 mt-1">Esta é uma prévia visual (mock) sem conexão com dados oficiais da B3. Gráficos TradingView são embeds públicos meramente ilustrativos.</p>
      </section>
    </main>
  );
}

export default function Page() {
  const plans = [
    { name: "Free", price: "R$ 0", features: ["Dashboard básico", "Gráficos locais", "Academy preview"], cta: "Começar" },     
    { name: "Premium", price: "R$ 29/mês", features: ["KPIs completos", "Watchlist e alertas", "News IA priorizadas"], cta: "Assinar" },
    { name: "Business", price: "R$ 79/mês", features: ["Carteiras e relatórios", "Screener avançado", "Atendimento prioritário"], cta: "Falar com vendas" },
  ];
  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-3xl font-bold">Planos</h1>
        <p className="text-gray-400 text-sm">Escolha o plano ideal para sua jornada na B3.</p>
      </section>
      <section className="grid md:grid-cols-3 gap-4">
        {plans.map((p, i)=>(
          <div key={i} className="card flex flex-col">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-3xl font-extrabold mt-1">{p.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              {p.features.map((f, j)=>(<li key={j} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>{f}</li>))}
            </ul>
            <a href="#" className="mt-6 px-4 py-2 rounded-xl bg-[var(--accent)] text-black font-semibold text-center">{p.cta}</a>
          </div>
        ))}
      </section>
    </main>
  );
}
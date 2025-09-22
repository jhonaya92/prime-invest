export default function Page() {
  const mods = [
    {
      t: "Módulo 1 • Fundamentos da B3",
      d: "Como funcionam ações, tickers, book de ofertas, leilões.",
    },
    {
      t: "Módulo 2 • Análise Fundamentalista",
      d: "KPIs, múltiplos, leitura de balanços (visão prática).",
    },
    {
      t: "Módulo 3 • Análise Técnica",
      d: "Tendência, candles, suportes/resistências e setups clássicos.",
    },
  ];
  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold">Academy</h1>
        <p className="text-gray-400 text-sm">Conteúdo introdutório (demo).</p>
      </section>
      <section className="grid md:grid-cols-3 gap-3">
        {mods.map((m, i) => (
          <div key={i} className="card">
            <div className="font-semibold">{m.t}</div>
            <div className="text-gray-400 text-sm mt-1">{m.d}</div>
            <a
              href="#"
              className="mt-4 inline-block px-3 py-2 rounded-xl bg-[var(--accent)] text-black text-sm font-semibold"
            >
              Ver aula
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}

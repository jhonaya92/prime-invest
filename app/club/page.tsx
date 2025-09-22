export default function Page() {
  const perks = ["Sala ao vivo semanal", "Alertas por e-mail", "Planilhas e carteiras", "Comunidade privada (Discord)"];
  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold">Club</h1>
        <p className="text-gray-400 text-sm">Benefícios para membros (demo).</p>
      </section>
      <section className="card">
        <ul className="grid sm:grid-cols-2 gap-3 text-sm">
          {perks.map((p,i)=> (<li key={i} className="bg-white/5 rounded-xl px-3 py-2">{p}</li>))}
        </ul>
      </section>
    </main>
  );
}
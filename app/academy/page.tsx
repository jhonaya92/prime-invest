export default function Page(){
  return(
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-3xl font-bold">Academy</h1>
        <p className="text-gray-400 text-sm">Cursos rápidos, trilhas e glossário (demo).</p>
      </section>
      <section className="grid md:grid-cols-3 gap-4">
        {["Básico de Ações","Análise Técnica","Fundamentos"].map((t,i)=>(
          <div key={i} className="card"><div className="text-lg font-semibold">{t}</div>
            <p className="text-sm text-gray-400 mt-1">Aulas curtas e práticas.</p>
            <a className="mt-4 inline-block px-3 py-1.5 rounded-xl bg-[var(--accent)] text-black font-semibold">Ver conteúdo</a>
          </div>
        ))}
      </section>
    </main>
  )
}
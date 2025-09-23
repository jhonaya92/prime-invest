export default function Page(){
  return(
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-3xl font-bold">Club</h1>
        <p className="text-gray-400 text-sm">Discussões, carteiras e relatórios da comunidade (demo).</p>
      </section>
      <section className="card">
        <div className="text-sm text-gray-300 mb-2">Feed</div>
        <ul className="space-y-3 text-sm">
          {["Estratégia de dividendos","Swing trade semanal","Acompanhamento Ibov"].map((t,i)=>(
            <li key={i} className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
              <span>{t}</span><a href="#" className="text-xs underline">Abrir</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
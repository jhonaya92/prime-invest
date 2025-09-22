import LightChart from "@/components/LightChart";
export default function Page() {
  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold">Gráfico demo</h1>
        <p className="text-gray-400 text-sm">Se a fonte cair, mostramos amostra local automaticamente.</p>
      </section>
      <div className="card p-0">
        <LightChart symbol="PETR4" height={520} />
      </div>
    </main>
  );
}
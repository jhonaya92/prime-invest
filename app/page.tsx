import Highlights from "@/components/Highlights";
import TrendingList from "@/components/TrendingList";
import LightChart from "@/components/LightChart";

export default function Page() {
  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold">Destaques do dia</h1>
        <p className="text-gray-400 text-sm">Altas e quedas com carregamento suave.</p>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Highlights />
        </div>
        <div className="space-y-4">
          <div className="card">
            <div className="text-sm text-gray-300 mb-2">Mais buscadas</div>
            <TrendingList />
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-2">Gráfico (teste local)</h2>
        <p className="text-gray-400 text-sm mb-4">Se a fonte cair, mostramos amostra local automaticamente.</p>
        <div className="card p-0">
          <LightChart symbol="PETR4" height={380} />
        </div>
      </section>
    </main>
  );
}
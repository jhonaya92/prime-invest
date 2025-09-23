import Highlights from "@/components/Highlights";
import TrendingGrid from "@/components/TrendingGrid";
import ChartCard from "@/components/ChartCard";

export default function Page() {
  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold">Destaques do dia</h1>
        <p className="text-gray-400 text-sm">
          Altas e quedas com carregamento suave.
        </p>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Highlights />
        </div>
        <div className="space-y-4">
          <div className="card">
            <div className="text-sm text-gray-300 mb-2">Mais buscadas</div>
            <TrendingGrid />
          </div>
        </div>
      </section>

      <section>
        <ChartCard initial="BMFBOVESPA:PETR4" height={380} />
      </section>
    </main>
  );
}

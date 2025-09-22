import LightChart from "@/components/LightChart";
import Highlights from "@/components/Highlights";

export default function Page() {
  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm">Visão geral do mercado (mock).</p>
      </section>
      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card p-0">
          <LightChart symbol="PETR4" height={420} />
        </div>
        <div className="space-y-4">
          <Highlights />
        </div>
      </section>
    </main>
  );
}

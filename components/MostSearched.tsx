import Link from "next/link";

type Item = { sym: string; name: string; price?: string; change?: string };

const TOP: Item[] = [
  { sym: "BMFBOVESPA:PETR4", name: "Petróleo Brasileiro S.A. - Petrobras", price: "R$ 31,37", change: "+1.00%" },
  { sym: "BMFBOVESPA:VALE3", name: "Vale S.A.", price: "R$ 58,00", change: "+0.14%" },
  { sym: "BMFBOVESPA:ITUB4", name: "Itaú Unibanco", price: "R$ 38,44", change: "-1.44%" },
];
const OTHERS = ["BMFBOVESPA:BBDC4", "BMFBOVESPA:BBAS3", "BMFBOVESPA:PRIO3"];

export default function MostSearched() {
  return (
    <div className="card">
      <div className="text-sm text-gray-300 mb-2">Mais buscadas</div>

      <div className="grid sm:grid-cols-3 gap-3">
        {TOP.map((i) => (
          <Link
            key={i.sym}
            href={`/ativos/${encodeURIComponent(i.sym)}`}
            className="rounded-2xl bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition h-[120px] flex flex-col justify-between"
          >
            <div>
              <div className="text-xs text-gray-400 mb-1 line-clamp-1">{i.name}</div>
              <div className="text-lg font-extrabold">{i.sym.split(":")[1]}</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">{i.price ?? "—"}</span>
              <span className={(i.change?.startsWith("-") ? "text-red-400" : "text-green-400")}>{i.change ?? "—"}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {OTHERS.map((s) => (
          <Link
            key={s}
            href={`/ativos/${encodeURIComponent(s)}`}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition"
          >
            {s.split(":")[1]}
          </Link>
        ))}
      </div>
    </div>
  );
}
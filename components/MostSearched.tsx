import Link from "next/link";

const top = [
  { sym: "BMFBOVESPA:PETR4", name: "Petróleo Brasileiro S.A. - Petrobras", price: 31.37, change: 1.0 },
  { sym: "BMFBOVESPA:VALE3", name: "Vale S.A.", price: 58.0, change: 0.14 },
  { sym: "BMFBOVESPA:ITUB4", name: "Itaú Unibanco Holding S.A.", price: 38.44, change: -1.44 },
];
const others = ["BMFBOVESPA:BBDC4","BMFBOVESPA:BBAS3","BMFBOVESPA:PRIO3"];

export default function MostSearched(){
  return (
    <aside className="space-y-4">
      <div className="card">
        <div className="text-sm text-gray-300 mb-3">Mais buscadas</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {top.map((a,i)=>(
            <Link
              key={i}
              href={"/ativos/" + encodeURIComponent(a.sym)}
              className="rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition p-3 flex flex-col justify-between min-h-[110px]"
            >
              <div className="text-xs text-gray-400 truncate">{a.name}</div>
              <div className="text-lg font-extrabold">{a.sym.split(":")[1]}</div>
              <div className="text-sm text-gray-300">R$ {a.price.toFixed(2)} <span className={a.change>=0?"text-green-400":"text-red-400"}>{a.change>0?"+":""}{a.change.toFixed(2)}%</span></div>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
          {others.map((s,i)=>(
            <Link key={i} href={"/ativos/" + encodeURIComponent(s)} className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10">
              {s.split(":")[1]}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
type CardProps = { title: string; subtitle?: string; price?: string; change?: number };

function Mini({ title, subtitle, price, change }: CardProps) {
  const cls =
    change === undefined ? "text-gray-400" : change >= 0 ? "text-green-400" : "text-red-400";
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
      <div className="text-xs text-gray-400 truncate">{subtitle || "—"}</div>
      <div className="text-lg font-bold">{title}</div>
      <div className="text-sm text-gray-300">{price ?? "—"}</div>
      <div className={`text-sm ${cls}`}>{change !== undefined ? `${change>0?"+":""}${change.toFixed(2)}%` : "—"}</div>
    </div>
  );
}

export default function MostSearched() {
  const items = [
    { title:"PETR4", subtitle:"Petróleo Brasileiro S.A.", price:"R$ 31,37", change:1.00 },
    { title:"VALE3", subtitle:"Vale S.A.", price:"R$ 58,00", change:0.14 },
    { title:"ITUB4", subtitle:"Itaú Unibanco", price:"R$ 38,44", change:-1.44 },
  ];
  const peers = ["BBDC4","BBAS3","PRIO3"];

  return (
    <div className="card min-h-[340px] flex flex-col">
      <div className="text-sm text-gray-300 mb-3">Mais buscadas</div>
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        {items.map((it, i)=> (<Mini key={i} {...it} />))}
      </div>
      <div className="mt-auto grid grid-cols-3 gap-3">
        {peers.map((p,i)=>(
          <a key={i} href={`/ativos/BMFBOVESPA:${p}`} className="btn soft text-center">{p}</a>
        ))}
      </div>
    </div>
  );
}

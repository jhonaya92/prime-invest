"use client";
type Item = { sym: string; name: string; price?: number; change?: number };

const items: Item[] = [
  { sym: "BMFBOVESPA:PETR4", name: "Petróleo Brasileiro S.A.", price: 31.37, change: +1.00 },
  { sym: "BMFBOVESPA:VALE3", name: "Vale S.A.", price: 58.00, change: +0.14 },
  { sym: "BMFBOVESPA:ITUB4", name: "Itaú Unibanco", price: 38.44, change: -1.44 },
  { sym: "BMFBOVESPA:BBDC4", name: "Bradesco" },
  { sym: "BMFBOVESPA:BBAS3", name: "Banco do Brasil" },
  { sym: "BMFBOVESPA:PRIO3", name: "PRIO" },
];

export default function MostSearched() {
  return (
    <div className="card">
      <div className="text-sm text-gray-300 mb-3">Mais buscadas</div>
      <div className="grid md:grid-cols-3 gap-3">
        {items.map((it) => {
          const code = it.sym.split(":").pop();
          const up = (it.change ?? 0) >= 0;
          return (
            <a key={it.sym} href={`/ativos/${encodeURIComponent(it.sym)}`} className="block rounded-xl bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition">
              <div className="text-sm font-semibold">{code}</div>
              <div className="text-xs text-gray-400 truncate">{it.name}</div>
              <div className="mt-1 text-sm">
                {it.price !== undefined ? (
                  <>
                    <span className="text-gray-200">R$ {it.price.toFixed(2)}</span>
                    <span className={`ml-2 ${up ? "text-green-400" : "text-red-400"}`}>
                      {up ? "+" : ""}{(it.change ?? 0).toFixed(2)}%
                    </span>
                  </>
                ) : <span className="text-gray-500">—</span>}
              </div>
            </a>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {["BBDC4","BBAS3","PRIO3"].map(c=>(
          <a key={c} href={`/ativos/${encodeURIComponent("BMFBOVESPA:"+c)}`} className="btn soft text-center">{c}</a>
        ))}
      </div>
    </div>
  );
}

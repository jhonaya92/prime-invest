"use client";
import { useEffect, useState } from "react";

type Row = { ticker: string; name: string; price: string; change: number };

function ListCard({
  title,
  items,
  loading,
  positive,
}: {
  title: string;
  items: Row[];
  loading: boolean;
  positive: boolean;
}) {
  return (
    <div className="card">
      <div className="text-sm text-gray-300 mb-2">{title}</div>
      {loading ? (
        <ul className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="h-5 w-28 bg-white/5 rounded animate-pulse" />
              <div className="h-5 w-16 bg-white/5 rounded animate-pulse" />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2 text-sm">
          {items.map((it, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{it.ticker}</span>
                <span className="text-gray-400 hidden md:inline">
                  {it.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-300">{it.price}</span>
                <span className={positive ? "text-green-400" : "text-red-400"}>
                  {it.change > 0 ? "+" : ""}
                  {it.change.toFixed(2)}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Highlights() {
  const [loading, setLoading] = useState(true);
  const [gainers, setGainers] = useState<Row[]>([]);
  const [losers, setLosers] = useState<Row[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      setGainers([
        { ticker: "PRIO3", name: "PRIO", price: "R$ 43,20", change: 3.91 },
        { ticker: "PETR4", name: "Petrobras", price: "R$ 37,10", change: 2.84 },
        {
          ticker: "BBAS3",
          name: "Banco do Brasil",
          price: "R$ 52,60",
          change: 2.31,
        },
        { ticker: "ITUB4", name: "Itaú", price: "R$ 33,70", change: 1.95 },
        { ticker: "VALE3", name: "Vale", price: "R$ 68,10", change: 1.42 },
      ]);
      setLosers([
        { ticker: "BBDC4", name: "Bradesco", price: "R$ 14,22", change: -2.11 },
        { ticker: "LREN3", name: "Renner", price: "R$ 18,90", change: -1.76 },
        { ticker: "ABEV3", name: "Ambev", price: "R$ 14,05", change: -1.22 },
        { ticker: "PETZ3", name: "Petz", price: "R$ 5,70", change: -1.1 },
        {
          ticker: "CMIN3",
          name: "CSN Mineração",
          price: "R$ 5,03",
          change: -0.98,
        },
      ]);
      setLoading(false);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="grid md:grid-cols-2 gap-4">
      <ListCard
        title="Maiores altas (B3)"
        items={gainers}
        loading={loading}
        positive
      />
      <ListCard
        title="Maiores quedas (B3)"
        items={losers}
        loading={loading}
        positive={false}
      />
    </section>
  );
}

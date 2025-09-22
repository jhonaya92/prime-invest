'use client';
import { trending } from "@/lib/mock";
import { useRouter } from "next/navigation";

export default function TrendingList() {
  const router = useRouter();
  return (
    <div className="card h-full">
      <div className="text-sm text-gray-300 mb-3">Mais buscadas</div>
      <ul className="space-y-2">
        {trending.map((a, i)=>{
          const up = a.change >= 0;
          return (
            <li
              key={i}
              onClick={()=> router.push(`/ativos/${encodeURIComponent(a.ticker)}`)}
              className="flex items-center justify-between text-sm cursor-pointer hover:bg-white/5 rounded-lg px-2 py-2 transition"
              title={`Abrir ${a.short}`}
            >
              <span className="text-gray-200">{a.short}</span>
              <span className={up ? "text-up" : "text-down"}>
                {up? "+" : ""}{a.change.toFixed(2)}%
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

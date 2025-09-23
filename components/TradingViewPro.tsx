"use client";
import { useEffect, useRef } from "react";

export default function TradingViewPro({ symbol, height=360 }: { symbol: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = ""; // limpa se trocar o símbolo

    const container = document.createElement("div");
    container.className = "tradingview-widget-container__widget";
    container.style.height = height + "px";
    container.style.width = "100%";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol,
      autosize: true,
      interval: "D",
      timezone: "America/Sao_Paulo",
      theme: "dark",
      style: "1",
      locale: "br",
      enable_publishing: false,
      allow_symbol_change: false,
      hide_top_toolbar: false,
      withdateranges: true,
      details: false,
      hide_legend: false,
      studies: ["Volume@tv-basicstudies"]
    });

    ref.current.appendChild(container);
    ref.current.appendChild(script);

    return () => { if (ref.current) ref.current.innerHTML = ""; };
  }, [symbol, height]);

  return (
    <div ref={ref} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden" style={{height}}>
      {/* TradingView injeta aqui */}
    </div>
  );
}

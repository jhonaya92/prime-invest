"use client";
import { useEffect, useRef } from "react";

type Props = { symbol: string; height?: number };

export default function TradingViewWidget({ symbol, height = 520 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // limpa antes de recriar
    ref.current.innerHTML = "";

    // container padrão do TradingView
    const container = document.createElement("div");
    container.className = "tradingview-widget-container";

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    container.appendChild(widget);

    // script do Advanced Chart
    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      width: "100%",
      height,
      symbol,
      interval: "60",
      timezone: "America/Sao_Paulo",
      theme: "dark",
      style: "1",
      locale: "br",
      allow_symbol_change: true,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      withdateranges: true
    });

    ref.current.appendChild(container);
    ref.current.appendChild(s);

    return () => { if (ref.current) ref.current.innerHTML = ""; };
  }, [symbol, height]);

  // wrapper com altura fixa para o widget respeitar
  return <div ref={ref} style={{ height }} className="rounded-2xl overflow-hidden border border-white/10" />;
}

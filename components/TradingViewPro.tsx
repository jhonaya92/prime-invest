"use client";
import { useEffect, useRef } from "react";

export default function TradingViewPro({ symbol, height=420 }: { symbol: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.height = height + "px";
    widget.style.width = "100%";
    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      symbol,
      autosize: true,
      interval: "D",
      timezone: "America/Sao_Paulo",
      theme: "dark",
      style: "1",
      locale: "br",
      allow_symbol_change: false,
      withdateranges: true,
      studies: ["Volume@tv-basicstudies"]
    });
    ref.current.appendChild(widget);
    ref.current.appendChild(s);
    return ()=>{ if(ref.current) ref.current.innerHTML=""; };
  }, [symbol, height]);
  return <div ref={ref} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden" style={{height}} />;
}

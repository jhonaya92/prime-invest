"use client";
import { useEffect, useRef, useState } from "react";

export default function TradingViewPro({
  symbol = "BMFBOVESPA:PETR4",
  height = 420,
}: {
  symbol?: string;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setFailed(false);
    el.innerHTML = "";

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    el.appendChild(widget);

    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "D",
      timezone: "America/Sao_Paulo",
      theme: "dark",
      style: "1",
      locale: "br",
      withdateranges: true,
      allow_symbol_change: false,
      hide_side_toolbar: false,
      hide_top_toolbar: false,
      save_image: false,
      studies: ["Volume@tv-basicstudies"],
      range: "12M",
    });
    el.appendChild(s);

    const timeout = window.setTimeout(() => {
      if (widget.childNodes.length === 0) setFailed(true);
    }, 2500);

    return () => {
      window.clearTimeout(timeout);
      el.innerHTML = "";
    };
  }, [symbol]);

  if (failed) {
    const q = encodeURIComponent(symbol);
    const src = `https://s.tradingview.com/widgetembed/?symbol=${q}&interval=D&hidesidetoolbar=0&symboledit=0&saveimage=0&studies=%5B%22Volume%40tv-basicstudies%22%5D&theme=dark&style=1&locale=br&withdateranges=1&range=12M`;
    return (
      <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
        <iframe
          title={"tv-"+symbol}
          src={src}
          style={{ width: "100%", height }}
          frameBorder="0"
          allowTransparency
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ height }}
      className="tradingview-widget-container rounded-2xl overflow-hidden bg-white/5 border border-white/10"
    />
  );
}
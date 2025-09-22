"use client";
import { useEffect, useRef } from "react";

export default function TickerTape() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BMFBOVESPA:PETR4", title: "PETR4" },
        { proName: "BMFBOVESPA:VALE3", title: "VALE3" },
        { proName: "BMFBOVESPA:ITUB4", title: "ITUB4" },
        { proName: "BMFBOVESPA:BBDC4", title: "BBDC4" },
        { proName: "BMFBOVESPA:BBAS3", title: "BBAS3" },
        { proName: "BMFBOVESPA:PRIO3", title: "PRIO3" }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      colorTheme: "dark",
      displayMode: "adaptive",
      locale: "br"
    });

    const container = document.createElement("div");
    container.className = "tradingview-widget-container";

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";

    container.appendChild(widget);
    ref.current.appendChild(container);
    ref.current.appendChild(s);

    return () => { if (ref.current) ref.current.innerHTML = ""; };
  }, []);

  return <div ref={ref} className="glass rounded-2xl px-2 py-1 mb-4 overflow-hidden" />;
}

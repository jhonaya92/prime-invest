"use client";
import { useEffect, useRef } from "react";

type Props = {
  symbol: string; // e.g., "BMFBOVESPA:PETR4"
  height?: number;
  interval?: string; // "D", "60", etc.
};
export default function TradingViewWidget({
  symbol,
  height = 420,
  interval = "D",
}: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (typeof TradingView !== "undefined") {
        // @ts-ignore
        new TradingView.widget({
          autosize: true,
          symbol,
          interval,
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "br",
          toolbar_bg: "#0B0F14",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          container_id: "tv_" + symbol.replace(/[^A-Z0-9]/gi, ""),
        });
      }
    };
    container.current.appendChild(script);
    return () => {
      container.current && (container.current.innerHTML = "");
    };
  }, [symbol, interval]);

  const id = "tv_" + symbol.replace(/[^A-Z0-9]/gi, "");
  return (
    <div id={id} ref={container} style={{ height }} className="w-full card" />
  );
}

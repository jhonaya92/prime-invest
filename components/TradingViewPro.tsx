"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = { symbol: string; height?: number };

export default function TradingViewPro({ symbol, height = 420 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [useIframe, setUseIframe] = useState(false);

  // id único por símbolo (evita conflito do script do TV)
  const frameId = useMemo(() => "tv_" + btoa(symbol).replace(/=/g, ""), [symbol]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Limpa container a cada troca de símbolo
    containerRef.current.innerHTML = "";
    setUseIframe(false);

    // Tenta usar o script oficial
    const timerFallback = setTimeout(() => setUseIframe(true), 1800);

    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/tv.js";
    s.async = true;
    s.onload = () => {
      try {
        // @ts-ignore
        if (window.TradingView) {
          // @ts-ignore
          new window.TradingView.widget({
            symbol,
            interval: "D",
            timezone: "America/Sao_Paulo",
            theme: "dark",
            style: "1",
            locale: "br",
            hide_legend: false,
            enable_publishing: false,
            allow_symbol_change: false,
            container_id: frameId,
            autosize: true,
            withdateranges: true,
            hide_side_toolbar: false,
          });
          clearTimeout(timerFallback);
        } else {
          setUseIframe(true);
        }
      } catch {
        setUseIframe(true);
      }
    };
    s.onerror = () => setUseIframe(true);

    const w = document.createElement("div");
    w.id = frameId;
    w.style.width = "100%";
    w.style.minHeight = height + "px";
    containerRef.current.appendChild(w);
    containerRef.current.appendChild(s);

    return () => { clearTimeout(timerFallback); };
  }, [symbol, frameId, height]);

  if (useIframe) {
    // Fallback estável (mostra sempre)
    const url = new URL("https://s.tradingview.com/widgetembed/");
    url.search = new URLSearchParams({
      symbol,
      interval: "D",
      toolbarbg: "rgba(0,0,0,0)",
      hidetoptoolbar: "0",
      hide_legend: "0",
      theme: "dark",
      style: "1",
      timezone: "America/Sao_Paulo",
      locale: "br",
      enable_publishing: "false",
      withdateranges: "true",
      hide_side_toolbar: "false",
    }).toString();

    return (
      <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5" style={{ minHeight: height }}>
        <iframe
          title={"Chart " + symbol}
          src={url.toString()}
          style={{ width: "100%", height }}
          frameBorder="0"
          allowTransparency
          allowFullScreen
        />
      </div>
    );
  }

  return <div ref={containerRef} className="rounded-xl overflow-hidden border border-white/10" style={{ minHeight: height }} />;
}
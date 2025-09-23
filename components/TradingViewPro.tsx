"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView?: any;
  }
}

type Props = { symbol: string; height?: number };

export default function TradingViewPro({ symbol, height = 420 }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const loadedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!hostRef.current) return;

    // cria container interno com id estável
    const id = "tv_" + Math.random().toString(36).slice(2);
    hostRef.current.innerHTML = `<div id="${id}" style="height:${height}px; min-height:${height}px;"></div>`;

    const inject = () => {
      if (!window.TradingView) return;
      // limpa instância anterior
      try {
        (hostRef.current as HTMLDivElement)
          .querySelectorAll("iframe")
          .forEach((n) => n.remove());
      } catch {}
      new window.TradingView.widget({
        container_id: id,
        symbol,
        autosize: true,
        interval: "D",
        timezone: "America/Sao_Paulo",
        theme: "dark",
        style: "1",
        locale: "br",
        hide_top_toolbar: false,
        hide_legend: false,
        allow_symbol_change: false,
        withdateranges: true,
        studies: ["Volume@tv-basicstudies"],
      });
    };

    if (window.TradingView) {
      inject();
    } else if (!loadedRef.current) {
      const s = document.createElement("script");
      s.src = "https://s3.tradingview.com/tv.js";
      s.onload = () => {
        loadedRef.current = true;
        inject();
      };
      s.onerror = () => {
        hostRef.current!.innerHTML =
          "<div class='text-sm text-gray-400 p-4'>Falha ao carregar gráfico.</div>";
      };
      document.body.appendChild(s);
    } else {
      // script já pedido, tenta de novo em seguida
      const t = setTimeout(inject, 300);
      return () => clearTimeout(t);
    }

    return () => {
      if (hostRef.current) hostRef.current.innerHTML = "";
    };
  }, [symbol, height]);

  return (
    <div
      ref={hostRef}
      className="rounded-xl overflow-hidden border border-white/10 bg-[#101418]"
    />
  );
}

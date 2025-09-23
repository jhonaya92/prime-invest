"use client";
import { useEffect, useRef, useState } from "react";

type Props = { symbol: string; height?: number };

export default function LightChart({ symbol, height = 360 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const candleRef = useRef<any>(null);
  const volumeRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const lib = await import("lightweight-charts");
        if (!lib || !lib.createChart)
          throw new Error("lightweight-charts indisponível");
        if (!wrapRef.current) return;

        const chart = lib.createChart(wrapRef.current, {
          height,
          layout: {
            background: { type: "solid", color: "transparent" },
            textColor: "#cbd5e1",
          },
          grid: {
            vertLines: { color: "rgba(255,255,255,.06)" },
            horzLines: { color: "rgba(255,255,255,.06)" },
          },
          rightPriceScale: { borderColor: "rgba(255,255,255,.08)" },
          timeScale: { borderColor: "rgba(255,255,255,.08)" },
          crosshair: { mode: lib.CrosshairMode.Normal },
        });
        chartRef.current = chart;

        const candle = chart.addCandlestickSeries({
          upColor: "#22c55e",
          downColor: "#ef4444",
          wickUpColor: "#22c55e",
          wickDownColor: "#ef4444",
          borderVisible: false,
        });
        const volume = chart.addHistogramSeries({
          priceFormat: { type: "volume" },
          priceScaleId: "",
          color: "rgba(148,163,184,.7)",
        });
        candleRef.current = candle;
        volumeRef.current = volume;

        const applyWidth = () => {
          if (!wrapRef.current) return;
          const w = Math.max(300, wrapRef.current.clientWidth);
          chart.applyOptions({ width: w });
        };
        applyWidth();
        const ro = new ResizeObserver(applyWidth);
        ro.observe(wrapRef.current);

        setReady(true);
        return () => {
          ro.disconnect();
          chart.remove();
        };
      } catch (e: any) {
        if (!dead) {
          setErr(e?.message || "erro no gráfico");
        }
      }
    })();
    return () => {
      dead = true;
    };
  }, []);

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        // busca histórico
        const t = symbol.includes(":") ? symbol.split(":")[1] : symbol;
        const r = await fetch(`/api/quote/${t}`, { cache: "no-store" });
        const j = r.ok ? await r.json() : null;
        let hist = j?.results?.[0]?.historicalDataPrice || [];
        if (!Array.isArray(hist) || !hist.length) {
          // mock de 120 velas
          const now = Math.floor(Date.now() / 1000),
            day = 86400;
          let p = 30;
          hist = [];
          for (let i = 119; i >= 0; i--) {
            const d = now - i * day;
            const drift = (Math.random() - 0.5) * 1.2;
            const o = p,
              c = Math.max(1, o + drift),
              h = Math.max(o, c) + Math.random() * 0.6,
              l = Math.min(o, c) - Math.random() * 0.6,
              v = 1e6 + Math.random() * 2e6;
            hist.push({
              date: d,
              open: o,
              close: c,
              high: h,
              low: l,
              volume: v,
            });
            p = c;
          }
        }
        const candles = hist
          .map((h: any) => ({
            time:
              typeof h.date === "number"
                ? h.date > 20000000000
                  ? Math.floor(h.date / 1000)
                  : h.date
                : Math.floor(new Date(h.date).getTime() / 1000),
            open: +h.open,
            high: +h.high,
            low: +h.low,
            close: +h.close,
          }))
          .sort((a: any, b: any) => a.time - b.time);
        const volumes = hist.map((h: any) => ({
          time:
            typeof h.date === "number"
              ? h.date > 20000000000
                ? Math.floor(h.date / 1000)
                : h.date
              : Math.floor(new Date(h.date).getTime() / 1000),
          value: +h.volume || 0,
          color:
            h.close >= h.open ? "rgba(34,197,94,.6)" : "rgba(239,68,68,.6)",
        }));

        candleRef.current?.setData(candles);
        volumeRef.current?.setData(volumes);
      } catch (e) {}
    })();
    return () => {
      dead = true;
    };
  }, [symbol]);

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-2">
      <div className="text-sm text-gray-300 mb-2">Candles · {symbol}</div>
      <div ref={wrapRef} style={{ height }} className="w-full" />
      {!ready && !err && (
        <div className="p-3 text-xs text-gray-400">
          Carregando motor do gráfico…
        </div>
      )}
      {err && <div className="p-3 text-xs text-red-400">Erro: {err}</div>}
    </div>
  );
}

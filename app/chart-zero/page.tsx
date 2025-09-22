"use client";
import { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";

export default function Page() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = createChart(ref.current, {
      height: 360,
      layout: { background: { type: ColorType.Solid, color: "transparent" }, textColor: "#cbd5e1" },
      grid: { vertLines: { color: "rgba(255,255,255,0.06)" }, horzLines: { color: "rgba(255,255,255,0.06)" } },
    });
    const series = chart.addCandlestickSeries({
      upColor: "#22c55e", downColor: "#ef4444", borderVisible: false,
      wickUpColor: "#22c55e", wickDownColor: "#ef4444",
    });

    const base = 1710979200; // 20/03/2024 aproximadamente
    const data = Array.from({ length: 60 }, (_, i) => {
      const t = base + i * 86400;
      const o = 20 + Math.sin(i/5) * 3 + (Math.random() - 0.5);
      const c = o + (Math.random() - 0.5) * 2;
      const h = Math.max(o, c) + Math.random() * 1.2;
      const l = Math.min(o, c) - Math.random() * 1.2;
      return { time: t, open: o, high: h, low: l, close: c };
    });

    series.setData(data);
    const applyWidth = () => chart.applyOptions({ width: ref.current!.clientWidth });
    applyWidth();
    const ro = new ResizeObserver((es) => es.forEach(e => chart.applyOptions({ width: Math.floor(e.contentRect.width) })));
    ro.observe(ref.current);

    return () => { ro.disconnect(); chart.remove(); };
  }, []);

  return (
    <main className="space-y-4">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl md:text-3xl font-bold">Chart Zero (local)</h1>
        <p className="text-gray-400 text-sm">Candles estáticos (sem internet).</p>
      </section>
      <div className="card p-0">
        <div ref={ref} style={{ height: 360, width: "100%" }} />
      </div>
    </main>
  );
}
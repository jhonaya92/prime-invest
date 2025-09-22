"use client";
import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, ISeriesApi, UTCTimestamp } from "lightweight-charts";

type Props = { symbol: string; height?: number };

function normalizeTicker(input: string) {
  const s = input.includes(":") ? input.split(":")[1] : input;
  return s.trim().toUpperCase();
}

export default function LightChart({ symbol, height = 520 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart>>();
  const candleRef = useRef<ISeriesApi<"Candlestick">>();
  const volumeRef = useRef<ISeriesApi<"Histogram">>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      height,
      layout: { background: { type: ColorType.Solid, color: "transparent" }, textColor: "#cbd5e1" },
      grid: { vertLines: { color: "rgba(255,255,255,0.06)" }, horzLines: { color: "rgba(255,255,255,0.06)" } },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.08)" },
      timeScale: { borderColor: "rgba(255,255,255,0.08)" },
      localization: { timeFormatter: (t) => new Date((t as number) * 1000).toLocaleDateString("pt-BR") },
    });
    chartRef.current = chart;

    const candle = chart.addCandlestickSeries({
      upColor: "#22c55e", downColor: "#ef4444", borderVisible: false,
      wickUpColor: "#22c55e", wickDownColor: "#ef4444",
    });
    candleRef.current = candle;

    const volume = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: "",
      base: 0,
    });
    volumeRef.current = volume;

    const onResize = () => chart.applyOptions({ width: containerRef.current?.clientWidth || 600 });
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      chart.remove();
    };
  }, [height]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const t = normalizeTicker(symbol);
        const url = `https://brapi.dev/api/quote/${encodeURIComponent(t)}?range=1y&interval=1d&fundamental=true`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Falha ao buscar dados");
        const data = await res.json();
        const item = data?.results?.[0];
        const hist = item?.historicalDataPrice || [];
        if (!hist.length) throw new Error("Sem dados históricos para este ticker");

        const toSec = (d: any) => typeof d === "number" ? (d > 20000000000 ? Math.floor(d/1000) : d) : Math.floor(new Date(d).getTime()/1000);

        const candles = hist.map((h: any) => ({
          time: toSec(h.date) as UTCTimestamp,
          open: Number(h.open), high: Number(h.high),
          low: Number(h.low), close: Number(h.close),
        })).sort((a: any, b: any) => (a.time as number) - (b.time as number));

        const volumes = hist.map((h: any) => {
          const up = Number(h.close) >= Number(h.open);
          return { time: toSec(h.date) as UTCTimestamp, value: Number(h.volume) || 0, color: up ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)" };
        }).sort((a: any, b: any) => (a.time as number) - (b.time as number));

        if (cancelled) return;
        candleRef.current?.setData(candles);
        volumeRef.current?.setData(volumes);
        chartRef.current?.timeScale().fitContent();
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Erro ao carregar gráfico");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [symbol]);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 relative" style={{ height }}>
      <div ref={containerRef} style={{ height }} />
      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-black/20">
          <div className="animate-pulse text-sm text-gray-300">Carregando gráfico…</div>
        </div>
      )}
      {error && !loading && (
        <div className="absolute inset-0 grid place-items-center bg-black/40">
          <div className="text-center">
            <div className="text-sm text-red-300 mb-2">Não foi possível carregar o gráfico.</div>
            <div className="text-xs text-gray-300">{error}</div>
          </div>
        </div>
      )}
    </div>
  );
}
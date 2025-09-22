"use client";
import { useEffect, useRef, useState } from "react";
import { createChart, ColorType, ISeriesApi, UTCTimestamp } from "lightweight-charts";

type Props = { symbol: string; height?: number };

function normalizeTicker(input: string) {
  const s = input.includes(":") ? input.split(":")[1] : input;
  return s.trim().toUpperCase();
}

// gera 120 candles mock para fallback
function genMockCandles(): { candles: any[]; volumes: any[] } {
  const outC: any[] = [];
  const outV: any[] = [];
  let price = 30 + Math.random() * 20;
  const now = Math.floor(Date.now() / 1000);
  const day = 60 * 60 * 24;

  for (let i = 119; i >= 0; i--) {
    const time = (now - i * day) as UTCTimestamp;
    const drift = (Math.random() - 0.5) * 1.2; // +/- variação diária
    const open = price;
    const close = Math.max(1, open + drift);
    const high = Math.max(open, close) + Math.random() * 0.6;
    const low = Math.min(open, close) - Math.random() * 0.6;
    const vol = 1_000_000 + Math.floor(Math.random() * 3_000_000);

    outC.push({ time, open, high, low, close });
    outV.push({ time, value: vol, color: close >= open ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)" });

    price = close;
  }
  return { candles: outC, volumes: outV };
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
        // tenta nosso proxy (evita CORS)
        const res = await fetch(`/api/quote/${encodeURIComponent(t)}`);
        if (!res.ok) throw new Error("Falha ao buscar dados remotos");
        const data = await res.json();
        const item = data?.results?.[0];
        const hist = item?.historicalDataPrice || [];

        const toSec = (d: any) =>
          typeof d === "number" ? (d > 20000000000 ? Math.floor(d / 1000) : d) : Math.floor(new Date(d).getTime() / 1000);

        let candles: any[] = [];
        let volumes: any[] = [];

        if (Array.isArray(hist) && hist.length > 0) {
          candles = hist
            .map((h: any) => ({
              time: toSec(h.date) as UTCTimestamp,
              open: Number(h.open),
              high: Number(h.high),
              low: Number(h.low),
              close: Number(h.close),
            }))
            .sort((a: any, b: any) => (a.time as number) - (b.time as number));

          volumes = hist
            .map((h: any) => {
              const up = Number(h.close) >= Number(h.open);
              return {
                time: toSec(h.date) as UTCTimestamp,
                value: Number(h.volume) || 0,
                color: up ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)",
              };
            })
            .sort((a: any, b: any) => (a.time as number) - (b.time as number));
        } else {
          // Fallback offline
          ({ candles, volumes } = genMockCandles());
          setError("Dados remotos indisponíveis  exibindo amostra local.");
        }

        if (cancelled) return;
        candleRef.current?.setData(candles);
        volumeRef.current?.setData(volumes);
        chartRef.current?.timeScale().fitContent();
      } catch (e: any) {
        if (!cancelled) {
          const { candles, volumes } = genMockCandles();
          candleRef.current?.setData(candles);
          volumeRef.current?.setData(volumes);
          chartRef.current?.timeScale().fitContent();
          setError(e?.message || "Erro ao carregar gráfico  exibindo amostra local.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [symbol]);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 relative" style={{ height }}>
      <div ref={containerRef} style={{ height }} />
      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-black/20">
          <div className="animate-pulse text-sm text-gray-300">Carregando gráfico</div>
        </div>
      )}
      {error && !loading && (
        <div className="absolute left-2 bottom-2 text-[11px] text-amber-300 bg-black/40 px-2 py-1 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
"use client";
import { useEffect, useRef, useState } from "react";

type Props = { symbol: string; height?: number };
type ChartApi = any;
type SeriesApi = any;

function genMock() {
  const outC: any[] = []; const outV: any[] = [];
  let price = 30 + Math.random() * 20;
  const now = Math.floor(Date.now() / 1000), day = 86400;
  for (let i = 119; i >= 0; i--) {
    const time = (now - i * day);
    const drift = (Math.random() - 0.5) * 1.2;
    const open = price, close = Math.max(1, open + drift);
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
  const chartRef = useRef<ChartApi | null>(null);
  const candleRef = useRef<SeriesApi | null>(null);
  const volumeRef = useRef<SeriesApi | null>(null);
  const initRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // init do gráfico
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const el = containerRef.current;
    if (!el) return;

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const L = await import("lightweight-charts");
      const { createChart, ColorType } = L as any;

      const chart: ChartApi = createChart(el, {
        height,
        layout: { background: { type: ColorType.Solid, color: "transparent" }, textColor: "#cbd5e1" },
        grid: { vertLines: { color: "rgba(255,255,255,0.06)" }, horzLines: { color: "rgba(255,255,255,0.06)" } },
        crosshair: { mode: 1 },
        rightPriceScale: { borderColor: "rgba(255,255,255,0.08)" },
        timeScale: { borderColor: "rgba(255,255,255,0.08)" },
      });

      chartRef.current = chart;
      candleRef.current = chart.addCandlestickSeries({
        upColor: "#22c55e",
        downColor: "#ef4444",
        borderVisible: false,
        wickUpColor: "#22c55e",
        wickDownColor: "#ef4444",
      });
      volumeRef.current = chart.addHistogramSeries({ priceFormat: { type: "volume" }, priceScaleId: "", base: 0 });

      const applyWidth = () => {
        if (!el || !el.isConnected) return;
        chart.applyOptions({ width: Math.max(300, el.clientWidth || 300) });
      };

      applyWidth();
      const ro = new ResizeObserver(() => applyWidth());
      ro.observe(el);
      const onWin = () => applyWidth();
      window.addEventListener("resize", onWin);

      cleanup = () => {
        ro.disconnect();
        window.removeEventListener("resize", onWin);
        try { chart.remove(); } catch {}
      };
    })().catch((e) => {
      console.error("[LightChart] init error:", e);
      setError("Falha ao iniciar o gráfico — usando amostra local.");
      setLoading(false);
    });

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, [height]);

  // dados
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!chartRef.current || !candleRef.current || !volumeRef.current) return;
      setLoading(true); setError(null);
      try {
        const t = symbol.includes(":") ? symbol.split(":")[1].toUpperCase() : symbol.toUpperCase();
        const res = await fetch(`/api/quote/${encodeURIComponent(t)}`);
        const ok = res.ok;
        const data = ok ? await res.json() : null;
        const hist = data?.results?.[0]?.historicalDataPrice || [];

        let candles:any[] = [], volumes:any[] = [];
        if (Array.isArray(hist) && hist.length) {
          const toSec = (d:any)=> typeof d==="number" ? (d>20000000000?Math.floor(d/1000):d) : Math.floor(new Date(d).getTime()/1000);
          candles = hist.map((h:any)=>({ time: toSec(h.date), open:+h.open, high:+h.high, low:+h.low, close:+h.close }))
                        .sort((a,b)=>a.time-b.time);
          volumes = hist.map((h:any)=>({ time: toSec(h.date), value:+h.volume||0, color:(+h.close>=+h.open)?"rgba(34,197,94,0.35)":"rgba(239,68,68,0.35)" }))
                        .sort((a,b)=>a.time-b.time);
        } else {
          ({ candles, volumes } = genMock());
          setError("Dados remotos indisponíveis — amostra local.");
        }

        if (cancelled) return;
        candleRef.current.setData(candles);
        volumeRef.current.setData(volumes);
        chartRef.current.timeScale().fitContent();
      } catch (e:any) {
        if (!cancelled) {
          const m = genMock();
          candleRef.current!.setData(m.candles);
          volumeRef.current!.setData(m.volumes);
          chartRef.current!.timeScale().fitContent();
          setError(e?.message || "Erro — amostra local.");
        }
      } finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [symbol]);

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 relative" style={{ height, width: "100%" }}>
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
      {loading && <div className="absolute inset-0 grid place-items-center bg-black/20"><div className="animate-pulse text-sm text-gray-300">Carregando gráfico…</div></div>}
      {error && !loading && <div className="absolute left-2 bottom-2 text-[11px] text-amber-300 bg-black/40 px-2 py-1 rounded">{error}</div>}
    </div>
  );
}
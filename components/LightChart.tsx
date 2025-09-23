"use client";
import { useEffect, useRef, useState } from "react";

type Props = { symbol: string; height?: number };
type ChartApi = any;
type SeriesApi = any;

function genMock() {
  const outC: any[] = [];
  const outV: any[] = [];
  let price = 30 + Math.random() * 20;
  const now = Math.floor(Date.now() / 1000),
    day = 86400;
  for (let i = 119; i >= 0; i--) {
    const time = now - i * day;
    const drift = (Math.random() - 0.5) * 1.2;
    const open = price,
      close = Math.max(1, open + drift);
    const high = Math.max(open, close) + Math.random() * 0.6;
    const low = Math.min(open, close) - Math.random() * 0.6;
    const vol = 1_000_000 + Math.floor(Math.random() * 3_000_000);
    outC.push({ time, open, high, low, close });
    outV.push({
      time,
      value: vol,
      color: close >= open ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)",
    });
    price = close;
  }
  return { candles: outC, volumes: outV };
}

export default function LightChart({ symbol, height = 520 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartApi | null>(null);
  const candleRef = useRef<SeriesApi | null>(null);
  const volumeRef = useRef<SeriesApi | null>(null);
  const dataMapRef = useRef<Map<number, any>>(new Map());
  const [ready, setReady] = useState(false);
  const [hover, setHover] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // init
  useEffect(() => {
    if (chartRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    (async () => {
      const L = await import("lightweight-charts");
      const { createChart, ColorType } = L as any;

      const chart: ChartApi = createChart(el, {
        height,
        layout: {
          background: { type: ColorType.Solid, color: "transparent" },
          textColor: "#cbd5e1",
        },
        grid: {
          vertLines: { color: "rgba(255,255,255,0.05)" },
          horzLines: { color: "rgba(255,255,255,0.05)" },
        },
        crosshair: {
          mode: 1,
          vertLine: { color: "rgba(255,255,255,0.12)" },
          horzLine: { color: "rgba(255,255,255,0.12)" },
        },
        rightPriceScale: {
          borderColor: "rgba(255,255,255,0.08)",
          scaleMargins: { top: 0.08, bottom: 0.2 },
        },
        timeScale: { borderColor: "rgba(255,255,255,0.08)" },
      });

      chartRef.current = chart;
      const candle = chart.addCandlestickSeries({
        upColor: "#22c55e",
        downColor: "#ef4444",
        borderVisible: false,
        wickUpColor: "#22c55e",
        wickDownColor: "#ef4444",
        priceLineVisible: true,
      });
      candleRef.current = candle;

      const vol = chart.addHistogramSeries({
        priceFormat: { type: "volume" },
        priceScaleId: "",
        base: 0,
      });
      volumeRef.current = vol;

      const applyWidth = () => {
        if (!el || !el.isConnected) return;
        chart.applyOptions({ width: Math.max(300, el.clientWidth || 300) });
      };
      applyWidth();
      const ro = new ResizeObserver(() => applyWidth());
      ro.observe(el);
      const onWin = () => applyWidth();
      window.addEventListener("resize", onWin);

      // tooltip
      chart.subscribeCrosshairMove((param: any) => {
        const t =
          typeof param.time === "number"
            ? param.time
            : (param.time?.timestamp ?? undefined);
        if (!t) {
          setHover(null);
          return;
        }
        const d = dataMapRef.current.get(t);
        if (!d) {
          setHover(null);
          return;
        }
        setHover(d);
      });

      setReady(true);
      return () => {
        ro.disconnect();
        window.removeEventListener("resize", onWin);
        try {
          chart.remove();
        } catch {}
      };
    })().catch((e) => {
      console.error("[LightChart] init error:", e);
      setError("Falha ao iniciar o gráfico.");
      setLoading(false);
    });
  }, [height]);

  // dados
  useEffect(() => {
    if (!ready || !chartRef.current || !candleRef.current || !volumeRef.current)
      return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const t = symbol.includes(":")
          ? symbol.split(":")[1].toUpperCase()
          : symbol.toUpperCase();
        const res = await fetch(`/api/quote/${encodeURIComponent(t)}`);
        const ok = res.ok;
        const data = ok ? await res.json() : null;
        const hist = data?.results?.[0]?.historicalDataPrice || [];
        let candles: any[] = [],
          volumes: any[] = [];

        const toSec = (d: any) =>
          typeof d === "number"
            ? d > 20000000000
              ? Math.floor(d / 1000)
              : d
            : Math.floor(new Date(d).getTime() / 1000);

        if (Array.isArray(hist) && hist.length) {
          candles = hist
            .map((h: any) => ({
              time: toSec(h.date),
              open: +h.open,
              high: +h.high,
              low: +h.low,
              close: +h.close,
            }))
            .sort((a, b) => a.time - b.time);
          volumes = hist
            .map((h: any) => ({
              time: toSec(h.date),
              value: +h.volume || 0,
              color:
                +h.close >= +h.open
                  ? "rgba(34,197,94,0.35)"
                  : "rgba(239,68,68,0.35)",
            }))
            .sort((a, b) => a.time - b.time);
        } else {
          ({ candles, volumes } = genMock());
          setError("Dados remotos indisponíveis — amostra local.");
        }

        if (cancelled) return;
        const map = new Map<number, any>();
        candles.forEach((c) => map.set(c.time, c));
        dataMapRef.current = map;

        candleRef.current.setData(candles);
        volumeRef.current.setData(volumes);
        chartRef.current.timeScale().fitContent();
      } catch (e: any) {
        if (!cancelled) {
          const m = genMock();
          const map = new Map<number, any>();
          m.candles.forEach((c) => map.set(c.time, c));
          dataMapRef.current = map;
          candleRef.current!.setData(m.candles);
          volumeRef.current!.setData(m.volumes);
          chartRef.current!.timeScale().fitContent();
          setError(e?.message || "Erro — amostra local.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [symbol, ready]);

  return (
    <div
      ref={wrapRef}
      className="rounded-2xl overflow-hidden border border-white/10 relative shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
      style={{ height, width: "100%" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 400px at 20% -20%, rgba(255,255,255,0.06), transparent)",
        }}
      />
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-black/20">
          <div className="animate-pulse text-sm text-gray-300">
            Carregando gráfico…
          </div>
        </div>
      )}
      {hover && !loading && (
        <div className="absolute top-2 left-2 text-[11px] bg-black/60 border border-white/10 rounded px-2 py-1.5">
          <div>
            O:{hover.open?.toFixed?.(2)} H:{hover.high?.toFixed?.(2)} L:
            {hover.low?.toFixed?.(2)} C:{hover.close?.toFixed?.(2)}
          </div>
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

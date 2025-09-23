import { NextResponse } from "next/server";

function toSec(d: any) {
  return typeof d === "number"
    ? d > 20000000000
      ? Math.floor(d / 1000)
      : d
    : Math.floor(new Date(d).getTime() / 1000);
}
function genMock() {
  const now = Math.floor(Date.now() / 1000),
    day = 86400;
  let p = 30 + Math.random() * 20;
  const out: any[] = [];
  for (let i = 119; i >= 0; i--) {
    const time = now - i * day;
    const drift = (Math.random() - 0.5) * 1.2;
    const o = p,
      c = Math.max(1, o + drift),
      h = Math.max(o, c) + Math.random() * 0.6,
      l = Math.min(o, c) - Math.random() * 0.6,
      v = 1_000_000 + Math.floor(Math.random() * 3_000_000);
    out.push({ date: time, open: o, high: h, low: l, close: c, volume: v });
    p = c;
  }
  return out;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "PETR4";
  // tenta BRAPI via nossa rota /api/quote
  let hist: any[] = [];
  try {
    const r = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/quote/${encodeURIComponent(symbol)}`,
      { cache: "no-store" },
    );
    if (r.ok) {
      const j = await r.json();
      hist = j?.results?.[0]?.historicalDataPrice || [];
    }
  } catch {}
  if (!Array.isArray(hist) || !hist.length) hist = genMock();

  const candles = hist
    .map((h: any) => ({
      time: toSec(h.date),
      open: +h.open,
      high: +h.high,
      low: +h.low,
      close: +h.close,
      volume: +h.volume || 0,
    }))
    .sort((a, b) => a.time - b.time);
  const closes = candles.map((c) => c.close);
  const first = closes[0],
    last = closes[closes.length - 1];
  const momentumPct = (last / first - 1) * 100;

  const returns = closes.slice(1).map((c, i) => c / closes[i] - 1);
  const mean = returns.reduce((a, b) => a + b, 0) / Math.max(1, returns.length);
  const sd = Math.sqrt(
    returns.reduce((a, b) => a + (b - mean) * (b - mean), 0) /
      Math.max(1, returns.length),
  );
  const volatilPct = sd * Math.sqrt(252) * 100;

  let rating = "Neutro";
  let tone = "equilíbrio";
  if (momentumPct > 6 && volatilPct < 35) {
    rating = "Compra Leve";
    tone = "tendência de alta moderada";
  } else if (momentumPct < -6) {
    rating = "Atenção";
    tone = "pressão vendedora";
  }

  const bullets = [
    `Momento de ${momentumPct >= 0 ? "alta" : "baixa"} em ${momentumPct.toFixed(1)}% no período analisado.`,
    `Volatilidade anualizada estimada: ${volatilPct.toFixed(1)}%.`,
    rating === "Compra Leve"
      ? "Viés positivo — adequado para entrada parcial com stops definidos."
      : rating === "Atenção"
        ? "Viés negativo — priorize gestão de risco e aguarde confirmação."
        : "Sem sinal forte — melhor operar com posições pequenas ou esperar gatilho.",
  ];

  return NextResponse.json({
    symbol,
    rating,
    headline: `${rating} (${tone})`,
    summary: `Sinal didático gerado por heurísticas locais (demo).`,
    bullets,
  });
}

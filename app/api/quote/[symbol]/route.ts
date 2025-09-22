import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET(
  _req: Request,
  { params }: { params: { symbol: string } },
) {
  const s = decodeURIComponent(params.symbol || "");
  try {
    const url = `https://brapi.dev/api/quote/${encodeURIComponent(s)}?range=6mo&interval=1d&fundamental=true`;
    const res = await fetch(url, { next: { revalidate } });
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {}
  // fallback mock: 120 dias
  const now = Math.floor(Date.now() / 1000),
    day = 86400;
  let price = 30 + Math.random() * 20;
  const hist: any[] = [];
  for (let i = 119; i >= 0; i--) {
    const time = now - i * day;
    const drift = (Math.random() - 0.5) * 1.2;
    const open = price,
      close = Math.max(1, open + drift);
    const high = Math.max(open, close) + Math.random() * 0.6;
    const low = Math.min(open, close) - Math.random() * 0.6;
    const volume = 1_000_000 + Math.floor(Math.random() * 3_000_000);
    hist.push({ date: time, open, high, low, close, volume });
    price = close;
  }
  return NextResponse.json({ results: [{ historicalDataPrice: hist }] });
}

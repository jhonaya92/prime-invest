import { NextResponse } from "next/server";
export const revalidate = 900; // 15 min cache ISR

function norm(t: string) {
  const s = t.includes(":") ? t.split(":")[1] : t;
  return s.trim().toUpperCase();
}

export async function GET(_req: Request, ctx: { params: { ticker: string } }) {
  try {
    const t = norm(decodeURIComponent(ctx.params.ticker || ""));
    if (!t)
      return NextResponse.json({ error: "Ticker inválido" }, { status: 400 });

    const url = `https://brapi.dev/api/quote/${encodeURIComponent(t)}?range=1y&interval=1d&fundamental=true`;
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok)
      return NextResponse.json({ error: "Falha na origem" }, { status: 502 });

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Erro inesperado" },
      { status: 500 },
    );
  }
}

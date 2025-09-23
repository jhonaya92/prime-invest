"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mb-4 animate-in">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-wide">
            <span className="text-[var(--accent)]">PRIME</span> INVEST
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-3">
          <Link className="chip" href="/dashboard">
            Dashboard
          </Link>
          <Link className="chip" href="/ativos">
            Ativos
          </Link>
          <Link className="chip" href="/academy">
            Academy
          </Link>
          <Link className="chip" href="/club">
            Club
          </Link>
          <Link className="chip" href="/planos">
            Planos
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <input
            placeholder="Buscar ação (ex: PETR4, VALE3)"
            className="hidden lg:block input"
          />
          <button className="btn ghost">Entrar</button>
          <button className="btn primary">Criar conta</button>
        </div>
      </div>
    </header>
  );
}

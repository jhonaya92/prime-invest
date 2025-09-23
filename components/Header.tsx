"use client";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  const nav = [
    { href: "/", label: "Dashboard" },
    { href: "/ativos/BMFBOVESPA:PETR4", label: "Ativos" },
    { href: "/academy", label: "Academy" },
    { href: "/club", label: "Club" },
    { href: "/planos", label: "Planos" },
  ];
  return (
    <header className="mb-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Prime Invest"
            className="h-8 w-8 rounded-lg"
          />
          <span className="font-extrabold tracking-wide">PRIME INVEST</span>
        </Link>
        <nav className="hidden md:flex items-center gap-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="w-[220px] md:w-[320px]">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

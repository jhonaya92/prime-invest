"use client";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";

const NAV = [
  { href: "/", label: "Dashboard" },
  { href: "/ativos/BMFBOVESPA:PETR4", label: "Ativos" },
  { href: "/academy", label: "Academy" },
  { href: "/club", label: "Club" },
  { href: "/planos", label: "Planos" },
];

export default function Header() {
  return (
    <header className="mb-4">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="glass rounded-2xl py-2 px-3 md:px-4 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" width={28} height={28} alt="Prime Invest" />
            <span className="font-extrabold tracking-wide text-sm md:text-base">
              PRIME INVEST
            </span>
          </Link>

          <nav className="ml-2 md:ml-4 hidden sm:flex items-center gap-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-1.5 rounded-xl hover:bg-white/5 text-sm text-gray-300"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto w-40 sm:w-64 md:w-80">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
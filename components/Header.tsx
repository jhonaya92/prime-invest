"use client";
import Link from "next/link";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import QuoteChips from "@/components/QuoteChips";

export default function Header() {
  return (
    <header className="mb-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Logo />
          <nav className="hidden md:flex items-center gap-2">
            {[
              { t: "Dashboard", href: "/" },
              { t: "Ativos", href: "/ativos/BMFBOVESPA:PETR4" },
              { t: "Academy", href: "/academy" },
              { t: "Club", href: "/club" },
              { t: "Planos", href: "/planos" },
            ].map((i) => (
              <Link
                key={i.t}
                href={i.href}
                className="px-3 py-2 rounded-xl hover:bg-white/5 text-gray-200"
              >
                {i.t}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:block w-[340px]">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10"
          >
            Entrar
          </Link>
          <Link
            href="/criar-conta"
            className="px-3 py-2 rounded-xl bg-[var(--accent)] text-black font-semibold shadow"
          >
            Criar conta
          </Link>
        </div>
      </div>

      <div className="md:hidden mt-3">
        <SearchBar />
      </div>

      <div className="mt-4">
        <QuoteChips />
      </div>
    </header>
  );
}
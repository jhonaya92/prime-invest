"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ativos", label: "Ativos" },
  { href: "/academy", label: "Academy" },
  { href: "/club", label: "Club" },
  { href: "/planos", label: "Planos" },
];

export default function Header() {
  const path = usePathname();
  return (
    <header className="glass rounded-2xl px-4 py-3 mb-4 flex items-center gap-4">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Logo />
        <span className="font-bold tracking-wider">PRIME INVEST</span>
      </Link>

      <nav className="hidden md:flex items-center gap-2">
        {NAV.map((n) => {
          const active =
            path === n.href || (n.href !== "/" && path?.startsWith(n.href));
          return (
            <Link
              key={n.href}
              href={n.href}
              className={`px-3 py-1.5 rounded-xl text-sm ${active ? "bg-white/10 text-white" : "text-gray-300 hover:text-white hover:bg-white/5"}`}
            >
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="ml-auto w-72 max-w-[45vw]">
        <SearchBar />
      </div>
    </header>
  );
}

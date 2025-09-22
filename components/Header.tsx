import SearchBar from "./SearchBar";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="glass rounded-2xl px-5 py-4 mb-6 flex items-center justify-between">
      <Logo />
      <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
        <a href="/" className="link">
          Dashboard
        </a>
        <a href="/ativos/BMFBOVESPA:PETR4" className="link">
          Ativos
        </a>
        <a href="#" className="link">
          Academy
        </a>
        <a href="#" className="link">
          Club
        </a>
        <a href="#" className="link">
          Planos
        </a>
      </nav>
      <div className="flex items-center gap-3">
        <SearchBar />
        <button className="px-4 py-2 rounded-xl bg-[var(--accent)] text-black font-semibold">
          Entrar
        </button>
      </div>
    </header>
  );
}

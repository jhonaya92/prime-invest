import Link from "next/link";
import Image from "next/image";

export default function Header(){
  return (
    <header className="mb-4">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Prime Invest" width={28} height={28} className="rounded" />
          <span className="font-extrabold tracking-wide">PRIME <span className="text-[var(--accent)]">INVEST</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {["Dashboard","Ativos","Academy","Club","Planos"].map((n)=>(
            <Link key={n} href={"/"+n.toLowerCase()} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">{n}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <input placeholder="Buscar ação (ex: PETR4, VALE3)" className="hidden lg:block px-4 py-2 rounded-xl bg-white/5 border border-white/10 outline-none w-[340px]" />
          <Link href="/login" className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">Entrar</Link>
          <Link href="/signup" className="px-3 py-1.5 rounded-xl bg-[var(--accent)] text-black font-semibold hover:brightness-110">Criar conta</Link>
        </div>
      </div>
    </header>
  );
}
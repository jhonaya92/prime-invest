"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => { setUser(localStorage.getItem("pi_user")); }, []);

  function login(n: string) {
    const v = n || "Investidor";
    localStorage.setItem("pi_user", v);
    setUser(v);
    setOpen(false);
    router.push("/conta");
  }
  function logout() {
    localStorage.removeItem("pi_user");
    setUser(null);
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <button onClick={()=>router.push("/conta")} className="h-8 w-8 rounded-full bg-yellow-300/20 border border-yellow-300/40 flex items-center justify-center">👤</button>
        <span className="text-sm text-gray-300 hidden md:inline">{user}</span>
        <button className="btn soft" onClick={logout}>Sair</button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button className="btn soft" onClick={()=>setOpen(true)}>Entrar</button>
      <button className="btn primary" onClick={()=>setOpen(true)}>Criar conta</button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={()=>setOpen(false)}>
          <div className="card w-[360px]" onClick={(e)=>e.stopPropagation()}>
            <div className="text-lg font-semibold mb-3">Entrar (demo)</div>
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Seu nome"
                   className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none" />
            <button className="btn primary w-full mt-3" onClick={()=>login(name)}>Continuar</button>
            <p className="text-xs text-gray-500 mt-2">*Demo local — sem backend.</p>
          </div>
        </div>
      )}
    </div>
  );
}

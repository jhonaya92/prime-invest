import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image src="/logo.png" alt="Prime Invest" width={36} height={36} className="rounded-md" priority />
      <div className="font-semibold tracking-wide">
        PRIME <span className="text-[var(--accent)]">INVEST</span>
      </div>
    </div>
  );
}

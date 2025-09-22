"use client";
import { useEffect, useState } from "react";
import { news } from "@/lib/mock";

type Item = { title: string; time: string };

export default function NewsToasts() {
  const [queue, setQueue] = useState<Item[]>([]);
  const [current, setCurrent] = useState<Item | null>(null);

  useEffect(() => {
    setQueue(news.slice(0, 3));
  }, []);

  useEffect(() => {
    if (current || queue.length === 0) return;
    const [first, ...rest] = queue;
    setCurrent(first);
    setQueue(rest);
    const t = setTimeout(() => setCurrent(null), 5000);
    return () => clearTimeout(t);
  }, [queue, current]);

  if (!current) return null;

  return (
    <div className="fixed right-4 top-4 z-50 w-[360px] max-w-[90vw]">
      <div className="toast relative animate-fadeInUp">
        <div className="h-2 w-2 rounded-full bg-[var(--accent)] mt-1.5" />
        <div className="flex-1 pr-8">
          <div className="text-sm leading-snug">{current.title}</div>
          <div className="text-xs text-gray-400">{current.time}</div>
          <div className="mt-2 flex items-center gap-3">
            <a
              href="/noticias"
              className="text-xs underline text-gray-300 hover:text-white"
            >
              Ver todas
            </a>
          </div>
        </div>
        <button
          aria-label="Fechar"
          onClick={() => setCurrent(null)}
          className="absolute right-2 top-2 text-gray-400 hover:text-white"
        >
          �
        </button>
        <div className="toast-progress"></div>
      </div>
    </div>
  );
}

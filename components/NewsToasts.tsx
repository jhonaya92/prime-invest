'use client';
import { useEffect, useState } from "react";
import { news } from "@/lib/mock";

type Item = { title: string; time: string };

export default function NewsToasts() {
  const [queue, setQueue] = useState<Item[]>([]);
  const [current, setCurrent] = useState<Item | null>(null);

  useEffect(()=>{
    setQueue(news.slice(0,3));
  },[]);

  useEffect(()=>{
    if (current || queue.length === 0) return;
    const [first, ...rest] = queue;
    setCurrent(first);
    setQueue(rest);
    const t = setTimeout(()=> setCurrent(null), 5000); // 5s
    return ()=> clearTimeout(t);
  },[queue, current]);

  return (
    <div className="fixed right-4 top-4 z-50 space-y-3 w-[360px] max-w-[90vw]">
      {current && (
        <div className="toast relative animate-fadeInUp">
          <div className="h-2 w-2 rounded-full bg-[var(--accent)] mt-1.5"/>
          <div>
            <div className="text-sm leading-snug">{current.title}</div>
            <div className="text-xs text-gray-400">{current.time}</div>
          </div>
          <div className="toast-progress"></div>
        </div>
      )}
    </div>
  );
}

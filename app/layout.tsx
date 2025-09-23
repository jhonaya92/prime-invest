import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import QuoteChips from "@/components/QuoteChips";

export const metadata: Metadata = {
  title: "Prime Invest Demo v2",
  description: "Demo visual com cotações, destaques, análise e gráfico.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <div className="container py-6">
          <Header />
          <div className="mb-4"><QuoteChips /></div>
          {children}
          <footer className="text-xs text-gray-400 mt-10 mb-6 text-center">
            {new Date().getFullYear()} Prime Invest — demo visual
          </footer>
        </div>
      </body>
    </html>
  );
}

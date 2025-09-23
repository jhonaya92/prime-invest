import type { Metadata } from "next";
import "./globals.css";
import NewsToasts from "@/components/NewsToasts";
import Header from "@/components/Header";
import QuoteChips from "@/components/QuoteChips";

export const metadata: Metadata = {
  title: "Prime Invest Demo v2",
  description: "Prévia visual do Prime Invest com gráfico local e IA didática.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <NewsToasts />
        <div className="container py-6">
          <Header />
          <div className="glass rounded-2xl px-3 py-2 mb-4">
            <QuoteChips />
          </div>
          {children}
          <footer className="text-xs text-gray-400 mt-10 mb-6 text-center">
            {new Date().getFullYear()} Prime Invest · demo visual
          </footer>
        </div>
      </body>
    </html>
  );
}

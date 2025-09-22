import type { Metadata } from "next";
import "./globals.css";
import NewsToasts from "@/components/NewsToasts";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Prime Invest — Demo v2",
  description: "Prévia visual do Prime Invest com charts TradingView e toasts de notícias.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <NewsToasts />
        <div className="container py-6">
          <Header />
          {children}
          <footer className="text-xs text-gray-400 mt-10 mb-6 text-center">© {new Date().getFullYear()} Prime Invest — Demo visual</footer>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import NewsToasts from "@/components/NewsToasts";
import Header from "@/components/Header";
import TickerTape from "@/components/TickerTape";

export const metadata: Metadata = {
  title: "Prime Invest  Demo v2",
  description:
    "Pr�via visual do Prime Invest com charts TradingView e toasts de not�cias.",
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
          <TickerTape />
          {children}
          <footer className="text-xs text-gray-400 mt-10 mb-6 text-center">
            {new Date().getFullYear()} Prime Invest Demo visual
          </footer>
        </div>
      </body>
    </html>
  );
}

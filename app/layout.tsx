import type { Metadata } from "next";
import "./globals.css";
import NewsToasts from "@/components/NewsToasts";
import Header from "@/components/Header";
import QuoteBar from "@/components/QuoteBar";

export const metadata: Metadata = {
  title: "Prime Invest • Demo",
  description: "Prévia visual do Prime Invest com charts e toasts.",
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
        <Header />
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <QuoteBar />
          {children}
          <footer className="text-xs text-gray-400 mt-10 mb-6 text-center">
            {new Date().getFullYear()} Prime Invest • Demo visual
          </footer>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "科學天才計畫",
  description: "以分類結構探索科學巨匠與 AI 智能體互動。",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI日报监测",
  description: "每日AI资讯，自动聚合筛选",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 日报",
  description: "面向低代码 AI 产品经理的每日资讯，自动聚合筛选",
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

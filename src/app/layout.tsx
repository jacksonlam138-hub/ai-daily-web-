import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./reading.css";

export const metadata: Metadata = {
  title: "AI 日报",
  description: "每日 AI 资讯精选，结合产品、设计、品牌等角色视角，只在相关时给出 AI 解读。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
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

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2025 편입 점수 계산기",
  description: "2025년도 각 대학 모집요강에 따른 편입학 필기시험 점수 변환 계산기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

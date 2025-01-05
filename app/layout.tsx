import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/app/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "2025 편입 점수 계산기",
  description: "2025년도 각 대학 모집요강에 따른 편입학 필기시험 점수 변환 계산기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  GoogleAnalytics;
  return (
    <html lang="ko">
      <head>
        <script
          async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3397931650520195"
          crossOrigin="anonymous"
        >
        </script>
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

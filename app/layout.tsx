import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";

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
    <>
      <Head>
        {/* 👇 gtag function definition. notice that we don't send page views at this point.  */}
        <script
          id='gtag-init'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `
          }}
        />
      </Head>

      {/* Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />

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
    </>
  );
}

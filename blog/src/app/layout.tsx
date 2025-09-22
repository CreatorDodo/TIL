import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Today I Learned",
  description: "개인 학습 기록을 정리하는 TIL 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <nav className="flex items-center justify-between">
                <a href="/" className="text-xl font-bold">
                  Today I Learned
                </a>
                <div className="flex space-x-4">
                  <a
                    href="/"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    홈
                  </a>
                  <a
                    href="/categories"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    카테고리
                  </a>
                  <a
                    href="/monthly"
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    월간 기록
                  </a>
                </div>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
            <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
              <p>개인 학습 기록을 정리하는 공간입니다.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script"
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
  title: "Piotr Krzysztof Lis | Full-Stack Engineer",
  description: "Full-Stack Engineer building AI systems and production infrastructure.",
  keywords: ["Full-Stack Engineer", "DevOps", "Platform Engineering", "Kubernetes", "Cloud Native", "RAG Systems", "Machine Learning", "Quantum Computing", "AI Systems"],
  authors: [{ name: "Piotr Krzysztof Lis" }],
  creator: "Piotr Krzysztof Lis",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Piotr Krzysztof Lis | Full-Stack Engineer",
    description: "Building AI systems and production infrastructure.",
    siteName: "Piotr Krzysztof Lis",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="3b2c616b4e25"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

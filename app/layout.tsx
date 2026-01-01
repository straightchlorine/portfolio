import type { Metadata } from "next";
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the nonce from middleware
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') || '';

  return (
    <html lang="en">
      <head>
        {/* Add nonce meta tag for Next.js to use in injected styles */}
        {nonce && <meta property="csp-nonce" content={nonce} />}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src="https://app.rybbit.io/api/script.js"
          data-site-id="3b2c616b4e25"
          strategy="afterInteractive"
          nonce={nonce}
        />
      </body>
    </html>
  );
}

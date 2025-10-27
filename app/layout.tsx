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
  title: "Piotr Krzysztof Lis | Full-Stack Engineer",
  description: "Full-Stack Engineer building AI systems and production infrastructure. RAG systems, Kubernetes, quantum computing pipelines. 5.0 GPA Computer Science student with 10 years coding experience.",
  keywords: ["Full-Stack Engineer", "DevOps", "Platform Engineering", "Kubernetes", "Cloud Native", "RAG Systems", "Machine Learning", "Quantum Computing", "AI Systems"],
  authors: [{ name: "Piotr Krzysztof Lis" }],
  creator: "Piotr Krzysztof Lis",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Piotr Krzysztof Lis | Full-Stack Engineer",
    description: "Building AI systems and production infrastructure. RAG systems, Kubernetes, quantum computing pipelines.",
    siteName: "Piotr Krzysztof Lis",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piotr Krzysztof Lis | Full-Stack Engineer",
    description: "Building AI systems and production infrastructure. RAG systems, Kubernetes, quantum computing pipelines.",
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
      </body>
    </html>
  );
}

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
  title: "Easygrocery",
  description: "Easygrocery web",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Explicit favicon links: use SVG fallback (logo.svg) so a favicon is always available even if logo.png is missing */}
        <link rel="icon" type="image/svg+xml" href="/logo.svg?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png?v=2" />
        <link rel="shortcut icon" href="/logo.svg?v=2" />
        <link rel="apple-touch-icon" href="/logo.svg?v=2" />
        <meta name="msapplication-TileImage" content="/logo.svg?v=2" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

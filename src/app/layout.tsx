import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Vertex Digital — World-Class Agency",
  description:
    "Vertex Digital is a premium digital agency crafting high-performance websites, brand identities, and growth-driven digital experiences for ambitious businesses worldwide.",
  keywords: ["digital agency", "web design", "Next.js", "branding", "SEO", "Mauritius"],
  metadataBase: new URL("https://vertex-digital.vercel.app"),
  openGraph: {
    title: "Vertex Digital — We build digital experiences that perform.",
    description: "Premium web design, branding & growth for ambitious businesses.",
    url: "https://vertex-digital.vercel.app",
    siteName: "Vertex Digital",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vertex Digital",
    description: "We build digital experiences that perform.",
  },
  alternates: {
    canonical: "https://vertex-digital.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}

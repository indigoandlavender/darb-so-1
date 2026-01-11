import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://derb.so"),
  title: {
    default: "Derb - Understanding Marrakech",
    template: "%s | Derb",
  },
  description: "An urban reference explaining the everyday realities of Marrakech. Systems, not stories.",
  keywords: [
    "Marrakech", "Morocco", "urban systems", "infrastructure", 
    "travel guide", "medina", "city reference"
  ],
  authors: [{ name: "Derb" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://derb.so",
    siteName: "Derb",
    title: "Derb - Understanding Marrakech",
    description: "An urban reference explaining the everyday realities of Marrakech.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Derb - Understanding Marrakech",
    description: "An urban reference explaining the everyday realities of Marrakech.",
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
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="py-8 border-b border-border">
            <div className="container">
              <a href="/" className="inline-block">
                <span className="text-xl font-serif tracking-tight">Derb</span>
              </a>
            </div>
          </header>
          <main className="flex-1 py-12 md:py-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

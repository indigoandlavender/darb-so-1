import type { Metadata } from "next";
import "./globals.css";

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
          <footer className="py-12 border-t border-border">
            <div className="container">
              <div className="space-y-6">
                <div className="max-w-prose">
                  <h4 className="text-small font-medium mb-2 text-muted uppercase tracking-wide">Methodology</h4>
                  <p className="text-small text-muted">
                    Derb is an independent urban reference. Content is based on direct observation, 
                    consultation with local residents, and research into urban infrastructure systems. 
                    This is not a travel guide. It explains systems, not experiences.
                  </p>
                </div>
                <div className="pt-6 border-t border-border">
                  <p className="text-small text-muted">
                    Produced by the team behind{" "}
                    <a href="https://riaddelasiena.com" className="border-b border-border hover:border-muted transition-colors">
                      Riad di Siena
                    </a>
                    {" / "}
                    <a href="https://slowmorocco.com" className="border-b border-border hover:border-muted transition-colors">
                      Slow Morocco
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

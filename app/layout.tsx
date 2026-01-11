import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { getQuestions } from "@/lib/questions";

const siteUrl = "https://derb.so";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Derb - Understanding Marrakech | Urban Reference Guide",
    template: "%s | Derb",
  },
  description:
    "Why do riads feel cooler? Why are there cockroaches? Why does time feel different in Marrakech? Derb explains the everyday realities of Morocco's medina cities—infrastructure, climate, culture—without tourism language.",
  keywords: [
    "Marrakech",
    "Morocco",
    "medina",
    "riad",
    "why cockroaches Marrakech",
    "why cats Marrakech",
    "riad bathroom smell",
    "Marrakech plumbing",
    "medina navigation",
    "Jemaa el-Fna",
    "Moroccan architecture",
    "riad cooling",
    "saltpetre walls",
    "efflorescence riad",
    "Marrakech heat",
    "medina streets",
    "Moroccan culture explained",
    "Morocco travel guide",
    "urban systems",
    "infrastructure Morocco",
  ],
  authors: [{ name: "Derb", url: siteUrl }],
  creator: "Slow Morocco",
  publisher: "Slow Morocco",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ar_MA"],
    url: siteUrl,
    siteName: "Derb",
    title: "Derb - Understanding Marrakech",
    description:
      "An urban reference explaining cockroaches, cats, plumbing, heat, and time in Marrakech. Systems, not stories.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Derb - Understanding Marrakech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Derb - Understanding Marrakech",
    description:
      "Why riads feel cooler. Why there are cats everywhere. Why Google Maps fails. The everyday realities of Marrakech, explained.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "fr-FR": `${siteUrl}/fr`,
      "ar-MA": `${siteUrl}/ar`,
    },
  },
  category: "travel",
  other: {
    "geo.region": "MA-MAR",
    "geo.placename": "Marrakech",
    "geo.position": "31.6295;-7.9811",
    ICBM: "31.6295, -7.9811",
  },
};

// Generate FAQ structured data from questions
function generateFAQSchema() {
  const questions = getQuestions();
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.slice(0, 20).map((q) => ({
      "@type": "Question",
      name: q.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.sections[0]?.content || "",
      },
    })),
  };
}

// WebSite structured data
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Derb",
  alternateName: "Derb Marrakech Guide",
  url: siteUrl,
  description:
    "An urban reference explaining the everyday realities of Marrakech.",
  inLanguage: ["en", "fr", "ar"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// Organization structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Derb",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  parentOrganization: {
    "@type": "Organization",
    name: "Slow Morocco",
    url: "https://slowmorocco.com",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faqSchema = generateFAQSchema();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="py-8 border-b border-border">
            <div className="container">
              <a href="/" className="inline-block">
                <span className="text-xl font-serif tracking-tight">Derb</span>
              </a>
            </div>
          </header>
          <main className="flex-1 py-12 md:py-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

import Link from "next/link";
import { getCities } from "@/lib/sheets";
import Footer from "@/components/Footer";
import CityCarousel from "@/components/CityCarousel";

export const revalidate = 60;

export default async function HomePage() {
  const cities = await getCities();

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-wide">
            Derb
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/city-guides" className="text-sm hover:text-foreground/70 transition-colors">
              City Guides
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground/70 transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            The path through
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12">
            Not a guide to what to see. A guide to how to be there. 
            Cultural intelligence, mapped.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            City Guides
          </h2>
          <Link href="/city-guides" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors">
            View All →
          </Link>
        </div>
        
        <CityCarousel cities={cities} />
      </section>

      <Footer />
    </main>
  );
}

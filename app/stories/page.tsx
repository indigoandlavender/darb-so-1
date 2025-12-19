import Link from "next/link";
import Footer from "@/components/Footer";

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-wide">
            Derb
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/city-guides" className="text-sm text-muted-foreground hover:text-foreground/70 transition-colors">
              Cities
            </Link>
            <Link href="/stories" className="text-sm text-foreground font-medium">
              Stories
            </Link>
            <Link href="/essentials" className="text-sm text-muted-foreground hover:text-foreground/70 transition-colors">
              Essentials
            </Link>
          </nav>
        </div>
      </header>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-12">
            History with a heartbeat. The people, the places, the why.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center py-20 text-muted-foreground border border-dashed border-foreground/20 rounded-lg">
          <p className="text-lg mb-2">Coming soon</p>
          <p className="text-sm">The first stories are being written.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

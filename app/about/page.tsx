import Link from "next/link";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-wide">
            Derb
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/city-guides" className="text-sm text-muted-foreground hover:text-foreground/70 transition-colors">
              City Guides
            </Link>
            <Link href="/stories" className="text-sm text-muted-foreground hover:text-foreground/70 transition-colors">
              Stories
            </Link>
          </nav>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-20">
        
        <h1 className="font-serif text-4xl md:text-5xl mb-16 text-center">
          What Derb believes
        </h1>

        <div className="space-y-8 text-lg leading-relaxed text-foreground/80">
          
          <p>
            We don't sell bucket lists.
          </p>

          <p className="py-4">
            A week in Morocco won't make you Moroccan.
          </p>
          
          <p>
            A hundred countries won't make you wise.
          </p>
          
          <p className="py-4">
            The influencer at every landmark? 
            <br />
            Collected backdrops, not understanding.
          </p>

          <div className="py-8" />

          <p>
            We speak to a different traveler.
          </p>

          <p className="py-4">
            The one who knows that watching a performance 
            doesn't mean you understand the play.
          </p>
          
          <p>
            Who arrives curious, not conquering.
          </p>
          
          <p className="py-4">
            Who measures a trip by what shifted inside, 
            not what got posted.
          </p>

          <div className="py-8" />

          <p>
            You're a visitor. That's fine.
          </p>

          <p className="py-4">
            Be a good one.
          </p>

          <p>
            Learn the codes. Know the why.
          </p>
          
          <p className="py-4">
            Understand what you don't understand.
          </p>

          <div className="py-8" />

          <p className="text-foreground">
            That's already more than most tourists manage.
          </p>

        </div>

        <div className="mt-20 pt-12 border-t border-foreground/10">
          <p className="text-sm text-muted-foreground text-center">
            Derb — The path through
          </p>
        </div>

      </article>

      <Footer />
    </main>
  );
}

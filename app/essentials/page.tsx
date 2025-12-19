import Link from "next/link";
import Footer from "@/components/Footer";

export default function EssentialsPage() {
  const categories = [
    { id: "visa", icon: "🛂", title: "Visa & Entry", desc: "Who needs what" },
    { id: "money", icon: "💱", title: "Money", desc: "Currency, cards, tipping" },
    { id: "cultural-codes", icon: "🤝", title: "Cultural Codes", desc: "The unwritten rules" },
    { id: "packing", icon: "🎒", title: "What to Pack", desc: "Summer, winter, always" },
    { id: "getting-around", icon: "🚕", title: "Getting Around", desc: "Taxis, trains, walking" },
    { id: "phones", icon: "📱", title: "SIM & WiFi", desc: "Stay connected" },
    { id: "health", icon: "💊", title: "Health & Safety", desc: "What to know" },
    { id: "ramadan", icon: "🌙", title: "Ramadan", desc: "What changes" },
  ];

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
            <Link href="/stories" className="text-sm text-muted-foreground hover:text-foreground/70 transition-colors">
              Stories
            </Link>
            <Link href="/essentials" className="text-sm text-foreground font-medium">
              Essentials
            </Link>
          </nav>
        </div>
      </header>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            Essentials
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-12">
            What you need to know before you go. No essays. Just answers.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/essentials/${cat.id}`}
              className="group block p-6 border border-foreground/10 rounded-lg hover:border-foreground/30 transition-colors"
            >
              <span className="text-3xl mb-4 block">{cat.icon}</span>
              <h3 className="font-serif text-lg mb-1">{cat.title}</h3>
              <p className="text-sm text-muted-foreground">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* City-specific essentials */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
          By City
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Marrakech", "Fes", "Tangier", "Essaouira", "Casablanca", "Rabat", "Chefchaouen", "Ouarzazate"].map((city) => (
            <Link
              key={city}
              href={`/essentials/cities/${city.toLowerCase()}`}
              className="block p-4 border border-foreground/10 rounded-lg hover:border-foreground/30 transition-colors"
            >
              <h3 className="font-serif text-lg">{city}</h3>
              <p className="text-xs text-muted-foreground mt-1">Money · Transport · SIM</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

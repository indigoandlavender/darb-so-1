import Link from "next/link";
import { getCities } from "@/lib/sheets";
import Footer from "@/components/Footer";

export const revalidate = 60;

export default async function HomePage() {
  const cities = await getCities();

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-wide">
            Darb
          </Link>
          <p className="text-sm text-muted-foreground hidden sm:block">
            Navigate culture, not just places
          </p>
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
        <h2 className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
          Explore
        </h2>
        
        {cities.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="mb-2">No cities yet.</p>
            <p className="text-sm">Add cities to your Google Sheet to get started.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link
                key={city.City_ID}
                href={`/${city.City_ID}`}
                className="group block"
              >
                <div className="aspect-[4/3] bg-sand rounded-lg overflow-hidden mb-4 relative">
                  {city.Hero_Image ? (
                    <img
                      src={city.Hero_Image}
                      alt={city.City_Name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        <path d="M2 12h20" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-xl mb-1 group-hover:underline">
                  {city.City_Name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {city.Country}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

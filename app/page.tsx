import Link from "next/link";
import { getCities } from "@/lib/sheets";
import Footer from "@/components/Footer";

export const revalidate = 60;

// Convert Google Drive URLs to displayable format
function convertDriveUrl(url: string): string {
  if (!url) return "";
  if (!url.includes("drive.google.com")) return url;
  
  let fileId = "";
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) fileId = fileMatch[1];
  
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch) fileId = openMatch[1];
  
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
  }
  return url;
}

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
        
        {cities.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="mb-2">No city guides yet.</p>
            <p className="text-sm">Check back soon.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Carousel container */}
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
              {cities.map((city) => (
                <Link
                  key={city.City_ID}
                  href={`/${city.City_ID}`}
                  className="group block flex-shrink-0 w-64 snap-start"
                >
                  <div className="aspect-[3/4] bg-[#1a1a1a] rounded-lg overflow-hidden flex flex-col">
                    {/* Label badge */}
                    <div className="bg-[#1a1a1a] px-4 py-3 flex-shrink-0">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/60">
                        Darb City Guide
                      </p>
                      <h3 className="font-serif text-xl text-white mt-1">
                        {city.City_Name}
                      </h3>
                    </div>
                    
                    {/* Image - fills remaining space, shows full illustration */}
                    {city.Hero_Image ? (
                      <div className="flex-1 flex items-center justify-center p-2">
                        <img
                          src={convertDriveUrl(city.Hero_Image)}
                          alt={city.City_Name}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#2563eb]">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" className="opacity-30">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          <path d="M2 12h20" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

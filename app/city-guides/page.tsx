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

export default async function CityGuidesPage() {
  const cities = await getCities();

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl tracking-wide">
            Derb
          </Link>
          <nav className="flex items-center gap-8">
            <Link href="/city-guides" className="text-sm text-foreground font-medium">
              City Guides
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground/70 transition-colors">
              About
            </Link>
          </nav>
        </div>
      </header>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            City Guides
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-12">
            The path through. Cultural intelligence for travelers who want to know the codes.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        {cities.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="mb-2">No city guides yet.</p>
            <p className="text-sm">Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <Link
                key={city.City_ID}
                href={`/${city.City_ID}`}
                className="group block"
              >
                <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
                  {/* Full bleed image */}
                  {city.Hero_Image ? (
                    <img
                      src={convertDriveUrl(city.Hero_Image)}
                      alt={city.City_Name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" className="opacity-30">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        <path d="M2 12h20" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Text overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent">
                    <div className="p-4">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white/70">
                        Darb City Guide
                      </p>
                      <h3 className="font-serif text-xl text-white mt-1">
                        {city.City_Name}
                      </h3>
                    </div>
                  </div>
                </div>
                
                {/* Country label below card */}
                <p className="text-xs text-muted-foreground mt-2">
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

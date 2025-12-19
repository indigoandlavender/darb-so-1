import { notFound } from "next/navigation";
import Link from "next/link";
import { getCity, getPins, getCategories, getNeighborhoods } from "@/lib/sheets";
import CityMap from "./CityMap";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ city: string }>;
}

export default async function CityPage({ params }: PageProps) {
  const { city: cityId } = await params;
  const city = await getCity(cityId);
  
  if (!city) {
    notFound();
  }

  const [pins, categories, neighborhoods] = await Promise.all([
    getPins(cityId),
    getCategories(),
    getNeighborhoods(cityId),
  ]);

  const center: [number, number] = [
    parseFloat(city.Lng) || 0,
    parseFloat(city.Lat) || 0,
  ];

  return (
    <main className="h-screen flex flex-col">
      <header className="border-b border-foreground/10 bg-background z-10">
        <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-serif text-xl tracking-wide hover:opacity-70 transition-opacity">
              Darb
            </Link>
            <div className="h-6 w-px bg-foreground/10" />
            <div>
              <h1 className="font-serif text-lg">{city.City_Name}</h1>
              <p className="text-xs text-muted-foreground">{city.Country}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground hidden md:block">
            {pins.length} places
          </p>
        </div>
      </header>

      <div className="flex-1 relative">
        {pins.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center bg-sand">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">No pins yet for {city.City_Name}.</p>
              <p className="text-sm text-muted-foreground">Add pins to your Google Sheet to populate the map.</p>
            </div>
          </div>
        ) : (
          <CityMap 
            center={center}
            pins={pins}
            categories={categories}
            neighborhoods={neighborhoods}
          />
        )}
      </div>
    </main>
  );
}

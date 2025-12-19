"use client";

import { useState } from "react";
import Map from "@/components/Map";

interface Pin {
  Pin_ID: string;
  City_ID: string;
  Name: string;
  Category: string;
  Lat: string;
  Lng: string;
  Content: string;
  Address: string;
  Hours: string;
  Price_Range: string;
  Image_URL: string;
}

interface Category {
  Category_ID: string;
  Name: string;
  Icon: string;
  Color: string;
}

interface Neighborhood {
  Neighborhood_ID: string;
  City_ID: string;
  Name: string;
  Lat: string;
  Lng: string;
  Description: string;
  Character: string;
}

interface CityMapProps {
  center: [number, number];
  pins: Pin[];
  categories: Category[];
  neighborhoods: Neighborhood[];
}

export default function CityMap({ center, pins, categories, neighborhoods }: CityMapProps) {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [showPanel, setShowPanel] = useState(false);

  const handlePinClick = (pin: Pin) => {
    setSelectedPin(pin);
    setShowPanel(true);
  };

  return (
    <div className="relative w-full h-full">
      <Map
        center={center}
        pins={pins}
        categories={categories}
        onPinClick={handlePinClick}
      />

      {showPanel && selectedPin && (
        <div className="absolute top-0 right-0 h-full w-full max-w-md bg-background shadow-xl border-l border-foreground/10 overflow-y-auto">
          <div className="sticky top-0 bg-background border-b border-foreground/10 p-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {selectedPin.Category}
            </p>
            <button
              onClick={() => setShowPanel(false)}
              className="p-2 hover:bg-sand rounded-full transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {selectedPin.Image_URL && (
              <div className="aspect-video bg-sand rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedPin.Image_URL}
                  alt={selectedPin.Name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h2 className="font-serif text-2xl mb-4">{selectedPin.Name}</h2>

            {selectedPin.Content && (
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {selectedPin.Content}
              </p>
            )}

            <div className="space-y-3 text-sm">
              {selectedPin.Address && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{selectedPin.Address}</span>
                </div>
              )}

              {selectedPin.Hours && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  <span>{selectedPin.Hours}</span>
                </div>
              )}

              {selectedPin.Price_Range && (
                <div className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span>{selectedPin.Price_Range}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {neighborhoods.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Neighborhoods
            </p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {neighborhoods.map(hood => (
                <button
                  key={hood.Neighborhood_ID}
                  className="flex-shrink-0 px-4 py-2 bg-sand rounded-full text-sm hover:bg-foreground hover:text-white transition-colors"
                >
                  {hood.Name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

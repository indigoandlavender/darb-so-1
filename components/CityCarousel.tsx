"use client";

import Link from "next/link";
import { useRef } from "react";

interface City {
  City_ID: string;
  City_Name: string;
  Country: string;
  Description: string;
  Hero_Image: string;
}

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

export default function CityCarousel({ cities }: { cities: City[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  if (cities.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p className="mb-2">No city guides yet.</p>
        <p className="text-sm">Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="relative group/carousel">
      {/* Left Arrow */}
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white border border-foreground/10 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-foreground hover:text-white"
        aria-label="Scroll left"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      {/* Right Arrow */}
      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white border border-foreground/10 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-foreground hover:text-white"
        aria-label="Scroll right"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      
      {/* Carousel container */}
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory scroll-smooth"
      >
        {cities.map((city) => (
          <Link
            key={city.City_ID}
            href={`/${city.City_ID}`}
            className="group block flex-shrink-0 w-64 snap-start"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden relative border-2 border-[#1a1a1a]">
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
          </Link>
        ))}
      </div>
    </div>
  );
}

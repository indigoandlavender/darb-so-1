"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

interface MapProps {
  center: [number, number];
  zoom?: number;
  pins: Pin[];
  categories: Category[];
  onPinClick?: (pin: Pin) => void;
}

const categoryColors: Record<string, string> = {
  eat: "#d4644a",
  drink: "#2d7d6f",
  buy: "#c49a3d",
  see: "#4a6fa5",
  quiet: "#7b6b8d",
  practical: "#5c5c5c",
};

const categoryIcons: Record<string, string> = {
  eat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  drink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2h8l-4 18H8l4-18z"/><path d="M12 20v2"/><path d="M8 22h8"/></svg>`,
  buy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  see: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  quiet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
  practical: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
};

export default function Map({ center, zoom = 13, pins, categories, onPinClick }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    categories.map(c => c.Category_ID.toLowerCase())
  );

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: center,
      zoom: zoom,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!map.current) return;

    markers.current.forEach(m => m.remove());
    markers.current = [];

    const filteredPins = pins.filter(pin => 
      activeCategories.includes(pin.Category.toLowerCase())
    );

    filteredPins.forEach(pin => {
      const lat = parseFloat(pin.Lat);
      const lng = parseFloat(pin.Lng);
      
      if (isNaN(lat) || isNaN(lng)) return;

      const categoryKey = pin.Category.toLowerCase();
      const color = categoryColors[categoryKey] || "#888888";

      const el = document.createElement("div");
      el.className = `marker marker-${categoryKey}`;
      el.style.backgroundColor = color;
      el.innerHTML = categoryIcons[categoryKey] || categoryIcons.practical;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        maxWidth: "300px",
      }).setHTML(`
        <div style="padding: 16px;">
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 4px;">${pin.Category}</p>
          <h3 style="font-family: 'Libre Baskerville', serif; font-size: 18px; margin-bottom: 8px;">${pin.Name}</h3>
          ${pin.Content ? `<p style="font-size: 14px; color: #666; margin-bottom: 12px;">${pin.Content}</p>` : ''}
          ${pin.Address ? `<p style="font-size: 12px; color: #888;">${pin.Address}</p>` : ''}
          ${pin.Hours ? `<p style="font-size: 12px; color: #888;">${pin.Hours}</p>` : ''}
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener("click", () => {
        if (onPinClick) onPinClick(pin);
      });

      markers.current.push(marker);
    });
  }, [pins, activeCategories, onPinClick]);

  const toggleCategory = (categoryId: string) => {
    const id = categoryId.toLowerCase();
    setActiveCategories(prev => {
      if (prev.includes(id)) {
        return prev.filter(c => c !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />

      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Filter</p>
        <div className="flex flex-col gap-2">
          {categories.map(category => {
            const id = category.Category_ID.toLowerCase();
            const isActive = activeCategories.includes(id);
            const color = categoryColors[id] || "#888888";
            
            return (
              <button
                key={category.Category_ID}
                onClick={() => toggleCategory(category.Category_ID)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-all ${
                  isActive 
                    ? "bg-foreground text-white" 
                    : "bg-sand text-muted-foreground hover:bg-foreground/10"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: isActive ? color : "#ccc" }}
                />
                {category.Name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

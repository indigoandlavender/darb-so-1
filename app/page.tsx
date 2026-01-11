"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/questions${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  };

  return (
    <div className="container">
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-serif mb-3 tracking-tight">
          Derb
        </h1>
        <p className="text-muted mb-10">
          An urban reference for Marrakech
        </p>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="w-full max-w-xl mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Why do riads feel humid? What should I wear?"
            className="search-input text-center text-lg"
            autoFocus
          />
        </form>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <Link href="/questions" className="tag hover:opacity-70 transition-opacity">
            All Questions
          </Link>
          <Link href="/questions?c=built-environment" className="tag hover:opacity-70 transition-opacity">
            Buildings
          </Link>
          <Link href="/questions?c=everyday-urban-reality" className="tag hover:opacity-70 transition-opacity">
            Daily Life
          </Link>
          <Link href="/questions?c=movement-perception" className="tag hover:opacity-70 transition-opacity">
            Getting Around
          </Link>
          <Link href="/questions?c=cultural-tech" className="tag hover:opacity-70 transition-opacity">
            Culture
          </Link>
        </div>

        {/* Subtle tagline */}
        <p className="text-xs text-muted max-w-md opacity-60">
          Explaining the systems behind everyday realities.
        </p>
      </div>
    </div>
  );
}

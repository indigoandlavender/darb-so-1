"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      {/* Level 2: Brand Content - darkest */}
      <div className="bg-[#1c1c1c] text-[#e8e5df]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & Tagline */}
            <div>
              <div className="flex flex-col items-start leading-tight mb-4">
                <span className="text-lg tracking-[0.3em] font-light">DERB</span>
              </div>
              <p className="text-[#e8e5df]/70 text-sm leading-relaxed max-w-xs mb-6">
                Navigate culture, not just places. The path through.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-xs tracking-widest mb-6">EXPLORE</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/city-guides" className="text-[#e8e5df]/70 text-sm hover:text-[#e8e5df] transition-colors">
                    City Guides
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs tracking-widest mb-6">CATEGORIES</h4>
              <ul className="space-y-3">
                <li><span className="text-[#e8e5df]/70 text-sm">Eat</span></li>
                <li><span className="text-[#e8e5df]/70 text-sm">Drink</span></li>
                <li><span className="text-[#e8e5df]/70 text-sm">Buy</span></li>
                <li><span className="text-[#e8e5df]/70 text-sm">See</span></li>
                <li><span className="text-[#e8e5df]/70 text-sm">Quiet</span></li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-xs tracking-widest mb-6">ABOUT</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-[#e8e5df]/70 text-sm hover:text-[#e8e5df] transition-colors">
                    About Derb
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[#e8e5df]/70 text-sm hover:text-[#e8e5df] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Level 3: Legal - slightly lighter */}
      <div className="bg-[#252525] text-[#e8e5df]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Legal Links - Left */}
            <div className="flex flex-wrap gap-6 text-xs">
              <Link href="/privacy" className="text-[#e8e5df]/50 hover:text-[#e8e5df]/80 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#e8e5df]/50 hover:text-[#e8e5df]/80 transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="text-[#e8e5df]/50 hover:text-[#e8e5df]/80 transition-colors">
                Disclaimer
              </Link>
              <Link href="/intellectual-property" className="text-[#e8e5df]/50 hover:text-[#e8e5df]/80 transition-colors">
                Intellectual Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Level 4: Copyright - lightest */}
      <div className="bg-[#2d2d2d] text-[#e8e5df]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-[#e8e5df]/40 text-xs">
            © {new Date().getFullYear()} Derb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

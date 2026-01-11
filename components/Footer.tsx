'use client';

import { useEffect, useState } from 'react';

interface LegalContent {
  privacy?: string;
  terms?: string;
  copyright?: string;
}

export default function Footer() {
  const [legal, setLegal] = useState<LegalContent>({});
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Fetch legal content from Nexus API
    async function fetchLegal() {
      try {
        const res = await fetch('https://nexus.slowmorocco.com/api/legal?brand=derb');
        if (res.ok) {
          const data = await res.json();
          setLegal(data);
        }
      } catch {
        // Fallback to defaults if Nexus unavailable
      }
    }
    fetchLegal();
  }, []);

  return (
    <footer className="footer-ombre">
      {/* Level 1: Brand-specific content */}
      <div className="footer-level-1">
        <div className="container">
          <div className="max-w-prose">
            <h4 className="text-small font-medium mb-3 uppercase tracking-wide opacity-70">
              Methodology
            </h4>
            <p className="text-small leading-relaxed opacity-80">
              Derb is an independent urban reference. Content is based on direct observation, 
              consultation with local residents, and research into urban infrastructure systems. 
              This is not a travel guide. It explains systems, not experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Level 2: Legal content from Nexus */}
      <div className="footer-level-2">
        <div className="container">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-small">
            <a href="/privacy" className="opacity-60 hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="/terms" className="opacity-60 hover:opacity-100 transition-opacity">
              Terms of Use
            </a>
            <span className="opacity-50">
              {legal.copyright || `© ${currentYear} Derb. All rights reserved.`}
            </span>
          </div>
        </div>
      </div>

      {/* Level 3: Powered by Slow Morocco */}
      <div className="footer-level-3">
        <div className="container">
          <p className="text-small opacity-50">
            Powered by{' '}
            <a 
              href="https://slowmorocco.com" 
              className="hover:opacity-100 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              Slow Morocco
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

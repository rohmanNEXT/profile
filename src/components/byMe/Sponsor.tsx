'use client';

import React from 'react';

/**
 * Sponsor Component (React.FC)
 * Features a marquee-style scrolling bar with sponsor logos/names.
 * Adheres to the Bauhaus/Neo-Brutalist high-contrast aesthetic.
 */
const Sponsor: React.FC = () => {
  const SPONSORS = ["SkyAir", "WanderLodge", "ExoticTours", "NomadGear", "GlobeTrot"];
  const movingSponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS];

  return (
    <section className="w-full mb-24 overflow-hidden border-y-[3px] border-[#1a1a1a] relative z-10">
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
      
      <div className="py-4 px-10 flex whitespace-nowrap animate-marquee">
        {movingSponsors.map((sponsor, index) => (
          <div 
            key={`${sponsor}-${index}`} 
            className="mx-12 md:mx-20 font-['Space_Grotesk'] font-black text-base uppercase tracking-[0.2em] text-[#1a1a1a] opacity-60 hover:opacity-100 transition-opacity cursor-default"
          >
            {sponsor}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sponsor;

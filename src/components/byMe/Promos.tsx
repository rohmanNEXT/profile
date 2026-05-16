'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Promos Component (React.FC)
 * Displays a grid of promotional deals for stays.
 * Modularized for better maintainability.
 */
const Promos: React.FC = () => {
  const router = useRouter();
  const PROMO_DATA = [
    {
      id: 1,
      title: "Luxury Villas",
      discount: "-30%",
      bgColor: "bg-[#e63b2e]",
      textColor: "text-white",
      badgeColor: "bg-[#ffcc00]",
      validity: "Valid until Dec 31",
      rotate: "rotate-12",
      type: 'hotels'
    },
    {
      id: 2,
      title: "City Hotels",
      discount: "-20%",
      bgColor: "bg-[#0055ff]",
      textColor: "text-white",
      badgeColor: "bg-[#ffcc00]",
      validity: "Valid until Nov 15",
      rotate: "-rotate-12",
      type: 'hotels'
    },
    {
      id: 3,
      title: "Beach Resorts",
      discount: "-40%",
      bgColor: "bg-[#eee9e0]",
      textColor: "text-black",
      badgeColor: "bg-[#e63b2e]",
      validity: "Flash Sale",
      rotate: "rotate-6",
      badgeTextColor: "text-white",
      type: 'hotels'
    },
    {
      id: 4,
      title: "Cabin Stays",
      discount: "1+1",
      bgColor: "bg-[#ffcc00]",
      textColor: "text-black",
      badgeColor: "bg-white",
      validity: "Weekend Special",
      rotate: "-rotate-6",
      type: 'hotels'
    }
  ];

  const handleClaim = (type: string) => {
    router.push(`/explore?type=${type}&promo=true`);
  };

  return (
    <section className="w-full mb-24 text-center">
      <h2 className="text-lg lg:text-xl font-black mb-8 text-center tracking-tight">Stay Promos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {PROMO_DATA.map((promo) => (
          <div 
            key={promo.id} 
            className={`${promo.bgColor} ${promo.textColor} border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_0px_#1a1a1a] p-6 relative overflow-hidden rounded-2xl`}
          >
            {/* Discount Badge */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${promo.badgeColor} rounded-full border-[3px] border-[#1a1a1a] flex items-center justify-center ${promo.rotate}`}>
              <span className={`font-black text-xl ${promo.badgeTextColor || 'text-black'}`}>{promo.discount}</span>
            </div>
            
            <h3 className="text-2xl font-black uppercase mb-2 relative z-10 w-3/4 leading-tight">{promo.title}</h3>
            <p className="font-bold text-sm mb-6 relative z-10 opacity-70">{promo.validity}</p>
            
            <button 
              onClick={() => handleClaim(promo.type)}
              className={`cursor-pointer font-bold uppercase px-4 py-2 border-[3px] border-[#1a1a1a] w-full transition-colors relative z-10 rounded-xl ${promo.bgColor === 'bg-[#ffcc00]' ? 'bg-white text-black hover:bg-black hover:text-white' : 'bg-white text-black hover:bg-[#ffcc00]'}`}
            >
              Claim Deal
            </button>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="mt-12 text-center">
        <Link 
          href="/promo" 
          className="inline-flex items-center gap-1 px-3 py-1 bg-white border-[1.5px] border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rounded-md text-[9px] font-black uppercase tracking-widest hover:bg-[#ffcc00] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none group"
        >
          Lihat lainnya
          <span className="material-symbols-outlined text-xs font-black group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
};

export default Promos;


'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const IMAGES = [
  "/images/bali.png",
  "/images/japan.png",
  "/images/korea.png",
  "/images/thailand.png"
];

export default function Hero() {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(0);
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/explore?type=trips${destination ? `&search=${encodeURIComponent(destination)}` : ''}`);
  };

  return (
    <section className="w-full mb-24 font-['Inter']">
      <div className="relative h-[550px] w-full border-[3px] border-[#1a1a1a] shadow-[8px_8px_0px_0px_#1a1a1a] bg-[#f5f0e8] overflow-hidden rounded-[2rem]">
        {/* Background Carousel */}
        {IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img 
              src={img} 
              alt="Hero" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
        ))}

        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white/90 uppercase tracking-tighter mb-4 leading-none" style={{ textShadow: '4px 4px 0px #1a1a1a' }}>
            Discover Your<br/><span className="text-[#ffcc00]/90">Next Journey.</span>
          </h1>
          <p className="text-white/90 font-bold uppercase text-xs tracking-[0.3em] mb-8">Premium Travel Experiences 2026</p>
          
          {/* Compact Search Box */}
          <div className="bg-white/90 backdrop-blur-2xl border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_0px_#1a1a1a] p-5 max-w-4xl w-full rounded-2xl">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 text-left border-r-0 md:border-r-2 border-black/10 pr-0 md:pr-4">
                <label className="mb-2 block text-[10px] font-black uppercase text-black tracking-wider">Destination</label>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-sm mr-2 text-[#0055ff]">public</span>
                  <input 
                    className="w-full bg-transparent border-none focus:ring-0 p-0 font-black text-sm placeholder:text-black/40 text-black uppercase outline-none" 
                    placeholder="Where to?" 
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 text-left border-r-0 md:border-r-2 border-black/10 pr-0 md:pr-4">
                <label className="mb-2 block text-[10px] font-black uppercase text-black tracking-wider">Guests</label>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-sm mr-2 text-[#ff4433]">group</span>
                  <input className="w-full bg-transparent border-none focus:ring-0 p-0 font-black text-sm placeholder:text-black/40 text-black uppercase outline-none" placeholder="How many?" type="text"/>
                </div>
              </div>
              <div className="flex-1 text-left">
                <label className="mb-2 block text-[10px] font-black uppercase text-black tracking-wider">Date</label>
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-sm mr-2 text-[#da9710d4]">calendar_month</span>
                  <input className="w-full bg-transparent border-none focus:ring-0 p-0 font-black text-sm placeholder:text-black/40 text-black uppercase outline-none" placeholder="When?" type="text"/>
                </div>
              </div>
              <button 
                type="submit"
                className="bg-[#ffcc00]/90 text-black font-black uppercase px-8 py-3 border-[3px] border-black shadow-[4px_4px_0px_0px_#1a1a1a] hover:bg-black hover:text-white transition-all rounded-xl text-xs cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
}

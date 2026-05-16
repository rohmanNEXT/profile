'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const IMAGES = [
  "/images/bali.png",
  "/images/japan.png",
  "/images/korea.png",
  "/images/thailand.png"
];

const POPULAR_DESTINATIONS = [
  { name: "Bandung", province: "West Java, Indonesia", hotels: "4.873 hotels", type: "City" },
  { name: "Yogyakarta", province: "Special Region of Yogyakarta, Indonesia", hotels: "3.333 hotels", type: "City" },
  { name: "Kuala Lumpur", province: "Malaysia", hotels: "6.122 hotels", type: "City" },
  { name: "Tokyo", province: "Kanto, Japan", hotels: "6.268 hotels", type: "City" },
  { name: "Jakarta", province: "Indonesia", hotels: "9.665 hotels", type: "Region" },
];

export default function Hero1() {
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  // State for popups
  const [activePopup, setActivePopup] = useState<'destination' | 'dates' | 'guests' | null>(null);
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 5000);

    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setActivePopup(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/explore');
  };

  return (
    <section className="w-full mb-24 font-['Inter'] relative">
      <div className="relative h-[550px] w-full border-[3px] border-[#1a1a1a] shadow-[8px_8px_0px_0px_#1a1a1a] bg-[#f5f0e8] rounded-[2rem]">
        {/* Background Carousel Wrapper (with overflow-hidden) */}
        <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
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
        </div>

        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white/90 uppercase tracking-tighter mb-4 leading-none" style={{ textShadow: '4px 4px 0px #1a1a1a' }}>
            Discover Your<br/><span className="text-[#ffcc00]/90">Next Journey.</span>
          </h1>
          <p className="text-white/90 font-bold uppercase text-xs tracking-[0.3em] mb-8">Premium Travel Experiences 2026</p>
          
          {/* Compact Search Box */}
          <div className="bg-white/90 backdrop-blur-2xl border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_0px_#1a1a1a] p-5 max-w-4xl w-full rounded-2xl mx-4 relative" ref={popupRef}>
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              {/* Destination Input */}
              <div 
                className="flex-1 text-left border-r border-black/10 pr-4 cursor-pointer relative flex flex-col justify-center"
                onClick={() => setActivePopup('destination')}
              >
                <label className="mb-1 block text-[9px] font-bold uppercase text-black/40 tracking-wider">Destination</label>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-[#0194f3]">location_on</span>
                  <span className="font-bold text-sm text-black truncate">
                    {destination || "Where to?"}
                  </span>
                </div>

                {/* Destination Popup */}
                {activePopup === 'destination' && (
                  <div className="absolute top-full left-0 mt-4 w-[350px] bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_black] rounded-2xl z-[100] text-left overflow-hidden">
                    <div className="p-4 border-b-2 border-black/5 bg-[#f5f0e8]/30">
                       <button className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-black bg-white hover:bg-[#ffcc00] transition-colors group">
                         <span className="material-symbols-outlined text-[#0055ff] font-black">my_location</span>
                         <span className="text-xs font-black uppercase tracking-tight">Near me</span>
                       </button>
                    </div>
                    <div className="p-4">
                      <h4 className="text-[10px] font-black uppercase opacity-40 mb-4 tracking-widest">Popular Destinations</h4>
                      <div className="space-y-4">
                        {POPULAR_DESTINATIONS.map((dest, i) => (
                          <div 
                            key={i} 
                            className="flex justify-between items-start cursor-pointer hover:bg-stone-50 p-2 rounded-lg transition-colors group"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDestination(dest.name);
                              setActivePopup(null);
                            }}
                          >
                            <div className="flex flex-col">
                              <span className="font-black text-sm uppercase group-hover:text-[#0055ff] transition-colors">{dest.name}</span>
                              <span className="text-[10px] font-bold opacity-50 uppercase">{dest.province}</span>
                            </div>
                            <div className="text-right flex flex-col items-end">
                              <span className="bg-blue-50 text-blue-600 text-[8px] font-black px-2 py-0.5 rounded uppercase border border-blue-200">{dest.type}</span>
                              <span className="text-[9px] font-bold opacity-40 mt-1 uppercase">{dest.hotels}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Guests Input */}
              <div 
                className="flex-1 text-left border-r border-black/10 px-4 cursor-pointer relative flex flex-col justify-center"
                onClick={() => setActivePopup('guests')}
              >
                <label className="mb-1 block text-[9px] font-bold uppercase text-black/40 tracking-wider">Guests & Rooms</label>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-[#0194f3]">group</span>
                  <span className="font-bold text-sm text-black truncate">
                    {guests.adults} Adult(s), {guests.children} Child, {guests.rooms} Room
                  </span>
                </div>

                {/* Guests Popup */}
                {activePopup === 'guests' && (
                  <div className="absolute top-full left-0 mt-4 w-[300px] bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_black] rounded-2xl z-[100] p-6 space-y-6 text-left">
                    {[
                      { label: "Adult", key: "adults", icon: "person" },
                      { label: "Children", key: "child_care", icon: "child_care" },
                      { label: "Room", key: "room", icon: "meeting_room" }
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-blue-500 font-black">{item.icon}</span>
                          <span className="font-black text-sm uppercase tracking-tight">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button 
                            className="w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center font-black hover:bg-stone-100 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              const k = item.label === "Adult" ? "adults" : item.label === "Children" ? "children" : "rooms";
                              setGuests({ ...guests, [k]: Math.max(k === "rooms" || k === "adults" ? 1 : 0, guests[k as keyof typeof guests] - 1) });
                            }}
                          >
                            -
                          </button>
                          <span className="font-black text-sm w-4 text-center">{item.label === "Adult" ? guests.adults : item.label === "Children" ? guests.children : guests.rooms}</span>
                          <button 
                            className="w-8 h-8 rounded-lg border-2 border-black bg-blue-50 text-blue-600 flex items-center justify-center font-black hover:bg-blue-100 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              const k = item.label === "Adult" ? "adults" : item.label === "Children" ? "children" : "rooms";
                              setGuests({ ...guests, [k]: guests[k as keyof typeof guests] + 1 });
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                    <button 
                      className="w-full bg-[#0194f3] text-white py-3 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_0px_black] font-black uppercase text-xs mt-4 hover:bg-black transition-all"
                      onClick={(e) => { e.stopPropagation(); setActivePopup(null); }}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Dates Input */}
              <div 
                className="flex-1 text-left pl-4 cursor-pointer relative flex flex-col justify-center"
                onClick={() => setActivePopup('dates')}
              >
                <label className="mb-1 block text-[9px] font-bold uppercase text-black/40 tracking-wider">Stay Date</label>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg text-[#0194f3]">calendar_today</span>
                  <span className="font-bold text-sm text-black truncate">01 May 2026 - 02 May 2026</span>
                </div>

                {/* Date Popup (Simplified Calendar Style) */}
                {activePopup === 'dates' && (
                  <div className="absolute top-full right-0 mt-4 w-[600px] bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_black] rounded-2xl z-[100] p-8 text-left">
                    <div className="flex justify-between items-center mb-8">
                      <h4 className="text-xl font-black uppercase tracking-tighter italic">Stay Date</h4>
                      <div className="flex gap-12">
                        <div>
                          <p className="text-[8px] font-black uppercase opacity-40 mb-1">Check-In</p>
                          <p className="text-xs font-black uppercase">Fri, 01 May 2026</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black uppercase opacity-40 mb-1">Check-Out</p>
                          <p className="text-xs font-black uppercase">Sat, 02 May 2026</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-12">
                      {[
                        { month: "April 2026", days: 30, start: 2 },
                        { month: "May 2026", days: 31, start: 4 }
                      ].map((cal, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-black text-sm uppercase tracking-tight">{cal.month}</span>
                            <div className="flex gap-2">
                              <span className="material-symbols-outlined text-sm font-black cursor-pointer opacity-30 hover:opacity-100 transition-opacity">chevron_left</span>
                              <span className="material-symbols-outlined text-sm font-black cursor-pointer opacity-30 hover:opacity-100 transition-opacity">chevron_right</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                              <span key={d} className={`text-[8px] font-black uppercase opacity-40 mb-2 ${d === 'Sun' ? 'text-red-500' : ''}`}>{d}</span>
                            ))}
                            {[...Array(cal.start)].map((_, i) => <div key={`empty-${i}`} />)}
                            {[...Array(cal.days)].map((_, i) => {
                              const day = i + 1;
                              const isSelected = cal.month === "May 2026" && (day === 1 || day === 2);
                              const isRange = cal.month === "May 2026" && day === 1.5; // Mock range
                              
                              return (
                                <div 
                                  key={day} 
                                  className={`aspect-square flex items-center justify-center text-[10px] font-bold rounded-lg cursor-pointer transition-all border-2 border-transparent
                                    ${isSelected ? 'bg-[#0194f3] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'hover:border-black/10 hover:bg-stone-50'}
                                    ${cal.month === 'May 2026' && day > 20 ? 'text-red-500' : ''}
                                  `}
                                >
                                  {day}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="bg-[#ffcc00]/90 text-black font-black uppercase px-8 py-3 border-[3px] border-black shadow-[4px_4px_0px_0px_#1a1a1a] hover:bg-black hover:text-white transition-all rounded-xl text-xs cursor-pointer" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

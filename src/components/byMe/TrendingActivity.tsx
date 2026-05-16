'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ACTIVITIES = [
  { id: 1, title: "Snow World Trip 1", location: "Tamalate", price: 86130, oldPrice: 225000, rating: "9.1", reviews: "1.2k", image: "/images/bali.png", save: "75%" },
  { id: 2, title: "Water Fun Trip 2", location: "Plaju", price: 32000, oldPrice: 40000, rating: "8.8", reviews: "9.2k", image: "/images/thailand.png", save: "20%" },
  { id: 3, title: "Funland Trip 3", location: "Berastagi", price: 105600, oldPrice: 110000, rating: "9.2", reviews: "11.1k", image: "/images/japan.png", save: "5%" },
  { id: 4, title: "Ballet Trip 4", location: "Kalasan", price: 142270, oldPrice: 150000, rating: "9.4", reviews: "107k", image: "/images/korea.png", save: "5%" },
  { id: 5, title: "Adventure Trip 5", location: "Ubud", price: 95000, oldPrice: 120000, rating: "9.0", reviews: "2.5k", image: "/images/bali.png", save: "20%" },
  { id: 6, title: "Safari Trip 6", location: "Cisarua", price: 180000, oldPrice: 200000, rating: "9.5", reviews: "15k", image: "/images/thailand.png", save: "10%" },
  { id: 7, title: "Beach Trip 7", location: "Kuta", price: 45000, oldPrice: 60000, rating: "8.7", reviews: "8k", image: "/images/japan.png", save: "25%" },
  { id: 8, title: "Mountain Trip 8", location: "Lembang", price: 75000, oldPrice: 90000, rating: "9.1", reviews: "5k", image: "/images/korea.png", save: "15%" },
  { id: 9, title: "City Trip 9", location: "Jakarta", price: 55000, oldPrice: 70000, rating: "8.9", reviews: "10k", image: "/images/bali.png", save: "20%" },
  { id: 10, title: "Lake Trip 10", location: "Toba", price: 120000, oldPrice: 150000, rating: "9.3", reviews: "3k", image: "/images/thailand.png", save: "20%" },
  { id: 11, title: "History Trip 11", location: "Solo", price: 35000, oldPrice: 50000, rating: "9.0", reviews: "4k", image: "/images/japan.png", save: "30%" },
  { id: 12, title: "Food Trip 12", location: "Bandung", price: 65000, oldPrice: 80000, rating: "9.2", reviews: "12k", image: "/images/korea.png", save: "15%" },
  { id: 13, title: "River Trip 13", location: "Banjarmasin", price: 85000, oldPrice: 100000, rating: "8.8", reviews: "1k", image: "/images/bali.png", save: "15%" },
];

export default function TrendingActivity() {
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Attraction");
  const itemsPerPage = 4;
  const totalPages = 4;

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  const displayedItems = [...ACTIVITIES, { type: 'see-all' }].slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const categories = ["Attraction", "Tour", "Playground", "Beauty and Spa"];

  return (
    <section className="w-full mb-32 font-['Inter'] relative">
      <div className="text-center mb-12 relative">
        <h2 className="text-2xl md:text-3xl font-black text-[#1a1a1a] tracking-tight">Trending Activity</h2>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 cursor-pointer border-2 border-black shadow-[3px_3px_0px_0px_#000] font-black text-sm uppercase rounded-xl transition-all ${activeCategory === cat ? 'bg-[#ffcc00] text-black' : 'bg-white text-[#1a1a1a] hover:bg-gray-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Navigation Buttons (Pinned to the edges of the grid container) */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between z-40 pointer-events-none">
          <button onClick={prevPage} className="pointer-events-auto w-8 h-8 flex items-center justify-center rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] text-black hover:bg-[#ffcc00] transition-all">
            <span className="material-symbols-outlined font-black text-base">chevron_left</span>
          </button>
          <button onClick={nextPage} className="pointer-events-auto w-8 h-8 flex items-center justify-center rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_0px_#000] text-black hover:bg-[#ffcc00] transition-all">
            <span className="material-symbols-outlined font-black text-base">chevron_right</span>
          </button>
        </div>

        {/* Grid Container with generous padding to clear buttons and stay in margin */}
        <div className="px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {displayedItems.map((item: any, i) => (
              item.type === 'see-all' ? (
                <Link key="see-all" href="/explore?type=trips" className="h-[400px] block">
                  <div className="bg-[#ffcc00] border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_0px_#1a1a1a] flex flex-col items-center justify-center h-full group cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-2xl">
                    <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_#000] mb-4">
                      <span className="material-symbols-outlined text-3xl font-black">grid_view</span>
                    </div>
                    <p className="font-black text-black text-xl uppercase">See All</p>
                    <p className="text-black/60 text-xs font-black mt-1 uppercase">Discover More</p>
                  </div>
                </Link>
              ) : (
                <Link key={item.id} href={`/explore/${item.id}?type=trips`} className="h-[400px] block">
                  <div className="bg-white border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_0px_#1a1a1a] flex flex-col h-full group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-2xl overflow-hidden cursor-pointer">
                    <div className="relative h-46 overflow-hidden rounded-t-xl">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                      <div className="absolute top-2 left-2 bg-[#ff6868] text-white border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[12px] fill-current align-middle">location_on</span> {item.location}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-[#ff6b00] text-white border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase">
                        Save {item.save}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col bg-[#fff]">
                      <h3 className="font-black text-[#1a1a1a] text-lg leading-tight mb-2 uppercase">{item.title}</h3>
                      <div className="flex items-center gap-1 mb-4">
                        <span className="text-[#0194f3] font-black text-xs">{item.rating}/10</span>
                        <span className="text-gray-400 text-[10px] font-bold">• {item.reviews} reviews</span>
                      </div>
                      <div className="mt-auto pt-4 border-t-2 border-gray-100">
                        <p className="text-gray-400 text-xs font-bold line-through">Rp {item.oldPrice.toLocaleString()}</p>
                        <p className="text-[#ff6b00] font-black text-2xl leading-none">Rp {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


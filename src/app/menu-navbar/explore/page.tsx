"use client";

import Image from "next/image";
import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";
import { useSettingsStore, Currency } from "@/store/settingsStore";
import Hero2 from "@/components/byMe/Hero2";

interface Item {
  id: string;
  title: string;
  deskripsi: string;
  fasilitas: string[];
  "kategori kelebihan": string;
  biaya: number;
  promo: boolean;
  rating: number;
  komentar: { user: string; text: string; rating: number }[];
  daerah: string;
  guest: number;
  "start-date": string;
  "end-date": string;
  img: string;
  images: string[];
  "kategory daerah": string;
  category?: string;
  isPopular?: boolean;
}

const exchangeRates: Record<Currency, number> = {
  IDR: 1,
  USD: 16000,
  SGD: 12000,
  JPY: 105,
  KRW: 12,
  EUR: 17000
};

const currencySymbols: Record<Currency, string> = {
  IDR: "Rp",
  USD: "$",
  SGD: "S$",
  JPY: "¥",
  KRW: "₩",
  EUR: "€"
};

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeParam = (searchParams.get("type") as "trips" | "hotels" | "restaurants") || "trips";
  
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter States
  const [minRating, setMinRating] = useState(0);
  const [promoOnly, setPromoOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  
  const { currency } = useSettingsStore();

  const convertPrice = (priceInIdr: number) => {
    return priceInIdr / exchangeRates[currency];
  };

  const formatPrice = (priceInIdr: number) => {
    const converted = convertPrice(priceInIdr);
    return `${currencySymbols[currency]} ${converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    promo: true,
    stars: true,
    facilities: true
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch items based on type, search, and pagination
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const endpointMap: Record<string, string> = {
          trips: 'travel',
          hotels: 'traveller',
          restaurants: 'restaurants'
        };
        const dbType = endpointMap[typeParam] || typeParam;
        const response = await api.get(`/${dbType}`);
        let filtered: Item[] = response.data;

        
        if (debouncedSearch) {
          filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            item.daerah.toLowerCase().includes(debouncedSearch.toLowerCase())
          );
        }
        
        if (promoOnly) {
          filtered = filtered.filter(item => item.promo);
        }
        
        if (minRating > 0) {
          filtered = filtered.filter(item => item.rating >= minRating);
        }
  
        // Sorting
        if (sortBy === "price_low") {
          filtered = [...filtered].sort((a, b) => a.biaya - b.biaya);
        } else if (sortBy === "popularity") {
          filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        }
  
        setTotalItems(filtered.length);
        setItems(filtered.slice((currentPage - 1) * limit, currentPage * limit));
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItems();
  }, [currentPage, debouncedSearch, typeParam, minRating, promoOnly, limit, sortBy]);

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="max-w-[1440px] mx-auto px-6 pt-6 pb-20 font-['Inter']">
      
      {/* Hero / Header with Compact Search Bar */}
      <Hero2 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        guests={2} 
      />

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
        {/* Sidebar Filters - Filter 1 */}
        <aside className="lg:col-span-3 space-y-6">
          
          <div className="bg-white border-[3px] border-black p-5 rounded-2xl shadow-[6px_6px_0px_0px_black]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black uppercase tracking-tight">Search Type</h3>
            </div>
            <div className="flex flex-col gap-2">
              {["trips", "hotels", "restaurants"].map((t) => (
                <button
                  key={t}
                  onClick={() => router.push(`/explore?type=${t}`)}
                  className={`px-4 py-2 rounded-xl border-2 border-black font-black text-[11px] uppercase transition-all ${typeParam === t ? 'bg-[#ffcc00] shadow-[3px_3px_0px_0px_black]' : 'bg-white hover:bg-stone-50'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {[
            { title: "Exclusive Offers", key: "promo", options: ["Promo Only"] },
            { title: "Star Rating", key: "stars", options: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"], isStar: true }
          ].map((section, idx) => {
            const isExpanded = expandedSections[section.key];
            return (
              <div key={idx} className="bg-white border-[3px] border-black p-5 rounded-2xl shadow-[6px_6px_0px_0px_black]">
                <div 
                  onClick={() => setExpandedSections(prev => ({ ...prev, [section.key]: !isExpanded }))}
                  className="flex justify-between items-center mb-0 cursor-pointer group"
                >
                  <h3 className="text-sm font-black uppercase tracking-tight group-hover:text-blue-600 transition-colors">{section.title}</h3>
                  <span className="material-symbols-outlined text-blue-600 bg-blue-50 rounded-full p-0.5 text-lg transition-transform duration-300">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
                
                {isExpanded && (
                  <div className="space-y-3 pt-5">
                    {section.options.map((opt, i) => {
                      let isChecked = false;
                      if (section.key === "promo") isChecked = promoOnly;
                      if (section.key === "stars") isChecked = minRating === (5 - i);
                      
                      return (
                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={isChecked}
                            onChange={() => {
                              if (section.key === "promo") setPromoOnly(!promoOnly);
                              if (section.key === "stars") setMinRating(isChecked ? 0 : 5 - i);
                              setCurrentPage(1);
                            }}
                            className="w-5 h-5 border-2 border-black rounded-md accent-[#ffcc00]"
                          />
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${isChecked ? 'text-black font-black' : 'opacity-60 group-hover:opacity-100'}`}>
                              {opt}
                            </span>
                            {section.isStar && (
                              <div className="flex">
                                {[...Array(5 - i)].map((_, s) => (
                                  <span key={s} className="material-symbols-outlined text-[10px] text-[#ffcc00] fill-current">star</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

        </aside>

        <div className="lg:col-span-9">
          {/* Sort & View Control */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white border-[3px] border-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_black]">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase opacity-40">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="bg-blue-50 border-2 border-black px-4 py-2 rounded-full font-black text-[11px] uppercase outline-none text-blue-700 cursor-pointer"
              >
                <option value="popularity">Highest Rating</option>
                <option value="price_low">Lowest Price</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="flex border-2 border-black rounded-full p-1 bg-stone-50">
                  <button onClick={() => setViewType("grid")} className={`p-1.5 rounded-full ${viewType === "grid" ? "bg-white shadow-md text-blue-600 border border-black/5" : "opacity-30"}`}>
                    <span className="material-symbols-outlined text-lg">grid_view</span>
                  </button>
                  <button onClick={() => setViewType("list")} className={`p-1.5 rounded-full ${viewType === "list" ? "bg-white shadow-md text-blue-600 border border-black/5" : "opacity-30"}`}>
                    <span className="material-symbols-outlined text-lg">view_list</span>
                  </button>
               </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border-[3px] border-black rounded-3xl h-[220px] animate-pulse shadow-[8px_8px_0px_0px_black]" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white border-[3px] border-black p-20 text-center rounded-2xl shadow-[6px_6px_0px_0px_black]">
               <span className="material-symbols-outlined text-5xl mb-3">search_off</span>
               <h3 className="text-xl font-black uppercase mb-1">No Results Found</h3>
               <p className="text-[10px] font-bold opacity-60 uppercase">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className={viewType === "list" ? "flex flex-col gap-6" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"}>
              {items.map((item) => (
                <Link key={item.id} href={`/explore/${item.id}`} className="block group">
                  <article className={`bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_black] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[16px_16px_0px_0px_black] rounded-3xl overflow-hidden flex ${viewType === "list" ? "flex-col md:flex-row" : "flex-col h-full"}`}>
                    <div className={`${viewType === "list" ? "w-full md:w-80 h-64 md:h-auto" : "h-48"} relative border-black ${viewType === "list" ? "md:border-r-[3px] border-b-[3px] md:border-b-0" : "border-b-[3px]"}`}>
                      <Image src={item.img} alt={item.title} fill style={{ objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-500" />
                      {item.promo && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_black]">PROMO</div>
                      )}
                    </div>
                    
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black uppercase leading-tight font-['Space_Grotesk'] group-hover:text-blue-600 transition-colors">{item.title}</h3>
                        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">
                          <span className="material-symbols-outlined text-sm text-blue-600 fill-current">star</span>
                          <span className="text-xs font-black text-blue-700">{item.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-stone-500 mb-4">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        <p className="text-[10px] font-bold uppercase tracking-tight">{item.daerah}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                         {item.fasilitas.slice(0, 3).map((f, i) => (
                           <span key={i} className="text-[9px] font-bold uppercase bg-stone-100 text-stone-600 px-2.5 py-1 rounded-lg border border-black/5">{f}</span>
                         ))}
                         <span className="text-[9px] font-bold uppercase bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg border border-blue-100">{item["kategori kelebihan"]}</span>
                      </div>

                      <div className="mt-auto pt-4 border-t-2 border-black/5 flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-black uppercase opacity-40">Starts from</p>
                          <p className="text-2xl font-black text-red-600 font-['Space_Grotesk']">{formatPrice(item.biaya)}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_black]">
                          <span className="material-symbols-outlined">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border-[3px] border-black bg-white hover:bg-[#ffcc00] font-black disabled:opacity-30 transition-all rounded-lg shadow-[3px_3px_0px_0px_black]"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center border-[3px] border-black font-black transition-all rounded-lg shadow-[3px_3px_0px_0px_black] ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-white'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border-[3px] border-black bg-white hover:bg-[#ffcc00] font-black disabled:opacity-30 transition-all rounded-lg shadow-[3px_3px_0px_0px_black]"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div> 
  );
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a1a1a] font-['Inter']">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <ExploreContent />
      </Suspense>
    </div>
  );
}

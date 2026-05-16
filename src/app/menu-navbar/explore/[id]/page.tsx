"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/lib/axios";
import Link from "next/link";

import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

interface Item {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  category?: string;
  isPromo?: boolean;
  isPopular?: boolean;
}

function DetailContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const type = (searchParams.get("type") as "trips" | "hotels" | "restaurants") || "trips";
  
  const { user, setAuthModal } = useAuthStore();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      try {
        const endpointMap: Record<string, string> = {
          trips: 'travel',
          hotels: 'traveller',
          restaurants: 'restaurants'
        };
        const dbType = endpointMap[type] || type;
        const res = await api.get(`/${dbType}/${id}`);
        setItem(res.data);
      } catch (err) {

        console.error("Fetch Error:", err);
        setItem(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [id, type]);

  const handleBook = async () => {
    if (!user) {
      setAuthModal(true, 'login', `/checkout/${id}?type=${type}`);
      toast.error("Please login to book this trip");
      return;
    }

    router.push(`/checkout/${id}?type=${type}`);
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <div className="w-20 h-20 border-[6px] border-black border-t-[#ffcc00] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f0e8] p-6 text-center">
        <div className="bg-white border-[6px] border-black p-12 rounded-3xl shadow-[12px_12px_0px_0px_black] max-w-lg">
          <span className="material-symbols-outlined text-8xl mb-6 text-[#e63b2e]">error</span>
          <h1 className="text-4xl font-black uppercase mb-4">Item Not Found</h1>
          <p className="font-bold text-stone-500 mb-8 uppercase tracking-widest">The destination you're looking for doesn't exist or has been moved.</p>
          <Link href="/explore" className="inline-block bg-black text-white px-8 py-4 font-black uppercase rounded-xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffcc00] hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] pb-16 text-black font-['Inter'] relative">
      
      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-100 bg-black/90 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
          {/* Modal Header */}
          <header className="bg-white border-b-4 border-black p-4 flex justify-between items-center shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-sm md:text-lg font-black uppercase tracking-tight">{item.title}</h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => { setShowGallery(false); handleBook(); }}
                className="bg-[#ffcc00] border-[2.5px] border-black px-6 py-2 rounded-lg font-black uppercase text-[10px] shadow-[4px_4px_0px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Book Now
              </button>
              <button 
                onClick={() => setShowGallery(false)}
                className="w-10 h-10 flex items-center justify-center bg-white border-[2.5px] border-black rounded-lg hover:bg-stone-50 transition-colors"
              >
                <span className="material-symbols-outlined font-black">close</span>
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-hidden flex">
            {/* Image Grid */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {item.images?.map((img, i) => (
                  <div key={i} className="aspect-video relative border-[3px] border-black rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-zoom-in shadow-[6px_6px_0px_0px_black]">
                    <Image src={img} alt={`Gallery ${i}`} fill style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Sidebar */}
            <aside className="hidden lg:block w-96 bg-white border-l-4 border-black p-8 overflow-y-auto">
              <div className="bg-[#4a72b2] text-white p-4 rounded-xl flex items-center justify-between mb-8 shadow-[6px_6px_0px_0px_black]">
                <div>
                  <h3 className="font-black text-xl leading-none">8,8</h3>
                  <p className="text-[10px] font-bold uppercase opacity-80 mt-1">Hebat</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase">1.042 ulasan</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="font-black uppercase text-sm mb-4 border-b-2 border-black pb-1">Rating Terbaik</h4>
                  <p className="text-sm font-medium text-stone-500 leading-relaxed italic">
                    "Saya suka segalanya tentang tempat ini. Kamarnya bersih dan luas, tempat tidurnya nyaman, suasananya sangat menenangkan. Sarapan dan makan malamnya juga enak."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-xs">N</div>
                    <div>
                      <p className="text-[10px] font-black uppercase">Ngan • Vietnam</p>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-black/5 pt-8">
                  <p className="text-sm font-medium text-stone-500 leading-relaxed">
                    "{item.title} adalah hotel bintang 10+. Seluruh resor sangat bersih dan staf selalu sangat perhatian dan membantu. Tempat ini benar-benar luar biasa."
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-6 py-6">
        
        {/* Navigation & Action */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 font-black uppercase text-[9px] tracking-widest hover:translate-x-[-2px] transition-all">
            <span className="material-symbols-outlined text-xs">arrow_back</span>
            Back to {type}
          </button>
          <button className="bg-white border-2 border-black px-4 py-2 rounded-lg font-black uppercase text-[9px] tracking-widest flex items-center gap-2 shadow-[3px_3px_0px_0px_black] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95">
            <span className="material-symbols-outlined text-xs text-[#e63b2e]">favorite</span>
            Save
          </button>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-10 h-[450px]">
          <div 
            onClick={() => setShowGallery(true)}
            className="lg:col-span-2 relative border-[3px] border-black rounded-2xl overflow-hidden group cursor-pointer"
          >
            <Image 
              src={item.images?.[0] || item.image} 
              alt={item.title} 
              fill 
              style={{ objectFit: 'cover' }} 
              className="group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded font-black text-[10px] border border-white/20">
              1 / 3
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-3">
             <div 
               onClick={() => setShowGallery(true)}
               className="flex-1 relative border-[3px] border-black rounded-2xl overflow-hidden cursor-pointer"
             >
                <Image src={item.images?.[1] || item.image} alt="Gallery 2" fill style={{ objectFit: 'cover' }} />
             </div>
             <div 
               onClick={() => setShowGallery(true)}
               className="flex-1 relative border-[3px] border-black rounded-2xl overflow-hidden group cursor-pointer"
             >
                <Image src={item.images?.[2] || item.image} alt="Gallery 3" fill style={{ objectFit: 'cover' }} className="brightness-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest border-b-2 border-[#ffcc00] pb-0.5">View All</span>
                </div>
             </div>
          </div>
        </div>

        {/* Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Side: Info */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Title & Stats */}
            <div className="border-b-[3px] border-black pb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#ffcc00] fill-current text-sm">star</span>
                  <span className="text-xs font-black">{item.rating}</span>
                  <span className="text-stone-400 text-[10px] font-bold">({item.reviews})</span>
                </div>
                <span className="text-stone-300">•</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-stone-400 text-sm">location_on</span>
                  <span className="font-black uppercase text-[9px] tracking-widest">{item.location}</span>
                </div>
              </div>
              
              <div className="pl-4 border-l-4 border-[#ffcc00] space-y-3">
                <h2 className="text-xl font-black uppercase leading-tight italic max-w-xl">
                  {item.description.split('.')[0]}. Geometric luxury & comfort.
                </h2>
                <p className="text-stone-500 font-medium leading-relaxed text-sm max-w-xl">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Popular Facilities Section */}
            <section className="bg-white border-[3px] border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_black]">
              <h3 className="text-xl font-black uppercase mb-8 border-b-[3px] border-[#ffcc00] inline-block pb-1">Most Popular Facilities</h3>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {[
                  { icon: "pool", label: "Outdoor Pool" },
                  { icon: "wifi", label: "Free WiFi" },
                  { icon: "airport_shuttle", label: "Airport Transfer" },
                  { icon: "spa", label: "Spa & Wellness" },
                  { icon: "smoke_free", label: "Non-smoking Rooms" },
                  { icon: "local_parking", label: "Free Parking" },
                  { icon: "restaurant", label: "Restaurant" },
                  { icon: "coffee_maker", label: "Tea/Coffee Maker" },
                  { icon: "local_bar", label: "Bar" },
                  { icon: "breakfast_dining", label: "Excellent Breakfast" }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 group cursor-default">
                    <span className="material-symbols-outlined text-green-700 text-xl group-hover:scale-110 transition-transform">{f.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-tight opacity-70 group-hover:opacity-100">{f.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Room Types Table */}
            <section className="bg-white border-[3px] border-black rounded-3xl shadow-[8px_8px_0px_0px_black] overflow-hidden">
               <div className="bg-[#4a72b2] text-white p-4 grid grid-cols-6 font-black uppercase text-[10px] tracking-widest border-b-[3px] border-black">
                 <div className="col-span-3">Room Type</div>
                 <div className="col-span-2 text-center">Sleeps</div>
                 <div className="text-right">Action</div>
               </div>
               <div className="divide-y-2 divide-black/10">
                 {[
                   { name: "Cottage 1 Bedroom", beds: "2 single or 1 super-king", icons: ["person", "person", "add", "person"] },
                   { name: "Vila", beds: "1 super-king", icons: ["person", "person", "add", "person"] },
                   { name: "Vila Suite", beds: "1 super-king", icons: ["person", "person", "add", "person"] }
                 ].map((room, i) => (
                   <div key={i} className="p-4 grid grid-cols-6 items-center hover:bg-[#f5f0e8]/30 transition-colors">
                     <div className="col-span-3">
                       <h4 className="text-xs font-black uppercase text-blue-600 underline cursor-pointer">{room.name}</h4>
                       <div className="flex items-center gap-1 mt-1 opacity-50">
                         <span className="material-symbols-outlined text-xs">bed</span>
                         <p className="text-[8px] font-bold uppercase">{room.beds}</p>
                       </div>
                     </div>
                     <div className="col-span-2 flex justify-center gap-0.5">
                       {room.icons.map((icon, idx) => (
                         <span key={idx} className={`material-symbols-outlined text-sm ${icon === 'add' ? 'text-[8px] mt-1 opacity-40' : 'opacity-80'}`}>{icon}</span>
                       ))}
                       <span className="material-symbols-outlined text-[10px] mt-1 opacity-40 ml-1">info</span>
                     </div>
                     <div className="text-right">
                       <button className="bg-blue-600 text-white px-3 py-1.5 rounded font-black uppercase text-[8px] shadow-[2px_2px_0px_0px_black] hover:-translate-y-px hover:shadow-[3px_3px_0px_0px_black] transition-all">Show Price</button>
                     </div>
                   </div>
                 ))}
               </div>
            </section>

            {/* Stay Rules */}
            <section className="bg-white border-[3px] border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_black]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black uppercase">Stay Rules</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-black uppercase text-[9px] shadow-[3px_3px_0px_0px_black]">Check Availability</button>
              </div>
              
              <div className="space-y-6 divide-y divide-black/5">
                <div className="flex gap-8 pt-4">
                  <div className="flex items-center gap-2 w-48 shrink-0">
                    <span className="material-symbols-outlined opacity-60">login</span>
                    <span className="text-[10px] font-black uppercase">Check-in</span>
                  </div>
                  <div className="text-[10px] font-medium leading-relaxed opacity-60 uppercase tracking-tight">
                    From 14:00 to 22:00. Guests are required to show a photo identification and credit card upon check-in.
                  </div>
                </div>
                <div className="flex gap-8 pt-6">
                  <div className="flex items-center gap-2 w-48 shrink-0">
                    <span className="material-symbols-outlined opacity-60">logout</span>
                    <span className="text-[10px] font-black uppercase">Check-out</span>
                  </div>
                  <div className="text-[10px] font-medium opacity-60 uppercase tracking-tight">
                    Until 12:00
                  </div>
                </div>
                <div className="flex gap-8 pt-6">
                  <div className="flex items-center gap-2 w-48 shrink-0">
                    <span className="material-symbols-outlined opacity-60">info</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase leading-none">Cancellation /</span>
                      <span className="text-[10px] font-black uppercase mt-1">Prepayment</span>
                    </div>
                  </div>
                  <div className="text-[10px] font-medium opacity-60 uppercase tracking-tight">
                    Policies vary by room type. Please enter your dates to check policies.
                  </div>
                </div>
                <div className="flex gap-8 pt-6">
                  <div className="flex items-center gap-2 w-48 shrink-0">
                    <span className="material-symbols-outlined opacity-60">group</span>
                    <span className="text-[10px] font-black uppercase">Children & Beds</span>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase">Child Policy</h5>
                    <p className="text-[10px] font-medium opacity-60 uppercase leading-relaxed">
                      Children of any age are welcome. Children aged 16 years and above are considered adults at this property.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Property FAQ */}
            <section className="bg-white border-[3px] border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_black]">
              <h3 className="text-xl font-black uppercase mb-8">FAQ about {item.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  "What's the breakfast like at the property?",
                  "Does the property have a pool?",
                  "What type of room can I book?",
                  "When is check-in and check-out?",
                  "How much does it cost to stay?",
                  "Does it have an on-site restaurant?",
                  "What is there to do at the property?",
                  "How far is the property from the center?"
                ].map((q, i) => (
                  <div key={i} className="border-2 border-black/10 p-3 rounded-lg flex justify-between items-center group cursor-pointer hover:border-black transition-colors">
                    <span className="text-[9px] font-black uppercase tracking-tight opacity-70 group-hover:opacity-100">{q}</span>
                    <span className="material-symbols-outlined text-sm opacity-40 group-hover:opacity-100">expand_more</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Side: Sticky Booking */}
          <div className="lg:col-span-1 sticky top-28">
            <div className="bg-white border-[3px] border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_black]">
              <div className="flex items-baseline gap-1 mb-6 border-b-2 border-black pb-3">
                <span className="text-2xl font-black tracking-tighter">${item.price}</span>
                <span className="text-[9px] font-black uppercase text-stone-400">/ Night</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase tracking-widest opacity-60">Dates</label>
                  <div className="flex border-2 border-black rounded-lg overflow-hidden text-[10px]">
                    <input type="text" placeholder="10/15/2024" className="w-1/2 p-2 font-black border-r-2 border-black outline-none bg-[#f5f0e8]/30" />
                    <input type="text" placeholder="10/20/2024" className="w-1/2 p-2 font-black outline-none bg-[#f5f0e8]/30" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase tracking-widest opacity-60">Guests</label>
                  <div className="relative">
                    <select className="w-full bg-[#f5f0e8]/30 border-2 border-black p-2 rounded-lg font-black text-[10px] appearance-none outline-none">
                      <option>2 Adults, 0 Children</option>
                      <option>1 Adult, 0 Children</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-sm">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-8 border-t-2 border-black pt-6">
                <div className="flex justify-between text-[9px] font-bold">
                  <span className="text-stone-400">${item.price} x 3 nights</span>
                  <span className="font-black">${item.price * 3}</span>
                </div>
                <div className="flex justify-between text-[9px] font-bold">
                  <span className="text-stone-400">Fees & Taxes</span>
                  <span className="font-black">$155</span>
                </div>
                <div className="flex justify-between items-end pt-3 border-t border-black/10">
                  <span className="text-sm font-black uppercase">Total</span>
                  <span className="text-xl font-black">${(item.price * 3) + 155}</span>
                </div>
              </div>

              <button 
                onClick={handleBook}
                className="w-full bg-black text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-xs shadow-[4px_4px_0px_0px_rgba(255,204,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all active:scale-95 mb-3"
              >
                Book Now
              </button>
              <p className="text-center text-[8px] font-black uppercase opacity-40 italic">No charges yet</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function DetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <div className="w-20 h-20 border-[6px] border-black border-t-[#ffcc00] rounded-full animate-spin"></div>
      </div>
    }>
      <DetailContent />
    </Suspense>
  );
}
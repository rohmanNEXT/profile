import api from "@/lib/axios";
import TrendingActivity from "@/components/byMe/TrendingActivity";
import Footer from "@/components/byMe/Footer";
import Hero1 from "@/components/byMe/Hero1";
import FAQ from "@/components/byMe/FAQ";
import Sponsor from "@/components/byMe/Sponsor";
import Coupons from "@/components/byMe/Coupons";
import Promos from "@/components/byMe/Promos";

interface Trip {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
}

interface Coupon {
  id: string;
  code: string;
  discount: string;
}

// Local Image Data for Top Countries
const TOP_COUNTRIES_LOCAL = [
  { id: "c1", name: "Singapore", count: "644", image: "/images/singapore.png" },
  { id: "c2", name: "Malaysia", count: "8,371", image: "/images/malaysia.png" },
  { id: "c3", name: "Thailand", count: "27,449", image: "/images/thailand.png" },
  { id: "c4", name: "South Korea", count: "15,929", image: "/images/korea.png" },
  { id: "c5", name: "Japan", count: "28,141", image: "/images/japan.png" },
  { id: "c6", name: "Hong Kong", count: "960", image: "/images/hongkong.png" },
];

const SPONSORS = ["SkyAir", "WanderLodge", "ExoticTours", "NomadGear", "GlobeTrot"];

async function getData() {
  try {
    const [tripsRes, couponsRes] = await Promise.all([
      api.get('/trips?_limit=12'),
      api.get('/coupons')
    ]);
    return {
      trips: tripsRes.data,
      coupons: couponsRes.data
    };
  } catch (error) {
    console.error(error);
    return { 
      trips: [], 
      coupons: [
        { id: "f1", code: "FIRSTUSER", discount: "15% off" },
        { id: "f2", code: "BALCFRIDAY", discount: "$50 off" },
      ] 
    };
  }
}

export default async function HomePage() {
  const { coupons } = await getData();
  const movingSponsors = [...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS];

  return (
    <div className="flex flex-col font-['Inter'] antialiased">
      {/* Main Content */}
      <main className="flex-grow pt-1 pb-16">
        
        {/* 1. Hero Section (Dynamic Carousel & Compact UI) */}
        <Hero1 />

        {/* 2. Compact Sponsor Bar */}
        <Sponsor />

        {/* 3. Stay Promos */}
        <Promos />

        {/* 4. Top Countries to Explore */}
        <section className="w-full mb-24">
          <h2 className="text-2xl md:text-3xl font-black mb-12 text-center" style={{ textShadow: '2px 2px 0px #ffcc00' }}>Top Countries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_COUNTRIES_LOCAL.map((country) => (
              <div key={country.id} className="relative h-64 w-full rounded-2xl overflow-hidden group cursor-pointer border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_0px_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                <img 
                  src={country.image} 
                  alt={country.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
                <div className="relative z-10 p-6 text-white">
                  <h3 className="text-3xl font-black leading-none mb-1">{country.name}</h3>
                  <p className="text-sm font-medium opacity-90">{country.count} accommodations</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Trending Activity (Non-Overflow Grid Component) */}
        <TrendingActivity />

        {/* 6. Available Coupons */}
        <Coupons coupons={coupons} />

        {/* 7. USP Section (Clean & Minimalist) */}
        <section className="max-w-[1200px] mx-auto px-6 mb-24 text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-12">Kenapa Pilih App Ini</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="border-[3px] border-[#1a1a1a] p-6 text-center bg-white shadow-[6px_6px_0px_0px_#1a1a1a] rounded-2xl">
              <div className="w-16 h-16 bg-[#ffcc00] border-[3px] border-[#1a1a1a] flex items-center justify-center mx-auto mb-4 rounded-xl">
                <span className="material-symbols-outlined text-3xl">sell</span>
              </div>
              <h3 className="text-xl font-black uppercase mb-2">HARGA</h3>
              <p className="font-bold text-gray-400 text-sm">Best Rates Guaranteed. No hidden fees. Pay what you see.</p>
            </div>
            <div className="border-[3px] border-[#1a1a1a] p-6 text-center bg-white shadow-[6px_6px_0px_0px_#1a1a1a] rounded-2xl">
              <div className="w-16 h-16 bg-[#e63b2e] border-[3px] border-[#1a1a1a] flex items-center justify-center mx-auto mb-4 rounded-xl">
                <span className="material-symbols-outlined text-3xl text-white">touch_app</span>
              </div>
              <h3 className="text-xl font-black uppercase mb-2">MUDAH</h3>
              <p className="font-bold text-gray-400 text-sm">Simple Booking. Just three clicks and you are ready to explore.</p>
            </div>
            <div className="border-[3px] border-[#1a1a1a] p-6 text-center bg-white shadow-[6px_6px_0px_0px_#1a1a1a] rounded-2xl">
              <div className="w-16 h-16 bg-[#0055ff] border-[3px] border-[#1a1a1a] flex items-center justify-center mx-auto mb-4 rounded-xl">
                <span className="material-symbols-outlined text-3xl text-white">support_agent</span>
              </div>
              <h3 className="text-xl font-black uppercase mb-2">SUPPORT</h3>
              <p className="font-bold text-gray-400 text-sm">24/7 Assistance. We have got your back wherever you wander.</p>
            </div>
          </div>
        </section>

        {/* 8. FAQ Section */}
        <FAQ />
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/byMe/Footer";
import api from "@/lib/axios";
import { toast } from "sonner";

interface CouponData {
  id: string;
  code: string;
  discount: string;
}

export default function PromoPage() {
  const [coupons, setCoupons] = useState<CouponData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await api.get('/coupons');
        setCoupons(res.data);
      } catch (error) {
        console.error("Gagal mengambil kupon:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Kupon disalin", { 
        description: `Kode ${code} siap digunakan.` 
      });
    } catch (error) {
      toast.error("Gagal menyalin");
    }
  };

  const PROMO_DATA = [
    {
      id: 1,
      title: "Luxury Villas",
      discount: "-30%",
      bgColor: "bg-[#e63b2e]",
      textColor: "text-white",
      badgeColor: "bg-[#ffcc00]",
      validity: "Valid until Dec 31",
      rotate: "rotate-12"
    },
    {
      id: 2,
      title: "City Hotels",
      discount: "-20%",
      bgColor: "bg-[#0055ff]",
      textColor: "text-white",
      badgeColor: "bg-[#ffcc00]",
      validity: "Valid until Nov 15",
      rotate: "-rotate-12"
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
      badgeTextColor: "text-white"
    },
    {
      id: 4,
      title: "Cabin Stays",
      discount: "1+1",
      bgColor: "bg-[#ffcc00]",
      textColor: "text-black",
      badgeColor: "bg-white",
      validity: "Weekend Special",
      rotate: "-rotate-6"
    },
    {
      id: 5,
      title: "Mountain Trek",
      discount: "-25%",
      bgColor: "bg-black",
      textColor: "text-white",
      badgeColor: "bg-[#ffcc00]",
      validity: "Adventure Week",
      rotate: "rotate-3"
    },
    {
      id: 6,
      title: "River Cruise",
      discount: "Free Meal",
      bgColor: "bg-[#0194f3]",
      textColor: "text-white",
      badgeColor: "bg-white",
      validity: "Limited Slots",
      rotate: "-rotate-3",
      badgeTextColor: "text-black"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e8] font-['Space_Grotesk'] antialiased">
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4" style={{ textShadow: '4px 4px 0px #ffcc00' }}>
            Exclusive Promos
          </h1>
          <p className="text-xl font-bold opacity-60 max-w-2xl mx-auto">
            Grab the best deals for your next adventure. Limited time offers only for you!
          </p>
        </div>

        {/* Inlined Promo Highlights */}
        <section className="w-full mb-24 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {PROMO_DATA.map((promo) => (
              <div 
                key={promo.id} 
                className={`${promo.bgColor} ${promo.textColor} border-[3px] border-[#1a1a1a] shadow-[6px_6px_0px_0px_#1a1a1a] p-6 relative overflow-hidden rounded-2xl transition-transform hover:-translate-y-1`}
              >
                <div className={`absolute -right-4 -top-4 w-24 h-24 ${promo.badgeColor} rounded-full border-[3px] border-[#1a1a1a] flex items-center justify-center ${promo.rotate}`}>
                  <span className={`font-black text-xl ${promo.badgeTextColor || 'text-black'}`}>{promo.discount}</span>
                </div>
                <h3 className="text-2xl font-black uppercase mb-2 relative z-10 w-3/4 leading-tight">{promo.title}</h3>
                <p className="font-bold text-sm mb-6 relative z-10 opacity-70">{promo.validity}</p>
                <button className={`cursor-pointer font-bold uppercase px-4 py-2 border-[3px] border-[#1a1a1a] w-full transition-all relative z-10 rounded-xl active:scale-95 ${promo.bgColor === 'bg-[#ffcc00]' ? 'bg-white text-black hover:bg-black hover:text-white' : 'bg-white text-black hover:bg-[#ffcc00]'}`}>
                  Claim Deal
                </button>
              </div>
            ))}
          </div>
        </section>


        {/* CTA Section (Mini) */}
        <section className="max-w-[600px] mx-auto bg-black text-white p-6 rounded-2xl border-[3px] border-black shadow-[6px_6px_0px_0px_#ffcc00] text-center mb-24">
          <h2 className="text-xl font-black mb-2 uppercase italic tracking-tighter">Don't Miss Out!</h2>
          <p className="text-[10px] font-bold opacity-80 mb-4 max-w-md mx-auto uppercase">
            Subscribe to our newsletter for latest updates.
          </p>
          <div className="flex gap-3 justify-center">
            <button className="bg-[#ffcc00] text-black px-4 py-2 rounded-lg font-black uppercase text-[9px] tracking-widest border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_black] transition-all">
              Subscribe
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-lg font-black uppercase text-[9px] tracking-widest border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_black] transition-all">
              Follow
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

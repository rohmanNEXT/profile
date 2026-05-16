"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/lib/axios";
import Link from "next/link";
import { toast } from "sonner";

interface Item {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  category?: string;
}

function CheckoutContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const type = (searchParams.get("type") as "trips" | "hotels" | "restaurants") || "trips";

  const [item, setItem] = useState<Item | null>(null);
  const [step, setStep] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [checkIn, setCheckIn] = useState("2024-10-15");
  const [checkOut, setCheckOut] = useState("2024-10-20");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/${type}/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchItem();
  }, [id, type]);

  const nights = 5; // Simplified for demo
  const subtotal = (item?.price || 0) * nights;
  const cleaningFee = 75;
  const serviceFee = 125;
  const total = subtotal + cleaningFee + serviceFee;

  if (!item) return null;

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-black font-['Space_Grotesk']">
      {/* Header */}
      <header className="border-b-[3px] border-black px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-50">
        <h1 className="text-2xl font-black italic tracking-tighter">TRIPS</h1>
        <button onClick={() => router.back()} className="flex items-center gap-2 font-black uppercase text-xs hover:bg-gray-100 px-3 py-1.5 border-[2.5px] border-black rounded-lg transition-all">
          <span className="material-symbols-outlined text-sm">close</span>
          Cancel
        </button>
      </header>

      <main className="max-w-[1200px] mx-auto p-6 md:p-12">
        {/* Progress Bar */}
        <div className="bg-white border-[3px] border-black p-4 mb-12 flex justify-between items-center shadow-[4px_4px_0px_0px_black] rounded-xl overflow-hidden">
          {[
            { id: 1, label: "DETAILS" },
            { id: 2, label: "GUEST" },
            { id: 3, label: "PAYMENT" }
          ].map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-1 flex-1 relative group">
              <div className={`w-10 h-10 flex items-center justify-center border-[3px] border-black font-black text-lg transition-all ${step >= s.id ? "bg-black text-white" : "bg-white text-black opacity-30"}`}>
                {s.id}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? "opacity-100" : "opacity-30"}`}>{s.label}</span>
              {s.id !== 3 && <div className="absolute right-[-50%] top-5 w-[60%] h-[3px] bg-black hidden md:block opacity-10"></div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Form Side */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Trip Details */}
            <div className={`relative ${step !== 1 ? "opacity-40 grayscale" : ""}`}>
              <div className="absolute -top-4 -left-4 bg-[#ffcc00] border-[3px] border-black px-4 py-1.5 font-black uppercase text-xs shadow-[4px_4px_0px_0px_black] z-10">
                STEP 1
              </div>
              <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_black] rounded-xl">
                <h2 className="text-4xl font-black uppercase mb-12 tracking-tight">Trip Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* When Section */}
                  <div className="space-y-6">
                    <h3 className="font-black uppercase border-b-[3px] border-black pb-2 tracking-[0.2em]">When</h3>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-[10px] font-black uppercase mb-2 opacity-60">Check-in</label>
                        <div className="relative">
                           <input 
                             type="text" 
                             value={checkIn} 
                             onChange={(e) => setCheckIn(e.target.value)}
                             className="w-full bg-[#f5f0e8] border-[3px] border-black p-4 rounded-xl font-black focus:ring-4 focus:ring-[#ffcc00]/20 outline-none"
                           />
                           <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 opacity-40">calendar_month</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-[10px] font-black uppercase mb-2 opacity-60">Check-out</label>
                        <div className="relative">
                           <input 
                             type="text" 
                             value={checkOut} 
                             onChange={(e) => setCheckOut(e.target.value)}
                             className="w-full bg-[#f5f0e8] border-[3px] border-black p-4 rounded-xl font-black focus:ring-4 focus:ring-[#ffcc00]/20 outline-none"
                           />
                           <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 opacity-40">calendar_month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Who Section */}
                  <div className="space-y-6">
                    <h3 className="font-black uppercase border-b-[3px] border-black pb-2 tracking-[0.2em]">Who</h3>
                    <div className="space-y-4">
                      <div className="bg-[#f5f0e8] border-[3px] border-black p-4 rounded-xl flex justify-between items-center">
                        <span className="font-black uppercase">Adults</span>
                        <div className="flex items-center gap-4">
                           <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 border-[2.5px] border-black bg-white flex items-center justify-center font-black">-</button>
                           <span className="font-black text-xl w-6 text-center">{adults}</span>
                           <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 border-[2.5px] border-black bg-white flex items-center justify-center font-black">+</button>
                        </div>
                      </div>
                      <div className="bg-[#f5f0e8] border-[3px] border-black p-4 rounded-xl flex justify-between items-center">
                        <div className="flex flex-col">
                           <span className="font-black uppercase leading-none">Children</span>
                           <span className="text-[10px] font-black opacity-40 uppercase mt-1">Ages 2-12</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 border-[2.5px] border-black bg-white flex items-center justify-center font-black">-</button>
                           <span className="font-black text-xl w-6 text-center">{children}</span>
                           <button onClick={() => setChildren(children + 1)} className="w-8 h-8 border-[2.5px] border-black bg-white flex items-center justify-center font-black">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                   <button 
                     onClick={() => setStep(2)}
                     className="w-full md:w-auto bg-[#ffcc00] border-4 border-black px-12 py-5 font-black uppercase flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:scale-95"
                   >
                     Continue to Guest Info
                     <span className="material-symbols-outlined font-black">arrow_forward</span>
                   </button>
                </div>
              </div>
            </div>

            {/* Step 2 Placeholder */}
            <div className="bg-[#eee9e0] border-4 border-black p-8 rounded-xl opacity-40 flex justify-between items-center relative overflow-hidden">
               <div className="absolute -top-4 -left-4 bg-[#ccc] border-[3px] border-black px-4 py-1.5 font-black uppercase text-xs shadow-[4px_4px_0px_0px_black] z-10">
                STEP 2
              </div>
              <h2 className="text-3xl font-black uppercase text-[#888]">Guest Information</h2>
              <span className="material-symbols-outlined text-4xl">lock</span>
            </div>

            {/* Step 3 Placeholder */}
            <div className="bg-[#eee9e0] border-4 border-black p-8 rounded-xl opacity-40 flex justify-between items-center relative overflow-hidden">
               <div className="absolute -top-4 -left-4 bg-[#ccc] border-[3px] border-black px-4 py-1.5 font-black uppercase text-xs shadow-[4px_4px_0px_0px_black] z-10">
                STEP 3
              </div>
              <h2 className="text-3xl font-black uppercase text-[#888]">Payment</h2>
              <span className="material-symbols-outlined text-4xl">lock</span>
            </div>

          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-black overflow-hidden shadow-[12px_12px_0px_0px_black] rounded-xl sticky top-32">
              <div className="relative h-48 border-b-4 border-black">
                <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 font-black uppercase text-[10px] border-2 border-white rounded-md">
                   {item.category || "VILLA"}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-3xl font-black uppercase leading-tight mb-2 tracking-tight">{item.title}</h3>
                <div className="flex items-center gap-2 text-stone-400 mb-8">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.location}</span>
                </div>
                
                <div className="space-y-4 font-bold border-t-[3px] border-black border-dashed pt-8 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-60">${item.price} × {nights} nights</span>
                    <span className="font-black">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-60 underline underline-offset-4 decoration-2 decoration-black/10">Cleaning fee</span>
                    <span className="font-black">${cleaningFee}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-60 underline underline-offset-4 decoration-2 decoration-black/10">Service fee</span>
                    <span className="font-black">${serviceFee}</span>
                  </div>
                </div>
                
                <div className="border-t-4 border-black pt-6">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xl font-black uppercase">Total</span>
                    <span className="text-4xl font-black tracking-tighter">${total.toLocaleString()}</span>
                  </div>
                  <p className="text-right text-[8px] font-black uppercase opacity-40">Includes taxes and fees</p>
                </div>
                
                <div className="mt-8 flex justify-center gap-6 border-t-2 border-black/5 pt-6 opacity-60">
                   <span className="material-symbols-outlined">verified_user</span>
                   <span className="material-symbols-outlined">calendar_month</span>
                   <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Branding */}
      <footer className="bg-[#1a1a1a] text-white p-12 mt-24">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-black uppercase text-[#ffcc00] mb-4">TRIPS</h2>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">BAUHAUS TRIPS © 2024. FORM FOLLOWS FUNCTION.</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
            <Link href="#" className="hover:text-[#ffcc00] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#ffcc00] transition-colors">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <div className="w-20 h-20 border-[6px] border-black border-t-[#ffcc00] rounded-full animate-spin"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

'use client';

import React from 'react';
import { toast } from 'sonner';

export interface CouponData {
  id: string;
  code: string;
  discount: string;
}

interface CouponsProps {
  coupons: CouponData[];
}

/**
 * Coupons Component (React.FC)
 * Refined to be more compact and without forced uppercase.
 */
const Coupons: React.FC<CouponsProps> = ({ coupons }) => {
  
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

  if (!coupons || coupons.length === 0) return null;

  return (
    <section className="w-full mb-16 text-center">
      <h2 className="text-lg md:text-xl font-black mb-6">Kupon Tersedia</h2>
      
      <div className="flex flex-wrap justify-center gap-4 pb-4 text-left">
        {coupons.map((coupon) => (
          <div 
            key={coupon.id} 
            className="min-w-[200px] flex shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all rounded-xl overflow-hidden border-2 border-black bg-white"
          >
            {/* Coupon Info */}
            <div className="flex-grow p-3 border-r-2 border-black border-dashed bg-white">
              <div className="font-black text-lg mb-0.5 text-black">
                {coupon.code}
              </div>
              <div className="font-bold text-[10px] text-stone-500">
                Diskon {coupon.discount}
              </div>
            </div>

            {/* Copy Action */}
            <button 
              onClick={() => handleCopy(coupon.code)}
              className="bg-[#ffcc00] text-black px-3 flex items-center justify-center cursor-pointer hover:bg-black hover:text-[#ffcc00] transition-colors"
            >
              <span className="material-symbols-outlined text-base">content_copy</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Coupons;

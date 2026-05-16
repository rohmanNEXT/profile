'use client';

import React from 'react';
import Link from 'next/link';


export default function Footer() {
  return (
    <footer className="w-full mb-12 font-['Inter']">
      <div className="bg-white text-[#1a1a1a] border-[4px] border-black shadow-[8px_8px_0px_0px_#1a1a1a] rounded-[2.5rem] overflow-hidden p-8 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col">
            <Link className="text-4xl font-black text-black font-['Space_Grotesk'] uppercase tracking-tighter block mb-1" href="/">TRIPS.</Link>
            <p className="font-['Inter'] text-sm text-stone-700 max-w-md leading-relaxed font-semibold mb-6">
              Empowering your wanderlust with Bauhaus-inspired design and unbeatable travel experiences.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center text-black shadow-[3px_3px_0px_0px_#1a1a1a] hover:bg-black hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-sm">share</span>
              </div>
              <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center text-black shadow-[3px_3px_0px_0px_#1a1a1a] hover:bg-black hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-sm">mail</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 font-['Space_Grotesk']">
            <div className="space-y-3">
              <h4 className="font-black uppercase text-black text-xs tracking-widest">Platform</h4>
              <ul className="space-y-1 text-xs font-black text-stone-600 uppercase">
                <li><Link className="hover:text-black transition-colors" href="/explore?type=hotels">Hotel</Link></li>
                <li><Link className="hover:text-black transition-colors" href="/explore?type=trips">Wisata</Link></li>
                <li><Link className="hover:text-black transition-colors" href="/explore?type=restaurants">Restorant</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-black uppercase text-black text-xs tracking-widest">Company</h4>
              <ul className="space-y-1 text-xs font-black text-stone-600 uppercase">
                <li><a className="hover:text-black transition-colors" href="#">About</a></li>
                <li><a className="hover:text-black transition-colors" href="#">Press</a></li>
                <li><a className="hover:text-black transition-colors" href="#">Career</a></li>
                <li><a className="hover:text-black transition-colors" href="#">Contact us</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-black uppercase text-black text-xs tracking-widest">Legal</h4>
              <ul className="space-y-1 text-xs font-black text-stone-600 uppercase">
                <li><a className="hover:text-black transition-colors" href="#">Privacy</a></li>
                <li><a className="hover:text-black transition-colors" href="#">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t-2 border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-['Space_Grotesk'] uppercase text-[10px] font-black text-stone-600 tracking-[0.3em]">
            BAUHAUS TRIPS © 2026. FORM FOLLOWS FUNCTION.
          </p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-stone-600">
             <a href="#" className="hover:text-black">Instagram</a>
             <a href="#" className="hover:text-black">Twitter</a>
             <a href="#" className="hover:text-black">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

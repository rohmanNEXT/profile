"use client";

import { useSettingsStore, Language, Currency, Theme } from "@/store/settingsStore";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { 
    language, setLanguage, 
    currency, setCurrency, 
    theme, setTheme, 
    country, setCountry 
  } = useSettingsStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-[#1a1a1a] text-white' : 'bg-[#f5f0e8] text-black'} font-['Space_Grotesk'] antialiased`}>
      <main className="max-w-[800px] mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-4 border-black pb-8">
          <div>
            <p className="text-2xl font-black uppercase opacity-100 mt-4 tracking-tighter">Settings</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Appearance / Theme */}
          <section className={`p-8 rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_0px_black] ${theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
            <div className="flex items-center gap-4 mb-6">
              <span className="material-symbols-outlined text-3xl">palette</span>
              <h2 className="text-2xl font-black uppercase tracking-tight">Appearance</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setTheme('light')}
                className={`p-4 rounded-xl border-[3px] border-black font-black uppercase transition-all ${theme === 'light' ? 'bg-[#ffcc00] shadow-[4px_4px_0px_0px_black]' : 'bg-stone-100 text-black/40'}`}
              >
                Light Mode
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-xl border-[3px] border-black font-black uppercase transition-all ${theme === 'dark' ? 'bg-[#0055ff] shadow-[4px_4px_0px_0px_black]' : 'bg-stone-100 text-black/40'}`}
              >
                Dark Mode
              </button>
            </div>
          </section>

          {/* Regional Settings */}
          <section className={`p-8 rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_0px_black] ${theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
            <div className="flex items-center gap-4 mb-8">
              <span className="material-symbols-outlined text-3xl">public</span>
              <h2 className="text-2xl font-black uppercase tracking-tight">Region & Preferences</h2>
            </div>

            <div className="space-y-6">
              {/* Language */}
              <div>
                <label className="block text-[10px] font-black uppercase opacity-50 mb-2 tracking-widest">Language</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className={`w-full p-4 rounded-xl border-[3px] border-black font-black uppercase outline-none cursor-pointer appearance-none ${theme === 'dark' ? 'bg-[#1a1a1a] text-white hover:bg-[#0055ff]/20' : 'bg-stone-50 text-black hover:bg-[#ffcc00]/20'} transition-colors`}
                >
                  <option value="ID">Bahasa Indonesia</option>
                  <option value="EN">English (Global)</option>
                  <option value="JP">日本語 (Japanese)</option>
                  <option value="KR">한국어 (Korean)</option>
                </select>
              </div>

              {/* Currency */}
              <div>
                <label className="block text-[10px] font-black uppercase opacity-50 mb-2 tracking-widest">Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className={`w-full p-4 rounded-xl border-[3px] border-black font-black uppercase outline-none cursor-pointer appearance-none ${theme === 'dark' ? 'bg-[#1a1a1a] text-white hover:bg-[#0055ff]/20' : 'bg-stone-50 text-black hover:bg-[#ffcc00]/20'} transition-colors`}
                >
                  {['IDR', 'USD', 'SGD', 'JPY', 'KRW', 'EUR'].map((curr) => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-[10px] font-black uppercase opacity-50 mb-2 tracking-widest">Your Country</label>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={`w-full p-4 rounded-xl border-[3px] border-black font-black uppercase outline-none cursor-pointer appearance-none ${theme === 'dark' ? 'bg-[#1a1a1a] text-white hover:bg-[#0055ff]/20' : 'bg-stone-50 text-black hover:bg-[#ffcc00]/20'} transition-colors`}
                >
                  {['Indonesia', 'Singapore', 'Malaysia', 'Japan', 'South Korea', 'USA', 'Germany', 'France', 'United Kingdom'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section className={`p-8 rounded-2xl border-[3px] border-black shadow-[8px_8px_0px_0px_black] ${theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-white'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl">support_agent</span>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight leading-none">Contact Us</h2>
                  <p className="text-[10px] font-bold opacity-50 mt-1 uppercase">Need help? We are here for you.</p>
                </div>
              </div>
              <a 
                href="https://wa.me/628123456789" 
                target="_blank"
                className="bg-[#25D366] text-white px-8 py-3 rounded-xl font-black uppercase text-xs border-[3px] border-black shadow-[5px_5px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Chat via WhatsApp
              </a>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t-2 border-black/10 text-center">
          <p className="text-[10px] font-black uppercase opacity-40">Trips App v1.2.0 • Made with Passion</p>
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSettingsStore, Language, Currency } from "@/store/settingsStore";

/**
 * Navbar Component (React.FC)
 * A premium floating navigation bar using sticky positioning.
 * Includes the restored "My Trips" / "Dashboard" link.
 */
const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout, setAuthModal } = useAuthStore();
  const { language, currency, setLanguage, setCurrency } = useSettingsStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const langRef = useRef<HTMLButtonElement>(null);
  const currRef = useRef<HTMLButtonElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Hotel", href: "/explore?type=hotels" },
    { name: "Wisata", href: "/explore?type=trips" },
    { name: "Restorant", href: "/explore?type=restaurants" },
  ];

  const dropdownMenu = [
    { name: "Promo", href: "/promo", icon: "sell" },
    { name: "Setting", href: "/settings", icon: "settings" },
    { name: "Profile", href: "/profile", icon: "person" },
  ];

  return (
    <header className="sticky top-4 z-50 w-full mb-6">
      <nav className="flex justify-between items-center px-6 py-2.5 bg-white/80 backdrop-blur-2xl border-[3px] border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-['Space_Grotesk'] font-bold uppercase tracking-tighter">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="text-2xl font-black text-black cursor-pointer hover:opacity-80 transition-opacity tracking-tighter"
          >
            TRIPS.
          </Link>
        </div>

        {/* Center: Menu Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-all duration-200 px-3 py-0.5 text-xs font-black tracking-widest ${
                pathname === link.href 
                  ? "bg-[#ffcc00] text-black border-2 border-black rounded-lg" 
                  : "text-black/60 hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Bahasa | Mata Uang */}
          <div className="hidden md:flex items-center gap-3 pr-4 border-r-2 border-black/10">
            <div className="relative">
              <button 
                ref={langRef}
                onClick={() => { setShowLanguageDropdown(!showLanguageDropdown); setShowCurrencyDropdown(false); }}
                className="flex items-center gap-1.5 px-2 py-1 hover:bg-stone-100 rounded-lg transition-colors border-2 border-transparent hover:border-black active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">language</span>
                <span className="text-[10px] font-black">{language}</span>
              </button>
              
              {mounted && showLanguageDropdown && createPortal(
                <div 
                  className="fixed z-999 w-32 animate-in fade-in slide-in-from-top-2 duration-200"
                  style={{ 
                    top: `${langRef.current?.getBoundingClientRect().bottom! + 8}px`,
                    left: `${langRef.current?.getBoundingClientRect().left! - 20}px`
                  }}
                >
                  <div className="bg-white/90 backdrop-blur-xl border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_black] overflow-hidden">
                    {(['ID', 'EN', 'JP', 'KR'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setShowLanguageDropdown(false); }}
                        className={`w-full text-left px-4 py-2 text-[10px] font-black hover:bg-[#ffcc00] transition-colors border-b-2 border-black/5 last:border-0 ${language === lang ? 'bg-[#ffcc00]' : ''}`}
                      >
                        {lang === 'ID' ? 'Bahasa Indonesia' : lang === 'EN' ? 'English' : lang === 'JP' ? '日本語' : '한국어'}
                      </button>
                    ))}
                  </div>
                </div>,
                document.body
              )}
            </div>

            <div className="relative">
              <button 
                ref={currRef}
                onClick={() => { setShowCurrencyDropdown(!showCurrencyDropdown); setShowLanguageDropdown(false); }}
                className="flex items-center gap-1.5 px-2 py-1 hover:bg-stone-100 rounded-lg transition-colors border-2 border-transparent hover:border-black active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">payments</span>
                <span className="text-[10px] font-black">{currency}</span>
              </button>

              {mounted && showCurrencyDropdown && createPortal(
                <div 
                  className="fixed z-999 w-32 animate-in fade-in slide-in-from-top-2 duration-200"
                  style={{ 
                    top: `${currRef.current?.getBoundingClientRect().bottom! + 8}px`,
                    left: `${currRef.current?.getBoundingClientRect().left! - 20}px`
                  }}
                >
                  <div className="bg-white/90 backdrop-blur-xl border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_black] overflow-hidden">
                    {(['IDR', 'USD', 'SGD', 'JPY', 'KRW'] as Currency[]).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => { setCurrency(curr); setShowCurrencyDropdown(false); }}
                        className={`w-full text-left px-4 py-2 text-[10px] font-black hover:bg-[#ffcc00] transition-colors border-b-2 border-black/5 last:border-0 ${currency === curr ? 'bg-[#ffcc00]' : ''}`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>,
                document.body
              )}
            </div>
          </div>

          {/* My Trips / Dashboard Link (RESTORED) */}
          <button 
            onClick={() => {
              if (!user) setAuthModal(true, 'login', '/dashboard');
            }}
            className="hidden sm:flex items-center gap-2 text-black hover:text-[#0055ff] transition-all text-xs font-black uppercase tracking-widest px-1"
          >
            {user ? (
              <Link href={user.role === 'admin' ? "/dashboard" : "/dashboard"} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">{user.role === 'admin' ? 'dashboard' : 'history'}</span>
                <span>{user.role === 'admin' ? 'Dashboard' : 'My Trips'}</span>
              </Link>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">history</span>
                <span>My Trips</span>
              </>
            )}
          </button>


          {/* Profile / Login */}
          <div className="relative">
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  ref={buttonRef}
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 border-[2.5px] border-black overflow-hidden transition-all active:scale-95 rounded-full bg-white relative z-10"
                >
                  <img 
                    src={user.avatar || "/images/avatar.png"} 
                    alt="avatar" 
                    className="w-full h-full object-cover grayscale"
                  />
                </button>
                
                {mounted && showDropdown && createPortal(
                  <div 
                    className="fixed z-999 mt-4 w-52 animate-in fade-in slide-in-from-top-2 duration-200 top-(--tw-dropdown-top) left-(--tw-dropdown-left)"
                    style={{ 
                      // @ts-ignore
                      "--tw-dropdown-top": `${buttonRef.current?.getBoundingClientRect().bottom + 12}px`,
                      // @ts-ignore
                      "--tw-dropdown-left": `${buttonRef.current?.getBoundingClientRect().right - 208}px`
                    }}
                  >
                    {/* Background Blur Layer */}
                    <div className="absolute inset-0 z-0 bg-white/30 rounded-2xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] backdrop-blur-xl" />
                    
                    {/* Content Wrapper */}
                    <div className="relative rounded-2xl overflow-hidden border-[3px] border-black">
                      <div className="p-3 border-b-[3px] border-black bg-[#ffcc00]/60">
                        <p className="text-[9px] font-black uppercase opacity-50 tracking-widest">Signed in as</p>
                        <p className="text-sm font-black truncate">{user.name}</p>
                      </div>
                      <div className="py-1 bg-white/40">
                        {user.role === 'admin' && (
                          <Link 
                            href="/dashboard"
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-stone-50 transition-colors text-[#0055ff]"
                          >
                            <span className="material-symbols-outlined text-xs">dashboard</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Dashboard</span>
                          </Link>
                        )}
                        {dropdownMenu.map((item) => (
                          <Link 
                            key={item.name}
                            href={item.href}
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-stone-50 transition-colors"
                          >
                            <span className="material-symbols-outlined text-xs">{item.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">{item.name}</span>
                          </Link>
                        ))}
                        <button 
                          onClick={() => {
                            logout();
                            setShowDropdown(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-[#e63b2e] hover:bg-stone-50 transition-colors border-t-2 border-black/5"
                        >
                          <span className="material-symbols-outlined text-xs">logout</span>
                          <span className="text-[10px] font-black uppercase tracking-widest">Keluar</span>
                        </button>
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModal(true, 'login')}
                className="bg-black text-white text-sm px-4 py-2 border-[2.5px] border-black hover:bg-[#ffcc00] hover:text-black transition-all font-black rounded-xl active:translate-x-0.5 active:translate-y-0.5"
              >
                LOGIN 
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

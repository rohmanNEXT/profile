"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Mock Data for demonstration
const MOCK_BOOKINGS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Travel Experience ${i + 1}`,
  location: i % 2 === 0 ? "Bali, Indonesia" : "Lombok, Indonesia",
  image: i % 2 === 0 ? "/images/bali.png" : "/images/thailand.png",
  price: 1500000 + (i * 50000),
  date: "2024-08-15"
}));

const MOCK_WISHLIST = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `Dream Destination ${i + 1}`,
  location: i % 3 === 0 ? "Tokyo, Japan" : "Seoul, Korea",
  image: i % 3 === 0 ? "/images/japan.png" : "/images/korea.png",
  price: 2500000 + (i * 100000),
  rating: (9.0 + (i * 0.1)).toFixed(1)
}));

export default function ProfilePage() {
  const { user, setUser, logout } = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'booking' | 'wishlist'>('booking');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: "",
    city: "",
    province: "",
    wallet: 0,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        username: user.name?.toLowerCase().replace(/\s/g, "_") || "",
        address: "Jl. Sudirman No. 123",
        city: "Jakarta Pusat",
        province: "DKI Jakarta",
        wallet: user.wallet || 2500,
      });
    }
  }, [user]);

  if (!user) {
    if (typeof window !== "undefined") router.push("/oauth");
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center">
        <div className="w-16 h-16 border-[6px] border-black border-t-[#ffcc00] rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.patch(`/users/${user.id}`, formData);
      setUser(res.data);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  const currentItems = activeTab === 'booking' ? MOCK_BOOKINGS : MOCK_WISHLIST;
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const displayedItems = currentItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleTabChange = (tab: 'booking' | 'wishlist') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] pt-24 pb-24 font-['Inter']">
      <main className="max-w-[1300px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b-4 border-black pb-8">
          <div>
            <p className="text-2xl font-black uppercase opacity-100 mt-4 tracking-tighter">User Profile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Boxes */}
          <div className="lg:col-span-4 space-y-6">
          

            {/* A. Information Box */}
            <div className="bg-white border-4 border-black p-6 rounded-[32px] shadow-[8px_8px_0px_0px_black]">
               <div className="flex flex-col items-center text-center mb-6 pb-6 border-b-2 border-black/10">
                  <div 
                    onClick={() => { setIsEditing(true); setShowPasswordForm(false); }}
                    className="w-24 h-24 border-4 border-black rounded-full overflow-hidden shadow-[4px_4px_0px_0px_black] mb-4 relative group cursor-pointer"
                  >
                    <Image 
                      src={user.avatar || "/images/avatar.png"} 
                      alt="Avatar" 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
                    </div>
                  </div>
                  <p className="text-[9px] font-black uppercase opacity-40">Profile Photo</p>
               </div>
               <div className="space-y-3 pb-9 pt-2">
                 <div className="bg-[#ffcc00] border-2 border-black p-3 rounded-xl shadow-[3px_3px_0px_0px_black] flex justify-between items-center">
                    <div>
                      <p className="text-[7px] font-black uppercase opacity-60 mb-0.5 tracking-widest text-black">Balance</p>
                      <p className="text-2xl font-black font-['Space_Grotesk'] text-black">${formData.wallet}</p>
                    </div>
                    <button className="bg-black text-white px-3 py-1.5 rounded-lg font-black uppercase text-[8px] tracking-widest border-2 border-black hover:bg-white hover:text-black transition-colors">
                      Topup
                    </button>
                 </div>
                 <div className="bg-black text-white border-2 border-black p-3 rounded-xl shadow-[3px_3px_0px_0px_rgba(255,204,0,1)] flex justify-between items-center">
                    <div>
                      <p className="text-[7px] font-black uppercase opacity-60 mb-0.5 tracking-widest">Coupons</p>
                      <p className="text-2xl font-black font-['Space_Grotesk']">12</p>
                    </div>
                    <button className="bg-[#ffcc00] text-black px-3 py-1.5 rounded-lg font-black uppercase text-[8px] tracking-widest border-2 border-black hover:bg-white transition-colors">
                      Show
                    </button>
                 </div>
               </div>
               <div className="space-y-4">
                 <div className="flex flex-col">
                   <span className="text-[8px] font-black uppercase opacity-40">Nama</span>
                   <span className="font-black text-base">{formData.name}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[8px] font-black uppercase opacity-40">Username</span>
                   <span className="font-black text-base">@{formData.username}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[8px] font-black uppercase opacity-40">No HP</span>
                   <span className="font-black text-base">{formData.phone}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[8px] font-black uppercase opacity-40">Email</span>
                   <span className="font-black text-base break-all">{formData.email}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[8px] font-black uppercase opacity-40">Balance</span>
                   <span className="font-black text-base">${formData.wallet}</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[8px] font-black uppercase opacity-40">Address</span>
                   <span className="font-black text-xs line-clamp-2">{formData.address}</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase opacity-40">Kota</span>
                      <span className="font-black text-xs">{formData.city}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase opacity-40">Provinsi</span>
                      <span className="font-black text-xs">{formData.province}</span>
                    </div>
                 </div>

                 <div className="pt-4 space-y-2 border-t-2 border-black/10">
                    <button 
                      onClick={() => { setShowPasswordForm(!showPasswordForm); setIsEditing(false); }}
                      className="w-full bg-[#ffcc00] border-2 border-black py-2 rounded-lg font-black uppercase text-[8px] tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_black] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                      Ubah Password
                    </button>
                    <button 
                      onClick={() => { setIsEditing(true); setShowPasswordForm(false); }}
                      className="w-full bg-black text-white border-2 border-black py-2 rounded-lg font-black uppercase text-[8px] tracking-widest hover:bg-[#ffcc00] hover:text-black transition-all shadow-[4px_4px_0px_0px_black] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                      Edit Information
                    </button>
                    <button 
                      onClick={() => { logout(); router.push("/"); }}
                      className="w-full bg-[#e63b2e] text-white border-2 border-black py-2 rounded-lg font-black uppercase text-[8px] tracking-widest hover:bg-black transition-all shadow-[4px_4px_0px_0px_black] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    >
                      Logout
                    </button>
                 </div>
               </div>
            </div>

          </div>

          {/* Right Column: Booking | Wishlist */}
          <div className="lg:col-span-8 space-y-6">
            
            {isEditing ? (
              <div className="bg-white border-4 border-black p-8 rounded-[32px] shadow-[8px_8px_0px_0px_black]">
                <form onSubmit={handleUpdate} className="space-y-6">
                  <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-black pb-3 font-['Space_Grotesk'] italic">Update Personal Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-[9px] font-black uppercase opacity-60">Profile Image URL</label>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 border-2 border-black rounded-lg overflow-hidden shrink-0 shadow-[2px_2px_0px_0px_black]">
                          <Image src={formData.avatar || "/images/avatar.png"} alt="Preview" width={48} height={48} className="object-cover" />
                        </div>
                        <input 
                          type="text" 
                          value={formData.avatar} 
                          onChange={e => setFormData({...formData, avatar: e.target.value})} 
                          placeholder="Paste image URL here..."
                          className="grow bg-[#f5f0e8] border-2 border-black p-3 rounded-lg font-black text-xs outline-none focus:bg-[#ffcc00]/10 transition-colors" 
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase opacity-60">Full Name</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#f5f0e8] border-2 border-black p-3 rounded-lg font-black text-xs outline-none focus:bg-[#ffcc00]/10 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase opacity-60">Username</label>
                      <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full bg-[#f5f0e8] border-2 border-black p-3 rounded-lg font-black text-xs outline-none focus:bg-[#ffcc00]/10 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase opacity-60">Email Address</label>
                      <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#f5f0e8] border-2 border-black p-3 rounded-lg font-black text-xs outline-none focus:bg-[#ffcc00]/10 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black uppercase opacity-60">Phone Number</label>
                      <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#f5f0e8] border-2 border-black p-3 rounded-lg font-black text-xs outline-none focus:bg-[#ffcc00]/10 transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-3 pt-6">
                    <label className="text-[9px] font-black uppercase opacity-60">Residential Address</label>
                    <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-[#f5f0e8] border-2 border-black p-3 rounded-lg font-black text-xs outline-none h-20 focus:bg-[#ffcc00]/10 transition-colors" />
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-1">
                         <label className="text-[9px] font-black uppercase opacity-60">City</label>
                         <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-[#f5f0e8] border-2 border-black p-3 rounded-lg font-black text-xs outline-none focus:bg-[#ffcc00]/10 transition-colors" />
                       </div>
                       <div className="space-y-1">
                         <label className="text-[9px] font-black uppercase opacity-60">Province</label>
                         <input type="text" value={formData.province} onChange={e => setFormData({...formData, province: e.target.value})} className="w-full bg-[#f5f0e8] border-2 border-black p-3 rounded-lg font-black text-xs outline-none focus:bg-[#ffcc00]/10 transition-colors" />
                       </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t-2 border-black/10">
                    <button type="submit" className="bg-black text-white px-8 py-3 rounded-lg font-black uppercase text-[10px] shadow-[4px_4px_0px_0px_rgba(255,204,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="bg-white border-2 border-black px-8 py-3 rounded-lg font-black uppercase text-[10px] shadow-[4px_4px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">Discard</button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                {/* Security Form Overlay-like */}
                {showPasswordForm && (
                  <div className="bg-[#ffcc00] border-4 border-black p-6 rounded-[32px] shadow-[8px_8px_0px_0px_black] mb-6">
                    <h3 className="text-xl font-black uppercase mb-4 font-['Space_Grotesk'] italic">Update Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase">Old Password</label>
                          <input type="password" placeholder="••••••••" className="w-full bg-white border-2 border-black p-3 rounded-lg font-black text-xs outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black uppercase">New Password</label>
                          <input type="password" placeholder="••••••••" className="w-full bg-white border-2 border-black p-3 rounded-lg font-black text-xs outline-none" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <button onClick={() => setShowPasswordForm(false)} className="px-4 py-2 font-black uppercase text-[10px]">Cancel</button>
                        <button className="bg-black text-white px-6 py-2 rounded-lg font-black uppercase text-[10px] tracking-widest border-2 border-black shadow-[3px_3px_0px_0px_white]">Update Security</button>
                    </div>
                  </div>
                )}

                {/* History Tabs: Booking | Wishlist */}
                <div className="bg-white border-4 border-black rounded-[32px] shadow-[10px_10px_0px_0px_black] overflow-hidden min-h-[600px] flex flex-col">
                  <div className="flex border-b-4 border-black">
                      <button 
                        onClick={() => handleTabChange('booking')}
                        className={`flex-1 py-6 font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${activeTab === 'booking' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#ffcc00]'}`}
                      >
                        <span className="material-symbols-outlined text-lg">luggage</span>
                        Booking
                      </button>
                      <button 
                        onClick={() => handleTabChange('wishlist')}
                        className={`flex-1 py-6 font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${activeTab === 'wishlist' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#ffcc00]'}`}
                      >
                        <span className="material-symbols-outlined text-lg">favorite</span>
                        Wishlist
                      </button>
                  </div>
                  
                  <div className="p-6 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                        {displayedItems.map((item) => (
                          <div key={item.id} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] rounded-2xl overflow-hidden group hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex flex-col">
                            <div className="relative h-28 overflow-hidden">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                              <div className="absolute top-2 left-2 bg-[#ffcc00] border-2 border-black px-1.5 py-0.5 text-[7px] font-black uppercase">
                                {item.location}
                              </div>
                            </div>
                            <div className="p-3.5 flex-1 flex flex-col">
                              <h4 className="font-black text-sm leading-tight mb-1 uppercase line-clamp-1">{item.title}</h4>
                              {activeTab === 'booking' ? (
                                <p className="text-[8px] font-black opacity-40 mb-3 uppercase tracking-tighter">Date: {(item as any).date}</p>
                              ) : (
                                <div className="flex items-center gap-1 mb-3">
                                  <span className="text-[#0194f3] font-black text-[10px]">{(item as any).rating}/10</span>
                                  <span className="text-gray-400 text-[7px] font-bold uppercase">• Rating</span>
                                </div>
                              )}
                              <div className="mt-auto pt-3 border-t border-black/5 flex justify-between items-center">
                                <p className="font-black text-base tracking-tighter">Rp {item.price.toLocaleString()}</p>
                                <button className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center hover:bg-[#ffcc00] transition-colors">
                                  <span className="material-symbols-outlined text-xs font-black">arrow_forward</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      <div className="mt-auto flex justify-center items-center gap-3 py-4">
                        <button 
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className="w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center font-black disabled:opacity-20 hover:bg-[#ffcc00] transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <div className="flex gap-1.5">
                          {Array.from({ length: totalPages }, (_, i) => (
                            <button
                              key={i + 1}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`w-10 h-10 border-2 border-black rounded-lg font-black text-xs transition-all ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#ffcc00]'}`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <button 
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className="w-10 h-10 border-2 border-black rounded-lg flex items-center justify-center font-black disabled:opacity-20 hover:bg-[#ffcc00] transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                      </div>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}



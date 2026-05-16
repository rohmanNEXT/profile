"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/lib/axios";

interface Item {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  isPromo: boolean;
  isPopular: boolean;
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"trips" | "hotels" | "restaurants">("trips");
  const [items, setItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<Partial<Item>>({
    title: "",
    location: "",
    price: 0,
    rating: 0,
    image: "",
    category: "",
    isPromo: false,
    isPopular: false,
  });

  // Protect Route
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push("/");
    }
  }, [user, router]);

  // Fetch Items
  const fetchItems = async () => {
    try {
      const res = await api.get(`/${activeTab}`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchItems();
    }
  }, [activeTab, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await api.put(`/${activeTab}/${editingItem.id}`, formData);
      } else {
        const newItem = { ...formData, id: Date.now().toString() };
        await api.post(`/${activeTab}`, newItem);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/${activeTab}/${id}`);
        fetchItems();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-[#f5f0e8] pt-32 pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-8 border-black pb-6 gap-6">
          <div>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-none font-['Space_Grotesk'] tracking-tighter">Admin</h1>
            <p className="text-[#e63b2e] font-black uppercase text-lg tracking-[0.2em] mt-2 italic">
              Manage your database
            </p>
          </div>
          <button 
            onClick={() => {
              setEditingItem(null);
              setFormData({ title: "", location: "", price: 0, rating: 0, image: "", category: "", isPromo: false, isPopular: false });
              setIsModalOpen(true);
            }}
            className="bg-[#ffcc00] text-black px-8 py-4 font-black uppercase border-[4px] border-black shadow-[6px_6px_0px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all rounded-xl"
          >
            Add New {activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {["trips", "hotels", "restaurants"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 font-black uppercase border-[3px] border-black rounded-xl transition-all shadow-[4px_4px_0px_0px_black] active:shadow-none ${activeTab === tab ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white border-[4px] border-black rounded-3xl overflow-hidden shadow-[10px_10px_0px_0px_black]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black text-white font-black uppercase text-xs tracking-widest border-b-[4px] border-black">
                <th className="p-6">Image</th>
                <th className="p-6">Title</th>
                <th className="p-6">Location</th>
                <th className="p-6">Price</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b-[3px] border-black hover:bg-[#f5f0e8]/50 transition-colors">
                  <td className="p-4">
                    <div className="w-16 h-16 border-[3px] border-black rounded-lg overflow-hidden relative">
                      <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                  </td>
                  <td className="p-4 font-black uppercase text-sm">{item.title}</td>
                  <td className="p-4 font-bold text-stone-500 text-xs">{item.location}</td>
                  <td className="p-4 font-black text-lg">${item.price}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button 
                        onClick={() => {
                          setEditingItem(item);
                          setFormData(item);
                          setIsModalOpen(true);
                        }}
                        className="w-10 h-10 border-[2.5px] border-black rounded-lg flex items-center justify-center hover:bg-[#ffcc00] transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="w-10 h-10 border-[2.5px] border-black rounded-lg flex items-center justify-center hover:bg-[#e63b2e] hover:text-white transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#f5f0e8] border-[6px] border-black w-full max-w-[600px] rounded-3xl shadow-[20px_20px_0px_0px_black] overflow-hidden">
            <div className="bg-black text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase font-['Space_Grotesk']">
                {editingItem ? 'Edit Item' : `Add New ${activeTab.slice(0, -1)}`}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="material-symbols-outlined hover:text-[#ffcc00] transition-colors">close</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-black uppercase text-[10px] mb-2">Title</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-white border-[3px] border-black p-3 font-bold rounded-xl outline-none focus:ring-4 focus:ring-[#ffcc00]/20"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-[10px] mb-2">Location</label>
                  <input 
                    required
                    type="text" 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-white border-[3px] border-black p-3 font-bold rounded-xl outline-none focus:ring-4 focus:ring-[#ffcc00]/20"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-[10px] mb-2">Price ($)</label>
                  <input 
                    required
                    type="number" 
                    value={formData.price} 
                    onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                    className="w-full bg-white border-[3px] border-black p-3 font-bold rounded-xl outline-none focus:ring-4 focus:ring-[#ffcc00]/20"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-[10px] mb-2">Rating</label>
                  <input 
                    required
                    type="number" 
                    step="0.1" 
                    value={formData.rating} 
                    onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                    className="w-full bg-white border-[3px] border-black p-3 font-bold rounded-xl outline-none focus:ring-4 focus:ring-[#ffcc00]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-black uppercase text-[10px] mb-2">Image URL</label>
                <input 
                  required
                  type="text" 
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-white border-[3px] border-black p-3 font-bold rounded-xl outline-none focus:ring-4 focus:ring-[#ffcc00]/20"
                />
              </div>

              <div className="flex gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.isPromo} 
                    onChange={(e) => setFormData({...formData, isPromo: e.target.checked})}
                    className="hidden"
                  />
                  <div className={`w-6 h-6 border-[3px] border-black rounded-md flex items-center justify-center transition-colors ${formData.isPromo ? "bg-[#e63b2e]" : "bg-white"}`}>
                    {formData.isPromo && <span className="material-symbols-outlined text-sm font-black text-white">check</span>}
                  </div>
                  <span className="font-black uppercase text-[10px]">Promo</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.isPopular} 
                    onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
                    className="hidden"
                  />
                  <div className={`w-6 h-6 border-[3px] border-black rounded-md flex items-center justify-center transition-colors ${formData.isPopular ? "bg-[#ffcc00]" : "bg-white"}`}>
                    {formData.isPopular && <span className="material-symbols-outlined text-sm font-black">check</span>}
                  </div>
                  <span className="font-black uppercase text-[10px]">Popular</span>
                </label>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-black text-white font-black uppercase tracking-[0.3em] hover:bg-[#ffcc00] hover:text-black transition-all rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                {editingItem ? 'Save Changes' : 'Create Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import Image from "next/image";

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

async function getTrip(id: string): Promise<Trip | null> {
  try {
    const res = await fetch(`http://localhost:3001/trips/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string, booking: string } }) {
  const trip = await getTrip(params.id);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <div className="text-center font-black uppercase">Trip Not Found</div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f0e8] text-[#1a1a1a] min-h-screen flex flex-col font-['Inter']">
      {/* Minimal Header */}
      <header className="w-full border-b-[3px] border-black px-6 py-4 flex justify-between items-center bg-white z-50">
        <div className="text-3xl font-black text-black italic font-['Space_Grotesk']">TRIPS</div>
        <a href={`/explore/${trip.id}`} className="font-['Space_Grotesk'] font-bold uppercase hover:text-[#0055ff] underline decoration-2 underline-offset-4 flex items-center gap-2">
          <span className="material-symbols-outlined font-bold">close</span> Cancel
        </a>
      </header>

      <main className="grow w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Flow */}
        <div className="lg:col-span-2 space-y-12">
          {/* Progress Bar */}
          <div className="w-full flex items-center justify-between relative brutal-border p-4 bg-[#e2ddd4]">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-black -z-10 -translate-y-1/2"></div>
            <div className="flex flex-col items-center bg-[#e2ddd4] px-2 z-10">
              <div className="w-10 h-10 brutal-border bg-black text-white flex items-center justify-center font-bold font-['Space_Grotesk'] text-xl">1</div>
              <span className="mt-2 font-['Space_Grotesk'] uppercase font-bold text-sm">Details</span>
            </div>
            <div className="flex flex-col items-center bg-[#e2ddd4] px-2 z-10">
              <div className="w-10 h-10 brutal-border bg-white text-black flex items-center justify-center font-bold font-['Space_Grotesk'] text-xl">2</div>
              <span className="mt-2 font-['Space_Grotesk'] uppercase font-bold text-sm">Guest</span>
            </div>
            <div className="flex flex-col items-center bg-[#e2ddd4] px-2 z-10">
              <div className="w-10 h-10 brutal-border bg-white text-black flex items-center justify-center font-bold font-['Space_Grotesk'] text-xl">3</div>
              <span className="mt-2 font-['Space_Grotesk'] uppercase font-bold text-sm opacity-50">Payment</span>
            </div>
          </div>

          {/* Step 1: Details (Active) */}
          <section className="brutal-border brutal-shadow bg-white p-6 md:p-8 relative">
            <div className="absolute -top-4 -left-4 bg-[#ffcc00] text-black font-['Space_Grotesk'] font-black px-4 py-1 text-xl brutal-border">STEP 1</div>
            <h2 className="text-4xl font-['Space_Grotesk'] font-black uppercase mt-4 mb-8">Trip Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="font-['Space_Grotesk'] font-bold text-xl border-b-[3px] border-black pb-2 uppercase">When</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="font-['Space_Grotesk'] text-sm font-bold uppercase mb-1">Check-in</label>
                    <input className="brutal-input text-lg font-bold" type="date" defaultValue="2024-10-15"/>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-['Space_Grotesk'] text-sm font-bold uppercase mb-1">Check-out</label>
                    <input className="brutal-input text-lg font-bold" type="date" defaultValue="2024-10-20"/>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="font-['Space_Grotesk'] font-bold text-xl border-b-[3px] border-black pb-2 uppercase">Who</h3>
                <div className="flex items-center justify-between brutal-border p-3">
                  <span className="font-['Space_Grotesk'] font-bold text-lg">Adults</span>
                  <div className="flex items-center gap-4">
                    <button className="w-8 h-8 brutal-border flex items-center justify-center hover:bg-[#ffcc00] bg-white font-bold text-xl">-</button>
                    <span className="font-bold text-xl w-4 text-center">2</span>
                    <button className="w-8 h-8 brutal-border flex items-center justify-center hover:bg-[#ffcc00] bg-white font-bold text-xl">+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between brutal-border p-3">
                  <div className="flex flex-col">
                    <span className="font-['Space_Grotesk'] font-bold text-lg">Children</span>
                    <span className="text-sm opacity-60">Ages 2-12</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="w-8 h-8 brutal-border flex items-center justify-center hover:bg-[#ffcc00] bg-white font-bold text-xl">-</button>
                    <span className="font-bold text-xl w-4 text-center">0</span>
                    <button className="w-8 h-8 brutal-border flex items-center justify-center hover:bg-[#ffcc00] bg-white font-bold text-xl">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button className="brutal-btn brutal-border brutal-shadow bg-[#ffcc00] text-black px-8 py-4 font-['Space_Grotesk'] font-black text-xl uppercase tracking-wider flex items-center gap-2">
                Continue to Guest Info <span className="material-symbols-outlined font-bold">arrow_forward</span>
              </button>
            </div>
          </section>

          {/* Step 2 Preview */}
          <section className="brutal-border bg-gray-100 p-6 md:p-8 opacity-75 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/50 z-10 backdrop-blur-[1px]"></div>
            <div className="absolute -top-4 -left-4 bg-gray-300 text-gray-500 font-['Space_Grotesk'] font-black px-4 py-1 text-xl brutal-border z-20">STEP 2</div>
            <div className="flex justify-between items-center mt-4">
              <h2 className="text-3xl font-['Space_Grotesk'] font-black uppercase text-gray-500">Guest Information</h2>
              <span className="material-symbols-outlined text-4xl text-gray-500">lock</span>
            </div>
          </section>
        </div>

        {/* Right Column: Summary Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 brutal-border brutal-shadow bg-white p-0 flex flex-col h-fit">
            <div className="h-48 w-full border-b-[3px] border-black relative overflow-hidden bg-gray-200">
              <Image src={trip.image} alt={trip.title} fill style={{ objectFit: 'cover' }} className="grayscale hover:grayscale-0 transition-all duration-500" />
              <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 font-bold text-sm brutal-border uppercase">Trip</div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-['Space_Grotesk'] font-black text-2xl uppercase mb-1">{trip.title}</h3>
                <p className="text-gray-500 flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-sm">location_on</span> {trip.location}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t-[3px] border-black border-dashed">
                <div className="flex justify-between items-center font-bold">
                  <span>${trip.price} x 5 nights</span>
                  <span>${trip.price * 5}.00</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span className="underline decoration-1 underline-offset-2 cursor-pointer hover:text-black">Cleaning fee</span>
                  <span>$75.00</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span className="underline decoration-1 underline-offset-2 cursor-pointer hover:text-black">Service fee</span>
                  <span>$125.00</span>
                </div>
              </div>

              <div className="pt-4 border-t-[3px] border-black">
                <div className="flex justify-between items-center font-['Space_Grotesk'] font-black text-2xl">
                  <span>TOTAL</span>
                  <span>${trip.price * 5 + 200}.00</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 uppercase font-bold text-right">Includes taxes and fees</p>
              </div>

              <div className="pt-6 flex justify-center gap-4 border-t-[3px] border-gray-100">
                <span className="material-symbols-outlined text-3xl text-black" title="Secure Payment">verified_user</span>
                <span className="material-symbols-outlined text-3xl text-black" title="Free Cancellation">event_busy</span>
                <span className="material-symbols-outlined text-3xl text-black" title="Support">support_agent</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t-4 border-gray-900 bg-gray-900 py-12 px-8 mt-auto text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div>
            <div className="text-xl font-black text-[#ffcc00] font-['Space_Grotesk'] mb-4">TRIPS</div>
            <p className="font-['Space_Grotesk'] uppercase text-sm font-bold">BAUHAUS TRIPS © 2026. FORM FOLLOWS FUNCTION.</p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end items-end font-['Space_Grotesk'] uppercase text-sm font-bold text-stone-400">
            <a className="hover:text-[#ffcc00] underline" href="#">Privacy Policy</a>
            <a className="hover:text-[#ffcc00] underline" href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
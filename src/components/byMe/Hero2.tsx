'use client';

import React, { useState, useRef } from 'react';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  Search, 
  ChevronDown,
  Plus,
  Minus,
  Navigation
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const POPULAR_DESTINATIONS = [
  { name: "Bandung", province: "West Java, Indonesia", hotels: "4.873 hotels", type: "City" },
  { name: "Yogyakarta", province: "Special Region of Yogyakarta, Indonesia", hotels: "3.333 hotels", type: "City" },
  { name: "Kuala Lumpur", province: "Malaysia", hotels: "6.122 hotels", type: "City" },
  { name: "Tokyo", province: "Kanto, Japan", hotels: "6.268 hotels", type: "City" },
  { name: "Jakarta", province: "Indonesia", hotels: "9.665 hotels", type: "Region" },
];

interface Hero2Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  guests: number;
}

export default function Hero2({ searchTerm, setSearchTerm, guests: initialGuests }: Hero2Props) {
  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  });
  const [guests, setGuests] = useState({ adults: initialGuests, children: 0, rooms: 1 });
  const [isDestOpen, setIsDestOpen] = useState(false);
  const popupRef = useRef(null);

  return (
    <section className="w-full py-4 mb-8 font-['Inter'] sticky top-0 z-50 backdrop-blur-xl" ref={popupRef}>
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-wrap lg:flex-nowrap items-stretch gap-0 bg-white rounded-2xl border border-gray-200 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
          
          {/* Destination */}
          <div className="flex-1 min-w-[280px] relative border-r border-gray-100">
            <Popover open={isDestOpen} onOpenChange={setIsDestOpen}>
              <PopoverTrigger className="w-full">
                <div className="flex items-center gap-4 h-full px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Destination</span>
                    <span className="text-gray-900 font-bold text-sm truncate leading-none">
                      {searchTerm || "Where to?"}
                    </span>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[400px]" align="start">
                <Command className="rounded-lg border-none shadow-none">
                  <div className="p-4 border-b border-gray-100">
                    <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-blue-100 hover:bg-blue-50 text-blue-600 font-semibold h-11">
                      <Navigation className="w-4 h-4" />
                      Near me
                    </Button>
                  </div>
                  <CommandInput placeholder="Search destination..." className="h-12 border-none focus:ring-0" />
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Popular Destinations">
                      {POPULAR_DESTINATIONS.map((dest) => (
                        <CommandItem
                          key={dest.name}
                          onSelect={() => {
                            setSearchTerm(dest.name);
                            setIsDestOpen(false);
                          }}
                          className="flex justify-between items-start p-3 cursor-pointer"
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm text-gray-800">{dest.name}</span>
                            <span className="text-xs text-gray-500">{dest.province}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border border-blue-100">{dest.type}</span>
                            <span className="text-[11px] text-gray-400 mt-1">{dest.hotels}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1 min-w-[280px] relative border-r border-gray-100">
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center gap-4 h-full px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Stay Date</span>
                    <span className="text-gray-900 font-bold text-sm truncate leading-none">
                      {date.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "dd MMM")} - {format(date.to, "dd MMM")}
                          </>
                        ) : (
                          format(date.from, "dd MMM")
                        )
                      ) : (
                        "Select dates"
                      )}
                    </span>
                  </div>
                  {date.from && date.to && (
                    <span className="text-[9px] font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md ml-auto">
                      {Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))} Night
                    </span>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={{ from: date.from, to: date.to }}
                  onSelect={(range) => setDate({ from: range?.from, to: range?.to })}
                  numberOfMonths={2}
                  className="rounded-xl border shadow-2xl bg-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1 min-w-[280px] relative">
            <Popover>
              <PopoverTrigger>
                <div className="flex items-center justify-between h-full px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Guests</span>
                      <span className="text-gray-900 font-bold text-sm truncate leading-none">
                        {guests.adults} Ad, {guests.children} Ch, {guests.rooms} Rm
                      </span>
                    </div>
                  </div>
                  <ChevronDown className="text-gray-400 w-4 h-4 group-hover:text-gray-600 transition-colors" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-6" align="end">
                <div className="space-y-6">
                  {[
                    { label: "Adult", key: "adults", icon: <Users className="w-4 h-4" /> },
                    { label: "Children", key: "children", icon: <Navigation className="w-4 h-4 rotate-180" /> },
                    { label: "Room", key: "rooms", icon: <Search className="w-4 h-4" /> }
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="text-blue-500">{item.icon}</div>
                        <span className="font-semibold text-gray-700">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 rounded-full border-gray-200"
                          onClick={() => {
                            const k = item.key as keyof typeof guests;
                            setGuests({ ...guests, [k]: Math.max(k === "rooms" || k === "adults" ? 1 : 0, guests[k] - 1) });
                          }}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-bold text-gray-700 w-4 text-center">{guests[item.key as keyof typeof guests]}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="w-8 h-8 rounded-full border-gray-200 bg-gray-50 hover:bg-gray-100"
                          onClick={() => {
                            const k = item.key as keyof typeof guests;
                            setGuests({ ...guests, [k]: guests[k] + 1 });
                          }}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11 rounded-xl shadow-lg shadow-blue-200 font-bold mt-4">
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <div className="p-2 flex items-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-full rounded-xl font-bold gap-3 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all active:scale-95 text-sm min-w-[140px]">
              Search
              <Search className="w-4 h-4" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}

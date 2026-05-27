"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Home,
  User,
  Briefcase,
  Mail,
  Settings as SettingsIcon,
} from "lucide-react";
import Window from "./Window";

const NAV_ITEMS = [
  { id: "home", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "projects", icon: Mail, label: "Projects" },
];

const Navbar: React.FC = () => {
  const [active, setActive] = React.useState("home");
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActive(id);
    }
  };

  return (
    <>
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 md:top-6 md:bottom-auto z-50 flex items-center gap-1 p-2 px-2.5 bg-[#020617]/60 backdrop-blur-[8px] rounded-full border border-black/10 dark:border-white/10">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
className={`px-4 py-2.5 rounded-full transition-all duration-300 group relative flex items-center gap-2 cursor-pointer ${
  active === item.id
    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
}`}
          >
            <item.icon size={18} strokeWidth={active === item.id ? 2.5 : 2} />
            <span
className={`text-xs font-medium uppercase tracking-wider hidden md:block ${
  active === item.id
    ? "opacity-100"
    : "opacity-70 group-hover:opacity-100"
}`}
            >
              {item.label}
            </span>
            {active === item.id && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 bg-primary rounded-full -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
        <div className="w-[0.5px] h-6 mx-2 bg-border" />
        <button
          onClick={() => setIsSettingsOpen(true)}
className={`p-2.5 rounded-full transition-all duration-300 group relative flex items-center justify-center cursor-pointer ${
  isSettingsOpen
    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
}`}
        >
          <SettingsIcon size={18} strokeWidth={isSettingsOpen ? 2.5 : 2} />
          {isSettingsOpen && (
            <motion.div
              layoutId="activeNav"
              className="absolute inset-0 bg-primary rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      </nav>

      <Window
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default Navbar;

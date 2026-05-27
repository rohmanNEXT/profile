"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
  { id: "settings", label: "Settings" },
  { id: "footer", label: "Footer" },
];

const VerticalNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-8">
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border -z-10" />

      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className="group relative flex items-center"
        >
<div
  className={`w-3 h-3 rounded-full border-2 border-background transition-all duration-300 ${
    activeSection === section.id
      ? "bg-primary scale-125 shadow-[0_0_10px_rgba(var(--primary),0.5)]"
      : "bg-muted-foreground/30 group-hover:bg-primary/50"
  }`}
/>

<span
  className={`absolute left-8 whitespace-nowrap text-xs font-medium uppercase tracking-widest transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ${
    activeSection === section.id
      ? "text-primary opacity-100 translate-x-0"
      : "text-muted-foreground"
  }`}
>
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default VerticalNav;

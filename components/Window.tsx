"use client";

import React from "react";
import { motion } from "motion/react";
import { Moon, Sun, Monitor, X } from "lucide-react";
import { useThemeStore } from "../lib/store";
import { cn } from "../lib/utils";

interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const Window: React.FC<WindowProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useThemeStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass backdrop-sm p-6 sm:p-8 md:p-10 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] max-w-[90vw] sm:max-w-xl w-full relative shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="text-center space-y-2 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-foreground">
            Theme Settings
          </h2>
          <p className="text-muted-foreground text-[10px] sm:text-xs max-w-[200px] sm:max-w-xs mx-auto">
            Personalize your viewing experience with real-time theme updates.
          </p>
          <div className="w-10 h-1 sm:w-12 sm:h-1 bg-primary/40 mx-auto rounded-full mt-3 sm:mt-4" />
        </div>
        <div className="flex justify-center">
        <div className="flex flex-wrap justify-center p-2 px-3 bg-white/5 rounded-full border border-border backdrop-blur-2xl shadow-inner gap-2 sm:gap-3 max-w-3xl">
          <button
            onClick={() => setTheme("light")}
            className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full transition-all duration-500 font-medium text-[10px] sm:text-xs md:text-sm tracking-widest cursor-pointer ${theme === "light"
                ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/40 scale-105"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Sun size={18} />
            <span>Light </span>
          </button> 
          <button
            onClick={() => setTheme("dark")}
            className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full transition-all duration-500 font-medium text-[10px] sm:text-xs md:text-sm tracking-widest cursor-pointer ${theme === "dark"
                ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/40 scale-105"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Moon size={18} />
            <span>Dark </span>
          </button>
        </div> 
        </div>
      </motion.div>
    </div>
  );
};

export default Window;

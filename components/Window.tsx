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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass p-8 md:p-10 rounded-[40px] max-w-xl w-full relative shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="text-center space-y-2 mb-8">
          <h2 className="text-xl md:text-2xl font-medium text-foreground">
            Theme Settings
          </h2>
          <p className="text-muted-foreground text-xs max-w-xs mx-auto">
            Personalize your viewing experience with real-time theme updates.
          </p>
          <div className="w-12 h-1 bg-primary/40 mx-auto rounded-full mt-4" />
        </div>

        <div className="flex flex-wrap justify-center p-2 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-2xl shadow-inner gap-2">
<button
  onClick={() => setTheme("light")}
  className={`flex items-center gap-3 px-8 py-4 rounded-[24px] transition-all duration-500 font-medium text-sm uppercase tracking-widest cursor-pointer ${
    theme === "light"
      ? "bg-primary text-black shadow-2xl shadow-primary/40 scale-105"
      : "text-muted-foreground hover:text-foreground"
  }`}
>
  <Sun size={20} />
  Light
</button>

<button
  onClick={() => setTheme("dark")}
  className={`flex items-center gap-3 px-8 py-4 rounded-[24px] transition-all duration-500 font-medium text-sm uppercase tracking-widest cursor-pointer ${
    theme === "dark"
      ? "bg-primary text-black shadow-2xl shadow-primary/40 scale-105"
      : "text-muted-foreground hover:text-foreground"
  }`}
>
  <Moon size={20} />
  Dark
</button>

<button
  onClick={() => setTheme("blue")}
  className={`flex items-center gap-3 px-8 py-4 rounded-[24px] transition-all duration-500 font-medium text-sm uppercase tracking-widest cursor-pointer ${
    theme === "blue"
      ? "bg-primary text-black shadow-2xl shadow-primary/40 scale-105"
      : "text-muted-foreground hover:text-foreground"
  }`}
>
  <Monitor size={20} className="text-blue-500" />
  Blue
</button>

<button
  onClick={() => setTheme("green")}
  className={`flex items-center gap-3 px-8 py-4 rounded-[24px] transition-all duration-500 font-medium text-sm uppercase tracking-widest cursor-pointer ${
    theme === "green"
      ? "bg-primary text-black shadow-2xl shadow-primary/40 scale-105"
      : "text-muted-foreground hover:text-foreground"
  }`}
>
  <Monitor size={20} className="text-green-500" />
  Green
</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Window;

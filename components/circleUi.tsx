"use client";

import React from "react";
import { cn } from "../lib/utils";
import { LucideIcon } from "lucide-react";

interface CircleUiProps {
  icon: LucideIcon;
  rotateText?: string;
  largeCircle?: boolean;
}

const CircleUi: React.FC<CircleUiProps> = ({ 
  icon: Icon,
  rotateText = "My Job Experience • My Job Experience • My Job Experience • ",
  largeCircle = true
}) => {
  return (
    <div className="relative inline-block mb-6">
      <div
  className={`rounded-full border border-[rgba(255,255,255,0.1)] flex items-center justify-center animate-[spin_14s_linear_infinite] ${
    largeCircle ? "w-48 h-48" : "w-32 h-32"
  }`}
>
  <svg className="absolute w-full h-full" viewBox="0 0 100 100">
    <path
      id="circlePath"
      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
      fill="none"
    />

    <text
      className={`uppercase tracking-[0.2em] fill-muted-foreground font-medium ${
        largeCircle ? "text-[8px]" : "text-[6px]"
      }`}
    >
      <textPath href="#circlePath">
        {rotateText}
      </textPath>
    </text>
  </svg>
</div>
      <div className="flex items-center justify-center text-primary absolute inset-0">
        <Icon size={largeCircle ? 40 : 32} />
      </div>
    </div>
  );
};

export default CircleUi;

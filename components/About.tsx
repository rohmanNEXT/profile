"use client";

import React from "react";
import { motion } from "motion/react";
import { Award } from "lucide-react";

const About: React.FC = () => {
  return (
    <section className="section-padding flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 mb-16"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-medium text-foreground">About Me</h2>
          <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full" />
        </div>
      </motion.div>

      <div className="flex flex-col gap-8 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-4xl space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          <p className="text-muted-foreground/80 leading-relaxed text-[10px] md:text-xs font-light text-center tracking-tight">
            I am <span className="text-foreground/80 font-medium">Muhammad Rachman</span> — a Web Developer focused on React, Next.js, and JavaScript. I build fast, clean, and user-friendly web applications with attention to UI/UX.
          </p>
          <p className="text-muted-foreground/80 leading-relaxed text-[10px] md:text-xs font-light text-center tracking-tight">
            Experienced in API integration, state management, and modern architecture to produce efficient and responsive applications.
          </p>
          <div className="pt-2 text-center">
            <button 
              onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-primary font-medium hover:underline underline-offset-12 decoration-1 transition-all text-[10px] cursor-pointer"
            >
              View My Skill
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-4xl flex flex-col items-center justify-center space-y-3 border-primary/10 max-w-xs mx-auto w-full"
        >
          <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-inner border border-primary/20 cursor-pointer">
            <Award size={24} />
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-3xl font-medium tracking-tighter">0+</h3>
            <p className="text-muted-foreground font-medium uppercase tracking-widest text-[8px]">Years Job Experience </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

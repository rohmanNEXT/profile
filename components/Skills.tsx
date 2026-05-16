"use client";

import React from "react";
import { motion } from "motion/react";
import { SKILLS } from "../lib/object/constants";

const Skills: React.FC = () => {
  return (
    <section className="section-padding flex flex-col items-center pt-0">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 mb-16"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-medium text-foreground">
            Skills
          </h2>
          <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full" />
          <p className="text-muted-foreground text-sm font-light max-w-md mx-auto mt-4">
            Libraries I have used.
          </p>
        </div>
      </motion.div>

      <div className="max-w-4xl w-full space-y-16">
        {SKILLS.map((category, idx) => (
          <div key={idx} className="space-y-8">
            <h3 className="text-center text-primary font-medium text-lg tracking-wide">
              {category.category}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {category.items.map((skill, sIdx) => (
                <motion.div
                  key={sIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ delay: sIdx * 0.05 }}
                  className="glass p-3 rounded-4xl w-[110px] flex flex-col items-center gap-4 group relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium text-base group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                    {skill.icon}
                  </div>
                  <div className="text-center relative z-10">
                    <p className="font-medium text-[9px] mb-2 tracking-tight">
                      {skill.name}
                    </p>
                    <p className="text-[6px] text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 uppercase tracking-widest">
                      {skill.experience}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

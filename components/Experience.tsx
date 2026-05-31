"use client";

import React from "react";
import { motion } from "motion/react";
import { EXPERIENCES } from "../lib/object/constants";
import { Calendar, MapPin, Clock, Briefcase, Wallet } from "lucide-react";
import { cn } from "../lib/utils";
import CircleUi from "./circleUi";

const Experience: React.FC = () => {
  return (
    <section className="section-padding flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 mb-16"
      >
        <CircleUi icon={Briefcase} />
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-medium text-foreground">
            Experience
          </h2>
          <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full" />
        </div>
      </motion.div>

      <div className="max-w-3xl w-full relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

        <div className="space-y-24">
          {EXPERIENCES.map((exp, idx) => (
            <div
  key={idx}
  className={`relative flex flex-col md:flex-row items-center gap-12 ${
    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
  }`}
>
              {/* Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 hidden md:block shadow-lg shadow-primary/20" />

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-3xl w-full md:w-[calc(50%-2.5rem)] space-y-4 relative group hover:shadow-2xl transition-all duration-500"
              >
                {/* Category */}
                <div className="flex justify-start">
                  <span className="text-[9px] bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/30 flex items-center gap-2 font-medium uppercase tracking-widest">
                    <Briefcase size={10} />
                    {exp.category}
                  </span>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground">
                    {exp.company}
                  </h3>

                  {/* Info */}
                  <div className="space-y-2 text-xs text-foreground/80">
                    <div className="flex items-center gap-3">
                      <Calendar size={14} className="text-primary/70" />
                      <span className="font-medium">{exp.period}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin size={10} className="text-primary/70" />
                      <span className="font-medium">{exp.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4 text-[9px]">
                      <div className="inline-flex items-center gap-3 bg-primary/5 px-3 h-7 rounded-full text-primary font-medium shadow-inner border border-primary/30">
                        <Clock size={10} />
                        <span>Duration: {exp.duration}</span>
                      </div>
                      {/* Salary (auto hide jika kosong) */}
                      {exp.salary?.trim() ? (
                        <div className="inline-flex items-center gap-3 bg-primary/5 px-3 h-7 rounded-full text-primary font-medium shadow-inner border border-primary/30">
                          <Wallet size={10} />
                          <span>{exp.salary}</span>
                        </div>
                      ) : null}{" "}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="font-medium text-[9px] uppercase tracking-[0.2em] text-foreground/60">
                    Key Achievements
                  </p>
                  <ul className="space-y-2">
                    {exp.achievements.map((item, iIdx) => (
                      <li
                        key={iIdx}
                        className="text-xs text-foreground/70 flex items-start gap-3 leading-relaxed"
                      >
                        <span className="w-1 h-1 bg-primary/60 rounded-full mt-1.5 shrink-0 shadow-lg shadow-primary/30" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

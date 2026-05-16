"use client";

import React from "react";
import { motion } from "motion/react";
import { DOCUMENTATION } from "../lib/object/constants";
import { ExternalLink } from "lucide-react";

const Documentation: React.FC = () => {
  return (
    <section id="documentation" className="section-padding flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 mb-16"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-medium text-foreground">Documentation</h2>
          <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full" />
          <p className="text-muted-foreground text-sm font-light max-w-md mx-auto mt-4">Project and learning documentation</p>
        </div>
      </motion.div>

      <div className="max-w-3xl w-full flex flex-wrap justify-center gap-8">
        {DOCUMENTATION.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 rounded-3xl space-y-6 border border-border/50 hover:border-primary/30 transition-all group w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-22px)]"
          >
            <h3 className="text-primary font-medium text-lg tracking-wide border-b border-primary/10 pb-3">
              {item.category}
            </h3>
            
            <div className="space-y-3">
              {item.links.map((link, lIdx) => (
                <a
                  key={lIdx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-full bg-card hover:bg-primary/10 text-foreground hover:text-primary transition-all border border-border/50 group/link"
                >
                  <span className="text-xs font-light w-40 mx-1">{link.title}</span>
                  <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Documentation;

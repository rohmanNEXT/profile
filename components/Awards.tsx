"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { AWARDS } from "../lib/object/constants";
import { ExternalLink } from "lucide-react";
import { Alert, CloseButton } from "@heroui/react";

import Image from "next/image";

const Awards: React.FC = () => {
  const [showAlert, setShowAlert] = React.useState(false);

  const handleAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 4000);
  };

  return (
    <section className="section-padding flex flex-col items-center pt-0 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 mb-16"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-medium text-foreground">
            Awards
          </h2>
          <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full" />
        </div>
      </motion.div>

      <AnimatePresence>
        {showAlert && (
          <motion.div
            key="alert"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 z-[110] w-full max-w-xs px-3"
          >
            <Alert
              color="secondary"
              className="shadow-lg glass backdrop-blur-[8px] rounded-3xl"
            >
              <Alert.Indicator className="top-0.5 right-1" style={{ fontSize: '12px' }}/>
              <Alert.Content>
                <Alert.Title className="font-light" style={{ fontSize: '12px' }}>
                  Maaf, privasi. File tidak bisa diakses.
                </Alert.Title>
              </Alert.Content>
              <CloseButton
                onClick={() => setShowAlert(false)}
                className="glass hover:!bg-white/10 backdrop-blur-[8px] text-foreground top-0.5 left-0.5"
              />
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-10 max-w-7xl w-full">
        {AWARDS.map((award, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="glass rounded-3xl overflow-hidden group hover:shadow-2xl transition-all duration-500 w-full md:w-[calc(50%-2.5rem)] lg:w-[calc(33.333%-2.5rem)] max-w-sm"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={award.image}
                alt={award.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-6 text-center space-y-4">
              <h3 className="font-medium text-lg tracking-tight">
                {award.title}
              </h3>
              <button
                onClick={handleAlert}
                className="inline-flex items-center gap-2 bg-card hover:bg-muted text-foreground px-5 py-2.5 rounded-full text-xs font-medium transition-all border border-border cursor-pointer"
              >
                <ExternalLink size={14} />
                View File
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Awards;

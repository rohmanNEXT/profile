"use client";

import React from "react";
import { motion } from "motion/react";
import {
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaBriefcase,
  FaEnvelope,
  FaThLarge,
} from "react-icons/fa";

import Image from "next/image";

import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background pb-8 md:pb-0 md:pt-12 lg:pt-20 xl:pt-24 2xl:pt-28">
      <div className="max-w-2xl w-full space-y-6">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto w-28 h-28 md:w-40 md:h-60"
        >
          <div className="absolute inset-0 rounded-full border-2 border-primary shadow-[0_0_20px_rgba(139,92,246,0.2)]" />
          <div className="absolute inset-1 rounded-full overflow-hidden bg-card">
            <Image
              src="/next.jpeg"
              alt="Muhammad Rachman"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        </motion.div>

        {/* Name and Title */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-4xl font-medium tracking-tighter text-foreground"
          >
            Muhammad Rachman
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-primary font-medium"
          >
            <FaBriefcase
              size={14}
              className="drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]"
            />
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase">
              Full Stack Web Developer
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400/80 max-w-md mx-auto leading-relaxed text-[10px] md:text-xs"
          >
            Building modern web applications that are responsive, efficient, and
            focused on user experience.
          </motion.p>
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() =>
                document
                  .getElementById("experience")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black px-5 py-2.5 rounded-full text-xs font-medium transition-all shadow-lg shadow-primary/20 cursor-pointer"
            >
              <FaThLarge size={14} />
              My Project
            </button>
            <Link
              href="/cv"
              className="flex items-center gap-2 bg-card hover:bg-muted text-foreground px-5 py-2.5 rounded-full text-xs font-medium transition-all border border-border cursor-pointer"
            >
              Download CV
            </Link>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black px-8 py-2.5 rounded-full text-xs font-medium transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <FaEnvelope size={14} />
            Contact Me
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 pt-1"
        >
          {[
            { icon: FaGithub, href: "https://github.com/rohmanNEXT" },
            {
              icon: FaLinkedin,
              href: "https://www.linkedin.com/in/muhammad-rachman-7b61b3276/",
            },
            { icon: FaGlobe, href: "https://rohman-profile.vercel.app" },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-card hover:bg-primary/20 text-primary rounded-full transition-all duration-300 border border-border shadow-lg"
            >
              <social.icon size={16} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

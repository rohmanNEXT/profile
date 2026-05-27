"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Documentation from "../components/Documentation";
import Awards from "../components/Awards";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary"
      suppressHydrationWarning
    >
      <Navbar />

      <main className="relative">
        <section id="home">
          <Hero />
        </section>

        <div className="pt-14">
          <hr className="border-t border-border/80 w-full max-w-4xl mx-auto" />
        </div>

        <div id="about" className="space-y-0 pt-8">
          <About />
          <div id="awards">
            <Awards />
          </div>
          <div id="skills" className="space-y-0 pt-8">
            <Skills />
          </div>
        </div>

        <div className="pt-8">
          <hr className="border-t border-border/80 w-full max-w-4xl mx-auto" />
        </div>

        <div id="experience" className="pt-8">
          <div className="max-w-7xl mx-auto space-y-0">
            <Experience />

            <div id="projects" className="space-y-0 pt-8">
              <Projects />
            </div>

            <Documentation />
          </div>
        </div>

        <div className="pt-8">
          <hr className="border-t border-border/80 w-full max-w-4xl mx-auto" />
        </div>

        <div id="contact" className="pt-8">
          <Contact />
        </div>

        <div className="pt-8">
          <hr className="border-t border-border/80 w-full max-w-4xl mx-auto" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

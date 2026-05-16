"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS } from "../lib/object/constants";
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
import ProjectDetailModal from "./ProjectDetailModal";
import { Project } from "../lib/types";

import Image from "next/image";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="section-padding flex flex-col items-center pt-0">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 mb-16"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-medium text-foreground">
            Projects
          </h2>
          <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="glass rounded-3xl overflow-hidden group"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors"
                >
                  <FaExternalLinkAlt size={18} />
                </a>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <h3 className="text-base font-medium tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="text-muted-foreground/80 text-xs leading-relaxed font-light tracking-tight">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[7px] bg-primary/5 px-2.5 py-1 rounded-full text-primary/80 font-medium uppercase tracking-widest border border-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-border/10">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 bg-card hover:bg-muted rounded-full text-[10px] font-medium transition-all border border-border"
                >
                  <FaGithub size={12} />
                  Code
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 bg-card hover:bg-muted rounded-full text-[10px] font-medium transition-all border border-border"
                >
                  <FaExternalLinkAlt size={12} />
                  Demo
                </a>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="col-span-2 lg:col-span-1 flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary/90 text-black rounded-full text-[10px] font-medium transition-all shadow-xl shadow-primary/10 cursor-pointer"
                >
                  <FaInfoCircle size={12} />
                  Fitur
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={()=> setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

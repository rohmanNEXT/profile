"use client";

import React from "react";
import { motion } from "motion/react";
import { FaTimes, FaChevronRight, FaExternalLinkAlt } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { Project } from "../lib/types";

interface ProjectDetailModalProps {
  onClose: () => void;
  project: Project;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ onClose, project }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm p-6 bg-background/60 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="glass backdrop-blur-sm p-6 md:p-10 rounded-4xl max-w-xl w-full relative shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-9 right-9 p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <FaTimes size={18} />
        </button>

        <div className="text-center space-y-2 mb-8">
          <h2 className="text-xl md:text-2xl font-medium text-foreground">
            {project.title}
          </h2>
          <p className="text-foreground/70 text-[10px] uppercase tracking-[0.2em] font-semibold">Fitur</p>
          <div className="w-12 h-1 bg-primary/40 mx-auto rounded-full mt-4" />
        </div>


        <div className="max-h-[400px] overflow-y-auto pr-2 mb-1 mx-1 detail-scrollbar">
          {project.testLogin && (
            <div className="mb-10 p-5 rounded-4xl bg-white/5 border border-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="relative z-10 mx-2">
                <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-4">Test Login</h3>
                <div className="space-y-3">
                  {project.testLogin.user && (
                    <div className="p-4 px-5 rounded-2xl bg-primary/5 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider">User</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block mb-1">Email</span>
                          <span className="text-xs text-foreground/80 font-medium tracking-tight block">{project.testLogin.user.email}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block mb-1">Password</span>
                          <span className="text-xs text-foreground/80 font-medium tracking-tight block">{project.testLogin.user.password}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {project.testLogin.admin && (
                    <div className="p-4 px-5 rounded-2xl bg-primary/5 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] bg-primary/30 text-primary px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider">Admin</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block mb-1">Email</span>
                          <span className="text-xs text-foreground/80 font-medium tracking-tight block">{project.testLogin.admin.email}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block mb-1">Password</span>
                          <span className="text-xs text-foreground/80 font-medium tracking-tight block">{project.testLogin.admin.password}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {project.testLogin.superadmin && (
                    <div className="p-4 px-5 rounded-2xl bg-primary/5 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] bg-primary/30 text-primary px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider">Superadmin</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block mb-1">Email</span>
                          <span className="text-xs text-foreground/80 font-medium tracking-tight block">{project.testLogin.superadmin.email}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block mb-1">Password</span>
                          <span className="text-xs text-foreground/80 font-medium tracking-tight block">{project.testLogin.superadmin.password}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {project.testLogin && <hr className="border-border/80 border mb-12" />}
          <div className={`grid gap-6 ${(project.features?.be && project.features.be.length > 0) || (project.features?.allLib && project.features.allLib.length > 0) ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-primary uppercase tracking-wider">Frontend</h3>
            <ul className="space-y-2">
              {project.features?.fe.map((feat, idx) => {
                if (typeof feat === "string") {
                  return (
                    <li key={idx} className="text-xs text-foreground/70">
                      <div className="flex items-center gap-2">
                        <FaChevronRight size={12} className="text-primary/60 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    </li>
                  );
                } else {
                  return (
                    <li key={idx} className="text-xs text-foreground/70 space-y-1">
                      <div className="flex items-center gap-2">
                        <FaChevronRight size={12} className="text-primary/60 flex-shrink-0" />
                        <span className="font-medium text-foreground">{feat.title}</span>
                      </div>
                      <ul className="pl-4 space-y-1">
                        {feat.items.map((item, iIdx) => (
                          <li key={iIdx} className="text-xs text-foreground/70 flex items-center gap-2">
                            <BsDot size={12} className="text-muted-foreground/40 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          {project.features?.be && project.features.be.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-primary uppercase tracking-wider">Backend</h3>
              <ul className="space-y-2">
                {project.features?.be.map((feat, idx) => {
                  if (typeof feat === "string") {
                    return (
                      <li key={idx} className="text-xs text-foreground/70">
                        <div className="flex items-center gap-2">
                          <FaChevronRight size={12} className="text-primary/60 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li key={idx} className="text-xs text-foreground/70 space-y-1">
                        <div className="flex items-center gap-2">
                          <FaChevronRight size={12} className="text-primary/60 flex-shrink-0" />
                          <span className="font-medium text-foreground">{feat.title}</span>
                        </div>
                        <ul className="pl-4 space-y-1">
                          {feat.items.map((item, iIdx) => (
                            <li key={iIdx} className="text-xs text-foreground/70 flex items-center gap-2">
                              <BsDot size={12} className="text-muted-foreground/40 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}

          {project.features?.allLib && project.features.allLib.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-primary uppercase tracking-wider">All Library</h3>
              <ul className="space-y-2">
                {project.features?.allLib.map((feat, idx) => {
                  if (typeof feat === "string") {
                    return (
                      <li key={idx} className="text-xs text-foreground/70">
                        <div className="flex items-center gap-2">
                          <FaChevronRight size={12} className="text-primary/60 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li key={idx} className="text-xs text-foreground/70 space-y-1">
                        <div className="flex items-center gap-2">
                          <FaChevronRight size={12} className="text-primary/60 flex-shrink-0" />
                          <span className="font-medium text-foreground">{feat.title}</span>
                        </div>
                        <ul className="pl-4 space-y-1">
                          {feat.items.map((item, iIdx) => (
                            <li key={iIdx} className="text-xs text-foreground/70 flex items-center gap-2">
                              <BsDot size={12} className="text-muted-foreground/40 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetailModal;

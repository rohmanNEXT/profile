"use client";

import React, { useRef, useCallback } from "react";
import { FaDownload, FaArrowLeft, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { domToPng } from "modern-screenshot";
import { jsPDF } from "jspdf";
import Footer from "../../components/Footer";

import {
  HEADER,
  ABOUT,
  CV_SKILLS,
  EDUCATION_LIST,
  EXPERIENCES_2,
  CV_PROJECTS,
  REFERENCES,
} from "../../lib/object/pdf";
import { useThemeStore } from "../../lib/store";

const CVPage: React.FC = () => {
  // Access store to trigger theme rehydration on direct page load
  useThemeStore();

  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);

  const downloadPDF = useCallback(async () => {
    if (!page1Ref.current || !page2Ref.current) return;

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageW = 210;
      const pageH = 297;

      // Render Page 1 to JPEG
      const p1Url = await domToPng(page1Ref.current, {
        scale: 1.2,
        backgroundColor: "#ffffff",
        quality: 0.75,
      });

      // Render Page 2 to JPEG
      const p2Url = await domToPng(page2Ref.current, {
        scale: 1.2,
        backgroundColor: "#ffffff",
        quality: 0.75,
      });

      // ─── PAGE 1: ATS Text stream (hidden behind image) ───
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(1);
      pdf.setTextColor(0, 0, 0, 0); // Transparent color
      
      const atsTextP1 = `
        ${HEADER.name}
        ${HEADER.role}
        ${HEADER.location} | ${HEADER.phone} | ${HEADER.email}
        
        About Me
        ${ABOUT}
        
        Skills
        ${CV_SKILLS.map(c => `${c.category}: ${c.items.join(", ")}`).join("\n")}
        
        Job Experience
        ${EXPERIENCES_2.map(exp => `
          ${exp.role}
          ${exp.company} - ${exp.location}
          ${exp.period} (${exp.duration})
          ${exp.achievements.join("\n")}
        `).join("\n")}
      `;
      pdf.text(atsTextP1, 10, 10);

      // Add Page 1 Image on top of the text
      pdf.addImage(p1Url, "JPEG", 0, 0, pageW, pageH, undefined, "MEDIUM");

      // ─── PAGE 2: ATS Text stream (hidden behind image) ───
      pdf.addPage();
      
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(1);
      pdf.setTextColor(0, 0, 0, 0); // Transparent color
      
      const atsTextP2 = `
        Projects
        ${CV_PROJECTS.map(p => `${p.title} (${p.demoUrl || ""})\n${p.description}\nTech Stack: ${p.techStack.join(", ")}`).join("\n\n")}
        
        Education
        ${EDUCATION_LIST.map(edu => `
          ${edu.school} - ${edu.location}
          ${edu.major} (${edu.date})
        `).join("\n")}
        
        Online Profiles
        ${REFERENCES.map(r => `${r.label}: ${r.url}`).join("\n")}
      `;
      pdf.text(atsTextP2, 10, 10);

      // Add Page 2 Image on top of the text
      pdf.addImage(p2Url, "JPEG", 0, 0, pageW, pageH, undefined, "MEDIUM");

      pdf.save("Muhammad_Rachman_CV.pdf");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <div className="pt-16 pb-16 px-4 md:px-8">
        {/* Navigation */}
        <div className="w-full max-w-[800px] mx-auto flex justify-between items-center mb-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
          >
            <FaArrowLeft />
            Back
          </Link>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black px-5 py-2.5 rounded-full text-xs font-medium transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <FaDownload />
            Download CV
          </button>
        </div>

        {/* CV Content - Explicitly Paginated A4 */}
        <div className="w-full overflow-x-auto">
          <div className="flex flex-col items-center gap-8 min-w-[900px] py-12 px-4">
            
            {/* PAGE 1 */}
            <div
              ref={page1Ref}
              style={{
                width: "210mm",
                height: "297mm",
                padding: "16mm 20mm",
                boxSizing: "border-box",
              }}
              className="bg-white border border-gray-200 shadow-2xl text-gray-900 font-sans flex flex-col justify-between"
            >
              <div>
                {/* HEADER */}
                <header className="text-center mb-6 pb-4 border-b border-gray-200">
                  <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900">
                    {HEADER.name}
                  </h1>
                  <p className="text-xl text-violet-700 font-medium mt-2 tracking-wide">
                    {HEADER.role}
                  </p>

                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-xs text-gray-600">
                    <span className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-violet-600/80" size={12} />
                      {HEADER.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaPhone className="text-violet-600/80" size={12} />
                      {HEADER.phone}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaEnvelope className="text-violet-600/80" size={12} />
                      {HEADER.email}
                    </span>
                  </div>
                </header>

                {/* ABOUT ME */}
                <section className="mt-8 mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700 border-b border-gray-200 pb-2 mb-3">
                    About Me
                  </h2>
                  <p className="text-xs text-gray-700 leading-[1.8] text-justify">
                    {ABOUT}
                  </p>
                </section>

                {/* SKILLS */}
                <section className="mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700 border-b border-gray-200 pb-2 mb-3">
                    Skills
                  </h2>
                  <div className="space-y-2.5">
                    {CV_SKILLS.map((category, idx) => (
                      <div key={idx} className="flex gap-4 text-xs leading-[1.6]">
                        <span className="font-semibold text-gray-800 whitespace-nowrap min-w-[140px]">
                          {category.category}:
                        </span>
                        <span className="text-gray-600">
                          {category.items.join(", ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* JOB EXPERIENCE */}
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700 border-b border-gray-200 pb-2 mb-3">
                    Job Experience
                  </h2>
                  <div className="space-y-5">
                    {EXPERIENCES_2.map((exp, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-bold text-gray-900">
                              {exp.role}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">
                              {exp.company} — {exp.location}
                            </p>
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            <p className="text-xs text-gray-700 font-bold">
                              {exp.period}
                            </p>
                            <p className="text-[10px] text-gray-500 font-medium">
                              {exp.duration}
                            </p>
                          </div>
                        </div>
                        <ul className="mt-2 space-y-1.5">
                          {exp.achievements.map((achievement, aIdx) => (
                            <li
                              key={aIdx}
                              className="text-xs text-gray-600 leading-[1.6] pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-violet-700/60"
                            >
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* PAGE 2 */}
            <div
              ref={page2Ref}
              style={{
                width: "210mm",
                height: "297mm",
                padding: "20mm",
                boxSizing: "border-box",
              }}
              className="bg-white border border-gray-200 shadow-2xl text-gray-900 font-sans flex flex-col justify-between"
            >
              <div>
                {/* PROJECTS */}
                <section className="mb-8">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700 border-b border-gray-200 pb-2 mb-4">
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {CV_PROJECTS.map((project, idx) => (
                      <div key={idx}>
                        <div className="flex items-baseline gap-3">
                          <h3 className="text-xs font-bold text-gray-900">
                            {project.title}
                          </h3>
                          {project.demoUrl && (
                            <span className="text-[10px] text-gray-500">
                              {project.demoUrl}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-600 leading-[1.6] mt-1">
                          {project.description}
                        </p>
                        <p className="text-[10px] text-gray-600 mt-1.5">
                          <span className="font-semibold text-gray-800">Tech Stack:</span>{" "}
                          {project.techStack.join(", ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* EDUCATION */}
                <section className="mb-8">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700 border-b border-gray-200 pb-2 mb-4">
                    Education
                  </h2>
                  <div className="space-y-5">
                    {EDUCATION_LIST.map((edu, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xs font-bold text-gray-900">
                              {edu.school}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">
                              {edu.major}
                            </p>
                            <p className="text-[10px] text-gray-600 mt-1">
                              {edu.location}
                            </p>
                          </div>
                          <p className="text-xs text-gray-700 font-bold shrink-0 ml-4">
                            {edu.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ONLINE PROFILES */}
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700 border-b border-gray-200 pb-2 mb-4">
                    Online Profiles
                  </h2>
                  <div className="flex flex-col gap-y-2 mt-2">
                    {REFERENCES.map((ref, idx) => (
                      <p key={idx} className="text-xs text-gray-600">
                        <span className="font-semibold text-gray-800">
                          {ref.label}:
                        </span>{" "}
                        {ref.url}
                      </p>
                    ))}
                  </div>
                </section>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="pt-8">
        <hr className="border-t border-border/80 w-full max-w-4xl mx-auto" />
      </div>
      <Footer />
    </div>
  );
};

export default CVPage;

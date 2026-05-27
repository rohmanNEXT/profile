"use client";

import React, { useRef } from "react";
import { FaDownload, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { domToPng } from "modern-screenshot";
import jsPDF from "jspdf"; 
import Footer from "../../components/Footer";

import { PROJECTS } from "../../lib/object/constants";
import {
  HEADER,
  ABOUT,
  SKILLS,
  EDUCATION,
  EXPERIENCES_2,
  REFERENCES,
} from "../../lib/object/pdf";

const CVPage: React.FC = () => {
  const cvRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!cvRef.current) return;

    const dataUrl = await domToPng(cvRef.current, {
      scale: 2,
      backgroundColor: "#1a1a1a",
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = 210;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= 297;

    while (heightLeft > 0) {
      position -= 297;
      pdf.addPage();
      pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= 297;
    }

    pdf.save("Muhammad_Rachman_CV.pdf");
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <div className="pt-16 pb-16 px-8">
        {/* Header */}
        <div className="w-full max-w-[800px] mx-auto flex justify-between items-center mb-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-medium"
          >
            <FaArrowLeft />
            Back
          </Link>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black px-5 py-2.5 rounded-full text-xs font-medium transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <FaDownload />
            CV PDF
          </button>
        </div>

        {/* CENTER + SCROLL */}
        <div className="w-full overflow-x-auto">
          <div className="flex justify-center min-w-[900px]">
            {/* CV A4 */}
            <div
              ref={cvRef}
              style={{
                width: "210mm",
                minHeight: "297mm",
                padding: "20mm",
                boxSizing: "border-box",
              }}
              className="bg-[#1a1a1a] border border-border/50 shadow-2xl text-white font-sans"
            >
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-4xl font-medium uppercase tracking-wide">
                  {HEADER.name}
                </h1>
                <p className="text-xl text-gray-300 mt-2">{HEADER.role}</p>

                <div className="text-xs text-gray-500 flex justify-center gap-6 mt-3">
                  <span>{HEADER.location}</span>
                  <span>{HEADER.phone}</span>
                  <span>{HEADER.email}</span>
                </div>

                <hr className="border-t border-border/80 w-full max-w-4xl mx-auto mt-6" />
              </div>

              {/* Tentang */}
              <section className="mb-7">
                <h2 className="text-xl font-medium border-b border-border/80 pb-2 mb-3">
                  TENTANG SAYA
                </h2>
                <p className="text-xs text-gray-400 leading-[1.6]">{ABOUT}</p>
              </section>

              {/* Skill */}
              <section className="mb-7">
                <h2 className="text-xl font-medium border-b border-border/80 pb-2 mb-3">
                  SKILL
                </h2>
                <p className="text-xs text-gray-400 leading-[1.6]">{SKILLS}</p>
              </section>

              {/* Project */}
              <section className="mb-7">
                <h2 className="text-xl font-medium border-b border-border/80 pb-2 mb-3">
                  PROJECT
                </h2>

                {PROJECTS.map((project, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-medium text-lg text-white">
                      {index + 1}. {project.title}
                    </h3>

                    <ul className="list-disc ml-5 mt-1 text-xs text-gray-400 space-y-1 leading-[1.5]">
                      <li>{project.description}</li>
                      <li>Tags: {project.tags.join(", ")}</li>
                      <li>Preview: {project.demoUrl}</li>
                      <li>GitHub: {project.githubUrl}</li>
                    </ul>
                  </div>
                ))}
              </section>

              {/* Experience */}
              <section className="mb-7">
                <h2 className="text-xl font-medium border-b border-border/80 pb-2 mb-3">
                  EXPERIENCE
                </h2>

                {EXPERIENCES_2.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="grid grid-cols-[1fr_auto] gap-6">
                      <div>
                        <h3 className="font-medium text-lg text-white leading-tight">
                          {index + 1}. {exp.company}
                        </h3>
                        <div className="text-xs text-gray-500 mt-1">
                          {exp.role} • {exp.location}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-400">
                          {exp.period}
                        </div>
                        <div className="text-xs text-gray-600">
                          {exp.salary}
                        </div>
                      </div>
                    </div>

                    <ul className="list-disc ml-5 mt-1 text-xs text-gray-400 space-y-1 leading-[1.5]">
                      {exp.achievements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Education */}
              <section className="mb-7">
                <h2 className="text-xl font-medium border-b border-border/80 pb-2 mb-3">
                  EDUCATION
                </h2>

                <div className="grid grid-cols-[1fr_auto] gap-6">
                  <div>
                    <h3 className="font-medium text-lg text-white">
                      {EDUCATION.school}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {EDUCATION.major}
                    </p>
                  </div>

                  <div className="text-right text-xs text-gray-400">
                    {EDUCATION.date}
                  </div>
                </div>
              </section>

              {/* Reference */}
              <section>
                <h2 className="text-xl font-medium border-b border-border/80 pb-2 mb-3">
                  REFERENCE
                </h2>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  {REFERENCES.map((ref, index) => (
                    <div
                      key={index}
                      className="border border-gray-800 rounded-lg px-3 py-2 bg-[#161616] text-xs text-gray-400"
                    >
                      <span className="font-medium text-gray-300">
                        {ref.label}:
                      </span>{" "}
                      {ref.url}
                    </div>
                  ))}
                </div>
              </section>
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

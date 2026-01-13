import React from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const projectData = [
    {
      title: "StoreLine IO",
      url: "https://storelineio.netlify.app/",
      tech: ["React", "Node.js", "MongoDB", "Tailwind"],
      description:
        "A full-stack e-commerce solution with real-time inventory and seamless checkout.",
      status: "STABLE_BUILD v2.0",
      id: "MODULE_01",
    },
    {
      title: "The Brando",
      url: "https://the-brando.web.app/",
      tech: ["React", "Firebase", "Redux", "Tailwind"],
      description:
        "Premium branding platform focused on high-end user experience and sleek aesthetics.",
      status: "OPERATIONAL",
      id: "MODULE_02",
    },
    {
      title: "Fitness Web",
      url: "https://fitness-web-7aafe.web.app/",
      tech: ["React", "Tailwind", "Framer Motion"],
      description:
        "Interactive fitness tracking dashboard with dynamic workout schedules and progress metrics.",
      status: "SYSTEM_ACTIVE",
      id: "MODULE_03",
    },
    {
      title: "PetMarts Online",
      url: "https://petmartsonline.netlify.app/",
      tech: ["React", "Express", "MongoDB", "Bootstrap"],
      description:
        "Comprehensive pet supplies marketplace with filtered search and user reviews.",
      status: "OPTIMIZED",
      id: "MODULE_04",
    },
  ];

  return (
    <section
      id="project"
      className=" text-white py-24 px-6 relative overflow-hidden font-mono"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center">
          <p className="text-orange-500 tracking-[0.4em] text-xs mb-2">
            PROJECT_ARCHIVE_2024
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            Mission <span className="text-orange-500">Log</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="bg-[#0a0a0a]/80 border border-white/10 p-8 rounded-sm backdrop-blur-xl relative overflow-hidden hover:border-orange-500/50 transition-all duration-500">
                {/*Scanning Effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-orange-500/30 blur-sm opacity-0 group-hover:animate-scan"></div>

                {/* ID & Status Line */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] text-orange-500/70">
                    {project.id}
                  </span>
                  <span className="text-[10px] bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded border border-orange-500/20">
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-3xl font-bold mb-4 tracking-tighter group-hover:text-orange-500 transition-colors">
                  {project.title.toUpperCase()}
                </h3>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="text-[9px] border border-white/10 px-2 py-1 uppercase text-gray-500 font-bold group-hover:border-orange-500/30 group-hover:text-white transition-all"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-white transition-colors tracking-widest"
                  >
                    INITIATE_DEPLOYMENT
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>

                  {/* Decorative Crosshairs */}
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white/20"></div>
                    <div className="w-1 h-1 bg-orange-500"></div>
                  </div>
                </div>

                {/* Corner Decorative Brackets */}
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="border-t-2 border-r-2 border-orange-500 w-3 h-3"></div>
                </div>
                <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="border-b-2 border-l-2 border-orange-500 w-3 h-3"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Projects;

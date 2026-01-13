import React from "react";
import { motion } from "framer-motion";

const FreelanceWork = () => {
  const clientProjects = [
    {
      id: "01",
      title: "Enginuity System",
      role: "Frontend Developer",
      description: "Leading frontend development for over 6 months. Focused on building scalable, high-performance user interfaces and ensuring seamless user experiences with modern React architectures.",
      tags: ["React.js", "Frontend Engine", "UI/UX", "Optimization"],
      status: "CURRENTLY_RUNNING"
    },
    {
      id: "02",
      title: "Luxury.com.bd",
      role: "Full Stack Developer",
      description: "Collaborating as a Full Stack Developer on a project-based basis. Responsible for implementing end-to-end features, from interactive client-side components to robust server-side logic.",
      tags: ["MERN Stack", "E-commerce", "Full Stack", "Ongoing"],
      status: "PERIODIC_WORK"
    },
    {
      id: "03",
      title: "Detective SEO",
      role: "Full Stack Developer",
      description: "Served as a Full Stack Developer for 1 year. Developed technical infrastructures optimized for search engine visibility while maintaining high-performance backend systems.",
      tags: ["Full Stack", "SEO Architecture", "Backend", "1 Year Exp"],
      status: "MISSION_COMPLETED"
    }
  ];

  return (
    <section className="py-24 bg-transparent text-white font-mono relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col items-center mb-20">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            className="h-[1px] bg-orange-500 mb-4"
          />
          <p className="text-orange-500 uppercase tracking-[0.5em] text-[10px] mb-2 font-bold">Professional Experience</p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            Work <span className="text-orange-500">History</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {clientProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="absolute -top-4 -right-2 z-20 flex items-center text-black">
                <div className="h-[1px] w-8 bg-orange-500/50 mr-2"></div>
                <div className="bg-orange-600 font-black px-4 py-1 skew-x-12 text-sm shadow-[0_0_15px_rgba(234,88,12,0.4)]">
                  {project.id}
                </div>
              </div>

              <div className={`h-full border rounded-xl p-8 backdrop-blur-sm relative transition-all duration-500 group-hover:translate-y-[-5px] 
                ${project.status === "CURRENTLY_RUNNING" 
                  ? "bg-orange-500/5 border-orange-500/40 shadow-[0_0_30px_rgba(249,115,22,0.1)]" 
                  : "bg-gradient-to-b from-white/5 to-transparent border-white/10 group-hover:border-orange-500/40"}`}>
                
                <div className="mb-6 flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${project.status === "CURRENTLY_RUNNING" ? "bg-orange-500 animate-ping" : "bg-gray-600"}`}></span>
                  <span className="text-[9px] text-gray-500 tracking-widest uppercase">{project.status}</span>
                </div>

                <h3 className="text-2xl font-black mb-1 group-hover:text-orange-500 transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-orange-500/60 text-[10px] font-bold mb-4 tracking-widest uppercase">
                  {project.role}
                </p>
                
                <div className="w-10 h-[2px] bg-orange-500/30 mb-6 group-hover:w-20 transition-all duration-500"></div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] border border-gray-800 px-2 py-1 rounded bg-black/40 text-gray-400 group-hover:border-orange-500/20 group-hover:text-white transition-all">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute top-0 left-0 border-t-2 border-l-2 border-orange-500/20 w-4 h-4 rounded-tl-xl transition-all group-hover:border-orange-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreelanceWork;
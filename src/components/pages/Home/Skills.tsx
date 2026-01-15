import { motion } from "framer-motion";

import html from "../../../assets/images/skills/html.png";
import CSS3 from "../../../assets/images/skills/css.png";
import JavaScript from "../../../assets/images/skills/javascript.png";
import ReactJS from "../../../assets/images/skills/react.png";
import Tailwind from "../../../assets/images/skills/tailwind.png";
import NodeJS from "../../../assets/images/skills/nodejs.png";
import Python from "../../../assets/images/skills/python.png";
import MongoDB from "../../../assets/images/skills/mongodb.png";
import MySQL from "../../../assets/images/skills/mysql.png";
import Firebase from "../../../assets/images/skills/firebase.png";
import GitHub from "../../../assets/images/skills/github.png";
import Figma from "../../../assets/images/skills/figma.png";
import Bootstrap from "../../../assets/images/skills/bootstrap.png";

const Skills = () => {
  const skills = [
    { name: "HTML5", icon: html },
    { name: "CSS3", icon: CSS3 },
    { name: "JavaScript", icon: JavaScript },
    { name: "ReactJS", icon: ReactJS },
    { name: "Tailwind", icon: Tailwind },
    { name: "NodeJS", icon: NodeJS },
    { name: "Python", icon: Python },
    { name: "MongoDB", icon: MongoDB },
    { name: "MySQL", icon: MySQL },
    { name: "Firebase", icon: Firebase },
    { name: "GitHub", icon: GitHub },
    { name: "Figma", icon: Figma },
    { name: "Bootstrap", icon: Bootstrap },
  ];

  return (
    <section
      id="skills"
      className=" max-w-7xl mx-auto text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-20 overflow-hidden relative font-mono"
    >
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#f97316 0.5px, transparent 0.5px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="z-10 w-full md:w-1/2 space-y-6 text-left"
      >
        <div className="inline-block border border-orange-500/50 px-3 py-1 rounded-full bg-orange-500/10 mb-4">
          <span className="text-orange-500 text-[10px] md:text-xs tracking-widest animate-pulse">
            ● CORE_SKILLS_INITIATED
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
          Technical <br /> <span className="text-orange-500">Arsenal</span>
        </h2>

        <p className="text-gray-400 max-w-md leading-relaxed border-l-2 border-orange-500/30 pl-4 text-sm md:text-base">
          Building high-performance applications with the{" "}
          <span className="text-white font-bold">MERN Stack</span>. Bridging the
          gap between <span className="text-white font-bold">Python logic</span>{" "}
          and
          <span className="text-white font-bold"> Modern UI/UX</span> using
          industry-leading tools.
        </p>

        <div className="flex gap-4 pt-4">
          <div className="flex flex-col">
            <span className="text-orange-500 font-bold text-xl md:text-2xl">
              15+
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
              Tools Mastered
            </span>
          </div>
          <div className="w-[1px] bg-gray-800 h-10 mx-2"></div>
          <div className="flex flex-col">
            <span className="text-orange-500 font-bold text-xl md:text-2xl">
              2+
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
              Years Exp.
            </span>
          </div>
        </div>

        <a
          className="mt-4 px-8 py-3 bg-orange-500 text-black font-black rounded-sm hover:bg-orange-400 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] uppercase text-sm tracking-widest"
          href="/src/assets/images/author/mahin_jaman.pdf"
          download="Mahin_Jaman_CV.pdf"
        >
          Download CV
        </a>
      </motion.div>

      <div className="relative w-full md:w-1/2 h-[500px] md:h-[650px] flex items-center justify-center mt-20 md:mt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="absolute z-20 text-center flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="text-orange-500 font-black text-4xl md:text-6xl leading-none">
            2+
          </div>
          <div className="text-white text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">
            Years in
          </div>
          <div className="text-white text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">
            Development
          </div>

          <motion.div
            animate={{ y: [-30, 50, -30], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-20 h-[2px] bg-orange-500 blur-[2px] mt-2"
          />
        </motion.div>

        <div className="absolute w-32 h-32 bg-orange-500/10 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute w-40 h-40 border-2 border-orange-500/10 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.1)]"></div>
        <div className="absolute w-56 h-56 border border-white/5 rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-white/5 rounded-full flex items-center justify-center"
        >
          {skills.map((skill, index) => {
            const angle = (index / skills.length) * (2 * Math.PI);
            const radius = window.innerWidth < 768 ? 140 : 240;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div key={index} className="absolute" style={{ x, y }}>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex flex-col items-center group relative"
                >
                  {/* Icon Card */}
                  <div
                    className="p-3 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md 
                                  group-hover:border-orange-500 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] 
                                  transition-all duration-300 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center"
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-7 h-7 md:w-9 md:h-9 object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-[9px] bg-orange-500 text-black px-2 py-0.5 font-bold rounded-sm uppercase">
                      {skill.name}
                    </span>
                  </div>

                  <div className="w-[1px] h-8 bg-gradient-to-t from-orange-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity mt-1"></div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent rotate-45"></div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent -rotate-45"></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

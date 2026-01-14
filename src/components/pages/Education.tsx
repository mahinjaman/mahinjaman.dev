import { motion } from "framer-motion";

const Education = () => {
  const educationData = [
    {
      type: "Diploma in Engineering",
      institute: "Shariatpur Govt. Polytechnic Institute",
      duration: "Running",
      department: "Computer Science and Technology (CST)",
      status: "Current",
      isCurrent: true,
      result: "Ongoing",
    },
    {
      type: "SSC (Secondary School Certificate)",
      institute: "Balla Coronation High School & College",
      duration: "2020 — 2023",
      department: "Science",
      status: "Completed",
      result: "GPA: 4.56",
      isCurrent: false,
    },
    {
      type: "JSC (Junior School Certificate)",
      institute: "Balla Coronation High School & College",
      duration: "2018 — 2020",
      status: "Completed",
      result: "GPA: 5.00 (A+)",
      isCurrent: false,
    },
  ];

  return (
    <div className="text-white py-20 px-4 min-h-screen font-sans bg-transparent overflow-hidden" id="education">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section with Fade In Down */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-orange-500 uppercase tracking-[0.3em] text-xs mb-3 font-mono">
            My Journey
          </p>
          <h2 className="italic text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
            Education
          </h2>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:via-gray-800 before:to-transparent">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-16 bg-transparent"
            >
              {/* Timeline Dot with Pulse Effect */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-800 bg-[#0a0a0a] absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 shadow-xl"
              >
                <div
                  className={`h-3 w-3 rounded-full ${
                    edu.isCurrent
                      ? "bg-orange-500 animate-pulse shadow-[0_0_10px_#f97316]"
                      : "bg-gray-600"
                  }`}
                ></div>
              </motion.div>

              {/* Card Content */}
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="w-[calc(100%-4rem)] md:w-[45%] ml-14 md:ml-0 shadow transition-all duration-500 ease-out hover:shadow-xl hover:shadow-orange-400/20 backdrop-blur-md hover:scale-[1.02] rounded-2xl"
              >
                <div
                  className={`p-1 rounded-2xl transition-all duration-500 ${
                    edu.isCurrent
                      ? "bg-gradient-to-br from-orange-500/20 to-transparent"
                      : "bg-transparent"
                  }`}
                >
                  <div
                    className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 
                    ${
                      edu.isCurrent
                        ? "bg-black/40 border-orange-500/30 shadow-2xl shadow-orange-500/5"
                        : "bg-[#111] border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span
                        className={`text-[10px] font-mono px-2 py-1 rounded border ${
                          edu.isCurrent
                            ? "border-orange-500/50 text-orange-500"
                            : "border-gray-700 text-gray-500"
                        }`}
                      >
                        {edu.duration}
                      </span>
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-orange-500 font-bold text-sm"
                      >
                        {edu.result}
                      </motion.span>
                    </div>

                    <h3
                      className={`text-xl font-bold mb-1 ${
                        edu.isCurrent ? "text-white" : "text-gray-200"
                      }`}
                    >
                      {edu.type}
                    </h3>

                    {edu.department && (
                      <p className="text-orange-100/70 text-sm mb-3 font-medium">
                        Dept:{" "}
                        <span className="text-white">{edu.department}</span>
                      </p>
                    )}

                    <div className="flex items-start gap-2 text-gray-400">
                      <svg
                        className="w-4 h-4 mt-1 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <p className="text-sm leading-relaxed italic">
                        {edu.institute}
                      </p>
                    </div>

                    {/* Decorative Element */}
                    {edu.isCurrent && (
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mt-4 pt-4 border-t border-white/5 flex justify-end origin-right"
                      >
                        <div className="text-[10px] font-mono text-orange-500/50 uppercase tracking-tighter italic">
                          System_Active // CST_Dept
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
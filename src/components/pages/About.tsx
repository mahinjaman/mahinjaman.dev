import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    title: "Clean & Scalable Code",
    description:
      "Writing maintainable, well-documented code following best practices and industry standards.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
    title: "Full-Stack Development",
    description:
      "Building end-to-end solutions using React for frontend and Node.js for scalable backend logic.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Database Architecture",
    description:
      "Designing efficient data structures and managing both SQL (MySQL) and NoSQL (MongoDB) databases.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Modern UI/UX Design",
    description:
      "Creating responsive, pixel-perfect, and user-centric interfaces with Tailwind CSS and Bootstrap.",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative !!bg-red-100 max-w-7xl mx-auto" ref={ref}>
      <div className="container mx-auto px-6 relative z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono">Get to know me</span>
          <h2 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground text-md mb-6">
              Hi, I'm{" "}
              <span className="gradient-text font-semibold">Mahin Jaman</span>,
              a dedicated{" "}
              <span className="gradient-text font-semibold">
                Full-Stack Web Developer
              </span>{" "}
              and a{" "}
              <span className="gradient-text font-semibold">
                Computer Science & Technology
              </span>{" "}
              student. With over{" "}
              <span className="gradient-text font-semibold">
                2 years of experience
              </span>{" "}
              in the web development sector, I specialize in building robust,
              data-driven applications and solving complex technical problems.
            </p>
            <p className="text-muted-foreground text-md mb-8">
              My technical expertise spans across the entire stack, allowing me
              to deliver seamless user experiences and robust backend solutions:
              <ul className="space-y-4 border-l-2 border-orange-500/40 pl-6 my-2">
                <li className="relative flex gap-5">
                  <span className="absolute -left-[9px] top-2 h-3 w-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"></span>

                  <p className="text-muted-foreground leading-relaxed ml-3">
                    <span className="gradient-text font-semibold">
                      Frontend Development:
                    </span>{" "}
                    Specialist in building interactive UIs with{" "}
                    <span className="gradient-text font-semibold">
                      React.js
                    </span>
                    , styled with{" "}
                    <span className="gradient-text font-semibold">
                      Tailwind CSS
                    </span>{" "}
                    and{" "}
                    <span className="gradient-text font-semibold">
                      Bootstrap.
                    </span>
                  </p>
                </li>

                <li className="relative flex gap-3">
                  <span className="absolute -left-[9px] top-2 h-3 w-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"></span>

                  <p className="text-muted-foreground leading-relaxed ml-3">
                    <span className="gradient-text font-semibold">
                      State Management:
                    </span>{" "}
                    Expert in handling complex application workflows using{" "}
                    <span className="gradient-text font-semibold"> Redux.</span>
                  </p>
                </li>

                <li className="relative flex gap-3">
                  <span className="absolute -left-[9px] top-2 h-3 w-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"></span>

                  <p className="text-muted-foreground leading-relaxed ml-3">
                    <span className="gradient-text font-semibold">
                      Backend & Logic:
                    </span>{" "}
                    Proficient in
                    <span className="gradient-text font-semibold">
                      {" "}
                      Node.js
                    </span>
                    , and
                    <span className="gradient-text font-semibold">
                      Express.js
                    </span>{" "}
                    for scalable servers, along with
                    <span className="gradient-text font-semibold"> Python</span>
                    for versatile programming and logic.
                  </p>
                </li>

                <li className="relative flex gap-3">
                  <span className="absolute -left-[9px] top-2 h-3 w-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"></span>

                  <p className="text-muted-foreground leading-relaxed ml-3">
                    <span className="gradient-text font-semibold">
                      Database Management:
                    </span>{" "}
                    Skilled in working with both NoSQL and Relational databases,
                    specifically
                    <span className="gradient-text font-semibold">
                      {" "}
                      MongoDB{" "}
                    </span>
                    , and
                    <span className="gradient-text font-semibold">
                      MySQL,
                    </span>{" "}
                    ensuring efficient data architecture.
                  </p>
                </li>
              </ul>
              <p className="text-muted-foreground text-md mb-8">
                As a CST student, I bridge the gap between academic theory and
                real-world implementation. I am passionate about writing clean,
                maintainable code and am always eager to leverage my diverse
                skill set to build impactful digital solutions.
              </p>
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              Let's work together
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 shadow transition-all duration-500 ease-out hover:shadow-xl hover:shadow-orange-400/20 backdrop-blur-md hover:scale-102"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="w-100 h-120 absolute bg-orange-400/20 blur-3xl top-0 z-0 right-0 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
      {/* <div className="w-full h-full absolute bg-linear-to-r/srgb from-orange-500/20 to-transparent blur-3xl top-0 z-0 " style={{ animationDuration: '3s' }}></div> */}
    </section>
  );
};

export default About;

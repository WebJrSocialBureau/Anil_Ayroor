import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const About = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth springs for high-end movement
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms
  const imageY = useTransform(springProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(springProgress, [0, 1], ["0%", "-5%"]);
  const headingScale = useTransform(springProgress, [0, 0.5], [1, 1.05]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-white pt-24 md:pt-32 pb-20 px-6 md:px-12 z-20 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background Decorative Text */}
      <motion.div
        style={{ y: textY }}
        className="absolute top-20 left-0 w-full flex justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[20vw] lg:text-[25vw] font-display font-black text-black/3 whitespace-nowrap leading-none uppercase">
          JOURNALISM
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
        {/* Left Side - Heading + Bio */}
        <motion.div
          className="lg:col-span-7 flex flex-col justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-px bg-red-500"></span>
            <span className="text-xs uppercase tracking-[0.4em] text-red-500 font-bold">
              The Story
            </span>
          </div>

          <motion.h2
            style={{ scale: headingScale }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[6.5vw] font-display font-black leading-[0.9] lg:leading-[0.85] tracking-tight uppercase mb-8 md:mb-12 text-black"
          >
            PIONEERING <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#450a0a] via-[#ef4444] to-[#450a0a] drop-shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              MEDIA
            </span>{" "}
            <br />
            PERSPECTIVE.
          </motion.h2>

          <div className="space-y-8 md:space-y-10 text-lg md:text-2xl font-light leading-relaxed text-black/60 max-w-2xl">
            <p className="first-letter:text-5xl md:first-letter:text-7xl first-letter:font-display first-letter:font-black first-letter:text-black first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]">
              <span className="font-bold text-black">Anil Ayroor</span> stands
              at the forefront of India's media revolution. With over three
              decades of transformative leadership, he has reshaped how millions
              experience news and entertainment, pioneering technologies from AR
              and VR to building channels that compete on a national stage.
            </p>

            <motion.div
              className="bg-neutral-50 backdrop-blur-sm border-l-4 border-red-600 p-6 md:p-10 rounded-r-3xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-serif-elegant italic text-xl md:text-3xl text-black/80 leading-snug">
                "We aspire to build institutions that inspire quiet
                confidence—where families speak of us with pride and trust. Join
                us—not just to learn, but to grow, to lead, and to shape the
                future with purpose."
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-8 h-px bg-black/10"></div>
                <span className="text-sm uppercase tracking-widest text-black/40">
                  Vision & Philosophy
                </span>
              </div>
            </motion.div>

            {/* Explore More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12"
            >
              <a
                href="#growth"
                className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 hover:text-black transition-all duration-500"
              >
                <span>Explore Story</span>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#ef4444] group-hover:border-[#ef4444] transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 group-hover:text-black transition-colors rotate-90"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Parallax Image Container */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-full min-h-[400px] md:min-h-[700px]">
          <motion.div
            style={{ y: imageY }}
            className="relative w-full h-[450px] md:h-[750px] overflow-hidden rounded-[30px] md:rounded-[40px] shadow-2xl border border-black/5"
          >
            <img
              src="/about_image.png"
              alt="Anil Ayroor"
              className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000 scale-110"
              loading="lazy"
            />
            {/* Artistic Overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[80px] rounded-full"></div>

            {/* Visual Callouts */}
            <div className="absolute bottom-8 left-0 right-0 px-6 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full flex justify-center"
              >
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-5 md:p-10 px-8 md:px-16 rounded-3xl inline-block min-w-[240px] md:min-w-[450px] text-center shadow-2xl">
                  <span className="text-red-500 uppercase tracking-[0.4em] mb-3 text-[8px] md:text-[10px] font-bold block">
                    Industry Leader
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white uppercase italic leading-none">
                    Anil Ayroor
                  </h3>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vision & Innovation Cards - Reimagined */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-12 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col justify-end pb-8">
            <h4 className="text-5xl md:text-4xl font-display font-black text-black uppercase leading-tight md:leading-none">
              Strategic <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#450a0a] via-[#ef4444] to-[#450a0a]">
                Pillars
              </span>
            </h4>
            <p className="mt-6 text-black/40 max-w-[280px] text-sm leading-relaxed">
              The foundation of Big TV Malayalam is built on these core
              principles of excellence and shared success.
            </p>
          </div>

          {[
            {
              id: "01",
              title: "Staff Ownership",
              desc: "A revolutionary model where journalists are stakeholders, ensuring commitment and creative freedom.",
              tag: "Empowerment",
            },
            {
              id: "02",
              title: "Tech Superiority",
              desc: "Deploying state-of-the-art immersive technologies to bring viewers closer to the truth than ever before.",
              tag: "Digital First",
            },
          ].map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-neutral-50 p-10 rounded-[32px] overflow-hidden border border-black/5 hover:border-red-600/20 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-8">
                <span className="text-6xl font-display font-black text-black/3 group-hover:text-red-600/10 transition-colors">
                  {card.id}
                </span>
              </div>

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-8 border border-red-500/20 group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-red-500 group-hover:text-white transition-colors"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600 mb-2 block">
                  {card.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-black text-black mb-6 uppercase tracking-tight group-hover:text-red-700 transition-colors">
                  {card.title}
                </h3>
                <p className="text-black/50 leading-relaxed font-light group-hover:text-black/80 transition-colors">
                  {card.desc}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-500/5 blur-[60px] group-hover:bg-red-500/10 transition-all duration-700"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

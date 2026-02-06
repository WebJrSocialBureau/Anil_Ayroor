import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const GrowthStory = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax for floating elements
  const y1 = useTransform(springScroll, [0, 1], [0, -200]);
  const y2 = useTransform(springScroll, [0, 1], [0, 150]);
  const opacity = useTransform(springScroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const milestones = [
    {
      year: "1995",
      title: "Foundations",
      desc: "Producer / Editorial at Asianet & Raj TV. Built foundational expertise in news and programming.",
    },
    {
      year: "2011",
      title: "Showmanship",
      desc: "Chief Program Producer at Mazhavil Manorama. Developed high-impact reality and prime-time shows.",
    },
    {
      year: "2015",
      title: "Innovation",
      desc: "Group COO at Flowers TV & 24 News. Spearheaded the transformation into top-rated channels.",
    },
    {
      year: "2018",
      title: "Strategy",
      desc: "Chief Channel Officer at Zee Keralam. Positioned the channel as a formidable market competitor.",
    },
    {
      year: "2021",
      title: "Transformation",
      desc: "Network President at Reporter TV. Introduced Asia's most advanced AR/VR news studio.",
    },
    {
      year: "2024",
      title: "Revolution",
      desc: "MD & Founder of Big TV Malayalam. Launching a next-gen hybrid platform bridging digital & broadcast.",
    },
  ];

  return (
    <section
      id="growth"
      ref={targetRef}
      className="relative bg-white pt-34  md:pt-20 pb-32 md:pb-48 px-6 md:px-12 z-10 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-[-5%] text-[30vw] font-display font-black text-black/3 leading-none whitespace-nowrap pointer-events-none select-none"
      >
        EVOLUTION
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ opacity }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-cyan-500"></span>
              <span className="text-xs uppercase tracking-[0.4em] text-cyan-600 font-bold">
                Career Journey
              </span>
            </div>
            <h2 className="text-6xl md:text-[7vw] font-display font-black leading-[0.9] tracking-tighter uppercase text-black">
              THE <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#003d47] via-[#00e5ff] to-[#003d47]">
                GROWTH
              </span>{" "}
              <br />
              STORY.
            </h2>
          </div>
          <div className="md:max-w-xs">
            <p className="text-black/60 text-lg leading-relaxed font-light mb-8">
              A testament to visionary leadership and operational excellence
              across India's most prominent broadcasting networks.
            </p>
            <Link
              to="/awards"
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black"
            >
              <span className="relative">
                Explore Awards
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </span>
              <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 group-hover:text-white transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative">
          {/* Vertical Connecting Line (Hidden on mobile) */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-black/5 hidden lg:block -translate-y-1/2"></div>

          {milestones.map((item, idx) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 md:p-10 bg-neutral-50 rounded-[40px] border border-transparent hover:border-cyan-500/20 transition-all duration-500 overflow-hidden"
            >
              {/* Year Bubble */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-xl mb-8 group-hover:bg-cyan-500 group-hover:scale-110 transition-all duration-500">
                <span className="text-black font-display font-black text-sm group-hover:text-white">
                  {item.year}
                </span>
              </div>

              <h3 className="text-3xl font-display font-black text-black uppercase mb-4 tracking-tight group-hover:text-cyan-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-black/50 leading-relaxed font-light text-sm md:text-base group-hover:text-black/80 transition-colors">
                {item.desc}
              </p>

              {/* Decorative Card Detail */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-all duration-700"></div>
            </motion.div>
          ))}
        </div>

        {/* Premium Callout Section */}
        <motion.div
          style={{ y: y2 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
        >
          <div className="md:col-span-7 rounded-[48px] overflow-hidden relative h-[400px] md:h-[550px] group shadow-2xl">
            <img
              src="/legacy_trust.png"
              alt="Growth Narrative"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-12 left-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400 mb-2 block">
                Foundational Value
              </span>
              <h4 className="text-4xl font-display font-black text-white uppercase italic">
                Integrity First.
              </h4>
            </div>
          </div>

          <div className="md:col-span-5 space-y-8">
            <h4 className="text-4xl md:text-5xl font-display font-black text-black uppercase leading-tight">
              A LEGACY <br />
              OF <span className="text-cyan-600">TRUST.</span>
            </h4>
            <div className="w-20 h-1.5 bg-cyan-500 rounded-full"></div>
            <p className="text-black/70 text-lg leading-relaxed font-light">
              We believe that true growth is measured by the trust our audience
              places in us. Every frame we broadcast is a testament to our
              commitment to accuracy and meaningful storytelling.
            </p>
            <Link
              to="/awards"
              className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black group"
            >
              <span>Explore Awards</span>
              <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all duration-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 group-hover:text-white transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GrowthStory;

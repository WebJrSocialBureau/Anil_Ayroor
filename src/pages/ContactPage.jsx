import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001,
  });

  // Scene 1 & 2: Hero & Form (0 to 0.4)
  const heroOpacity = useTransform(smoothProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 1.1]);
  const textX1 = useTransform(smoothProgress, [0, 0.15], ["0%", "-20%"]);
  const textX2 = useTransform(smoothProgress, [0, 0.15], ["0%", "20%"]);

  const contentOpacity = useTransform(
    smoothProgress,
    [0.15, 0.22, 0.35, 0.4],
    [0, 1, 1, 0],
  );
  const contentY = useTransform(smoothProgress, [0.15, 0.22], [100, 0]);

  // Scene 3: Synergy Roadmap (0.4 to 0.65)
  const synergyOpacity = useTransform(
    smoothProgress,
    [0.4, 0.45, 0.6, 0.65],
    [0, 1, 1, 0],
  );
  const roadmapX = useTransform(smoothProgress, [0.45, 0.65], ["0%", "-50%"]);

  // Scene 4: Influence Hub (0.65 to 0.85)
  const hubOpacity = useTransform(
    smoothProgress,
    [0.65, 0.7, 0.8, 0.85],
    [0, 1, 1, 0],
  );
  const hubScale = useTransform(smoothProgress, [0.65, 0.75], [0.9, 1]);

  // Scene 5: Trusted Identity (0.85 to 0.95)
  const finaleOpacity = useTransform(
    smoothProgress,
    [0.85, 0.9, 0.95],
    [0, 1, 0],
  );

  const contactOptions = [
    { label: "Phone", value: "+91 94474 81001", id: "01" },
    { label: "Email", value: "anil@bigtv.in", id: "02" },
    { label: "Location", value: "Kochi, Kerala, India", id: "03" },
  ];

  const roadmapSteps = [
    {
      title: "Analysis",
      desc: "Digital audit & target identification.",
      tech: "ID_01//SCAN",
    },
    {
      title: "Strategy",
      desc: "Brand positioning & narrative design.",
      tech: "ID_02//PLAN",
    },
    {
      title: "Execution",
      desc: "Omnichannel broadcasting & reach.",
      tech: "ID_03//LIVE",
    },
    {
      title: "Impact",
      desc: "Data analysis & global conversion.",
      tech: "ID_04//RESULT",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-[600vh] relative"
    >
      <Navbar />

      {/* SCENE 1: KINETIC HERO */}
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 w-full px-6 flex flex-col items-center"
        >
          <motion.h1
            style={{ x: textX1 }}
            className="text-[12vw] font-display font-black leading-[0.8] uppercase italic text-white"
          >
            Leave_A
          </motion.h1>
          <motion.h1
            style={{ x: textX2 }}
            className="text-[12vw] font-display font-black leading-[0.8] uppercase italic text-cyan-500"
          >
            Message
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "20vw" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-px bg-white/20 mt-12"
          />
        </motion.div>

        {/* Global Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </section>

      {/* SCENE 2: INTERACTIVE FORM & HUB */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 px-6"
        >
          {/* Left: Form */}
          <div className="space-y-12">
            <div>
              <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">
                Direct_Line
              </span>
              <h2 className="text-5xl font-display font-black uppercase mt-4">
                Get In Touch
              </h2>
            </div>
            <form className="space-y-8">
              <input
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-cyan-500 transition-colors"
                placeholder="Name"
              />
              <input
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-cyan-500 transition-colors"
                placeholder="Email"
              />
              <textarea
                rows="2"
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-cyan-500 transition-colors resize-none"
                placeholder="Message"
              />
              <button className="w-full py-4 bg-cyan-500 text-black font-bold uppercase tracking-widest">
                Initialize_Send
              </button>
            </form>
          </div>

          {/* Right: Info Hub */}
          <div className="space-y-6">
            {contactOptions.map((option) => (
              <div
                key={option.id}
                className="bg-white/5 border border-white/10 p-6 rounded-xl relative group overflow-hidden"
              >
                <span className="text-[10px] uppercase tracking-widest text-cyan-500 opacity-60">
                  {option.label}
                </span>
                <h3 className="text-xl font-display font-medium mt-1">
                  {option.value}
                </h3>
                <div className="absolute bottom-0 left-0 h-full w-[2px] bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SCENE 3: SYNERGY ROADMAP */}
      <section className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <motion.div style={{ opacity: synergyOpacity }} className="w-full">
          <div className="max-w-7xl mx-auto px-6 mb-16">
            <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">
              Partnership_Flow
            </span>
            <h2 className="text-6xl font-display font-black uppercase mt-4 italic">
              Success_Roadmap
            </h2>
          </div>

          <motion.div style={{ x: roadmapX }} className="flex gap-12 px-[10vw]">
            {roadmapSteps.map((step, idx) => (
              <div
                key={idx}
                className="min-w-[400px] h-[300px] bg-white/5 border border-white/10 rounded-2xl p-10 relative group"
              >
                <span className="text-6xl font-display font-black text-white/5 absolute -top-4 -left-4">
                  {idx + 1}
                </span>
                <span className="text-[10px] font-mono text-cyan-500 mb-6 block">
                  {step.tech}
                </span>
                <h3 className="text-4xl font-display font-black uppercase mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/50 leading-relaxed max-w-[280px]">
                  {step.desc}
                </p>
                <div className="absolute bottom-6 right-8 w-12 h-[2px] bg-white/20" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* SCENE 4: INFLUENCE HUB */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: hubOpacity, scale: hubScale }}
          className="max-w-5xl mx-auto text-center px-6"
        >
          <div className="relative inline-block mb-12">
            <div className="absolute -inset-20 bg-cyan-500/10 blur-[100px] rounded-full" />
            <div className="relative z-10 w-32 h-32 border-2 border-cyan-500/30 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_40px_rgba(0,229,255,0.5)]" />
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-display font-black uppercase italic leading-none mb-8">
            Global
            <br />
            <span className="text-cyan-500">Reach</span>_Point
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto font-mono text-sm tracking-widest leading-loose">
            BIG_TV_MALAYALAM OPERATES AS A HIGH-FREQUENCY BROADCAST HUB,
            REACHING OVER 50+ MILLION VIEWERS ACROSS GLOBAL SOUTH ASIA.
          </p>

          <div className="mt-16 grid grid-cols-3 gap-12 border-t border-white/10 pt-12">
            <div>
              <p className="text-4xl font-display font-black">50M+</p>
              <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 mt-2">
                Viewers
              </p>
            </div>
            <div>
              <p className="text-4xl font-display font-black">1200+</p>
              <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 mt-2">
                Projects
              </p>
            </div>
            <div>
              <p className="text-4xl font-display font-black">15+</p>
              <p className="text-[8px] uppercase tracking-[0.4em] text-white/30 mt-2">
                Awards
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SCENE 5: FINALE */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity: finaleOpacity }} className="text-center">
          <h2 className="text-[15vw] font-display font-black uppercase text-white leading-none italic select-none">
            SYNC<span className="text-cyan-500">.</span>DONE
          </h2>
          <p className="mt-8 text-[12px] font-bold tracking-[1.5em] text-white/20 uppercase">
            Platform_V1.0_2026
          </p>
        </motion.div>
      </section>

      {/* FOOTER BUFFER */}
      <div className="h-[100vh] bg-black" />
      <Footer />
    </div>
  );
};

export default ContactPage;

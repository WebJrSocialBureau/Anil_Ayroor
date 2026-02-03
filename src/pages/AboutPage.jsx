import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AboutPage = () => {
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

  // Scene 1: Introduction Parallax (0 to 0.12)
  const scene1Opacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.12],
    [1, 1, 0],
  );
  const scene1Scale = useTransform(smoothProgress, [0, 0.12], [1, 1.1]);

  // Scene 2: The Vision Reveal (0.12 to 0.32)
  const scene2Opacity = useTransform(
    smoothProgress,
    [0.12, 0.22, 0.32],
    [0, 1, 0],
  );
  const scene2Y = useTransform(smoothProgress, [0.12, 0.22], [50, 0]);

  // Scene 3: The Philosophy (0.32 to 0.52)
  const scene3Opacity = useTransform(
    smoothProgress,
    [0.32, 0.42, 0.52],
    [0, 1, 0],
  );
  const scene3Scale = useTransform(smoothProgress, [0.32, 0.42], [0.95, 1]);

  // Scene 4: Career Odyssey (0.52 to 0.75)
  const scene4Opacity = useTransform(
    smoothProgress,
    [0.52, 0.62, 0.72, 0.75],
    [0, 1, 1, 0],
  );
  const scene4X = useTransform(smoothProgress, [0.55, 0.72], ["0%", "-60%"]);

  // Scene 5: Global Vision (0.75 to 0.83)
  const scene5Opacity = useTransform(
    smoothProgress,
    [0.75, 0.79, 0.81, 0.83],
    [0, 1, 1, 0],
  );

  // Navbar scroll state
  const navBg = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-[700vh] relative"
    >
      <Navbar />
      {/* SCENE 1: THE GENESIS */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: scene1Opacity, scale: scene1Scale }}
          className="absolute inset-0 z-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 grayscale"
          >
            <source src="/Hero_Video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: scene1Opacity }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-cyan-400 text-[10px] font-bold tracking-[2em] uppercase mb-8 block">
            The Pioneer
          </span>
          <h1 className="text-7xl md:text-[10vw] font-display font-black leading-none uppercase tracking-tighter">
            ANIL <br /> AYROOR
          </h1>
          <p className="mt-12 max-w-xl mx-auto text-white/50 text-lg md:text-xl font-light leading-relaxed font-serif-elegant italic">
            "A mission to redefine media through the eyes of those who craft
            it."
          </p>
        </motion.div>
      </section>

      {/* SCENE 2: THE VISION */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ opacity: scene2Opacity, y: scene2Y }}
          className="max-w-4xl px-12 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase mb-12">
            CRAFTING <span className="text-cyan-400">IMPACT.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
            <div className="space-y-6">
              <span className="text-cyan-500 font-mono text-xs uppercase tracking-widest">
                Integrity_Log.01
              </span>
              <p className="text-white/60 text-lg leading-relaxed font-light">
                For over three decades, Anil Ayroor has been the steady pulse of
                Malayalam broadcasting, standing for truth when it mattered
                most.
              </p>
            </div>
            <div className="space-y-6">
              <span className="text-cyan-500 font-mono text-xs uppercase tracking-widest">
                Innovation_Log.02
              </span>
              <p className="text-white/60 text-lg leading-relaxed font-light">
                Now, with Big TV Malayalam, he introduces a staff-owned model
                that empowers journalists to be true stakeholders in the
                narrative.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SCENE 3: THE PHILOSOPHY */}
      <section className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ opacity: scene3Opacity, scale: scene3Scale }}
          className="relative z-10 w-full max-w-7xl px-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-cyan-400 text-[10px] font-bold tracking-[1em] uppercase mb-6 block">
                The Model
              </span>
              <h2 className="text-6xl md:text-8xl font-display font-black uppercase leading-[0.85] mb-8">
                STAFF <br /> <span className="text-cyan-400">OWNED.</span>
              </h2>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[40px]">
              <p className="text-2xl font-light leading-relaxed text-white/80 italic">
                "We believe the best journalism happens when the creators aren't
                just employees, but guardians of the platform's integrity."
              </p>
              <div className="mt-12 flex items-center gap-6">
                <div className="w-12 h-12 rounded-full border border-cyan-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-cyan-400">
                  Revolutionary Equity
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SCENE 4: CAREER ODYSSEY */}
      <motion.section
        style={{
          zIndex: useTransform(smoothProgress, (p) =>
            p > 0.52 && p < 0.75 ? 15 : 0,
          ),
        }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center"
      >
        <motion.div
          style={{
            opacity: scene4Opacity,
            x: scene4X,
            pointerEvents: useTransform(smoothProgress, (p) =>
              p > 0.52 && p < 0.75 ? "auto" : "none",
            ),
          }}
          className="flex gap-20 px-[20vw]"
        >
          {[
            {
              year: "1995",
              event: "The Beginning",
              desc: "Started the journey in broadcast journalism with a vision for truth.",
            },
            {
              year: "2005",
              event: "Rising Voice",
              desc: "Established a reputation for integrity in high-stakes reporting.",
            },
            {
              year: "2015",
              event: "Digital Transition",
              desc: "Pioneered early digital adoption in the Malayalam news landscape.",
            },
            {
              year: "2026",
              event: "Big TV Launch",
              desc: "A new era of staff-owned, independent journalism begins.",
            },
          ].map((milestone, idx) => (
            <div key={idx} className="min-w-[400px] group">
              <span className="text-8xl font-display font-black text-white/5 group-hover:text-cyan-500/10 transition-colors duration-700">
                {milestone.year}
              </span>
              <div className="-mt-8 ml-8">
                <h4 className="text-3xl font-display font-black uppercase text-cyan-400 mb-4">
                  {milestone.event}
                </h4>
                <p className="text-white/40 text-lg max-w-xs">
                  {milestone.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* SCENE 5: GLOBAL VISION */}
      <motion.section
        style={{ zIndex: 20 }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ opacity: scene5Opacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay z-1" />
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover grayscale opacity-30"
          />
        </motion.div>

        <motion.div
          style={{ opacity: scene5Opacity }}
          className="relative z-10 text-center px-6"
        >
          <h2 className="text-6xl md:text-[8vw] font-display font-black uppercase leading-none tracking-tighter mb-12">
            THE <span className="text-cyan-400">FUTURE</span> <br /> IS LIVE.
          </h2>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-6 px-12 py-6 bg-cyan-500 text-black rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-colors"
          >
            Back to Home
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Buffer Void Section */}
      <section className="h-screen bg-black relative z-10 flex items-center justify-center">
        <div className="w-24 h-px bg-white/10 animate-pulse" />
      </section>

      <div className="relative z-50 bg-black">
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;

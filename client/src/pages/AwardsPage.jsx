import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AwardsPage = () => {
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

  // Hero Animations
  const heroOpacity = useTransform(smoothProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -100]);

  const awards = [
    {
      year: "2025",
      title: "Media Excellence Award",
      organization: "Global Media Forum",
      image:
        "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&q=80&w=1200",
      category: "Broadcasting",
    },
    {
      year: "2024",
      title: "Lifetime Achievement",
      organization: "Journalism Society",
      image:
        "https://images.unsplash.com/photo-1589156206699-bc21e38c8a7d?auto=format&fit=crop&q=80&w=1200",
      category: "Media",
    },
    {
      year: "2023",
      title: "Innovation in Media",
      organization: "Digital Press Awards",
      image:
        "https://images.unsplash.com/photo-1453728180394-1979b91e91ae?auto=format&fit=crop&q=80&w=1200",
      category: "Tech & Media",
    },
    {
      year: "2022",
      title: "Most Trusted Voice",
      organization: "People's Choice India",
      image:
        "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&q=80&w=1200",
      category: "Public Trust",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-[#050505] text-white min-h-[500vh] relative"
    >
      <Navbar />

      {/* Hero Section */}
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 text-center px-6 md:px-8"
        >
          <span className="text-cyan-500 font-mono text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.8em] uppercase mb-6 md:mb-8 block">
            Accomplishments
          </span>
          <h1 className="text-4xl sm:text-7xl md:text-[12vw] font-display font-black leading-[0.85] uppercase italic tracking-tighter sm:tracking-normal">
            Prestigious
            <br />
            <span className="text-cyan-500">Awards</span>
          </h1>
          <div className="mt-10 md:mt-16 w-16 md:w-32 h-px bg-white/20 mx-auto" />
        </motion.div>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </section>

      {/* Awards Showcase */}
      <div className="relative z-20">
        {awards.map((award, index) => {
          const start = 0.2 + index * 0.15;
          const end = start + 0.15;

          return (
            <AwardSection
              key={index}
              award={award}
              progress={smoothProgress}
              range={[start, end]}
            />
          );
        })}
      </div>

      <div className="h-[50vh]" />
      <Footer />
    </div>
  );
};

const AwardSection = ({ award, progress, range }) => {
  const opacity = useTransform(
    progress,
    [range[0], range[0] + 0.05, range[1] - 0.05, range[1]],
    [0, 1, 1, 0],
  );
  const scale = useTransform(progress, [range[0], range[1]], [0.95, 1.05]);
  const imageY = useTransform(progress, [range[0], range[1]], [50, -50]);

  return (
    <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-12">
      <motion.div
        style={{ opacity }}
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center"
      >
        <div className="order-2 lg:order-1">
          <span className="text-cyan-500 font-mono text-xs md:text-sm tracking-widest mb-4 md:mb-6 block">
            {award.year} // {award.category}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-black uppercase mb-6 md:mb-8 italic leading-tight">
            {award.title}
          </h2>
          <p className="text-lg md:text-xl font-light text-white/60 tracking-wide max-w-md border-l-2 border-cyan-500 pl-6 md:pl-8">
            Awarded by the {award.organization} for outstanding contributions
            and commitment to media excellence.
          </p>
        </div>

        <div className="order-1 lg:order-2 relative group px-4 md:px-0">
          <motion.div
            style={{
              y: useTransform(progress, [range[0], range[1]], [20, -20]),
              scale,
            }}
            className="aspect-4/5 rounded-2xl md:rounded-3xl overflow-hidden relative shadow-2xl"
          >
            <img
              src={award.image}
              alt={award.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />

            {/* Corner Accents */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-cyan-500/50" />
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-cyan-500/50" />
          </motion.div>

          {/* Floating Label */}
          <div className="absolute -bottom-10 -right-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl hidden lg:block">
            <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em]">
              Verified_Achievment
            </span>
            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-1 bg-cyan-500/30" />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AwardsPage;

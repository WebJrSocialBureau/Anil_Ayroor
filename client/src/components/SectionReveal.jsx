import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SectionReveal = ({ children }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Expand the iris from 0% to a size that covers the screen (roughly 200%)
  const clipPathSize = useTransform(scrollYProgress, [0.1, 0.4], [0, 200]);
  const clipPath = useTransform(
    clipPathSize,
    (s) => `circle(${s}% at 50% 50%)`,
  );

  // Text masking and parallax for the bridge
  const textScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1.2]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3, 0.4],
    [0, 1, 1, 0],
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 1. Sticky Bridge Layer - Cinematic Typography */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505] pointer-events-none z-0">
        <motion.div
          style={{ scale: textScale, opacity: textOpacity }}
          className="relative flex flex-col items-center"
        >
          <h2 className="text-white text-[15vw] md:text-[12vw] font-display font-black leading-none uppercase tracking-tighter">
            PIONEER<span className="text-red-500">.</span>
          </h2>
        </motion.div>

        {/* Animated Grid Lines for the bridge */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ef4444 1px, transparent 1px), linear-gradient(to bottom, #ef4444 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </div>

      {/* 2. Revealed Content Layer - Using clip-path masking */}
      <motion.div style={{ clipPath }} className="relative z-10 bg-white">
        {children}
      </motion.div>

      {/* 3. Spacing Buffer - Controls the duration of the transition */}
      <div className="h-[50vh] pointer-events-none" />
    </div>
  );
};

export default SectionReveal;

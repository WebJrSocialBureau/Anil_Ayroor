import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ZoomTransition = ({ children }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Portal zoom happens in the first 30% of the local scroll
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 20]);
  const portalOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0]);

  // Content reveal - synced to reach top of screen at progress 0.4
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.25, 0.4], [100, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible"
      style={{ minHeight: "250vh" }}
    >
      {/* The Sticky Portal Layer - SCOPED strictly within this container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-50">
        <motion.div
          style={{
            scale,
            opacity: portalOpacity,
          }}
          className="relative w-[80vw] md:w-[60vw] aspect-video"
        >
          <video
            src="/zoom_effect.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-[40px] shadow-2xl grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-red-500/20 to-transparent rounded-[40px] mix-blend-overlay"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold tracking-[1.5em] uppercase opacity-40">
              Entering Narrative
            </span>
          </div>
        </motion.div>
      </div>

      {/* The Content Layer - Following naturally */}
      <div className="relative z-10">
        {/* Reveal the children content */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
          }}
          className="relative bg-white"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ZoomTransition;

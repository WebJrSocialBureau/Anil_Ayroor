import { motion } from "framer-motion";

const PageTransition = ({ children }) => {
  return (
    <div className="relative">
      {/* The Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>

      {/* Slide 1: Primary Branded Wipe (Red) */}
      <motion.div
        className="fixed inset-0 z-1000 bg-red-600 origin-bottom"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
      />

      {/* Slide 2: Secondary Deep Wipe (Black) */}
      <motion.div
        className="fixed inset-0 z-1001 bg-[#050505] origin-bottom flex items-center justify-center overflow-hidden"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1], delay: 0.1 }}
      >
        {/* Technical Grid for the wipe itself */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Metadata Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          exit={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 flex flex-col items-center gap-4"
        >
          <div className="w-12 h-px bg-red-600/50 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.8em] text-red-500 uppercase">
            Initializing_Sync
          </span>
        </motion.div>
      </motion.div>

      {/* Slide 3: Entering Wipe (Reveal new page) */}
      <motion.div
        className="fixed inset-0 z-1001 bg-[#050505] origin-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1], delay: 0.15 }}
      />
    </div>
  );
};

export default PageTransition;

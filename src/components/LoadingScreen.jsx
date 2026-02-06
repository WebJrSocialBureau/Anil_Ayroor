import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    let current = 0;
    const duration = 2500; // Increased duration for cinematic feel
    const start = Date.now();

    const update = () => {
      const now = Date.now();
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Slower ease out for better pacing
      const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
      current = Math.floor(easeOutExpo(progress) * 100);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setCount(100);
        setTimeout(() => {
          setIsFinishing(true);
          setTimeout(onComplete, 800);
        }, 800);
      }
    };

    requestAnimationFrame(update);
  }, [onComplete]);

  // Handle counts like "5", "05", etc to keep layout stable
  const paddedCount = count.toString().padStart(2, "0");
  const digits =
    paddedCount === "100" ? ["1", "0", "0"] : paddedCount.split("");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: "-100%",
        transition: { duration: 1, ease: [0.7, 0, 0.3, 1] },
      }}
      className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* The Counter Container */}
        <div className="flex items-center justify-center h-[130px] sm:h-[220px]">
          <div className="flex items-center">
            {digits.map((digit, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden w-[60px] sm:w-[130px] h-full flex items-center justify-center"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={`${idx}-${digit}`}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-8xl sm:text-[14rem] font-black leading-none tabular-nums tracking-tighter font-display absolute"
                  >
                    {digit}
                  </motion.span>
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-16 w-64 sm:w-96 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)]"
            initial={{ width: "0%" }}
            animate={{ width: `${count}%` }}
            transition={{ type: "spring", damping: 30, stiffness: 100 }}
          />
        </div>

        {/* Status Messaging */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="overflow-hidden h-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={count < 30 ? "init" : count < 85 ? "load" : "ready"}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                className="text-[10px] font-bold tracking-[0.6em] uppercase text-red-500/40 font-display"
              >
                {count < 30
                  ? "SYSTEM_BOOT"
                  : count < 85
                    ? "LOADING"
                    : "ANIL_AYROOR"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modern Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-transparent via-red-500/5 to-transparent h-2 w-full animate-scanline z-50 overflow-hidden" />

      {/* Finishing Flash Transition */}
      <AnimatePresence>
        {isFinishing && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            className="absolute inset-0 bg-[#f5f5f5] z-[100] origin-bottom"
            transition={{ duration: 0.8, ease: [0.8, 0, 0.1, 1] }}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

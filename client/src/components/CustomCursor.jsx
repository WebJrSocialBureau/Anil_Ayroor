import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

/**
 * CustomCursor Component
 *
 * Provides a highly customizable, animated cursor experience using Framer Motion.
 * It features a delayed 'spring' outer circle and a precise inner dot.
 * Automatically hides on mobile/touch devices.
 */
const CustomCursor = () => {
  // Motion values for smooth coordinate tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics configuration for the outer ring's trailing effect
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Device detection to disable on small screens/touch
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Event listeners for mouse tracking and interaction detection
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      // Scale up when hovering over interactive elements
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Don't render if on mobile or disabled
  if (isMobile) return null;

  return (
    <>
      {/* Outer Glow/Ring - Follows with spring delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: 0,
          translateY: 0,
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 2.5 : 1,
          }}
          transition={{ duration: 0.2 }}
          className={`w-6 h-6 rounded-full bg-yellow-500 opacity-80 backdrop-blur-sm`}
        />
      </motion.div>
      {/* Inner Dot - Immediate position tracking */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 14, // align with center (32/2 - 4/2 = 14) roughly
          translateY: 14,
        }}
      >
        <div className="w-1 h-1 bg-red-500 rounded-full" />
      </motion.div>
    </>
  );
};

export default CustomCursor;

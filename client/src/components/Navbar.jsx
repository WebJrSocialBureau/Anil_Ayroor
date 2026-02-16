import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useTransform, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Background/Text color logic - Updated to branded Red
  const bgColor = "rgba(0,0,0,0)";
  const textColor = "#ef4444"; // Branded Red
  const borderColor = "rgba(239, 68, 68, 0.2)";

  return (
    <>
      <motion.nav
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
        className="fixed top-0 left-0 w-full z-100 px-6 md:px-12 py-3 flex justify-between items-center backdrop-blur-md border-b"
      >
        {/* Technical Grid Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(239, 68, 68, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 68, 68, 0.08) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div
          className="flex items-center gap-8 relative z-10"
          style={{ color: textColor }}
        >
          <Link
            to="/"
            className="text-xl font-display font-black tracking-tighter"
          >
            ANIL AYROOR
          </Link>
        </motion.div>

        <div className="flex items-center gap-6 relative z-10">
          <motion.div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ borderColor: borderColor }}
            className="w-10 h-10 border rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer group hover:bg-red-500/10 transition-colors"
          >
            <motion.span
              style={{ backgroundColor: textColor }}
              className={`w-5 h-[2px] transition-all duration-500 ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`}
            />
            <motion.span
              style={{ backgroundColor: textColor }}
              className={`w-5 h-[2px] transition-all duration-500 ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
            />
          </motion.div>
        </div>
      </motion.nav>

      {/* FULL SCREEN MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
            className="fixed inset-0 z-110 bg-[#050505] flex flex-col justify-center items-center overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.1]"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            <nav className="flex flex-col items-center gap-6 relative z-10">
              {[
                { name: "Home", path: "/" },
                // { name: "Awards", path: "/awards" },
                // { name: "Events", path: "/events" },
                { name: "Gallery", path: "/gallery" },
                { name: "Blog", path: "/blog" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Login", path: "/login" },
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="group relative flex items-center justify-center text-center"
                  >
                    <span className="text-5xl md:text-[8vh] font-display font-black uppercase text-white hover:text-red-500 transition-all duration-300">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Close Button for Menu */}
            <motion.button
              onClick={() => setMenuOpen(false)}
              className="absolute top-12 right-12 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-red-500 hover:border-red-500 transition-all group"
            >
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase group-hover:scale-110 transition-transform">
                Close
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

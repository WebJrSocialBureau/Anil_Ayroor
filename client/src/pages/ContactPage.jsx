import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const ContactPage = () => {
  // ...
  return (
    <div
      ref={containerRef}
      className="bg-black text-white min-h-[400vh] relative"
    >
      <SEO
        title="Contact | Media Consulting & Collaborations"
        description="Get in touch with Anil Ayroor for collaborations, media inquiries, or professional consulting. Based in Kochi, Kerala."
      />
      <Navbar />

      {/* SCENE 1: KINETIC HERO */}
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 w-full px-6 flex flex-col items-center"
        >
          <motion.h1
            style={{ x: textX1 }}
            className="text-5xl md:text-9xl lg:text-[12vw] font-display font-black leading-[0.8] uppercase italic text-white"
          >
            Leave_A
          </motion.h1>
          <motion.h1
            style={{ x: textX2 }}
            className="text-7xl md:text-9xl lg:text-[12vw] font-display font-black leading-[0.8] uppercase italic text-red-600"
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
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 px-6 py-20 lg:py-0"
        >
          {/* Left: Form */}
          <div className="space-y-12">
            <div>
              <span className="text-red-500 font-mono text-xs tracking-widest uppercase">
                Direct_Line
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black uppercase mt-4">
                Get In Touch
              </h2>
            </div>
            <form className="space-y-8">
              <input
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-red-600 transition-colors"
                placeholder="Name"
              />
              <input
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-red-600 transition-colors"
                placeholder="Email"
              />
              <textarea
                rows="2"
                className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-red-600 transition-colors resize-none"
                placeholder="Message"
              />
              <button className="w-full py-4 bg-red-600 text-black font-bold uppercase tracking-widest hover:bg-red-500 transition-colors">
                Initialize_Send
              </button>
            </form>
          </div>

          {/* Right: Info Hub */}
          <div className="space-y-6">
            {contactOptions.map((option) => (
              <div
                key={option.id}
                className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-xl relative group overflow-hidden"
              >
                <span className="text-[10px] uppercase tracking-widest text-red-500 opacity-60">
                  {option.label}
                </span>
                <h3 className="text-lg md:text-xl font-display font-medium mt-1">
                  {option.value}
                </h3>
                <div className="absolute bottom-0 left-0 h-full w-[2px] bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FOOTER BUFFER */}
      <div className="h-screen bg-black" />
      <Footer />
    </div>
  );
};

export default ContactPage;

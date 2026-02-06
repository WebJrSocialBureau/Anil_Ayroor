import React from "react";
import { motion } from "framer-motion";

const ExperienceBridge = () => {
  const partners = [
    "BIG TV MALAYALAM",
    "REPORTER TV",
    "ZEE KERALAM",
    "FLOWERS TV",
    "MAZHAVIL MANORAMA",
    "ASIANET",
    "RAJ TV",
    "KERALA STARTUP MISSION",
  ];

  return (
    <section className="bg-black py-32 overflow-hidden border-t border-white/5 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-cyan-500 font-mono text-xs uppercase tracking-[0.5em] mb-4 block"
        >
          GLOBAL_INFLUENCE
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-black text-white uppercase italic leading-tight"
        >
          Powering the Next
          <br />
          <span className="text-white/20">Legacy_In_Media</span>
        </motion.h2>
      </div>

      {/* Ticker Section */}
      <div className="relative flex overflow-hidden py-10">
        <div className="flex whitespace-nowrap animate-infinite-scroll">
          {[...partners, ...partners].map((partner, index) => (
            <div key={index} className="flex items-center mx-12 md:mx-20">
              <span className="text-3xl md:text-5xl font-display font-black text-white/10 hover:text-cyan-500/40 transition-colors duration-500 cursor-default uppercase italic tracking-tighter">
                {partner}
              </span>
              <div className="ml-12 md:ml-20 w-2 h-2 rounded-full bg-cyan-500/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
        {[
          { label: "MEDIA_EXCELLENCE", value: "30Y+" },
          { label: "CHANNELS_LAUNCHED", value: "5+" },
          { label: "NETWORKS_LED", value: "7+" },
          { label: "AWARDS_RECOGNITION", value: "MANY" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-display font-black text-white mb-2">
              {stat.value}
            </div>
            <div className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ExperienceBridge;

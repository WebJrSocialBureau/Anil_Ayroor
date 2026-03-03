import { useRef, useState, useMemo } from "react";
// ...
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { Calendar, MapPin, Clock, ArrowRight, Filter, X } from "lucide-react";

const EventsPage = () => {
  // ...
  return (
    <div className="bg-[#050505] text-white min-h-screen relative font-sans">
      <SEO
        title="Events"
        description="Stay updated with upcoming summits, webinars, and forums featuring Anil Ayroor. Join the conversation on the future of media."
      />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-px bg-red-500 mx-auto mb-10"
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[12vw] md:text-[8vw] font-display font-black leading-[0.8] uppercase italic"
          >
            Chronicle
            <br />
            <span className="text-red-500 text-[10vw] md:text-[6vw]">
              Of_Events
            </span>
          </motion.h1>

          {/* FILTERS */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setFilterLocation(loc)}
                  className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                    filterLocation === loc
                      ? "bg-red-500 border-red-500 text-black shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                      : "border-white/10 text-white/40 hover:border-white/30"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {months.map((m) => (
                <button
                  key={m}
                  onClick={() => setFilterMonth(m)}
                  className={`px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                    filterMonth === m
                      ? "bg-red-500 border-red-500 text-black shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                      : "border-white/10 text-white/40 hover:border-white/30"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Global Technical Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </section>

      {/* EVENTS GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-40">
        <AnimatePresence mode="wait">
          {filteredEvents.length > 0 ? (
            <motion.div
              key={`${filterLocation}-${filterMonth}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.map((event, index) => (
                <EventItem key={event.id} event={event} index={index} />
              ))}
            </motion.div>
          ) : (
            <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
              <X className="w-16 h-16 text-red-500/20 mb-6" />
              <h3 className="text-2xl font-display font-black uppercase opacity-50">
                No events match this criteria.
              </h3>
              <button
                onClick={() => {
                  setFilterLocation("All");
                  setFilterMonth("All");
                }}
                className="mt-8 text-red-500 font-mono text-xs uppercase tracking-[0.4em] underline hover:text-white transition-colors"
              >
                Restore_Timeline
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

const EventItem = ({ event, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.1,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-8 md:p-10 backdrop-blur-3xl relative group overflow-hidden hover:border-cyan-500/30 transition-all duration-500 h-full flex flex-col"
    >
      {/* Branded Corner Accent */}
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-8 border-t-2 border-r-2 border-red-500/60" />
      </div>

      <div className="flex justify-between items-start mb-10">
        <div className="flex flex-col">
          <span className="text-4xl md:text-5xl font-display font-black text-red-500">
            {event.date.split(" ")[1]}
          </span>
          <span className="text-lg font-display font-bold text-white uppercase tracking-tighter">
            {event.date.split(" ")[0]}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase block mb-1">
            {event.id}
            {event.id}
          </span>
          <span className="inline-block px-3 py-1 rounded-full bg-red-500/5 border border-red-500/20 text-[9px] font-bold text-red-400 uppercase tracking-widest">
            {event.category}
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-10 flex-grow">
        <h3 className="text-2xl md:text-3xl font-display font-black uppercase italic leading-tight group-hover:text-red-400 transition-colors">
          {event.title}
        </h3>
        <p className="text-white/40 font-light leading-relaxed text-sm">
          {event.desc}
        </p>
      </div>

      <div className="space-y-4 pt-8 border-t border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-white/20 block">
              Schedule
            </span>
            <p className="text-sm font-bold text-white/80">{event.time}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-white/20 block">
              Venue
            </span>
            <p className="text-sm font-bold text-white/80 line-clamp-1">
              {event.venue}
            </p>
            <p className="text-[10px] text-white/30">{event.location}</p>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ x: 8 }}
        className="mt-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-red-500/60 group-hover:text-red-400 transition-colors"
      >
        ACCESS_DETAILS
        <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
      </motion.button>

      {/* Interactive Shine */}
      <div className="absolute inset-0 bg-linear-to-tr from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/2 transition-colors pointer-events-none" />
    </motion.div>
  );
};

export default EventsPage;

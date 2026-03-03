import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ArrowRight, Share2, Info } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const GalleryPage = ({ items = [] }) => {
  // ...
  return (
    <div
      onMouseMove={handleMouseMove}
      className="bg-[#050505] text-white min-h-screen relative font-sans overflow-x-hidden"
    >
      <SEO
        title="Gallery | Media Productions & Newsroom Highlights"
        description="A curated showcase of iconic moments and prestigious highlights across the media landscape. A visual chronicle of Anil Ayroor's career."
      />
      <Navbar />

      {/* Grain Overlay */}
      <div
        className="fixed inset-0 z-40 pointer-events-none opacity-[0.03] animate-grain"
        style={{
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
        }}
      />

      {/* Spotlight Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(239, 68, 68, 0.04), transparent)`,
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-px bg-red-500/50 mx-auto mb-12 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h1 className="text-[14vw] md:text-[10vw] font-display font-black leading-[0.75] uppercase italic tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white/80 to-white/20">
              Visual
              <br />
              <span className="text-red-600 text-[11vw] md:text-[8vw] drop-shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                Archive_
              </span>
            </h1>
          </motion.div>

          {/* Category Filter Bar */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex flex-wrap justify-center gap-4 border-y border-white/5 py-8"
          >
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 ${
                  activeCategory === cat
                    ? "text-black bg-red-600 shadow-[0_0_25px_rgba(239,68,68,0.3)]"
                    : "text-white/40 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full border border-red-500/50"
                  />
                )}
              </button>
            ))}
          </motion.div> */}
        </div>

        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </section>

      {/* Optimized Masonry Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-40 relative z-20">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10"
          >
            {filteredItems.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={index}
                onExpand={() => setSelectedImage(item)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-3xl p-6 md:p-12"
          >
            <motion.div
              layoutId={`img-${selectedImage.id}`}
              className="relative max-w-7xl w-full h-full flex flex-col lg:flex-row gap-16"
            >
              {/* Image Viewport */}
              <div className="flex-1 relative flex items-center justify-center group/lb">
                <motion.img
                  key={selectedImage.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 25 }}
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                  loading="lazy"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox(-1);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-red-600 rounded-full transition-all group/btn"
                >
                  <ArrowRight className="w-6 h-6 rotate-180 group-hover/btn:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox(1);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-red-600 rounded-full transition-all group/btn"
                >
                  <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {/* Lightbox Close */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-4 bg-white/5 hover:bg-red-500 rounded-full transition-all group/close"
                >
                  <X className="w-6 h-6 group-close:rotate-90 transition-transform" />
                </button>
              </div>

              {/* Advanced Metadata Panel */}
              <div className="w-full lg:w-[400px] flex flex-col justify-center space-y-10 border-l border-white/5 pl-0 lg:pl-16">
                <div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "40px" }}
                    className="h-px bg-red-600 mb-6"
                  />
                  <span className="text-red-500 font-mono text-xs uppercase tracking-[0.5em] mb-4 block">
                    {selectedImage.category}
                  </span>
                  <h2 className="text-5xl font-display font-black uppercase italic leading-[0.9] tracking-tighter">
                    {selectedImage.title.split(" ").map((word, i) => (
                      <span key={i} className="block last:text-white/30">
                        {word}
                      </span>
                    ))}
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-white/50 text-base font-light font-sans leading-relaxed">
                    {selectedImage.desc ||
                      "Exploring the intricate layers of modern media broadcast ecosystems through technical precision and aesthetic vision."}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/3 border border-white/5">
                      <span className="text-[9px] uppercase tracking-widest text-white/20 block mb-1">
                        Capture_Date
                      </span>
                      <span className="text-sm font-bold opacity-80 italic">
                        JAN_2026
                      </span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/3 border border-white/5">
                      <span className="text-[9px] uppercase tracking-widest text-white/20 block mb-1">
                        Equipment
                      </span>
                      <span className="text-sm font-bold opacity-80 italic">
                        SONY_A9_MKIII
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-10 flex flex-col gap-4">
                  <button className="flex items-center justify-between w-full py-4 px-8 bg-red-600 text-black rounded-full text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    Direct_Share
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="flex items-center justify-between w-full py-4 px-8 border border-white/10 hover:border-white/30 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
                    Technical_Specs
                    <Info className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const GalleryItem = ({ item, index, onExpand }) => {
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
      className="relative group cursor-pointer break-inside-avoid"
      onClick={onExpand}
    >
      <div className="relative overflow-hidden rounded-[24px] bg-zinc-900">
        <img
          src={item.url}
          alt={item.title}
          className={`w-full h-auto transition-transform duration-1000 group-hover:scale-110 ${
            item.aspectRatio === "portrait"
              ? "aspect-4/5"
              : item.aspectRatio === "landscape"
                ? "aspect-video"
                : "aspect-square"
          } object-cover opacity-80 group-hover:opacity-100`}
          loading="lazy"
        />

        {/* Simple Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

export default GalleryPage;

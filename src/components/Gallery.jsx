/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";

const Gallery = ({ items = [], onSelect }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 p-4 md:p-8">
      <AnimatePresence mode="popLayout">
        {items.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            layout
            initial={{ opacity: 0, y: 80, rotateX: 15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.9,
              delay: (index % 3) * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -8 }}
            className="relative group cursor-pointer break-inside-avoid bg-white overflow-hidden mb-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500"
            onClick={() => onSelect && onSelect(artwork)}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              <motion.img
                src={artwork.url}
                alt={artwork.title}
                className={`w-full block transition-transform duration-700 ease-out group-hover:scale-110 ${
                  artwork.aspectRatio === "portrait"
                    ? "aspect-4/5"
                    : artwork.aspectRatio === "landscape"
                      ? "aspect-video"
                      : "aspect-square"
                } object-cover`}
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Badge */}
              <motion.div
                className="absolute top-4 left-4 right-4 flex justify-between items-start"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] uppercase tracking-widest font-bold text-black shadow-md">
                  {artwork.category}
                </span>
                <motion.div
                  className="bg-cyan-400 text-white p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1, rotate: 45 }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.div>
              </motion.div>

              {/* Bottom Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {artwork.title}
                </h3>
                <div className="flex items-center gap-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/70">
                    View Project
                  </p>
                  <div className="flex-1 h-px bg-white/30" />
                  <Heart className="w-4 h-4 text-white hover:text-cyan-400 transition-colors" />
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-5 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-black text-lg group-hover:text-cyan-500 transition-colors">
                    {artwork.title}
                  </h4>
                  <p className="text-black/40 text-sm mt-1">
                    {artwork.category}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all">
                  <ArrowUpRight className="w-4 h-4 text-black/40 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

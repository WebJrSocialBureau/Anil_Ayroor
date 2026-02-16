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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: (index % 3) * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -5 }}
            className="relative group cursor-pointer break-inside-avoid overflow-hidden mb-8 rounded-3xl bg-zinc-900"
            onClick={() => onSelect && onSelect(artwork)}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-auto">
              <motion.img
                src={artwork.url}
                alt={artwork.title}
                className={`w-full block transition-transform duration-1000 ease-out group-hover:scale-110 ${
                  artwork.aspectRatio === "portrait"
                    ? "aspect-4/5"
                    : artwork.aspectRatio === "landscape"
                      ? "aspect-video"
                      : "aspect-square"
                } object-cover`}
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;

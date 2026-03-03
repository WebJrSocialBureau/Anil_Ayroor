import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api, BASE_URL } from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const BlogPage = () => {
  // ...
  return (
    <div className="bg-white min-h-screen selection:bg-red-500 selection:text-white">
      <SEO
        title="Journal"
        description="Thoughts, insights, and stories from Anil Ayroor. Exploring the intersections of media, leadership, and innovation."
      />
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-6"
              >
                <div className="w-12 h-px bg-red-600/30" />
                OFFICIAL_BLOG
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-7xl md:text-9xl font-display font-black text-black leading-[0.8]"
              >
                PROXIMITY<span className="text-red-500">.</span>
              </motion.h1>
            </div>

            <div className="flex flex-wrap gap-4">
              {categories.map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                    filter === cat
                      ? "bg-black text-white border-black"
                      : "text-neutral-400 border-neutral-200 hover:border-black hover:text-black"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="h-[50vh] flex items-center justify-center">
              <div className="w-20 h-px bg-neutral-200 overflow-hidden relative">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-red-500"
                />
              </div>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
            >
              <AnimatePresence mode="popLayout">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog, idx) => (
                    <motion.div
                      key={blog._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="group"
                    >
                      <Link to={`/blog/${blog._id}`}>
                        <div className="relative aspect-16/10 overflow-hidden bg-neutral-100 mb-8 border border-black/5">
                          <img
                            src={
                              blog.image.startsWith("http")
                                ? blog.image
                                : `${BASE_URL}${blog.image}`
                            }
                            alt={blog.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                          />
                          <div className="absolute top-0 right-0 p-4 z-20">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-4 h-4 border-t-2 border-r-2 border-white rotate-45" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                            <span className="text-red-600">
                              {blog.category}
                            </span>
                            <div className="w-4 h-px bg-neutral-200" />
                            <span>
                              {new Date(blog.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>

                          <h3 className="text-3xl font-display font-bold text-black group-hover:underline decoration-red-500 decoration-4 underline-offset-8 transition-all">
                            {blog.title}
                          </h3>

                          <p className="text-neutral-500 text-sm font-light leading-relaxed line-clamp-3">
                            {blog.excerpt}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-40 text-center">
                    <p className="text-neutral-400 font-display text-4xl font-black uppercase tracking-tighter opacity-20">
                      NO_ENTRIES_FOUND_UNDER_{filter}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;

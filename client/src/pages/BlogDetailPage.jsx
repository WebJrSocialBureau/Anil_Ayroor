import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api, BASE_URL } from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const BlogDetailPage = () => {
  // ...
  return (
    <div className="bg-white min-h-screen selection:bg-red-500 selection:text-white">
      <SEO
        title={blog.title}
        description={blog.excerpt}
        ogType="article"
        ogImage={
          blog.image.startsWith("http")
            ? blog.image
            : `${BASE_URL}${blog.image}`
        }
        schemaData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog.title,
          description: blog.excerpt,
          image: blog.image.startsWith("http")
            ? blog.image
            : `${BASE_URL}${blog.image}`,
          author: {
            "@type": "Person",
            name: blog.author?.name || "Anil Ayroor",
          },
          datePublished: blog.createdAt,
        }}
      />
      <Navbar />

      <main className="pt-24 pb-40">
        {/* Hero Section */}
        <header className="relative h-[70vh] w-full overflow-hidden bg-black">
          <motion.img
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.5 }}
            src={
              blog.image.startsWith("http")
                ? blog.image
                : `${BASE_URL}${blog.image}`
            }
            alt={blog.title}
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <span className="px-6 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.4em]">
                  {blog.category}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-5xl md:text-8xl font-display font-black text-white leading-tight"
              >
                {blog.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase"
              >
                <div className="flex items-center gap-4">
                  <span className="text-white">
                    BY {blog.author?.name || "ANIL AYROOR"}
                  </span>
                </div>
                <div className="w-1 h-1 bg-red-500 rounded-full hidden md:block" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <div className="w-1 h-1 bg-red-500 rounded-full hidden md:block" />
                <span>ESTIMATED_READING_TIME: 8 MIN</span>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-neutral prose-invert max-w-none"
          >
            <p className="text-3xl font-display font-light text-black leading-relaxed mb-16 border-l-4 border-red-500 pl-8 italic">
              {blog.excerpt}
            </p>

            <div className="text-neutral-700 text-lg md:text-xl font-light leading-loose space-y-12 whitespace-pre-line">
              {blog.content}
            </div>

            <div className="mt-32 pt-16 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="flex gap-4">
                {blog.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-black uppercase tracking-widest text-neutral-400 border border-neutral-200 px-3 py-1 hover:border-red-500 hover:text-red-500 transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                to="/blog"
                className="group flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.5em] text-black hover:text-red-600 transition-colors"
              >
                <span className="w-12 h-px bg-black group-hover:w-20 group-hover:bg-red-600 transition-all" />
                RETURN_TO_ARCHIVES
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailPage;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api, BASE_URL } from "../utils/api";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback dummy data if API fails or is empty
  const dummyBlogs = [
    {
      _id: "1",
      title: "The Evolution of Digital Journalism in India",
      excerpt:
        "Deep diving into the transformation of media landscapes and the role of leadership in the digital age.",
      image: "/gallery/gallery1.png",
      category: "Media",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "Leadership Beyond the Screen",
      excerpt:
        "Exploring the intersection of corporate management and creative vision in modern broadcasting.",
      image: "/gallery/gallery7.png",
      category: "Leadership",
      createdAt: new Date().toISOString(),
    },
    {
      _id: "3",
      title: "A Chronicle of Media Excellence",
      excerpt:
        "Reflecting on three decades of architectural shifts in national media infrastructure.",
      image: "/gallery/gallery6.png",
      category: "Innovation",
      createdAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await api.blogs.getAll(3);
        if (data.status === "success" && data.data.blogs.length > 0) {
          setBlogs(data.data.blogs.slice(0, 3));
        } else {
          setBlogs(dummyBlogs);
        }
      } catch (err) {
        setBlogs(dummyBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blog" className="bg-white py-32 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
              className="text-6xl md:text-[8vw] font-display font-black text-black leading-[0.8]"
            >
              BLOG<span className="text-red-500">.</span>
            </motion.h2>
          </div>

          <div className="flex flex-col items-start gap-6">
            <p className="text-neutral-600 max-w-sm text-sm md:text-base font-light border-l-2 border-red-500 pl-6">
              Insights, narratives, and professional reflections on the
              ever-evolving world of media and leadership.
            </p>
            <Link
              to="/blog"
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-red-600 hover:text-black transition-colors"
            >
              READ_ALL_ENTRIES
              <div className="w-8 h-px bg-red-600/30 group-hover:w-12 group-hover:bg-black transition-all" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${blog._id}`}>
                <div className="relative aspect-16/10 overflow-hidden bg-neutral-100 mb-8">
                  {/* Subtle Grid Pattern Overlay for Images */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-[0.2]"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />

                  <img
                    src={
                      blog.image.startsWith("http")
                        ? blog.image
                        : `${BASE_URL}${blog.image}`
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[9px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <div className="w-4 h-px bg-neutral-200" />
                    <span>5 MIN READ</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-black group-hover:text-red-600 transition-colors leading-tight">
                    {blog.title}
                  </h3>

                  <p className="text-neutral-500 text-sm font-light leading-relaxed line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-black uppercase tracking-tighter border-b-2 border-red-500 pb-1 group-hover:tracking-widest transition-all duration-300">
                      Discover Entry —
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

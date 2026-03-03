import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api, BASE_URL } from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useToast } from "../context/ToastContext";
import { useConfirm } from "../context/ConfirmContext";
import SEO from "../components/SEO";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Media",
    tags: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await api.blogs.getAll();
      if (data.status === "success") {
        setBlogs(data.data.blogs);
      } else {
        showToast(data.message || "Failed to fetch blogs", "error");
      }
    } catch (err) {
      console.error("Failed to fetch blogs");
      showToast(
        "Connection error. Please check if the server is running.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    if (!currentBlog.image) {
      showToast("Please upload or provide a featured image", "error");
      return;
    }

    setLoading(true);

    // Transform tags string to array
    const blogData = {
      ...currentBlog,
      tags:
        typeof currentBlog.tags === "string"
          ? currentBlog.tags
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t !== "")
          : currentBlog.tags,
    };

    try {
      let res;
      if (isEditing) {
        res = await api.blogs.update(currentBlog._id, blogData);
      } else {
        res = await api.blogs.create(blogData);
      }

      if (res.status === "success") {
        showToast(
          isEditing ? "Blog updated successfully" : "Blog created successfully",
          "success",
        );
        fetchBlogs();
        resetForm();
      } else {
        showToast(res.message || "Action failed", "error");
      }
    } catch (err) {
      console.error("Action failed");
      showToast("An unexpected error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirm(
      "Are you sure you want to delete this post?",
    );
    if (isConfirmed) {
      try {
        const res = await api.blogs.delete(id);
        if (res.status === "success") {
          showToast("Blog deleted successfully", "success");
          fetchBlogs();
        } else {
          showToast(res.message || "Delete failed", "error");
        }
      } catch (err) {
        console.error("Delete failed");
        showToast("Delete failed. Please try again.", "error");
      }
    }
  };

  const handleEdit = (blog) => {
    setCurrentBlog({
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
    });
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setCurrentBlog({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      category: "Media",
      tags: "",
    });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await api.blogs.uploadImage(formData);
      if (res.status === "success") {
        showToast("Image uploaded successfully", "success");
        setCurrentBlog((prev) => ({ ...prev, image: res.data.url }));
      } else {
        showToast(res.message || "Image upload failed", "error");
      }
    } catch (err) {
      console.error("Image upload failed");
      showToast("Image upload failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white min-h-screen selection:bg-red-500 selection:text-white">
      <SEO
        title="Admin Dashboard | Manage Publications"
        description="Manage your publications and content with ease and precision."
      />
      <Navbar />

      <main className="pt-24 md:pt-32 pb-40 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
            <div>
              <h1 className="text-5xl md:text-8xl font-display font-black text-black leading-none uppercase">
                Admin Dashboard<span className="text-red-500">.</span>
              </h1>
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                Manage your publications and global narratives
              </p>
            </div>
            <div className="flex gap-6 items-center">
              <button
                onClick={() => {
                  if (showForm) resetForm();
                  else setShowForm(true);
                }}
                className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all border-2 ${
                  showForm
                    ? "bg-white border-black text-black hover:bg-neutral-50"
                    : "bg-black border-black text-white hover:bg-red-600 hover:border-red-600"
                }`}
              >
                {showForm ? "Close Editor" : "Create Post"}
              </button>
              <button
                onClick={() =>
                  localStorage.removeItem("token") || navigate("/login")
                }
                className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-red-500 border-b-2 border-red-500/20 pb-1 hover:text-black hover:border-black transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="space-y-20">
            {/* Conditional Form Section */}
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-50 p-6 md:p-12 border border-black/5"
              >
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-[14px] md:text-[16px] font-black uppercase tracking-[0.3em] text-black mb-6 pb-4 border-b border-black/10 flex justify-between items-center">
                    <span>
                      {isEditing ? "Edit Blog Post" : "Compose New Entry"}
                    </span>
                    <button
                      onClick={resetForm}
                      className="text-neutral-400 hover:text-black transition-colors"
                    >
                      <span className="text-2xl">×</span>
                    </button>
                  </h2>

                  <form onSubmit={handleCreateOrUpdate} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600">
                            Blog Title
                          </label>
                          <input
                            className="w-full bg-white border border-neutral-300 p-4 font-display text-lg text-black outline-none focus:border-red-500 transition-colors"
                            placeholder="Enter blog title"
                            value={currentBlog.title}
                            onChange={(e) =>
                              setCurrentBlog({
                                ...currentBlog,
                                title: e.target.value,
                              })
                            }
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600">
                              Category
                            </label>
                            <select
                              className="w-full bg-white border border-neutral-300 p-4 font-black text-[10px] uppercase text-black outline-none focus:border-red-500 transition-colors"
                              value={currentBlog.category}
                              onChange={(e) =>
                                setCurrentBlog({
                                  ...currentBlog,
                                  category: e.target.value,
                                })
                              }
                            >
                              <option>Media</option>
                              <option>Leadership</option>
                              <option>Innovation</option>
                              <option>Broadcast</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600">
                              Tags
                            </label>
                            <input
                              className="w-full bg-white border border-neutral-300 p-4 font-display text-sm text-black outline-none focus:border-red-500 transition-colors"
                              placeholder="news, future"
                              value={currentBlog.tags}
                              onChange={(e) =>
                                setCurrentBlog({
                                  ...currentBlog,
                                  tags: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600">
                            Short Excerpt
                          </label>
                          <textarea
                            rows="3"
                            className="w-full bg-white border border-neutral-300 p-4 font-normal text-sm text-black outline-none focus:border-red-500 transition-colors"
                            placeholder="Write a brief summary..."
                            value={currentBlog.excerpt}
                            onChange={(e) =>
                              setCurrentBlog({
                                ...currentBlog,
                                excerpt: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600">
                            Featured Image
                          </label>
                          <div className="flex flex-col gap-4">
                            <div className="relative group">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className="w-full h-48 bg-white border-2 border-dashed border-neutral-300 flex items-center justify-center text-center group-hover:border-red-500 transition-all overflow-hidden rounded-sm">
                                {currentBlog.image ? (
                                  <img
                                    src={
                                      currentBlog.image.startsWith("http")
                                        ? currentBlog.image
                                        : `${BASE_URL}${currentBlog.image}`
                                    }
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    alt="Preview"
                                  />
                                ) : (
                                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 leading-relaxed max-w-[150px]">
                                    {loading
                                      ? "Uploading..."
                                      : "Click or drag image to upload"}
                                  </span>
                                )}
                              </div>
                            </div>
                            <input
                              className="w-full bg-white border border-neutral-300 p-3 font-mono text-[10px] text-black outline-none focus:border-red-500 transition-colors"
                              placeholder="Or paste an image URL"
                              value={currentBlog.image}
                              onChange={(e) =>
                                setCurrentBlog({
                                  ...currentBlog,
                                  image: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600">
                        Blog Content
                      </label>
                      <textarea
                        rows="12"
                        className="w-full bg-white border border-neutral-300 p-6 font-normal text-sm text-black outline-none focus:border-red-500 leading-relaxed transition-colors"
                        placeholder="Start writing your masterpiece..."
                        value={currentBlog.content}
                        onChange={(e) =>
                          setCurrentBlog({
                            ...currentBlog,
                            content: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all font-display disabled:opacity-50 shadow-lg hover:shadow-xl"
                      >
                        {isEditing ? "Update Post" : "Publish Blog"}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-12 py-6 sm:py-0 border-2 border-neutral-200 text-neutral-500 hover:text-black hover:border-black transition-all text-[10px] font-black uppercase tracking-widest shadow-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {/* List Section */}
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-black">
                  Manage Existing Blogs
                </h3>
                <div className="h-px w-24 bg-red-500" />
              </div>

              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="group bg-neutral-50 hover:bg-white border border-black/5 hover:border-black/10 p-6 transition-all duration-300 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between"
                  >
                    <div className="flex gap-6 items-center flex-1 min-w-0 w-full">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-neutral-200 shrink-0 overflow-hidden">
                        <img
                          src={
                            blog.image.startsWith("http")
                              ? blog.image
                              : `${BASE_URL}${blog.image}`
                          }
                          className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3 text-[8px] font-black uppercase tracking-widest text-neutral-400 mb-2">
                          <span className="text-red-500">{blog.category}</span>
                          <div className="w-1 h-1 rounded-full bg-neutral-300" />
                          <span>
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-xl md:text-2xl font-display font-medium text-black truncate w-full">
                          {blog.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                      <Link
                        to={`/blog/${blog._id}`}
                        target="_blank"
                        className="flex-1 md:flex-none px-6 py-4 bg-white border border-neutral-200 text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-black hover:border-black transition-all text-center"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="flex-1 md:flex-none px-6 py-4 bg-white border border-neutral-200 text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-blue-600 hover:border-blue-600 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="flex-1 md:flex-none px-6 py-4 bg-white border border-neutral-200 text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-red-500 hover:border-red-500 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {!loading && blogs.length === 0 && (
                  <div className="py-20 text-center border-2 border-dashed border-neutral-100 italic text-neutral-400 font-light rounded-sm">
                    No publications found in the database.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

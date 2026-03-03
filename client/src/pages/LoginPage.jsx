import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useToast } from "../context/ToastContext";
import SEO from "../components/SEO";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.auth.login(email, password);
      if (data.status === "success") {
        showToast("Login successful. Welcome back.", "success");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/admin");
      } else {
        showToast(data.message || "Login failed", "error");
      }
    } catch (err) {
      showToast("An unexpected error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white min-h-screen selection:bg-red-500 selection:text-white">
      <SEO
        title="Admin Login | Secure Portal"
        description="Secure login portal for Anil Ayroor's website administration."
      />
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-9xl font-display font-black text-black leading-none mb-8">
                LOGIN<span className="text-red-500">.</span>
              </h1>
              <p className="text-neutral-500 max-w-sm text-sm md:text-base font-light border-l-2 border-red-500 pl-6 mb-12">
                Access your admin dashboard to manage your blogs and content
                with ease and precision.
              </p>
            </motion.div>
          </div>

          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-neutral-50 p-10 md:p-16 border border-black/5 relative"
            >
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent border-b-2 border-neutral-200 focus:border-red-500 py-4 outline-none transition-all font-display text-xl"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent border-b-2 border-neutral-200 focus:border-red-500 py-4 outline-none transition-all font-display text-xl"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-neutral-800 transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                  >
                    {loading ? "AUTHENTICATING..." : "SIGN IN"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;

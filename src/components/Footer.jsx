import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "X / Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050505] pt-16 md:pt-32 pb-12 px-6 md:px-12 overflow-hidden">
      {/* Parallax Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <h2 className="text-[40vw] md:text-[30vw] font-display font-black leading-none uppercase whitespace-nowrap text-white">
          AYROOR
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-16 md:mb-32">
          {/* Main CTA */}
          <div className="md:col-span-6 lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl lg:text-8xl font-display font-black text-white leading-tight uppercase tracking-tighter"
            >
              LET'S <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-[#003d47] via-[#00e5ff] to-[#003d47]">
                CONNECT.
              </span>
            </motion.h2>
            <div className="mt-8 md:mt-12 flex flex-col gap-4 md:gap-6">
              <a
                href="mailto:contact@anilayroor.com"
                className="group flex items-center gap-4 md:gap-6"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00e5ff] group-hover:border-[#00e5ff] transition-all duration-500 shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-display font-bold text-white/60 group-hover:text-white transition-colors tracking-tight break-all">
                  contact@anilayroor.com
                </span>
              </a>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-white/40" />
                </div>
                <span className="text-lg md:text-xl lg:text-2xl font-display font-bold text-white/40 tracking-tight">
                  +91 9876 543 210
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links & Info */}
          <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-500 mb-8 underline decoration-cyan-500/30 underline-offset-8">
                Navigation
              </h4>
              <ul className="space-y-4">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Awards", path: "/awards" },
                  { name: "Events", path: "/events" },
                  { name: "Gallery", path: "/gallery" },
                  { name: "Contact", path: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/40 hover:text-white transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-500 mb-8 underline decoration-cyan-500/30 underline-offset-8">
                Social Presence
              </h4>
              <ul className="space-y-4">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="text-white/40 hover:text-white transition-colors font-medium flex items-center gap-3"
                    >
                      <span className="text-cyan-500/50">{social.icon}</span>
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="text-[10px] items-center uppercase tracking-widest text-white/20 font-bold">
              © 2026 ANIL AYROOR. ALL RIGHTS RESERVED.
            </span>
            <div className="hidden md:block w-px h-3 bg-white/10"></div>
            <a
              href="#"
              className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white transition-colors font-bold"
            >
              Privacy Policy
            </a>
          </div>

          {/* Scroll to Top */}
          <motion.button
            whileHover={{ y: -5 }}
            onClick={scrollToTop}
            className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all duration-300"
          >
            <span>Back to Top</span>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00e5ff] group-hover:bg-[#00e5ff]/10 transition-all duration-500 shadow-2xl">
              <ArrowUp className="w-5 h-5 text-white/30 group-hover:text-[#00e5ff]" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Modern Gradient Accent */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-cyan-500/5 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
    </footer>
  );
};

export default Footer;

// import { motion } from "framer-motion";
// import {
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Youtube,
//   ArrowUp,
//   Mail,
//   MapPin,
//   Phone,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   const socialLinks = [
//     { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
//     { icon: <Twitter className="w-5 h-5" />, href: "#", label: "X / Twitter" },
//     { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
//     { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
//     { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" },
//   ];

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <footer className="relative bg-[#050505] pt-16 md:pt-32 pb-12 px-6 md:px-12 overflow-hidden">
//       {/* Parallax Decorative Background */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.02]">
//         <h2 className="text-[40vw] md:text-[30vw] font-display font-black leading-none uppercase whitespace-nowrap text-white">
//           AYROOR
//         </h2>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-16 md:mb-32">
//           {/* Main CTA */}
//           <div className="md:col-span-6 lg:col-span-7">
//             <motion.h2
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-5xl md:text-6xl lg:text-8xl font-display font-black text-white leading-tight uppercase tracking-tighter"
//             >
//               LET'S <br />
//               <span className="bg-clip-text text-transparent bg-linear-to-r from-[#450a0a] via-[#ef4444] to-[#450a0a]">
//                 CONNECT.
//               </span>
//             </motion.h2>
//             <div className="mt-8 md:mt-12 flex flex-col gap-4 md:gap-6">
//               <a
//                 href="mailto:anil@time7.in"
//                 className="group flex items-center gap-4 md:gap-6"
//               >
//                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#ef4444] group-hover:border-[#ef4444] transition-all duration-500 shrink-0">
//                   <Mail className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black transition-colors" />
//                 </div>
//                 <span className="text-lg md:text-xl lg:text-2xl font-display font-bold text-white/60 group-hover:text-white transition-colors tracking-tight break-all">
//                   anil@time7.in
//                 </span>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links & Info */}
//           <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
//             <div>
//               <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-red-500 mb-8 underline decoration-red-500/30 underline-offset-8">
//                 Navigation
//               </h4>
//               <ul className="space-y-4">
//                 {[
//                   { name: "Home", path: "/" },
//                   { name: "About", path: "/about" },
//                   // { name: "Awards", path: "/awards" },
//                   // { name: "Events", path: "/events" },
//                   { name: "Gallery", path: "/gallery" },
//                   { name: "Contact", path: "/contact" },
//                 ].map((link) => (
//                   <li key={link.name}>
//                     <Link
//                       to={link.path}
//                       className="text-white/40 hover:text-white transition-colors font-medium"
//                     >
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-red-500 mb-8 underline decoration-red-500/30 underline-offset-8">
//                 Social Presence
//               </h4>
//               <ul className="space-y-4">
//                 {socialLinks.map((social) => (
//                   <li key={social.label}>
//                     <a
//                       href={social.href}
//                       className="text-white/40 hover:text-white transition-colors font-medium flex items-center gap-3"
//                     >
//                       <span className="text-red-500/50">{social.icon}</span>
//                       {social.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* SocialBureau Credit Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.3, duration: 0.8 }}
//           className="mb-16 md:mb-24"
//         >
//           <img src="/logo/LOGO (2).png" alt="big tv" />
//           <div className="max-w-3xl border-l border-red-500/30 pl-6 md:pl-10 py-2">
//             <p className="text-white/40 text-sm sm:text-base md:text-lg font-light leading-relaxed">
//               Designed By
//               <a
//                 style={{ fontFamily: "MyFont, sans-serif" }}
//                 href="https://socialbureau.in"
//                 className="text-white hover:text-red-500 transition-colors duration-300 font-bold tracking-tight"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Social<span className="text-red-600">B</span>ureau
//               </a>
//             </p>
//           </div>
//         </motion.div>

//         {/* Bottom Bar */}
//         <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
//           {/* Scroll to Top */}
//           <motion.button
//             whileHover={{ y: -5 }}
//             onClick={scrollToTop}
//             className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all duration-300"
//           >
//             <span>Back to Top</span>
//             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#ef4444] group-hover:bg-[#ef4444]/10 transition-all duration-500 shadow-2xl">
//               <ArrowUp className="w-5 h-5 text-white/30 group-hover:text-[#ef4444]" />
//             </div>
//           </motion.button>
//         </div>
//       </div>

//       {/* Modern Gradient Accent */}
//       <div className="absolute bottom-0 right-0 w-[50vw] h-[50vh] bg-red-600/5 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
//     </footer>
//   );
// };

// export default Footer;

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
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/anil-ayroor-a78487399/",
      label: "LinkedIn",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com/anilayroor.official/",
      label: "Instagram",
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      href: "https://www.facebook.com/ayroor/",
      label: "Facebook",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      href: "https://www.youtube.com/@bigtv24x7live",
      label: "YouTube",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-black pt-20 md:pt-32 pb-8 px-6 md:px-12 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Parallax Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <motion.h2
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[40vw] md:text-[28vw] font-display font-black leading-none uppercase whitespace-nowrap text-white blur-[2px]"
        >
          AYROOR
        </motion.h2>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-[120px] pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-20 md:mb-32">
          {/* Main CTA */}
          <div className="md:col-span-6 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-display font-black text-white leading-[0.95] uppercase tracking-tighter mb-3">
                LET'S
              </h2>
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-display font-black leading-[0.95] uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-red-700 animate-gradient bg-[length:200%_auto]">
                CONNECT.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-10 md:mt-14 flex flex-col gap-6"
            >
              <a
                href="mailto:anil@time7.in"
                className="group flex items-center gap-5 md:gap-6 relative"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:bg-red-500 group-hover:border-red-500 group-hover:scale-110 transition-all duration-500 shrink-0 relative z-10">
                    <Mail className="w-6 h-6 md:w-7 md:h-7 text-white/70 group-hover:text-black transition-colors" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500/60 mb-1">
                    Email
                  </span>
                  <span className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white/50 group-hover:text-white transition-colors tracking-tight">
                    anil@time7.in
                  </span>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Quick Links & Info */}
          <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-8 bg-gradient-to-r from-red-500 to-transparent"></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">
                  Navigation
                </h4>
              </div>
              <ul className="space-y-5">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Gallery", path: "/gallery" },
                  { name: "Contact", path: "/contact" },
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      to={link.path}
                      className="group text-white/30 hover:text-white transition-all duration-300 font-semibold text-lg flex items-center gap-3"
                    >
                      <span className="w-0 h-[2px] bg-red-500 group-hover:w-6 transition-all duration-300"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-8 bg-gradient-to-r from-red-500 to-transparent"></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">
                  Social
                </h4>
              </div>
              <ul className="space-y-5">
                {socialLinks.map((social, index) => (
                  <motion.li
                    key={social.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <a
                      href={social.href}
                      className="group text-white/30 hover:text-white transition-all duration-300 font-medium flex items-center gap-4"
                    >
                      <span className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-red-500/40 group-hover:text-red-500 group-hover:border-red-500/30 group-hover:bg-red-500/10 transition-all duration-300">
                        {social.icon}
                      </span>
                      <span className="text-sm">{social.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Logo & Credit Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <div className="relative mb-6 w-full">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 relative z-10">

              <div className="flex flex-row items-center gap-3 text-[9px] md:text-[11px] font-bold text-white/70 uppercase tracking-[0.2em] mt-6 justify-start w-full text-left relative z-10">

                <span className="uppercase text-white/70">POWERED BY</span>

                <a href="https://www.socialbureau.in/enquiry-form" target="_blank" rel="noopener noreferrer" className="flex justify-start items-center ml-2">

                  <img

                    src="https://www.socialbureau.in/assets/logo.webp"

                    alt="SocialBureau"

                    className="h-5 md:h-8 w-auto"

                  />

                </a>

              </div>

            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Scroll to Top */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all duration-300"
          >
            <span>Back to Top</span>
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center group-hover:border-red-500 group-hover:bg-red-500/20 transition-all duration-500 relative z-10">
                <ArrowUp className="w-5 h-5 text-white/30 group-hover:text-red-500 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Gradient Accents */}
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vh] bg-gradient-to-tl from-red-600/10 via-red-800/5 to-transparent blur-[150px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[40vw] h-[40vh] bg-gradient-to-br from-red-900/10 to-transparent blur-[120px] rounded-full -translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;

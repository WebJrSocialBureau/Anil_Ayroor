import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "./Navbar";

const Home = () => {
  const containerRef = useRef(null);

  // Track scroll progress within this long container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for high-end feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Main video transformations - Shrinking to a central pillar
  const videoWidth = useTransform(smoothProgress, [0, 0.45], ["100vw", "31vw"]);
  const videoHeight = useTransform(
    smoothProgress,
    [0, 0.45],
    ["100vh", "85vh"],
  );
  const videoBorderRadius = useTransform(smoothProgress, [0.2, 0.45], [0, 24]);
  const videoShadow = useTransform(
    smoothProgress,
    [0.35, 0.5],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.25)"],
  );

  // Overlay text fade out
  const titleOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const titleScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);

  // Dynamic black overlay opacity (starts lighter, fades out)
  const overlayOpacity = useTransform(smoothProgress, [0, 0.25], [0.4, 0]);

  // Image layout fade in
  const contentOpacity = useTransform(smoothProgress, [0.25, 0.45], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.25, 0.5], [100, 0]);

  // Navbar scroll state
  const navBg = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  return (
    <>
      <Navbar />

      {/* SCROLL SHOWCASE HERO */}
      <div ref={containerRef} className="h-[450vh] relative bg-white">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* SIDE IMAGES LAYER - Appears as video shrinks */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Top Left Image - Mountain Lake */}
            <div className="absolute top-[8%] left-[5%] w-[24%] aspect-[1.35] rounded-[20px] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200"
                alt="Mountain Lake"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Left Image - Arid Desert */}
            <div className="absolute bottom-[8%] left-[12%] w-[22%] aspect-[1.5] rounded-[20px] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80&w=1200"
                alt="Landscape"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top Right Image - Sunset Horizon */}
            <div className="absolute top-[12%] right-[5%] w-[24%] aspect-[1.5] rounded-[16px] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&q=80&w=1200"
                alt="Sunset Horizon"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Right Image - Mountain Range */}
            <div className="absolute bottom-[8%] right-[8%] w-[26%] aspect-[1.4] rounded-[20px] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=1200"
                alt="Mountain Range"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* MAIN VIDEO LAYER */}
          <motion.div
            style={{
              width: videoWidth,
              height: videoHeight,
              borderRadius: videoBorderRadius,
              boxShadow: useTransform(videoShadow, (v) => `0 40px 100px ${v}`),
              zIndex: 10,
            }}
            className="relative overflow-hidden flex items-center justify-center bg-slate-900"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate"
              className="w-full h-full object-cover"
            >
              <source src="/Hero_Video.mp4" type="video/mp4" />
            </video>

            {/* Dynamic Black Overlay */}
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-black pointer-events-none z-1"
            />

            {/* Dark Gradient Overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-2" />

            {/* Initial Cinematic Title */}
            <motion.div
              style={{ opacity: titleOpacity, scale: titleScale }}
              className="absolute inset-0 flex flex-col items-center justify-center pt-24 md:pt-32 text-white pointer-events-none text-center z-10"
            >
              {/* Decorative Label */}
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent"></span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-white/70 font-bold drop-shadow-md">
                  Media Pioneer
                </span>
                <span className="w-12 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent"></span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display font-black leading-[0.9] tracking-tight">
                <span className="block text-[18vw] md:text-[14vw] lg:text-[11vw] text-white drop-shadow-[0_10px_50px_rgba(0,0,0,1)]">
                  ANIL
                </span>
                <span
                  className="block text-[18vw] md:text-[14vw] lg:text-[11vw] bg-clip-text text-transparent bg-linear-to-r from-[#004752] via-[#00e5ff] to-[#00414d] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  style={{ textShadow: "none" }}
                >
                  AYROOR
                </span>
              </h1>

              {/* Tagline */}
              <div className="mt-10 md:mt-12 space-y-3 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                <p className="font-serif-elegant italic text-lg md:text-xl lg:text-2xl text-white tracking-wide">
                  Journalism. Media. Perspective.
                </p>
                <p className="text-sm md:text-base text-white font-bold tracking-wide">
                  A trusted voice in Malayalam media.
                </p>
                <span className="block text-[3vw] md:text-[2.2vw] font-light text-white/20 tracking-[0.3em] mt-12 lowercase italic font-serif-elegant">
                  trusted voice since 1995.
                </span>

                {/* Explore More Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="mt-12"
                >
                  <Link
                    to="/about"
                    className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 hover:text-[#00e5ff] transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#00e5ff] group-hover:border-[#00e5ff] transition-all duration-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 group-hover:text-black transition-colors rotate-90"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;

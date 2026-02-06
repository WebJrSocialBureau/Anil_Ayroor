import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Navbar from "./Navbar";

const Home = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // Desktop transformations
  const videoWidthDesktop = useTransform(
    smoothProgress,
    [0, 0.45],
    ["100vw", "31vw"],
  );
  const videoHeightDesktop = useTransform(
    smoothProgress,
    [0, 0.45],
    ["100vh", "85vh"],
  );

  // Mobile transformations
  const videoHeightMobile = useTransform(
    smoothProgress,
    [0, 0.45],
    ["100vh", "50vh"],
  );
  const videoWidthMobile = "100vw";

  // Shared / Conditional
  const videoWidth = isMobile ? videoWidthMobile : videoWidthDesktop;
  const videoHeight = isMobile ? videoHeightMobile : videoHeightDesktop;

  const videoBorderRadius = useTransform(smoothProgress, [0.2, 0.45], [0, 24]);
  const videoShadow = useTransform(
    smoothProgress,
    [0.35, 0.5],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.25)"],
  );

  const titleOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const titleScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const scrollIndicatorOpacity = useTransform(
    smoothProgress,
    [0, 0.05],
    [1, 0],
  );
  const overlayOpacity = useTransform(smoothProgress, [0, 0.25], [0.4, 0]);

  // Image layout transformations
  const contentOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.3, 0.5], [100, 0]);

  const images = [
    {
      src: "/hero_image1.png",
      alt: "Anil Ayroor Hero 1",
    },
    {
      src: "/hero_image2.png",
      alt: "Anil Ayroor Hero 2",
    },
    {
      src: "/hero_image3.png",
      alt: "Anil Ayroor Hero 3",
    },
    {
      src: "/hero_image4.png",
      alt: "Anil Ayroor Hero 4",
    },
  ];

  return (
    <>
      <Navbar />

      <div ref={containerRef} className="h-[450vh] relative bg-white px-0">
        <div
          className={`sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center ${isMobile ? "justify-start" : "justify-center"}`}
        >
          {/* SIDE IMAGES LAYER (DESKTOP ONLY) */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
          >
            <div className="absolute top-[8%] left-[5%] w-[24%] aspect-[1.35] rounded-[20px] overflow-hidden shadow-xl">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-[8%] left-[12%] w-[22%] aspect-[1.5] rounded-[20px] overflow-hidden shadow-xl">
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-[12%] right-[5%] w-[24%] aspect-[1.5] rounded-[16px] overflow-hidden shadow-xl">
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-[8%] right-[8%] w-[26%] aspect-[1.4] rounded-[20px] overflow-hidden shadow-xl">
              <img
                src={images[3].src}
                alt={images[3].alt}
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
              boxShadow: useTransform(videoShadow, (v) => `0 50px 150px ${v}`),
              zIndex: 20,
            }}
            className="relative overflow-hidden flex items-center justify-center bg-slate-900 shrink-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              className="w-full h-full object-cover"
            >
              <source src="/Hero_Video.mp4" type="video/mp4" />
            </video>

            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-black pointer-events-none z-1"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-2" />

            <motion.div
              style={{ opacity: titleOpacity, scale: titleScale }}
              className="absolute inset-0 flex flex-col items-center justify-center md:pt-32 text-white pointer-events-none text-center z-10 p-6"
            >
              <div className="flex items-center gap-4 mb-4 md:mb-8">
                <span className="w-8 md:w-12 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent"></span>
                <span className="text-[8px] md:text-[11px] uppercase tracking-[0.35em] text-white/70 font-bold">
                  Media Pioneer
                </span>
                <span className="w-8 md:w-12 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent"></span>
              </div>

              <h1 className="font-display font-black leading-[0.9] tracking-tight">
                <span className="block text-[15vw] md:text-[14vw] lg:text-[11vw] text-white">
                  ANIL
                </span>
                <span className="block text-[15vw] md:text-[14vw] lg:text-[11vw] bg-clip-text text-transparent bg-linear-to-r from-[#004752] via-[#00e5ff] to-[#00414d]">
                  AYROOR
                </span>
              </h1>

              {/* Tagline */}
              <div className="mt-6 md:mt-12 space-y-2 md:space-y-3 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                <p className="font-serif-elegant italic text-sm md:text-xl lg:text-2xl text-white tracking-wide">
                  Journalism. Media. Perspective.
                </p>
                <p className="text-[10px] md:text-base text-white font-bold tracking-wide">
                  A trusted voice in Malayalam media.
                </p>
              </div>

              {/* Mobile Scroll Indicator */}
              <motion.div
                style={{ opacity: scrollIndicatorOpacity }}
                className="lg:hidden absolute bottom-12 left-1/2 -translate-x-1/2"
              >
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-white/40 rotate-90"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* IMAGE CARDS REVEAL (MOBILE ONLY) */}
          <motion.div
            style={{
              opacity: contentOpacity,
              y: contentY,
            }}
            className="lg:hidden relative z-10 w-full max-w-7xl mx-auto px-6 h-[50vh] flex flex-col justify-center"
          >
            {/* Mobile/Tablet Layout Grid */}
            <div className="lg:hidden grid grid-cols-2 gap-3 h-full max-h-[45vh]">
              {images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-lg border border-black/5"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import LandingPage from "./components/LandingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AwardsPage from "./pages/AwardsPage";
import EventsPage from "./pages/EventsPage";
import GalleryPage from "./pages/GalleryPage";
import ScrollToTop from "./utils/ScrollToTop";
import PageTransition from "./components/PageTransition";
import "./App.css";

// Expanded Gallery Data for Premium Experience
const galleryItems = [
  {
    id: 1,
    title: "News Room V1",
    category: "Broadcast",
    url: "/gallery/gallery1.png",
    aspectRatio: "landscape",
    desc: "A behind-the-scenes look at the next-generation newsroom infrastructure.",
  },
  {
    id: 2,
    title: "The Interview",
    category: "Production",
    url: "/gallery/gallery2.png",
    aspectRatio: "portrait",
    desc: "Capturing the intensity of high-profile political dialogues.",
  },
  {
    id: 3,
    title: "Digital Shift",
    category: "Innovation",
    url: "/gallery/gallery3.png",
    aspectRatio: "square",
    desc: "Visualizing the fusion of media and artificial intelligence.",
  },
  {
    id: 4,
    title: "Live Coverage",
    category: "Journalism",
    url: "/gallery/gallery4.png",
    aspectRatio: "portrait",
    desc: "On-field reporting from major global events.",
  },
  {
    id: 5,
    title: "Editorial Design",
    category: "Visuals",
    url: "/gallery/gallery5.jpg",
    aspectRatio: "landscape",
    desc: "Crafting narratives through sophisticated visual layouts.",
  },
  {
    id: 6,
    title: "Studio Lighting",
    category: "Cinematography",
    url: "/gallery/gallery6.png",
    aspectRatio: "portrait",
    desc: "The technical precision behind cinematic broadcast lighting.",
  },
  {
    id: 7,
    title: "Control Room",
    category: "Engineering",
    url: "/gallery/gallery7.png",
    aspectRatio: "landscape",
    desc: "The nerve center of real-time broadcasting excellence.",
  },
  {
    id: 8,
    title: "Media Perspective",
    category: "Heritage",
    url: "/gallery/gallery8.png",
    aspectRatio: "portrait",
    desc: "Deep diving into the heritage of journalistic excellence and media ethics.",
  },
  {
    id: 9,
    title: "Cinematic Broadcast",
    category: "Broadcast",
    url: "/gallery/gallery9.png",
    aspectRatio: "square",
    desc: "The visual evolution of modern broadcast storytelling.",
  },
];

const AnimatedRoutes = ({ galleryItems }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage galleryItems={galleryItems} />
            </PageTransition>
          }
        />
        <Route
          path="/awards"
          element={
            <PageTransition>
              <AwardsPage />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        />
        <Route
          path="/events"
          element={
            <PageTransition>
              <EventsPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
        <Route
          path="/gallery"
          element={
            <PageTransition>
              <GalleryPage items={galleryItems} />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Smooth Scroll (Lenis)
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <Router>
      <div className="antialiased text-black bg-white min-h-screen">
        <CustomCursor />

        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <ScrollToTop />
            <AnimatedRoutes galleryItems={galleryItems} />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;

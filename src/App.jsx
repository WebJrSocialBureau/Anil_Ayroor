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
import ScrollToTop from "./utils/ScrollToTop";
import PageTransition from "./components/PageTransition";
import "./App.css";

// Dummy Data for Gallery
const galleryItems = [
  {
    id: 1,
    title: "News Room V2",
    category: "Broadcast",
    url: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    title: "The Interview",
    category: "Production",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
  },
  {
    id: 3,
    title: "Digital Shift",
    category: "Tech",
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
  },
  {
    id: 4,
    title: "Live Coverage",
    category: "News",
    url: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
  },
  {
    id: 5,
    title: "Editorial Design",
    category: "Print",
    url: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
  },
  {
    id: 6,
    title: "Studio Lighting",
    category: "Setup",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
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
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
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

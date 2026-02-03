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
    title: "News Room V2",
    category: "Broadcast",
    url: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    desc: "A behind-the-scenes look at the next-generation newsroom infrastructure.",
  },
  {
    id: 2,
    title: "The Interview",
    category: "Production",
    url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    desc: "Capturing the intensity of high-profile political dialogues.",
  },
  {
    id: 3,
    title: "Digital Shift",
    category: "Innovation",
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    desc: "Visualizing the fusion of media and artificial intelligence.",
  },
  {
    id: 4,
    title: "Live Coverage",
    category: "Journalism",
    url: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    desc: "On-field reporting from major global events.",
  },
  {
    id: 5,
    title: "Editorial Design",
    category: "Visuals",
    url: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    desc: "Crafting narratives through sophisticated visual layouts.",
  },
  {
    id: 6,
    title: "Studio Lighting",
    category: "Cinematography",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    desc: "The technical precision behind cinematic broadcast lighting.",
  },
  {
    id: 7,
    title: "Control Room",
    category: "Engineering",
    url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    desc: "The nerve center of real-time broadcasting excellence.",
  },
  {
    id: 8,
    title: "Media Forum",
    category: "Global",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    desc: "Cross-border collaborations with international media leaders.",
  },
  {
    id: 9,
    title: "Press Archive",
    category: "Heritage",
    url: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    desc: "Preserving the legacy of journalistic integrity through decades.",
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

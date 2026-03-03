import { Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import GrowthStory from "./GrowthStory";
import ZoomTransition from "./ZoomTransition";
import SectionReveal from "./SectionReveal";
import Gallery from "./Gallery";
import BlogSection from "./BlogSection";
import ExperienceBridge from "./ExperienceBridge";
import Footer from "./Footer";
import SEO from "./SEO";

const LandingPage = ({ galleryItems }) => {
  return (
    <main className="w-full relative">
      <SEO
        title="Journalist, Media Pioneer & Leadership Expert"
        description="Official website of Anil Ayroor - Journalist, Media Professional, and Content Creator. Explore the latest insights, awards, and events."
        schemaData={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Anil Ayroor",
          jobTitle: "Journalist & Media Professional",
          url: "https://anilayroor.com",
          sameAs: [
            "https://twitter.com/anilayroor",
            "https://linkedin.com/in/anilayroor",
          ],
        }}
      />
      <Home />
      <About />
      <ZoomTransition>
        <GrowthStory />
      </ZoomTransition>

      <SectionReveal>
        <section
          id="gallery"
          className="bg-white pt-32 pb-12 min-h-screen border-t border-black/5"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 className="text-6xl md:text-[8vw] font-display font-black text-black leading-[0.8]">
                <span className="block text-black">
                  GALLERY<span className="text-red-500">.</span>
                </span>
              </h2>
              <div className="flex flex-col items-start gap-6">
                <p className="text-neutral-600 max-w-sm text-sm md:text-base font-light border-l-2 border-red-500 pl-6">
                  A Visual Chronicle: A curated showcase of iconic moments and
                  prestigious highlights across the media landscape.
                </p>
                <Link
                  to="/gallery"
                  className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-red-600 hover:text-black transition-colors"
                >
                  VIEW_ALL_ARCHIVE
                  <div className="w-8 h-px bg-red-600/30 group-hover:w-12 group-hover:bg-black transition-all" />
                </Link>
              </div>
            </div>
          </div>
          <div className="max-w-[100vw] mx-auto overflow-hidden">
            <Gallery items={galleryItems} />
          </div>
        </section>
      </SectionReveal>

      <BlogSection />

      <ExperienceBridge />
      <Footer />
    </main>
  );
};

export default LandingPage;

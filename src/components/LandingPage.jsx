import Home from "./Home";
import About from "./About";
import GrowthStory from "./GrowthStory";
import ZoomTransition from "./ZoomTransition";
import SectionReveal from "./SectionReveal";
import Gallery from "./Gallery";
import Footer from "./Footer";

const LandingPage = ({ galleryItems }) => {
  return (
    <main className="w-full relative">
      <Home />
      <About />
      <ZoomTransition>
        <GrowthStory />
      </ZoomTransition>

      <SectionReveal>
        <section
          id="work"
          className="bg-white pt-32 pb-12 min-h-screen border-t border-black/5"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <h2 className="text-6xl md:text-[8vw] font-display font-black text-black leading-[0.8]">
                <span className="block text-black">
                  PORTFOLIO<span className="text-cyan-400">.</span>
                </span>
              </h2>
              <p className="text-neutral-600 max-w-sm text-sm md:text-base font-light border-l-2 border-cyan-400 pl-6 mb-2">
                Showcase impactful media projects and visual storytelling that
                define the future of Malayalam journalism.
              </p>
            </div>
          </div>
          <div className="max-w-[100vw] mx-auto overflow-hidden">
            <Gallery items={galleryItems} />
          </div>
        </section>
      </SectionReveal>
      <Footer />
    </main>
  );
};

export default LandingPage;

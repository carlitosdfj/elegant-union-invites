import EnvelopeAnimation from "@/components/EnvelopeAnimation";
import FallingPetals from "@/components/FallingPetals";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import LocationSection from "@/components/LocationSection";
import DressCodeSection from "@/components/DressCodeSection";
import GallerySection from "@/components/GallerySection";
import ImportantInfoSection from "@/components/ImportantInfoSection";
import RSVPSection from "@/components/RSVPSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background subtle-texture">
      <FallingPetals />
      <EnvelopeAnimation />

      <main>
        <HeroSection />

        <div className="w-16 h-px bg-warm-brown/30 mx-auto" />
        <div className="section-alt">
          <TimelineSection />
        </div>

        <div className="w-16 h-px bg-warm-brown/30 mx-auto" />
        <LocationSection />

        <div className="w-16 h-px bg-warm-brown/30 mx-auto" />
        <div className="section-warm">
          <DressCodeSection />
        </div>

        <div className="w-16 h-px bg-warm-brown/30 mx-auto" />
        <GallerySection />

        <div className="w-16 h-px bg-warm-brown/30 mx-auto" />
        <div className="section-alt">
          <ImportantInfoSection />
        </div>

        <div className="w-16 h-px bg-warm-brown/30 mx-auto" />
        <RSVPSection />

        {/* Footer */}
        <footer className="py-16 text-center section-warm">
          <p className="font-serif text-2xl sm:text-3xl text-foreground font-light">
            Sebastián & Sara
          </p>
          <p className="font-sans-detail text-xs text-muted-foreground mt-2 tracking-[0.2em]">
            21 · 08 · 2026
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;

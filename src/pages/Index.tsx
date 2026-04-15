import EnvelopeAnimation from "@/components/EnvelopeAnimation";
import FallingPetals from "@/components/FallingPetals";
import HeroSection from "@/components/HeroSection";
import TimelineSection from "@/components/TimelineSection";
import LocationSection from "@/components/LocationSection";
import DressCodeSection from "@/components/DressCodeSection";
import GallerySection from "@/components/GallerySection";
import ImportantInfoSection from "@/components/ImportantInfoSection";
import RSVPSection from "@/components/RSVPSection";
import WatercolorBlotch from "@/components/WatercolorBlotch";
import FloralDivider from "@/components/FloralDivider";
import WatercolorWash from "@/components/WatercolorWash";

const Index = () => {
  return (
    <div className="min-h-screen bg-background subtle-texture relative overflow-x-hidden">
      <FallingPetals />
      <EnvelopeAnimation />

      {/* Global watercolor blotches — more visible */}
      <WatercolorBlotch variant={1} color="hsl(var(--dusty-rose))" size={400} opacity={0.14} className="top-[3%] -right-24" />
      <WatercolorBlotch variant={3} color="hsl(var(--soft-olive))" size={350} opacity={0.12} className="top-[10%] -left-20" />
      <WatercolorBlotch variant={2} color="hsl(var(--warm-brown))" size={300} opacity={0.10} className="top-[22%] -right-16" />
      <WatercolorBlotch variant={4} color="hsl(var(--dusty-rose))" size={380} opacity={0.12} className="top-[32%] -left-28" />
      <WatercolorBlotch variant={5} color="hsl(var(--soft-olive))" size={320} opacity={0.13} className="top-[42%] right-0" />
      <WatercolorBlotch variant={1} color="hsl(var(--warm-brown))" size={360} opacity={0.11} className="top-[52%] -left-16" />
      <WatercolorBlotch variant={3} color="hsl(var(--dusty-rose))" size={300} opacity={0.12} className="top-[62%] -right-20" />
      <WatercolorBlotch variant={2} color="hsl(var(--soft-olive))" size={340} opacity={0.10} className="top-[72%] -left-24" />
      <WatercolorBlotch variant={4} color="hsl(var(--warm-brown))" size={280} opacity={0.11} className="top-[82%] -right-12" />
      <WatercolorBlotch variant={5} color="hsl(var(--dusty-rose))" size={320} opacity={0.13} className="top-[90%] -left-20" />

      <main className="relative z-[2]">
        <HeroSection />

        <FloralDivider variant={1} align="right" />
        <div className="section-alt relative">
          <WatercolorWash variant={2} className="top-0 -left-20 w-72 sm:w-96" opacity={0.18} />
          <WatercolorWash variant={1} className="bottom-0 -right-24 w-64 sm:w-80" opacity={0.14} />
          <div className="relative z-[1]">
            <TimelineSection />
          </div>
        </div>

        <FloralDivider variant={2} align="left" flip />
        <div className="relative">
          <WatercolorWash variant={1} className="top-4 -right-20 w-64 sm:w-80" opacity={0.15} />
          <WatercolorWash variant={2} className="bottom-4 -left-16 w-56 sm:w-72" opacity={0.12} />
          <div className="relative z-[1]">
            <LocationSection />
          </div>
        </div>

        <FloralDivider variant={3} align="right" />
        <div className="section-warm relative">
          <WatercolorWash variant={1} className="bottom-0 -right-16 w-72 sm:w-96" opacity={0.2} />
          <WatercolorWash variant={2} className="top-4 -left-20 w-64 sm:w-80" opacity={0.15} />
          <div className="relative z-[1]">
            <DressCodeSection />
          </div>
        </div>

        <FloralDivider variant={1} align="left" flip />
        <div className="relative">
          <WatercolorWash variant={2} className="top-8 -right-24 w-72 sm:w-96" opacity={0.16} />
          <WatercolorWash variant={1} className="bottom-8 -left-20 w-64 sm:w-80" opacity={0.14} />
          <div className="relative z-[1]">
            <GallerySection />
          </div>
        </div>

        <FloralDivider variant={2} align="right" />
        <div className="section-alt relative">
          <WatercolorWash variant={1} className="-top-8 -left-16 w-72 sm:w-96" opacity={0.18} />
          <WatercolorWash variant={2} className="bottom-4 -right-20 w-64 sm:w-80" opacity={0.14} />
          <div className="relative z-[1]">
            <ImportantInfoSection />
          </div>
        </div>

        <FloralDivider variant={3} align="left" flip />
        <div className="relative">
          <WatercolorWash variant={1} className="top-0 -left-24 w-72 sm:w-96" opacity={0.16} />
          <WatercolorWash variant={2} className="bottom-0 -right-16 w-64 sm:w-80" opacity={0.13} />
          <div className="relative z-[1]">
            <RSVPSection />
          </div>
        </div>

        {/* Footer */}
        <footer className="py-16 text-center section-warm relative">
          <p className="font-script text-3xl sm:text-4xl text-foreground">
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

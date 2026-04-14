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
import OrganicDivider from "@/components/OrganicDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background subtle-texture relative overflow-hidden">
      <FallingPetals />
      <EnvelopeAnimation />

      {/* Global watercolor blotches */}
      <WatercolorBlotch variant={1} color="hsl(var(--dusty-rose))" size={300} opacity={0.07} className="top-[5%] -right-20" />
      <WatercolorBlotch variant={3} color="hsl(var(--soft-olive))" size={250} opacity={0.06} className="top-[15%] -left-16" />
      <WatercolorBlotch variant={2} color="hsl(var(--warm-brown))" size={200} opacity={0.05} className="top-[35%] -right-10" />
      <WatercolorBlotch variant={4} color="hsl(var(--dusty-rose))" size={280} opacity={0.06} className="top-[50%] -left-24" />
      <WatercolorBlotch variant={5} color="hsl(var(--soft-olive))" size={220} opacity={0.07} className="top-[65%] right-0" />
      <WatercolorBlotch variant={1} color="hsl(var(--warm-brown))" size={260} opacity={0.05} className="top-[80%] -left-12" />
      <WatercolorBlotch variant={3} color="hsl(var(--dusty-rose))" size={200} opacity={0.06} className="top-[92%] -right-16" />

      <main className="relative z-[2]">
        <HeroSection />

        <OrganicDivider />
        <div className="section-alt relative">
          <WatercolorBlotch variant={2} color="hsl(var(--soft-olive))" size={180} opacity={0.08} className="top-4 right-4" />
          <TimelineSection />
        </div>

        <OrganicDivider />
        <div className="relative">
          <WatercolorBlotch variant={4} color="hsl(var(--dusty-rose))" size={160} opacity={0.06} className="-top-8 -left-8" />
          <LocationSection />
        </div>

        <OrganicDivider />
        <div className="section-warm relative">
          <WatercolorBlotch variant={1} color="hsl(var(--warm-brown))" size={150} opacity={0.06} className="bottom-0 right-0" />
          <DressCodeSection />
        </div>

        <OrganicDivider />
        <div className="relative">
          <WatercolorBlotch variant={5} color="hsl(var(--soft-olive))" size={200} opacity={0.07} className="top-8 -left-12" />
          <GallerySection />
        </div>

        <OrganicDivider />
        <div className="section-alt relative">
          <WatercolorBlotch variant={3} color="hsl(var(--dusty-rose))" size={180} opacity={0.06} className="top-0 -right-8" />
          <ImportantInfoSection />
        </div>

        <OrganicDivider />
        <div className="relative">
          <WatercolorBlotch variant={2} color="hsl(var(--warm-brown))" size={160} opacity={0.05} className="bottom-4 left-4" />
          <RSVPSection />
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

import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";

const EnvelopeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Phase 1: Flap opens (0% → 30%)
  const flapRotate = useTransform(scrollYProgress, [0, 0.3], [0, 180]);
  // Flap z-index: starts at 30 (above card), drops to 5 (behind card) once open
  const flapZIndex = useTransform(scrollYProgress, [0.14, 0.15], [30, 5]);
  const sealOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Phase 2: Card slides up (25% → 70%)
  const cardY = useTransform(scrollYProgress, [0.25, 0.7], [0, -350]);

  // Phase 3: Envelope fades (75% → 90%)
  const envelopeOpacity = useTransform(scrollYProgress, [0.75, 0.9], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.85, 1], [1, 0.96]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: containerScale }}
          className="relative w-[320px] sm:w-[420px] h-[220px] sm:h-[280px]"
        >
          {/* ========== ENVELOPE BODY (z-10) ========== */}
          <motion.div
            style={{ opacity: envelopeOpacity, zIndex: 10 }}
            className="absolute inset-0 rounded-lg bg-secondary border border-border shadow-xl"
          >
            {/* Inner fold lines for realism */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 280" preserveAspectRatio="none">
              <defs>
                <filter id="foldShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="hsl(var(--foreground))" floodOpacity="0.15" />
                </filter>
              </defs>
              {/* V-fold from top corners to center */}
              <line x1="0" y1="0" x2="210" y2="140" stroke="hsl(var(--border))" strokeOpacity="0.5" strokeWidth="1" filter="url(#foldShadow)" />
              <line x1="420" y1="0" x2="210" y2="140" stroke="hsl(var(--border))" strokeOpacity="0.5" strokeWidth="1" filter="url(#foldShadow)" />
              {/* Bottom fold */}
              <line x1="0" y1="280" x2="210" y2="180" stroke="hsl(var(--border))" strokeOpacity="0.3" strokeWidth="1" />
              <line x1="420" y1="280" x2="210" y2="180" stroke="hsl(var(--border))" strokeOpacity="0.3" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* ========== FLAP (z-30 → z-5) ========== */}
          <motion.div
            style={{ opacity: envelopeOpacity, zIndex: flapZIndex }}
            className="absolute top-0 left-0 right-0"
          >
            <div style={{ perspective: 800 }}>
              <motion.div
                style={{
                  rotateX: flapRotate,
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front face of flap (visible when closed) */}
                <svg
                  className="w-full block"
                  viewBox="0 0 420 160"
                  preserveAspectRatio="none"
                  style={{ height: "60%", backfaceVisibility: "hidden" }}
                >
                  <defs>
                    <filter id="flapShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="hsl(var(--foreground))" floodOpacity="0.2" />
                    </filter>
                  </defs>
                  <polygon
                    points="0,0 420,0 210,160"
                    fill="hsl(var(--secondary))"
                    stroke="hsl(var(--border))"
                    strokeOpacity="0.7"
                    strokeWidth="1"
                    filter="url(#flapShadow)"
                  />
                </svg>
                {/* Back face of flap (visible when open) */}
                <svg
                  className="absolute top-0 left-0 w-full"
                  viewBox="0 0 420 160"
                  preserveAspectRatio="none"
                  style={{ height: "60%", backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
                >
                  <polygon
                    points="0,0 420,0 210,160"
                    fill="hsl(var(--envelope))"
                    stroke="hsl(var(--border))"
                    strokeOpacity="0.5"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>
            </div>

            {/* Wax seal */}
            <motion.div
              style={{ opacity: sealOpacity }}
              className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2"
            >
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-11 h-11 rounded-full bg-warm-brown flex items-center justify-center shadow-lg"
              >
                <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ========== INVITATION CARD (z-20, always above body) ========== */}
          <motion.div
            style={{ y: cardY, zIndex: 20 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <div className="bg-card rounded-md border border-border/70 flex flex-col items-center justify-center p-5 sm:p-6 shadow-lg">
              <p className="font-sans-detail text-muted-foreground text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-2">
                Estás invitado a la boda de
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight text-center">
                Sebastián
              </h2>
              <p className="font-serif text-xl sm:text-2xl text-warm-brown my-1">&amp;</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight text-center">
                Sara
              </h2>
              <div className="w-16 h-px bg-warm-brown/80 my-3" />
              <p className="font-sans-detail text-[10px] sm:text-xs tracking-[0.2em] text-muted-foreground uppercase">
                21 de Agosto, 2026
              </p>
            </div>
          </motion.div>

          {/* Outer border */}
          <motion.div
            style={{ opacity: envelopeOpacity, zIndex: 10 }}
            className="absolute inset-0 pointer-events-none rounded-lg border border-border/60"
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="font-sans-detail text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Desliza para abrir
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-warm-brown/80 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-warm-brown/80 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnvelopeAnimation;

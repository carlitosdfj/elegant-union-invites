import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";

const InvitationCard = ({ style }: { style: Record<string, unknown> }) => {
  return (
    <motion.div style={style} className="absolute bottom-4 left-4 right-4">
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
  );
};

const EnvelopeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // flap opens first → card rises from the mouth → envelope fades away
  const flapRotate = useTransform(scrollYProgress, [0, 0.28], [0, -175]);
  const sealOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0.22, 0.72], [90, -320]);
  const cardScale = useTransform(scrollYProgress, [0.6, 0.82], [1, 1.03]);
  const envelopeOpacity = useTransform(scrollYProgress, [0.76, 0.9], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.86, 1], [1, 0.96]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const envelopeW = "w-[320px] sm:w-[420px]";
  const envelopeH = "h-[220px] sm:h-[280px]";

  const foldStroke = "hsl(var(--border))";
  const foldShadow = "hsl(var(--foreground))";

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: containerScale }} className={`relative ${envelopeW} ${envelopeH}`}>
          {/* ===== BACK PANEL (depth + border) ===== */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 z-[10] rounded-lg bg-envelope-dark border border-border/70 shadow-xl"
          />

          {/* ===== INNER LINER (visible when flap opens) ===== */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-[1px] z-[12] rounded-[calc(var(--radius)-1px)] bg-envelope"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 280" preserveAspectRatio="none">
              <defs>
                <filter id="foldSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1.4" floodColor={foldShadow} floodOpacity="0.18" />
                </filter>
              </defs>
              <line
                x1="18"
                y1="52"
                x2="210"
                y2="150"
                stroke={foldStroke}
                strokeOpacity="0.55"
                strokeWidth="1"
                filter="url(#foldSoftShadow)"
              />
              <line
                x1="402"
                y1="52"
                x2="210"
                y2="150"
                stroke={foldStroke}
                strokeOpacity="0.55"
                strokeWidth="1"
                filter="url(#foldSoftShadow)"
              />
            </svg>
          </motion.div>

          {/* ===== CARD (between back and pocket, so it truly emerges from the mouth) ===== */}
          <div className="absolute inset-0 z-[20] pointer-events-none">
            <InvitationCard style={{ y: cardY, scale: cardScale }} />
          </div>

          {/* ===== FRONT POCKET (only bottom part, leaves a real mouth opening) ===== */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 z-[30] pointer-events-none"
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 420 280" preserveAspectRatio="none">
              <defs>
                <filter id="pocketShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={foldShadow} floodOpacity="0.2" />
                </filter>
              </defs>

              {/* Pocket shape (open at the top area) */}
              <path
                d="M 0 86 L 210 162 L 420 86 L 420 280 L 0 280 Z"
                fill="hsl(var(--secondary))"
                stroke={foldStroke}
                strokeOpacity="0.75"
                strokeWidth="1"
                filter="url(#pocketShadow)"
              />

              {/* Pocket fold lines (V seam + side seams) */}
              <path
                d="M 0 86 L 210 162 L 420 86"
                fill="none"
                stroke={foldStroke}
                strokeOpacity="0.85"
                strokeWidth="1.2"
              />
              <path
                d="M 0 86 L 0 280"
                fill="none"
                stroke={foldStroke}
                strokeOpacity="0.5"
                strokeWidth="1"
              />
              <path
                d="M 420 86 L 420 280"
                fill="none"
                stroke={foldStroke}
                strokeOpacity="0.5"
                strokeWidth="1"
              />
            </svg>

            {/* Pocket rim highlight (adds depth to the mouth opening) */}
            <div className="absolute left-0 right-0 top-[30%] h-px bg-border/60" />
          </motion.div>

          {/* ===== WAX SEAL ===== */}
          <motion.div
            style={{ opacity: sealOpacity }}
            className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-[45]"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-11 h-11 rounded-full bg-warm-brown flex items-center justify-center shadow-lg"
            >
              <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </motion.div>
          </motion.div>

          {/* ===== FLAP (closes the mouth at start, opens upward toward the user) ===== */}
          <div className="absolute top-0 left-0 right-0 z-[60]" style={{ perspective: 900 }}>
            <motion.div
              style={{
                rotateX: flapRotate,
                transformOrigin: "top center",
                opacity: envelopeOpacity,
                transformStyle: "preserve-3d",
              }}
            >
              <svg
                className="w-full"
                viewBox="0 0 420 160"
                preserveAspectRatio="none"
                style={{ height: "62%", backfaceVisibility: "hidden", display: "block" }}
              >
                <defs>
                  <filter id="flapDrop" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor={foldShadow} floodOpacity="0.22" />
                  </filter>
                </defs>
                <polygon
                  points="0,0 420,0 210,160"
                  fill="hsl(var(--secondary))"
                  stroke={foldStroke}
                  strokeOpacity="0.8"
                  strokeWidth="1"
                  filter="url(#flapDrop)"
                />
              </svg>

              <svg
                className="absolute top-0 left-0 w-full"
                viewBox="0 0 420 160"
                preserveAspectRatio="none"
                style={{ height: "62%", backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
              >
                <polygon
                  points="0,0 420,0 210,160"
                  fill="hsl(var(--envelope))"
                  stroke={foldStroke}
                  strokeOpacity="0.6"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>
          </div>

          {/* ===== OUTER BORDER (keeps the envelope complete at start) ===== */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 z-[70] pointer-events-none rounded-lg border border-border/60"
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
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

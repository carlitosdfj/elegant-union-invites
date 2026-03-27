import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

const EnvelopeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const flapRotate = useTransform(scrollYProgress, [0, 0.25], [0, 180]);
  const cardY = useTransform(scrollYProgress, [0.15, 0.6], [0, -340]);
  const cardScale = useTransform(scrollYProgress, [0.55, 0.8], [1, 1.05]);
  const envelopeOpacity = useTransform(scrollYProgress, [0.55, 0.75], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.75, 1], [1, 0.95]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: containerScale }}
          className="relative w-[320px] h-[220px] sm:w-[420px] sm:h-[280px]"
        >
          {/* ===== LAYER 1: ENVELOPE BACK (z-20) ===== */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 z-[20] rounded-lg"
          >
            <div
              className="absolute inset-0 bg-envelope-dark rounded-lg"
              style={{
                boxShadow:
                  "0 12px 40px -8px hsla(22, 30%, 35%, 0.35), 0 4px 12px -4px hsla(22, 30%, 35%, 0.2)",
              }}
            />
            {/* Inner fold lines for realism */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "linear-gradient(135deg, transparent 40%, hsla(22,20%,60%,0.3) 50%, transparent 60%), linear-gradient(-135deg, transparent 40%, hsla(22,20%,60%,0.3) 50%, transparent 60%)",
              }}
            />
          </motion.div>

          {/* ===== LAYER 2: INVITATION CARD (z-25, slides up) ===== */}
          <motion.div
            style={{ y: cardY, scale: cardScale }}
            className="absolute left-4 right-4 top-4 bottom-4 z-[25]"
          >
            <div
              className="w-full h-full bg-card rounded-md flex flex-col items-center justify-center p-5"
              style={{ boxShadow: "0 6px 24px -6px hsla(22, 25%, 50%, 0.3)" }}
            >
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
              <div className="w-16 h-px bg-warm-brown my-3" />
              <p className="font-sans-detail text-[10px] sm:text-xs tracking-[0.2em] text-muted-foreground uppercase">
                21 de Agosto, 2026
              </p>
            </div>
          </motion.div>

          {/* ===== LAYER 3: ENVELOPE FRONT (z-30) — solid, fully covers card ===== */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 z-[30] pointer-events-none"
          >
            {/* Full solid front panel */}
            <div className="absolute inset-0 bg-secondary rounded-lg" />

            {/* Top V-fold decorative line */}
            <div
              className="absolute top-0 left-0 right-0 h-[45%] bg-envelope-dark opacity-25"
              style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
            />

            {/* Subtle bottom edge highlight */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{ background: "hsla(22, 40%, 96%, 0.4)" }}
            />
          </motion.div>

          {/* ===== LAYER 4: WAX SEAL (z-35) ===== */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[35]"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-warm-brown flex items-center justify-center"
              style={{ boxShadow: "0 3px 12px -2px hsla(22, 30%, 28%, 0.45)" }}
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground fill-primary-foreground" />
            </motion.div>
          </motion.div>

          {/* ===== LAYER 5: ENVELOPE FLAP (z-40, opens upward) ===== */}
          <motion.div
            style={{
              rotateX: flapRotate,
              transformOrigin: "top center",
              opacity: envelopeOpacity,
            }}
            className="absolute top-0 left-0 right-0 z-[40]"
          >
            {/* Front face of flap (visible when closed — triangle pointing down) */}
            <div
              className="absolute top-0 left-0 right-0 bg-secondary"
              style={{
                height: "140px",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
                boxShadow: "0 4px 8px -2px hsla(22, 30%, 35%, 0.2)",
              }}
            />
            {/* Back face of flap (visible when opened) */}
            <div
              className="absolute top-0 left-0 right-0 bg-envelope-dark"
              style={{
                height: "140px",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
            />
          </motion.div>
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
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-warm-brown rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-warm-brown rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnvelopeAnimation;

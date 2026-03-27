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
  const cardY = useTransform(scrollYProgress, [0.15, 0.6], [0, -320]);
  const cardScale = useTransform(scrollYProgress, [0.5, 0.8], [1, 1.05]);
  const envelopeOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.75, 1], [1, 0.95]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  // Card stays between back (z-30) and front (z-40) panels — only visible as it exits the top edge

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: containerScale }}
          className="relative w-[300px] h-[200px] sm:w-[400px] sm:h-[260px]"
        >
          {/* === INVITATION CARD (starts inside, slides up and out) === */}
          <motion.div
            style={{ y: cardY, scale: cardScale }}
            className="absolute left-3 right-3 top-3 bottom-3 z-[35] rounded-md flex flex-col items-center justify-center"
          >
            <div
              className="w-full h-full bg-card rounded-md flex flex-col items-center justify-center p-4"
              style={{ boxShadow: "0 8px 30px -8px hsla(22, 25%, 55%, 0.35)" }}
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

          {/* === ENVELOPE BODY === */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 z-[30] pointer-events-none"
          >
            {/* Back panel with shadow for definition */}
            <div
              className="absolute inset-0 bg-secondary rounded-lg"
              style={{
                boxShadow:
                  "0 10px 40px -10px hsla(22, 30%, 40%, 0.4), 0 2px 8px -2px hsla(22, 30%, 40%, 0.2), inset 0 1px 0 0 hsla(22, 40%, 96%, 0.5)",
              }}
            />

            {/* Left inner fold */}
            <div
              className="absolute inset-0 bg-envelope-dark opacity-50"
              style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
            />
            {/* Right inner fold */}
            <div
              className="absolute inset-0 bg-envelope-dark opacity-50"
              style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)" }}
            />
            {/* Bottom inner fold */}
            <div
              className="absolute inset-0 bg-envelope-dark opacity-30"
              style={{ clipPath: "polygon(0 100%, 50% 50%, 100% 100%)" }}
            />
          </motion.div>

          {/* === ENVELOPE FRONT PANEL (covers card from front) === */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 z-[40] pointer-events-none"
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-secondary"
              style={{
                height: "60%",
                clipPath: "polygon(0 30%, 50% 0%, 100% 30%, 100% 100%, 0 100%)",
                borderRadius: "0 0 0.5rem 0.5rem",
                boxShadow: "0 -2px 6px -2px hsla(22, 30%, 40%, 0.15)",
              }}
            />

            {/* Wax seal */}
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-warm-brown flex items-center justify-center"
                style={{ boxShadow: "0 3px 10px -2px hsla(22, 30%, 30%, 0.4)" }}
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground fill-primary-foreground" />
              </motion.div>
            </div>
          </motion.div>

          {/* === ENVELOPE FLAP (triangular, opens upward) === */}
          <motion.div
            style={{
              rotateX: flapRotate,
              transformOrigin: "top center",
              opacity: envelopeOpacity,
              perspective: 800,
            }}
            className="absolute top-0 left-0 right-0 z-[45]"
          >
            {/* Front face (visible when closed) */}
            <div
              className="absolute top-0 left-0 right-0 bg-secondary"
              style={{
                height: "140px",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
                boxShadow: "0 4px 12px -4px hsla(22, 30%, 40%, 0.25)",
              }}
            />
            {/* Back face (visible when opened) */}
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

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

const EnvelopeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Animation phases:
  // 0.00–0.25: flap opens (rotates from 0 to 180)
  // 0.20–0.60: card slides up out of envelope
  // 0.50–0.70: envelope fades out
  // 0.60–0.85: card scales slightly and centers

  const flapRotate = useTransform(scrollYProgress, [0, 0.25], [0, 180]);
  const cardY = useTransform(scrollYProgress, [0.15, 0.6], [0, -320]);
  const cardScale = useTransform(scrollYProgress, [0.5, 0.8], [1, 1.05]);
  const envelopeOpacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.75, 1], [1, 0.95]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: containerScale }}
          className="relative w-[300px] h-[200px] sm:w-[400px] sm:h-[260px]"
        >
          {/* === INVITATION CARD (starts inside, slides up) === */}
          <motion.div
            style={{ y: cardY, scale: cardScale }}
            className="absolute left-3 right-3 top-3 bottom-3 z-[50] rounded-md shadow-lg flex flex-col items-center justify-center p-6"
            // Use inline style for the card background to keep it crisp
            // We use the card token
          >
            <div className="w-full h-full bg-card rounded-md flex flex-col items-center justify-center p-4">
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

          {/* === ENVELOPE BODY (rectangular back) === */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 z-[51] pointer-events-none"
          >
            {/* Back panel */}
            <div className="absolute inset-0 bg-secondary rounded-lg shadow-2xl" />

            {/* Left inner fold triangle */}
            <div
              className="absolute inset-0 bg-envelope-dark opacity-60"
              style={{
                clipPath: "polygon(0 0, 50% 50%, 0 100%)",
              }}
            />
            {/* Right inner fold triangle */}
            <div
              className="absolute inset-0 bg-envelope-dark opacity-60"
              style={{
                clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
              }}
            />

            {/* Bottom flap (the front face of the envelope) */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-secondary z-[52]"
              style={{
                height: "60%",
                clipPath: "polygon(0 30%, 50% 0%, 100% 30%, 100% 100%, 0 100%)",
                borderRadius: "0 0 0.5rem 0.5rem",
              }}
            >
              {/* Subtle inner shadow line */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] bg-envelope-dark opacity-30"
                style={{
                  clipPath: "polygon(0 0, 50% 0, 100% 0)",
                }}
              />
            </div>

            {/* Decorative wax seal */}
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[53]">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-warm-brown shadow-md flex items-center justify-center"
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
            className="absolute top-0 left-0 right-0 z-[54]"
          >
            {/* Front face of flap (visible when closed — pointing down) */}
            <div
              className="absolute top-0 left-0 right-0 bg-secondary shadow-sm"
              style={{
                height: "140px",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
              }}
            />
            {/* Back face of flap (visible when opened — shows inner color) */}
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

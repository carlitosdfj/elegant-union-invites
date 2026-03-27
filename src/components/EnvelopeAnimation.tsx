import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

const EnvelopeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const flapRotate = useTransform(scrollYProgress, [0, 0.3], [0, -180]);
  const cardY = useTransform(scrollYProgress, [0.25, 0.7], [0, -350]);
  const cardScale = useTransform(scrollYProgress, [0.5, 0.8], [1, 1.1]);
  const envelopeOpacity = useTransform(scrollYProgress, [0.6, 0.85], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.7, 1], [1, 0.9]);
  // Card z-index rises above envelope once flap opens
  const cardZ = useTransform(scrollYProgress, [0.2, 0.25], [5, 40]);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ perspective: "800px" }}>
        <motion.div
          style={{ scale: containerScale }}
          className="relative w-[320px] h-[220px] sm:w-[420px] sm:h-[280px]"
        >
          {/* Card inside — sits behind the envelope body */}
          <motion.div
            style={{ y: cardY, scale: cardScale, zIndex: cardZ }}
            className="absolute inset-2 bg-card rounded-md shadow-lg flex flex-col items-center justify-center p-6"
          >
            <p className="font-sans-detail text-muted-foreground text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-2">
              Estás invitado a la boda de
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight text-center">
              Sebastián
            </h2>
            <p className="font-serif text-xl sm:text-2xl text-warm-brown my-1">&</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight text-center">
              Sara
            </h2>
            <div className="w-16 h-px bg-warm-brown my-3" />
            <p className="font-sans-detail text-[10px] sm:text-xs tracking-[0.2em] text-muted-foreground uppercase">
              21 de Agosto, 2026
            </p>
          </motion.div>

          {/* Envelope Body (back panel) */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 bg-envelope-dark rounded-lg shadow-2xl z-10"
          >
            <div className="absolute inset-0 bg-secondary rounded-lg" />
          </motion.div>

          {/* Front of envelope — covers the card from the front */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute bottom-0 left-0 right-0 h-[55%] bg-secondary rounded-b-lg z-20"
          >
            {/* Small triangle at the top of the front panel */}
            <div
              className="absolute top-0 left-0 right-0 h-6 bg-envelope-dark"
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              }}
            />
            {/* Decorative seal */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-warm-brown fill-warm-brown" />
              </motion.div>
            </div>
          </motion.div>

          {/* Envelope Flap — opens toward the viewer */}
          <motion.div
            style={{
              rotateX: flapRotate,
              transformOrigin: "top center",
              opacity: envelopeOpacity,
            }}
            className="absolute top-0 left-0 right-0 h-[50%] z-30"
          >
            {/* Back face of flap (visible when closed) */}
            <div
              className="absolute inset-0 w-full h-full bg-envelope-dark"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
              }}
            />
            {/* Front face of flap (visible when opened) */}
            <div
              className="absolute inset-0 w-full h-full bg-secondary"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
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

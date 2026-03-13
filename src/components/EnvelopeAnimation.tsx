import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart } from "lucide-react";

const EnvelopeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const flapRotate = useTransform(scrollYProgress, [0, 0.3], [0, 180]);
  const cardY = useTransform(scrollYProgress, [0.25, 0.7], [0, -350]);
  const cardScale = useTransform(scrollYProgress, [0.5, 0.8], [1, 1.1]);
  const envelopeOpacity = useTransform(scrollYProgress, [0.6, 0.85], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.7, 1], [1, 0.9]);

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: containerScale }}
          className="relative w-[320px] h-[220px] sm:w-[420px] sm:h-[280px]"
        >
          {/* Envelope Body */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 bg-envelope-dark rounded-lg shadow-2xl z-10"
          >
            {/* Envelope bottom flap */}
            <div className="absolute inset-0 bg-secondary rounded-lg" />
            
            {/* Decorative seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-8 h-8 text-warm-brown fill-warm-brown" />
              </motion.div>
            </div>
          </motion.div>

          {/* Card inside */}
          <motion.div
            style={{ y: cardY, scale: cardScale }}
            className="absolute inset-2 bg-card rounded-md shadow-lg z-[5] flex flex-col items-center justify-center p-6"
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

          {/* Envelope Flap (top triangle) */}
          <motion.div
            style={{
              rotateX: flapRotate,
              transformOrigin: "top center",
              opacity: envelopeOpacity,
            }}
            className="absolute -top-0 left-0 right-0 h-[50%] z-30"
          >
            <div
              className="w-full h-full bg-envelope-dark"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
          </motion.div>

          {/* Front of envelope (covers card initially) */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute bottom-0 left-0 right-0 h-[55%] bg-secondary rounded-b-lg z-20"
          >
            <div
              className="absolute top-0 left-0 right-0 h-6 bg-envelope-dark"
              style={{
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
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

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
  const cardY = useTransform(scrollYProgress, [0.15, 0.6], [0, -360]);
  const cardScale = useTransform(scrollYProgress, [0.55, 0.8], [1, 1.05]);
  const envelopeOpacity = useTransform(scrollYProgress, [0.55, 0.75], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.75, 1], [1, 0.95]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const envelopeW = "w-[320px] sm:w-[420px]";
  const envelopeH = "h-[220px] sm:h-[280px]";

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: containerScale, perspective: 1000 }}
          className={`relative ${envelopeW} ${envelopeH}`}
        >
          {/* ===== LAYER 1: ENVELOPE BACK PANEL (z-20) ===== */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 z-[20] rounded-lg overflow-hidden"
          >
            {/* Solid back */}
            <div
              className="absolute inset-0 bg-envelope-dark rounded-lg"
              style={{
                boxShadow:
                  "0 14px 45px -10px hsla(22, 30%, 30%, 0.4), 0 4px 14px -4px hsla(22, 30%, 30%, 0.2)",
                border: "1px solid hsla(22, 25%, 65%, 0.5)",
              }}
            />

            {/* Left fold triangle with border */}
            <div className="absolute inset-0">
              <svg className="w-full h-full" viewBox="0 0 420 280" preserveAspectRatio="none">
                {/* Left fold */}
                <polygon
                  points="0,0 210,140 0,280"
                  fill="hsla(22, 30%, 80%, 0.15)"
                />
                <line
                  x1="0" y1="0" x2="210" y2="140"
                  stroke="hsla(22, 25%, 60%, 0.4)"
                  strokeWidth="1"
                />
                <line
                  x1="0" y1="280" x2="210" y2="140"
                  stroke="hsla(22, 25%, 60%, 0.4)"
                  strokeWidth="1"
                />
                {/* Right fold */}
                <polygon
                  points="420,0 210,140 420,280"
                  fill="hsla(22, 30%, 80%, 0.15)"
                />
                <line
                  x1="420" y1="0" x2="210" y2="140"
                  stroke="hsla(22, 25%, 60%, 0.4)"
                  strokeWidth="1"
                />
                <line
                  x1="420" y1="280" x2="210" y2="140"
                  stroke="hsla(22, 25%, 60%, 0.4)"
                  strokeWidth="1"
                />
                {/* Bottom fold */}
                <polygon
                  points="0,280 210,140 420,280"
                  fill="hsla(22, 30%, 75%, 0.12)"
                />
                <line
                  x1="0" y1="280" x2="210" y2="140"
                  stroke="hsla(22, 25%, 60%, 0.3)"
                  strokeWidth="0.5"
                />
                <line
                  x1="420" y1="280" x2="210" y2="140"
                  stroke="hsla(22, 25%, 60%, 0.3)"
                  strokeWidth="0.5"
                />
              </svg>
            </div>
          </motion.div>

          {/* ===== LAYER 2: CARD — inside a clip wrapper (z-25) ===== */}
          {/* This wrapper extends above the envelope so the card is visible 
              only when it slides UP past the envelope's top edge */}
          <div
            className="absolute z-[25] pointer-events-none"
            style={{
              left: 16,
              right: 16,
              top: -380,
              bottom: 16,
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{ y: cardY, scale: cardScale }}
              className="absolute bottom-0 left-0 right-0"
            >
              <div
                className="bg-card rounded-md flex flex-col items-center justify-center p-5 sm:p-6"
                style={{
                  height: "188px",
                  boxShadow: "0 8px 30px -8px hsla(22, 25%, 50%, 0.35)",
                }}
              >
                <p className="font-sans-detail text-muted-foreground text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-2">
                  Estás invitado a la boda de
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight text-center">
                  Sebastián
                </h2>
                <p className="font-serif text-xl sm:text-2xl text-warm-brown my-1">
                  &amp;
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-foreground leading-tight text-center">
                  Sara
                </h2>
                <div className="w-16 h-px bg-warm-brown my-3" />
                <p className="font-sans-detail text-[10px] sm:text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  21 de Agosto, 2026
                </p>
              </div>
            </motion.div>
          </div>

          {/* ===== LAYER 3: ENVELOPE FRONT PANEL (z-30) ===== */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute inset-0 z-[30] pointer-events-none rounded-lg"
          >
            {/* Solid front */}
            <div
              className="absolute inset-0 bg-secondary rounded-lg"
              style={{
                border: "1px solid hsla(22, 25%, 68%, 0.6)",
              }}
            />

            {/* V-fold line decoration with shadows */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 420 280"
              preserveAspectRatio="none"
            >
              {/* V shadow area */}
              <polygon
                points="0,0 210,140 420,0"
                fill="hsla(22, 25%, 60%, 0.08)"
              />
              {/* V fold lines */}
              <line
                x1="0" y1="0" x2="210" y2="140"
                stroke="hsla(22, 25%, 55%, 0.35)"
                strokeWidth="1.2"
              />
              <line
                x1="420" y1="0" x2="210" y2="140"
                stroke="hsla(22, 25%, 55%, 0.35)"
                strokeWidth="1.2"
              />
            </svg>
          </motion.div>

          {/* ===== LAYER 4: WAX SEAL (z-35) ===== */}
          <motion.div
            style={{ opacity: envelopeOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[35]"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-warm-brown flex items-center justify-center"
              style={{
                boxShadow:
                  "0 3px 12px -2px hsla(22, 30%, 28%, 0.5), inset 0 1px 2px hsla(22, 40%, 80%, 0.3)",
              }}
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground fill-primary-foreground" />
            </motion.div>
          </motion.div>

          {/* ===== LAYER 5: ENVELOPE FLAP (z-40) ===== */}
          <motion.div
            style={{
              rotateX: flapRotate,
              transformOrigin: "top center",
              opacity: envelopeOpacity,
            }}
            className="absolute top-0 left-0 right-0 z-[40]"
          >
            {/* Front face (closed — triangle pointing down) */}
            <svg
              className="absolute top-0 left-0 w-full"
              viewBox="0 0 420 150"
              preserveAspectRatio="none"
              style={{
                height: "68%",
                backfaceVisibility: "hidden",
              }}
            >
              <defs>
                <filter id="flapShadow">
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="4"
                    floodColor="hsla(22,30%,30%,0.2)"
                  />
                </filter>
              </defs>
              <polygon
                points="0,0 420,0 210,150"
                fill="hsl(22, 30%, 80%)"
                stroke="hsla(22, 25%, 60%, 0.5)"
                strokeWidth="1"
                filter="url(#flapShadow)"
              />
            </svg>

            {/* Back face (open — inner color) */}
            <svg
              className="absolute top-0 left-0 w-full"
              viewBox="0 0 420 150"
              preserveAspectRatio="none"
              style={{
                height: "68%",
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
            >
              <polygon
                points="0,0 420,0 210,150"
                fill="hsl(22, 40%, 87%)"
                stroke="hsla(22, 25%, 60%, 0.4)"
                strokeWidth="1"
              />
            </svg>
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

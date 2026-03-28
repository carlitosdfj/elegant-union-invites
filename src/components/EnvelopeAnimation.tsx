import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const EnvelopeAnimation = () => {
  const [phase, setPhase] = useState<"closed" | "opening" | "sliding" | "fading" | "done">("closed");
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Wait a moment before starting
      await new Promise((r) => setTimeout(r, 800));

      // Phase 1: Open flap
      setPhase("opening");
      await new Promise((r) => setTimeout(r, 1200));

      // Phase 2: Slide card out
      setPhase("sliding");
      await new Promise((r) => setTimeout(r, 1800));

      // Phase 3: Fade envelope
      setPhase("fading");
      await new Promise((r) => setTimeout(r, 1000));

      // Phase 4: Done
      setPhase("done");
    };
    sequence();
  }, []);

  if (phase === "done") return null;

  const envelopeW = 320;
  const envelopeH = 220;
  const flapH = 110;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-background"
      style={{ zIndex: 9999 }}
      animate={phase === "fading" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Scroll hint */}
      <motion.p
        className="absolute bottom-8 font-sans-detail text-xs tracking-[0.2em] text-muted-foreground"
        animate={{ opacity: phase === "closed" ? [0.4, 1, 0.4] : 0 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Un momento...
      </motion.p>

      <div className="relative" style={{ width: envelopeW, height: envelopeH + flapH }}>

        {/* === ENVELOPE BODY (z-10) === */}
        <div
          className="absolute bottom-0 rounded-md"
          style={{
            width: envelopeW,
            height: envelopeH,
            zIndex: 10,
            background: "linear-gradient(180deg, hsl(22 40% 90%) 0%, hsl(22 35% 85%) 100%)",
            border: "1.5px solid hsl(22 25% 70%)",
            boxShadow:
              "0 8px 30px -5px rgba(120, 80, 50, 0.25), 0 2px 8px rgba(120, 80, 50, 0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
          }}
        >
          {/* Inner fold lines — V shape */}
          <svg
            width={envelopeW}
            height={envelopeH}
            className="absolute inset-0"
            style={{ opacity: 0.25 }}
          >
            <line
              x1="0" y1="0"
              x2={envelopeW / 2} y2={envelopeH * 0.65}
              stroke="hsl(22 25% 55%)" strokeWidth="1"
            />
            <line
              x1={envelopeW} y1="0"
              x2={envelopeW / 2} y2={envelopeH * 0.65}
              stroke="hsl(22 25% 55%)" strokeWidth="1"
            />
          </svg>

          {/* Inner shadow at top for depth */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: 30,
              background: "linear-gradient(180deg, rgba(120,80,50,0.08) 0%, transparent 100%)",
              borderRadius: "6px 6px 0 0",
            }}
          />
        </div>

        {/* === INVITATION CARD (z-20) — always in front of body === */}
        <motion.div
          className="absolute rounded-sm"
          style={{
            width: envelopeW - 30,
            left: 15,
            bottom: 15,
            height: envelopeH - 30,
            zIndex: 20,
            background: "linear-gradient(170deg, hsl(22 45% 96%) 0%, hsl(22 40% 93%) 100%)",
            border: "1px solid hsl(22 20% 82%)",
            boxShadow: "0 4px 15px rgba(120,80,50,0.15)",
          }}
          animate={
            phase === "sliding" || phase === "fading"
              ? { y: -(envelopeH + 40) }
              : { y: 0 }
          }
          transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Card content */}
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <p className="font-sans-detail text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
              Nos casamos
            </p>
            <h2 className="font-serif text-3xl font-light text-foreground leading-tight">
              Sebastián
            </h2>
            <span className="font-serif text-xl text-warm-brown">&</span>
            <h2 className="font-serif text-3xl font-light text-foreground leading-tight">
              Sara
            </h2>
            <div className="w-10 h-px bg-warm-brown/40 my-3" />
            <p className="font-sans-detail text-[10px] tracking-[0.15em] text-muted-foreground">
              21 de Agosto de 2026
            </p>
            <p className="font-sans-detail text-[9px] tracking-[0.1em] text-muted-foreground mt-1">
              Casa Cartagena · Rionegro
            </p>
          </div>
        </motion.div>

        {/* === FLAP (z-30 closed → z-5 open) === */}
        <motion.div
          className="absolute"
          style={{
            width: envelopeW,
            height: flapH,
            top: envelopeH + flapH - envelopeH, // align flap bottom with envelope top
            bottom: envelopeH,
            left: 0,
            zIndex: phase === "closed" ? 30 : 5,
            transformOrigin: "top center",
            perspective: 800,
          }}
          animate={
            phase === "closed"
              ? { rotateX: 0 }
              : { rotateX: -180 }
          }
          transition={{ duration: 1.2, ease: [0.37, 0, 0.63, 1] }}
        >
          {/* Flap triangle shape */}
          <svg
            width={envelopeW}
            height={flapH}
            viewBox={`0 0 ${envelopeW} ${flapH}`}
            style={{ display: "block", filter: "drop-shadow(0 3px 6px rgba(120,80,50,0.15))" }}
          >
            <defs>
              <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(22, 35%, 87%)" />
                <stop offset="100%" stopColor="hsl(22, 40%, 82%)" />
              </linearGradient>
            </defs>
            <polygon
              points={`0,0 ${envelopeW},0 ${envelopeW / 2},${flapH}`}
              fill="url(#flapGrad)"
              stroke="hsl(22, 25%, 70%)"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnvelopeAnimation;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const EnvelopeAnimation = () => {
  const [phase, setPhase] = useState<"closed" | "opening" | "sliding" | "fading" | "done">("closed");

  useEffect(() => {
    const run = async () => {
      await delay(1000);
      setPhase("opening");
      await delay(1400);
      setPhase("sliding");
      await delay(2000);
      setPhase("fading");
      await delay(1000);
      setPhase("done");
    };
    run();
  }, []);

  if (phase === "done") return null;

  const W = 320;
  const BODY_H = 200;
  const FLAP_H = 100;

  const flapOpen = phase !== "closed";
  const cardOut = phase === "sliding" || phase === "fading";

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-background"
      style={{ zIndex: 9999 }}
      animate={{ opacity: phase === "fading" ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hint */}
      {phase === "closed" && (
        <motion.p
          className="absolute bottom-8 font-sans-detail text-xs tracking-[0.2em] text-muted-foreground"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Un momento...
        </motion.p>
      )}

      {/* Envelope container */}
      <div className="relative" style={{ width: W, height: FLAP_H + BODY_H }}>

        {/* ─── FLAP ─── */}
        {/* When closed: z-30 (covers card). When open: z-5 (behind card). */}
        <motion.div
          className="absolute left-0"
          style={{
            width: W,
            height: FLAP_H,
            top: 0,
            zIndex: flapOpen ? 5 : 30,
            transformOrigin: "bottom center",
          }}
          animate={{ rotateX: flapOpen ? 180 : 0 }}
          transition={{ duration: 1.2, ease: [0.37, 0, 0.63, 1] }}
        >
          <svg
            width={W}
            height={FLAP_H}
            viewBox={`0 0 ${W} ${FLAP_H}`}
            style={{
              display: "block",
              filter: "drop-shadow(0 4px 8px rgba(100,70,40,0.18))",
            }}
          >
            <defs>
              <linearGradient id="flapG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(22, 38%, 88%)" />
                <stop offset="100%" stopColor="hsl(22, 35%, 82%)" />
              </linearGradient>
            </defs>
            <polygon
              points={`0,0 ${W / 2},${FLAP_H} ${W},0`}
              fill="url(#flapG)"
              stroke="hsl(22, 25%, 68%)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* ─── ENVELOPE BODY ─── z-10 */}
        <div
          className="absolute left-0 rounded-b-md overflow-hidden"
          style={{
            width: W,
            height: BODY_H,
            top: FLAP_H,
            zIndex: 10,
            background: "linear-gradient(175deg, hsl(22 40% 90%) 0%, hsl(22 32% 84%) 100%)",
            border: "1.5px solid hsl(22 25% 68%)",
            borderTop: "none",
            boxShadow:
              "0 10px 35px -8px rgba(100,70,40,0.3), 0 3px 10px rgba(100,70,40,0.12), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          {/* Inner V fold lines */}
          <svg width={W} height={BODY_H} className="absolute inset-0" style={{ opacity: 0.2 }}>
            <line x1="0" y1="0" x2={W / 2} y2={BODY_H * 0.6} stroke="hsl(22 25% 55%)" strokeWidth="1" />
            <line x1={W} y1="0" x2={W / 2} y2={BODY_H * 0.6} stroke="hsl(22 25% 55%)" strokeWidth="1" />
          </svg>

          {/* Top inner shadow */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{
              height: 25,
              background: "linear-gradient(180deg, rgba(100,70,40,0.1) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* ─── INVITATION CARD ─── z-20 (always above body z-10, below closed flap z-30, above open flap z-5) */}
        <motion.div
          className="absolute rounded-sm"
          style={{
            width: W - 32,
            height: BODY_H - 24,
            left: 16,
            top: FLAP_H + 12,
            zIndex: 20,
            background: "linear-gradient(170deg, hsl(22 50% 97%) 0%, hsl(22 40% 94%) 100%)",
            border: "1px solid hsl(22 20% 85%)",
            boxShadow: "0 2px 12px rgba(100,70,40,0.12)",
          }}
          animate={{ y: cardOut ? -(BODY_H + FLAP_H - 20) : 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex flex-col items-center justify-center h-full px-4 text-center gap-0.5">
            <p className="font-sans-detail text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
              Nos casamos
            </p>
            <h2 className="font-serif text-3xl font-light text-foreground leading-tight mt-1">
              Sebastián
            </h2>
            <span className="font-serif text-lg text-warm-brown leading-none">&</span>
            <h2 className="font-serif text-3xl font-light text-foreground leading-tight">
              Sara
            </h2>
            <div className="w-10 h-px bg-warm-brown/40 my-2" />
            <p className="font-sans-detail text-[10px] tracking-[0.15em] text-muted-foreground">
              21 de Agosto de 2026
            </p>
            <p className="font-sans-detail text-[9px] tracking-[0.1em] text-muted-foreground mt-0.5">
              Casa Cartagena · Rionegro
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default EnvelopeAnimation;

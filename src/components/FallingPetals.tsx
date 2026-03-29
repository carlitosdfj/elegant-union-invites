import { useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  swayAmount: number;
  opacity: number;
  type: "flower" | "monogram";
}

const FallingPetals = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 14,
      duration: 12 + Math.random() * 10,
      size: i % 3 === 0 ? 18 + Math.random() * 8 : 10 + Math.random() * 8,
      rotation: Math.random() * 360,
      swayAmount: 25 + Math.random() * 50,
      opacity: 0.12 + Math.random() * 0.2,
      type: i % 3 === 0 ? "monogram" : "flower",
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: -30,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, p.swayAmount, -p.swayAmount / 2, p.swayAmount / 3, 0],
            rotate: [p.rotation, p.rotation + 360],
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            x: { duration: p.duration * 0.8, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            rotate: { duration: p.duration * 1.2, repeat: Infinity, ease: "linear", delay: p.delay },
          }}
        >
          {p.type === "flower" ? (
            <svg
              viewBox="0 0 24 24"
              width={p.size}
              height={p.size}
              style={{ opacity: p.opacity }}
            >
              {/* 5-petal flower */}
              {[0, 72, 144, 216, 288].map((angle) => (
                <ellipse
                  key={angle}
                  cx="12"
                  cy="12"
                  rx="3.5"
                  ry="6"
                  fill="hsl(var(--secondary))"
                  transform={`rotate(${angle} 12 12) translate(0 -3)`}
                />
              ))}
              <circle cx="12" cy="12" r="2.5" fill="hsl(var(--warm-brown))" />
            </svg>
          ) : (
            <span
              style={{
                fontSize: p.size * 0.7,
                opacity: p.opacity,
                color: "hsl(var(--warm-brown))",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
              }}
            >
              S·S
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingPetals;

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  swayAmount: number;
  opacity: number;
}

const FallingPetals = () => {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 8,
      size: 8 + Math.random() * 10,
      rotation: Math.random() * 360,
      swayAmount: 30 + Math.random() * 60,
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: -20,
            width: petal.size,
            height: petal.size,
          }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, petal.swayAmount, -petal.swayAmount / 2, petal.swayAmount / 3, 0],
            rotate: [petal.rotation, petal.rotation + 360],
          }}
          transition={{
            y: { duration: petal.duration, repeat: Infinity, ease: "linear", delay: petal.delay },
            x: { duration: petal.duration * 0.8, repeat: Infinity, ease: "easeInOut", delay: petal.delay },
            rotate: { duration: petal.duration * 1.2, repeat: Infinity, ease: "linear", delay: petal.delay },
          }}
        >
          <svg
            viewBox="0 0 20 20"
            width={petal.size}
            height={petal.size}
            style={{ opacity: petal.opacity }}
          >
            <ellipse
              cx="10"
              cy="10"
              rx="6"
              ry="10"
              fill="hsl(var(--warm-brown))"
              transform="rotate(25 10 10)"
            />
            <ellipse
              cx="10"
              cy="10"
              rx="5"
              ry="8"
              fill="hsl(var(--secondary))"
              transform="rotate(-15 10 10)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FallingPetals;

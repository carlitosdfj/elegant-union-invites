import { motion } from "framer-motion";

interface WatercolorBlotchProps {
  className?: string;
  color?: string;
  variant?: 1 | 2 | 3 | 4 | 5;
  size?: number;
  opacity?: number;
}

const WatercolorBlotch = ({
  className = "",
  color = "hsl(var(--warm-brown))",
  variant = 1,
  size = 200,
  opacity = 0.08,
}: WatercolorBlotchProps) => {
  const blotches: Record<number, JSX.Element> = {
    1: (
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <filter id={`blur-${variant}-${size}`}>
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <path
          d="M100,20 C140,10 180,40 185,80 C190,120 170,160 130,180 C90,195 40,175 20,140 C5,110 15,60 50,35 C65,25 80,22 100,20Z"
          fill={color}
          filter={`url(#blur-${variant}-${size})`}
          opacity={opacity}
        />
      </svg>
    ),
    2: (
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <filter id={`blur2-${variant}-${size}`}>
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <path
          d="M90,15 C130,5 175,30 190,70 C200,100 195,140 170,165 C140,190 95,200 60,180 C25,160 5,120 10,80 C15,45 50,20 90,15Z"
          fill={color}
          filter={`url(#blur2-${variant}-${size})`}
          opacity={opacity}
        />
      </svg>
    ),
    3: (
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <filter id={`blur3-${variant}-${size}`}>
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <ellipse
          cx="100"
          cy="100"
          rx="85"
          ry="70"
          fill={color}
          filter={`url(#blur3-${variant}-${size})`}
          opacity={opacity}
        />
        <ellipse
          cx="80"
          cy="120"
          rx="50"
          ry="60"
          fill={color}
          filter={`url(#blur3-${variant}-${size})`}
          opacity={opacity * 0.6}
        />
      </svg>
    ),
    4: (
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <filter id={`blur4-${variant}-${size}`}>
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>
        <path
          d="M60,10 C100,5 150,20 175,55 C195,85 190,125 165,155 C135,185 90,195 55,175 C20,155 5,110 15,70 C22,40 35,15 60,10Z"
          fill={color}
          filter={`url(#blur4-${variant}-${size})`}
          opacity={opacity}
        />
      </svg>
    ),
    5: (
      <svg viewBox="0 0 250 150" width={size * 1.2} height={size * 0.7}>
        <defs>
          <filter id={`blur5-${variant}-${size}`}>
            <feGaussianBlur stdDeviation="11" />
          </filter>
        </defs>
        <path
          d="M30,75 C50,20 100,10 140,30 C180,50 220,40 240,75 C250,110 200,140 150,130 C100,120 60,140 30,120 C10,105 15,90 30,75Z"
          fill={color}
          filter={`url(#blur5-${variant}-${size})`}
          opacity={opacity}
        />
      </svg>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      className={`absolute pointer-events-none ${className}`}
    >
      {blotches[variant]}
    </motion.div>
  );
};

export default WatercolorBlotch;

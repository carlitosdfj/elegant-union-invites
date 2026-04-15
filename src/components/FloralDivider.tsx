import { motion } from "framer-motion";
import floralImg1 from "@/assets/floral-divider-1.png";
import floralImg2 from "@/assets/floral-divider-2.png";
import floralImg3 from "@/assets/floral-divider-3.png";

interface FloralDividerProps {
  variant?: 1 | 2 | 3;
  align?: "left" | "center" | "right";
  className?: string;
  flip?: boolean;
}

const FloralDivider = ({
  variant = 1,
  align = "center",
  className = "",
  flip = false,
}: FloralDividerProps) => {
  const images = { 1: floralImg1, 2: floralImg2, 3: floralImg3 };

  const alignClass = {
    left: "justify-start -ml-8 sm:-ml-4",
    center: "justify-center",
    right: "justify-end -mr-8 sm:-mr-4",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className={`flex items-center ${alignClass[align]} py-2 overflow-visible ${className}`}
    >
      <img
        src={images[variant]}
        alt=""
        loading="lazy"
        className={`w-48 sm:w-64 md:w-72 h-auto opacity-60 pointer-events-none select-none ${flip ? "scale-x-[-1]" : ""}`}
        width={variant === 1 ? 1024 : 800}
        height={512}
      />
    </motion.div>
  );
};

export default FloralDivider;

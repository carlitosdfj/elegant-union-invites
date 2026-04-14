import washImg1 from "@/assets/watercolor-wash-1.png";
import washImg2 from "@/assets/watercolor-wash-2.png";

interface WatercolorWashProps {
  variant?: 1 | 2;
  className?: string;
  opacity?: number;
}

const WatercolorWash = ({
  variant = 1,
  className = "",
  opacity = 0.12,
}: WatercolorWashProps) => {
  const images = { 1: washImg1, 2: washImg2 };

  return (
    <img
      src={images[variant]}
      alt=""
      loading="lazy"
      className={`absolute pointer-events-none select-none z-0 ${className}`}
      style={{ opacity }}
      width={800}
      height={800}
    />
  );
};

export default WatercolorWash;

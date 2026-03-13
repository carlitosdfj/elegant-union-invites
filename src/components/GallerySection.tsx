import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, tall: true },
  { src: gallery2, tall: false },
  { src: gallery3, tall: true },
  { src: gallery4, tall: false },
  { src: gallery5, tall: true },
  { src: gallery6, tall: true },
];

const GallerySection = () => {
  return (
    <section className="py-20 px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-serif text-4xl sm:text-5xl text-center mb-12 text-foreground font-light"
      >
        Nuestra Historia
      </motion.h2>

      <div className="max-w-4xl mx-auto columns-2 sm:columns-3 gap-3 sm:gap-4">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mb-3 sm:mb-4 break-inside-avoid"
          >
            <img
              src={img.src}
              alt={`Pre-wedding photo ${index + 1}`}
              className="w-full rounded-lg object-cover shadow-md hover:shadow-xl transition-shadow duration-300"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;

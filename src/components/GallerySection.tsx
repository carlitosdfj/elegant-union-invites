import { motion } from "framer-motion";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";

const images = [
  { src: couple1, alt: "Sebastián y Sara caminando de la mano" },
  { src: couple2, alt: "Sebastián y Sara mostrando el anillo" },
  { src: couple3, alt: "Detalle del anillo de compromiso" },
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
              alt={img.alt}
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
